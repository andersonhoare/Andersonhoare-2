import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import axios from "axios";
import Input, { TextArea, File, Checbox, Submit } from "../components/Input";
import { isNotIe } from "../utils";
import { LinkCss, media, palette } from "../style";
import * as Yup from "yup";
import OnSuccess from "./OnSuccess";

const FormComponent = styled(Form)`
  display: grid;
  grid-gap: 4rem;
  padding-bottom: 8rem;
  ${media.mobile`
    grid-gap: 1rem;
  `};
`;

const FILE_SIZE = 1.6e6;
const SUPPORTED_FORMATS = [
  "png",
  "jpg",
  "jpeg",
  "pdf",
  "msword",
  "vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const getType = x => x.substring(x.indexOf("/") + 1, x.indexOf(";base64"));

const handleSubmit = onSubmit => ({
  candidate_name,
  candidate_email,
  file,
  message,
  gdpr,
  application_email,
  job_reference,
  job_title,
  phone,
  username,
  password,
  contact_email
}) => {
  const data = JSON.stringify({
    contact_email,
    application_email,
    candidate_name,
    candidate_email,
    phone,
    message,
    file
  });

  if (isNotIe()) {
    gtag("event", `apply_job_broadbean`, {
      content_id: job_reference
    });
  }

  onSubmit({ submitPending: true, submitSuccess: false, submitError: false });
  axios({
    url: "https://anderson-hoare.herokuapp.com/",
    method: "POST",
    data,
    config: { headers: { "Content-Type": "application/json" } }
  })
    .then(() =>
      onSubmit({
        submitSuccess: true,
        submitError: false,
        submitPending: false
      })
    )
    .catch(error =>
      onSubmit({
        submitSuccess: false,
        submitError: true,
        submitPending: false
      })
    );
};

const schema = Yup.object().shape({
  candidate_name: Yup.string()
    .min(2, "Minimum 2 characters")
    .required("Name required"),
  candidate_email: Yup.string()
    .email("Invalid email")
    .required("Email required"),
  phone: Yup.string(),
  file: Yup.mixed()
    .test(
      "fileFormat",
      "Must be PDF, JPG, PNG or DOC",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .required("CV required"),
  message: Yup.string().max(1500, "Maximum 1500 characters"),
  gdpr: Yup.boolean().oneOf([true], "Required")
});

export default job => {
  const [
    { submitPending, submitError, submitSuccess },
    onSubmit
  ] = React.useState({
    submitPending: null,
    submitSuccess: null,
    submitError: null
  });
  console.log("submitPending", submitPending);

  if (submitSuccess) {
    return (
      <OnSuccess
        title="Your application has been submitted"
        message="We'll be in touch shortly"
      />
    );
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        candidate_name: "",
        candidate_email: "",
        file: null,
        phone: "",
        message: "",
        gdpr: false,
        application_email: job.application_email,
        username: job.username,
        password: job.password,
        contact_email: job.contact_email,
        job_reference: job.job_reference,
        job_title: job.job_title
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid
      }) => (
        <FormComponent name="broadbean" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="candidate_name"
            label="Full name"
            placeholder="Enter name"
            errors={errors}
            touched={touched}
            value={values.candidate_name}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="candidate_email"
            label="Email"
            placeholder="Enter email"
            errors={errors}
            touched={touched}
            onChange={handleChange}
            value={values.candidate_email}
          />
          <Input
            type="number"
            name="phone"
            label="Phone"
            placeholder="Enter phone (optional)"
            errors={errors}
            touched={touched}
            value={values.phone}
            onChange={handleChange}
          />
          <TextArea
            type="text"
            name="message"
            label="Message"
            placeholder="Enter message (optional)"
            errors={errors}
            touched={touched}
            value={values.message}
            onChange={handleChange}
          />
          <File
            name="file"
            label="Upload CV"
            errors={errors}
            touched={touched}
            onChange={file => {
              const reader = new FileReader();

              reader.onload = () => {
                setFieldValue("file", {
                  file: reader.result,
                  type: getType(reader.result)
                });
              };

              reader.readAsDataURL(file);
              setFieldTouched("file", true);
            }}
          />

          <Checbox
            name="gdpr"
            label="I consent to Anderson Hoare collecting and storing my data"
            value={values.gdpr}
            onChange={gdpr => {
              setFieldTouched("gdpr", true);
              setFieldValue("gdpr", gdpr);
            }}
          />

          <Submit
            submitPending={submitPending}
            submitSuccess={submitSuccess}
            submitError={submitError}
            disabled={isValid == false || submitPending == true}
          />
        </FormComponent>
      )}
    </Formik>
  );
};
