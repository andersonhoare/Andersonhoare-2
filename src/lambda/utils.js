const xml2js = require('xml2js');

export const parseXml = (xml, options = {}) =>
  new Promise((resolve, reject) => {
    xml2js.parseString(xml, options, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

export const sendMail = (fn, mailOptions) =>
  new Promise((resolve, reject) => {
    fn(mailOptions, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

export const createObject = obj =>
  Object.entries(obj).reduce(
    (acc, [k, v]) =>
      Object.assign(acc, {
        [k]: { 'en-US': v[0] }
      }),
    {}
  );

const check = (item, msg) => {
  return item && item.length ? false : true;
};

export const validate = ({
  application_email,
  command,
  username,
  password,
  contact_name,
  contact_email,
  contact_telephone,
  contact_url,
  days_to_advertise,
  application_url,
  job_reference,
  job_title,
  job_type,
  job_duration,
  job_startdate,
  job_skills,
  job_description,
  job_location,
  job_industry,
  salary_currency,
  salary_from,
  salary_to,
  salary_per,
  salary_benefits,
  salary
}) => {
  let error = null;
  if (check(application_email)) error = 'Missing application_email field';
  if (check(command)) error = 'Missing command field';
  if (check(username)) error = 'Missing username field';
  if (check(password)) error = 'Missing password field';
  if (check(contact_name)) error = 'Missing contact_name field';
  if (check(contact_email)) error = 'Missing contact_email field';
  if (check(contact_telephone)) error = 'Missing contact_telephone field';
  if (check(contact_url)) error = 'Missing contact_url field';
  if (check(days_to_advertise)) error = 'Missing days_to_advertise field';
  if (check(application_url)) error = 'Missing application_url field';
  if (check(job_reference)) error = 'Missing job_reference field';
  if (check(job_title)) error = 'Missing job_title field';
  if (check(job_type)) error = 'Missing job_type field';
  if (check(job_duration)) error = 'Missing job_duration field';
  if (check(job_startdate)) error = 'Missing job_startdate field';
  if (check(job_skills)) error = 'Missing job_skills field';
  if (check(job_description)) error = 'Missing job_description field';
  if (check(job_location)) error = 'Missing job_location field';
  if (check(job_industry)) error = 'Missing job_industry field';
  if (check(salary_currency)) error = 'Missing salary_currency field';
  if (check(salary_from)) error = 'Missing salary_from field';
  if (check(salary_to)) error = 'Missing salary_to field';
  if (check(salary_per)) error = 'Missing salary_per field';
  if (check(salary_benefits)) error = 'Missing salary_benefits field';
  if (check(salary)) error = 'Missing salary field';
  return { error };
};
