import axios from "axios";

import {
  client,
  instagramUrl,
  getJobs,
  getBlogs,
  getContent,
  getInstagram,
  getBroadbean,
} from "./utils";

const initialMedia = {
  createdAt: "",
  file: { url: "", details: {}, fileName: "", contentType: "" },
  id: "",
  title: "",
  updatedAt: "",
};

const initialEmail = {
  url: "",
  displayName: "",
};

const meta = {
  metaTitle: "",
  metaDescription: "",
};

const home = {
  heroImage: initialMedia,
  title: "",
  titleSecondary: "",
  blogIntro: "",
  clients: "",
  candidates: "",
  jobs: [],
  blogs: [],
  companyQuote: null,
  ...meta,
};

export const initialState = {
  content: {
    home: home,
    about: {
      heroImage: initialMedia,
      team: [],
      testimonials: [],
      title: "",
      footer: "",
      ...meta,
    },
    candidate: {
      heroImage: initialMedia,
      subtitle: "",
      permanentHowWeWork: "",
      temporaryHowWeWork: "",
      tempGuidelines: initialMedia,
      testimonials: [],
      blogs: [],
      ...meta,
    },
    client: {
      heroImage: initialMedia,
      subtitle: "",
      howWeWork: "",
      rolesWeRecruitFor: "",
      needAPerm: "",
      needATemp: "",
      needAPermEmail: "",
      needATempEmail: "",
      panelImage: initialMedia,
      testimonials: [],
      ...meta,
    },
    college: {
      heroImage: initialMedia,
      subtitle: "",
      colleges: [],
      ...meta,
    },
    job: {
      intro: "",
      ...meta,
    },
    role: {
      ...meta,
    },
    blog: {
      heroBlog: null,
      blackBookBlog: null,
      ...meta,
    },
    contact: {
      address: "",
      phone: "",
      lookingToHire: "",
      lookingToHireEmail: "",
      enquiriesEmail: "",
      socialMedia: [],
      ...meta,
    },
    private: {
      info: "",
      ...home,
    },
    privacy: {
      body: "",
      ...meta,
    },
    yourPotential: {
      heroImage: initialMedia,
      courseImage: initialMedia,
      ...meta,
    },
  },
  instagrams: [],
  jobs: [],
  broadbean: [],
  blogs: [],
  roles: [],
  servicesClient: [],
  servicesCandidate: [],
};

export function reducer(state, { type, payload }) {
  switch (type) {
    case "fetch_content":
      return { ...state, content: payload };
    case "fetch_instagrams":
      return { ...state, instagrams: payload };
    case "fetch_jobs":
      return { ...state, jobs: payload };
    case "fetch_broadbean":
      return { ...state, broadbean: payload };
    case "fetch_blogs":
      return { ...state, blogs: payload };
    case "fetch_roles":
      return { ...state, roles: payload };
    case "fetch_services":
      return { ...state, ...payload };
  }
}

export const fetchContent = async (dispatch) => {
  const query = { include: 3, content_type: "content" };
  const payload = await client.getEntries(query);
  dispatch({ type: "fetch_content", payload: getContent(payload) });
};

export const fetchInstagram = async (dispatch) => {
  // const { data } = await axios.get(instagramUrl);
  // const payload = getInstagram(data);
  // dispatch({ type: 'fetch_instagrams', payload });
};

export const fetchJobs = async (dispatch) => {
  const query = {
    content_type: "jobListing",
    limit: 1000,
  };
  // const query2 = {
  //   content_type: "broadbean",
  //   limit: 1000,
  // };
  const payload = getJobs(await client.getEntries(query));
  // const payload2 = getBroadbean(await client.getEntries(query2));
  // dispatch({ type: "fetch_broadbean", payload: payload2 });
  dispatch({ type: "fetch_jobs", payload });
};

export const fetchBlogs = async (dispatch) => {
  const query = { content_type: "blogPost" };
  const payload = getBlogs(await client.getEntries(query));
  dispatch({ type: "fetch_blogs", payload });
};

export const fetchServices = async (dispatch) => {
  const query = { content_type: "servicesClients" };
  const query2 = { content_type: "role" };

  const servicesClient = getBlogs(await client.getEntries(query));
  const servicesCandidate = getBlogs(await client.getEntries(query2));
  dispatch({
    type: "fetch_services",
    payload: { servicesClient, servicesCandidate },
  });
};
