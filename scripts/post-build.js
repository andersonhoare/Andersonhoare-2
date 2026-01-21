const fs = require('fs');
const path = require('path');
const contentful = require('contentful');
require('dotenv').config();

// --- CONFIGURATION ---
const SPACE_ID = process.env.CONTENTFUL_SPACE || '3yxhsx9gms6e';
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || 'f75bd89be6664c959f01eb597d1761ea793a78f35f24f2f12d1f3287bec831b8';
const SITE_URL = 'https://andersonhoare.co.uk';

// --- ROBOTS.TXT CONTENT ---
const robotsContent = `User-agent: *
Disallow: /api/
Crawl-delay: 5

User-agent: GPTBot
Allow: /
Crawl-delay: 5

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /
Crawl-delay: 5

User-agent: ClaudeBot
Allow: /
Crawl-delay: 5

User-agent: PerplexityBot
Allow: /
Crawl-delay: 5

User-agent: Applebot
Allow: /
Crawl-delay: 5

User-agent: CCBot
Allow: /
Crawl-delay: 5

Sitemap: https://andersonhoare.co.uk/sitemap.xml
`;

// --- HELPER: URL GENERATOR (FIXED) ---
const toPostUrl = ({ title, createdAt, job_reference }) => {
    if (!title) return '';
    
    // Remove line breaks, extra spaces, and special characters FIRST
    let cleanTitle = title
        .replace(/[\n\r]+/g, ' ')  // Replace line breaks with spaces
        .replace(/\s+/g, ' ')       // Replace multiple spaces with single space
        .trim();                     // Remove leading/trailing spaces
    
    let main = createdAt
        ? `${createdAt.slice(0, 10)}-${cleanTitle}`
        : cleanTitle;
    
    // Replace spaces with hyphens
    main = main.split(" ").join("-");
    
    let ref = job_reference ? `-${job_reference}` : "";
    
    // Remove trailing hyphens
    while(main.endsWith('-')) { 
        main = main.slice(0, -1); 
    }
    
    // Combine and clean
    const combined = (main + ref)
        .toLowerCase()
        .replace(/[^\w\-]/g, "")  // Remove everything except word chars and hyphens
        .replace(/\-+/g, "-");     // Replace multiple hyphens with single hyphen
    
    return combined;  // Don't use encodeURIComponent here - it creates %0A mess
};

// --- MAIN FUNCTION ---
async function generate() {
    console.log('🏗️  Starting Post-Build Script...');
    
    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    // Write robots.txt
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
    console.log('✅ Robots.txt restored (Allowed static assets).');

    // Fetch Data & Build Sitemap
    const client = contentful.createClient({
        space: SPACE_ID,
        accessToken: ACCESS_TOKEN
    });

    try {
        console.log('📡 Fetching jobs and blogs from Contentful...');
        
        // FIXED: Fetch only job listings with proper query
        const jobsResponse = await client.getEntries({
            content_type: 'jobListing',
            limit: 1000,
            order: '-sys.updatedAt'  // Most recent first
        });
        
        // FIXED: Fetch only blog posts with proper query
        const blogsResponse = await client.getEntries({
            content_type: 'blogPost',
            limit: 1000,
            order: '-sys.updatedAt'
        });
        
        // FIXED: Filter out entries without required fields and only published ones
        const jobs = jobsResponse.items.filter(item => {
            return item.fields && 
                   item.fields.job_title && 
                   item.sys.publishedAt &&  // Only published entries
                   !item.fields.archived;    // Exclude archived jobs (if you have this field)
        });
        
        const blogs = blogsResponse.items.filter(item => {
            return item.fields && 
                   item.fields.title && 
                   item.sys.publishedAt;  // Only published entries
        });
        
        console.log(`📝 Found ${jobs.length} Jobs and ${blogs.length} Blogs.`);
        
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${SITE_URL}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
    <url><loc>${SITE_URL}/about</loc><priority>0.8</priority></url>
    <url><loc>${SITE_URL}/jobs</loc><priority>0.9</priority></url>
    <url><loc>${SITE_URL}/blog</loc><priority>0.8</priority></url>
    <url><loc>${SITE_URL}/contact</loc><priority>0.7</priority></url>
    <url><loc>${SITE_URL}/clients</loc><priority>0.7</priority></url>
    <url><loc>${SITE_URL}/candidates</loc><priority>0.7</priority></url>
    <url><loc>${SITE_URL}/privacy</loc><priority>0.5</priority></url>
${jobs.map(job => {
    const slug = toPostUrl({
        title: job.fields.job_title,
        createdAt: job.sys.createdAt,
        job_reference: job.fields.job_reference
    });
    
    // Skip if slug generation failed
    if (!slug) return '';
    
    return `    <url><loc>${SITE_URL}/jobs/${slug}</loc><lastmod>${job.sys.updatedAt.slice(0, 10)}</lastmod><changefreq>weekly</changefreq></url>`;
}).filter(Boolean).join('\n')}
${blogs.map(blog => {
    const slug = toPostUrl({
        title: blog.fields.title,
        createdAt: blog.sys.createdAt
    });
    
    // Skip if slug generation failed
    if (!slug) return '';
    
    return `    <url><loc>${SITE_URL}/blog/${slug}</loc><lastmod>${blog.sys.updatedAt.slice(0, 10)}</lastmod><changefreq>monthly</changefreq></url>`;
}).filter(Boolean).join('\n')}
</urlset>`;

        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
        console.log('✅ Sitemap.xml generated!');
        
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
    }
}

generate();
