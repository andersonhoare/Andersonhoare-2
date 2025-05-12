import { createClient } from "contentful";

import {
  propOr,
  prop,
  path,
  pipe,
  uniq,
  pathOr,
  dropLastWhile,
  equals,
  applySpec,
  evolve,
  map,
} from "ramda";

import numeral from "numeral";

export const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: process.env.CONTENTFUL_SPACE,
});

export const instagramUrl = `https://api.instagram.com/v1/users/${
  (process.env.INSTA_AUTH || "").split(".")[0]
}/media/recent/?access_token=${process.env.INSTA_AUTH || ""}`;

const getPost = ({ fields, sys }) => ({
  ...fields,
  id: sys.id,
  updatedAt: sys.updatedAt,
  createdAt: sys.createdAt,
});

const getPostList = map(getPost);

const getSingleBlog = pipe(
  getPost,
  evolve({
    tags: getPostList,
    image: getPost,
  })
);

const getAllBlogs = pipe(
  getPostList,
  map(
    evolve({
      tags: getPostList,
      image: getPost,
    })
  )
);

const getHome = pipe(
  prop("fields"),
  evolve({
    heroImage: getPost,
    blogs: getAllBlogs,
    jobs: getPostList,
    testimonials: getPostList,
    companyQuote: pipe(getPost, evolve({ image: getPost })),
  })
);

const getYourPotential = pipe(
  prop("fields"),
  evolve({
    heroImage: getPost,
    courseImage: getPost,
  })
);

const getCandidate = pipe(
  prop("fields"),
  evolve({
    heroImage: getPost,
    blogs: getAllBlogs,
    testimonials: getPostList,
    tempGuidelines: getPost,
  })
);

const getClient = pipe(
  prop("fields"),
  evolve({
    heroImage: getPost,
    testimonials: getPostList,
    panelImage: getPost,
  })
);

const getCollege = pipe(
  prop("fields"),
  evolve({
    heroImage: getPost,
    colleges: pipe(getPostList, map(evolve({ image: getPost }))),
  })
);

const getAbout = pipe(
  prop("fields"),
  evolve({
    heroImage: getPost,
    blogs: getAllBlogs,
    testimonials: getPostList,
    team: pipe(getPostList, map(evolve({ image: getPost }))),
  })
);

const getBlog = pipe(
  prop("fields"),
  evolve({
    blackBookBlog: getSingleBlog,
    heroBlog: getSingleBlog,
  })
);

const getJob = pipe(prop("fields"));
const getRole = pipe(
  prop("fields"),
  evolve({
    hero: getPost,
  })
);

const getContact = pipe(
  prop("fields"),
  evolve({
    socialMedia: getPostList,
  })
);

const getPrivacy = pipe(prop("fields"));

export const getContent = pipe(
  pathOr({}, ["items", 0, "fields"]),
  evolve({
    home: getHome,
    about: getAbout,
    candidate: getCandidate,
    client: getClient,
    college: getCollege,
    role: getRole,
    job: getJob,
    blog: getBlog,
    contact: getContact,
    private: getHome,
    privacy: getPrivacy,
    yourPotential: getYourPotential,
  })
);

export const getInstagram = pipe(
  propOr([], "data"),
  map(
    applySpec({
      link: prop("link"),
      caption: path(["caption", "text"]),
      created: path(["created_time"]),
      src: path(["images", "standard_resolution", "url"]),
    })
  )
);

export const getJobs = pipe(pathOr([], ["items"]), getPostList);

export const getBroadbean = pipe(pathOr([], ["items"]), getPostList);

export const getBlogs = pipe(
  pathOr([], ["items"]),
  getPostList,
  map(
    evolve({
      tags: getPostList,
      image: getPost,
    })
  )
);

export const getRoles = pipe(
  pathOr([], ["items"]),
  getPostList,
  map(
    evolve({
      image: getPost,
    })
  )
);

export const toPostUrl = ({ title, createdAt, job_reference }) => {
  let main = createdAt
    ? `${createdAt.slice(0, 10)}-${title}`.split(" ").join("-")
    : `${title}`.split(" ").join("-");
  let ref = job_reference ? `-${job_reference}` : "";
  let main_trim = dropLastWhile(equals("-"), main);
  return encodeURIComponent(
    (main_trim + ref).toLowerCase().replace(/[^\w\-\s]/g, "")
  );
};

export const getCurrentJob = (id, xs) =>
  xs.find(({ job_title, job_reference, createdAt }) => {
    const postUrl = toPostUrl({ title: job_title, createdAt, job_reference });
    return postUrl === id;
  }) || {};

export const getCurrentBlog = (id, xs) =>
  xs.find(({ title, createdAt }) => {
    const postUrl = toPostUrl({ title, createdAt });
    return postUrl === id;
  }) || {};

export const getCurrentRole = (title_, xs) =>
  xs.find(({ title }) => {
    return title === title_;
  }) || {};

export const formatDateTime = (datetime) => {
  try {
    const date = `${new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: false,
    }).format(new Date(datetime))}`;
    return date;
  } catch (e) {
    return "";
  }
};

export const getBlogTags = (xs) => {
  if (!xs || !xs.length) return [];
  return uniq(
    xs.reduce((acc, { tags }) => {
      if (tags && tags.length) {
        tags.map(({ tagName }) => {
          acc.push({
            value: tagName,
            label: tagName,
          });
        });
      }
      return acc;
    }, [])
  );
};

export const truncate = (str, amount = 200) => {
  if (str && typeof str == "string") {
    if (str.length > amount) {
      return str.slice(0, amount).concat("...");
    }
  }
  return str;
};

const defaultOpts = {
  size: false,
  quality: 50,
};

export const fetchImageContentful = (str, opt = defaultOpts) => {
  const protocol = "https:";
  const jpg = "?fm=jpg";
  const progressive = "&fl=progressive";
  const quality = opt.quality ? `&q=${opt.quality}` : "";
  const size = opt.size ? `&w=${opt.size}` : "";
  const url = protocol + str + jpg + progressive + quality + size;
  return url;
};

// export const formatSalary = (from, to, per) => {
//   if (per == "annum") {
//     return `£${numeral(from).format("0a")} - £${numeral(to).format(
//       "0a"
//     )} per ${per}`;
//   }

//   return `£${from} -  £${to} per ${per}`;
// };

export const formatSalary = (from, to, per) => {
  if (per == "annum") {
    return `£${numeral(to).format("0a")}`;
  }

  return `£${to}`;
};

export const isNotIe = () => {
  var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
  var msie = ua.indexOf("MSIE "); // IE 10 or older
  var trident = ua.indexOf("Trident/"); //IE 11

  return !(msie > 0 || trident > 0);
};
