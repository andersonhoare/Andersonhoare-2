const fs = require('fs');
const path = require('path');

// 1. DEFINING THE ROBOTS.TXT CONTENT
// This applies the brakes so your server stops crashing (502s)
const robotsContent = `User-agent: *
Disallow: /api/
Disallow: /_next/
Disallow: /static/
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

// 2. FINDING THE PUBLIC FOLDER
// The build process sometimes deletes this folder, so we make sure it exists
const publicDir = path.join(__dirname, '../public');

if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir);
}

// 3. WRITING THE FILE
// This forces the file to exist right before the site goes live
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);

console.log('✅ Success: robots.txt has been restored in the public folder!');
