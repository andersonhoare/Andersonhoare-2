if (process.env.NODE_ENV == 'development') require('dotenv').config();

const contentful = require('contentful-management');

import { parseXml, createObject, validate } from './utils';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
});

const toPostUrl = ({ title, createdAt = [], job_reference }) => {
  let main = `${createdAt.slice(0, 10)}-${title}`.split(' ').join('-');
  let ref = job_reference ? `-${job_reference}` : '';
  return encodeURIComponent(
    (main + ref).toLowerCase().replace(/[^\w\-\s]/g, '')
  );
};

const successMsg = (id, url) =>
  `This Job has been added and has a post ID of ${id}. The permalink to this job is: https://andersonhoare.co.uk/jobs/${url}`;

exports.handler = async (event, context, callback) => {
  console.log(event.headers);
  console.log('--------------');
  console.log(event.body);
  console.log('--------------');
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE);
    const environment = await space.getEnvironment('master');
    const { job } = await parseXml(event.body);

    if (job && job.command == 'delete') {
      const entries = await environment.getEntries({
        content_type: 'broadbean',
        limit: 1000
      });

      const matchJob = entries.items.find(
        x => x.fields.job_reference['en-US'] == job.job_reference
      );

      if (!matchJob) throw Error(`Job ${job.job_reference} does not exist.`);

      await matchJob.unpublish();
      await matchJob.delete();

      return {
        headers,
        statusCode: 200,
        body: `Job ${job.job_reference} has been deleted.`
      };
    } else {
      const validated = validate(job);
      if (validated.error) throw Error(validated.error);

      const jobPost = { fields: createObject(job) };
      const entry = await environment.createEntry('broadbean', jobPost);
      const published = await entry.publish();

      const permaLink = toPostUrl({
        title: published.fields.job_title['en-US'],
        job_reference: published.fields.job_reference['en-US'],
        createdAt: published.sys.createdAt
      });

      const body = successMsg(
        published.fields.job_reference['en-US'],
        permaLink
      );

      console.log(body);
      console.log('------ END ------');

      return {
        headers,
        statusCode: 200,
        body
      };
    }
  } catch (error) {
    let msg = 'ERROR >> ' + error.message;
    console.log(msg);
    return {
      headers,
      statusCode: 500,
      body: msg
    };
  }
};
