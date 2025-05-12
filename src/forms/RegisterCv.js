import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import axios from "axios";
import Input, { TextArea, File, Checbox, Submit } from "../components/Input";
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
  "image/png",
  "image/jpg",
  "image/jpeg",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const handleSubmit = onSubmit => ({
  name,
  email,
  file,
  phone,
  gdpr,
  message
}) => {
  const data = new FormData();
  data.append("form-name", "registerCv");
  data.append("name", name);
  data.append("email", email);
  data.append("phone", phone);
  data.append("message", message);
  data.append("gdpr", String(gdpr));
  data.append("file", file, file.name);
  onSubmit({ submitPending: true, submitSuccess: false, submitError: false });
  axios({
    url: "/",
    method: "POST",
    data,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  })
    .then(() =>
      onSubmit({
        submitPending: false,
        submitSuccess: true,
        submitError: false
      })
    )
    .catch(error =>
      onSubmit({
        submitPending: false,
        submitSuccess: false,
        submitError: true
      })
    );
};

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 characters")
    .required("Name required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email required"),
  phone: Yup.string(),
  file: Yup.mixed()
    .required("CV required")
    .test(
      "fileSize",
      "Max file size 2mb",
      value => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Must be PDF, JPG, PNG or DOC",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  message: Yup.string().max(1500, "Maximum 1500 characters"),
  gdpr: Yup.boolean().oneOf([true], "Required")
});

export default () => {
  const [
    { submitPending, submitError, submitSuccess },
    onSubmit
  ] = React.useState({
    submitPending: null,
    submitSuccess: null,
    submitError: null
  });

  if (submitSuccess) {
    return (
      <OnSuccess
        title="Your CV has been submitted"
        message="We'll be in touch shortly"
      />
    );
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        name: "",
        email: "",
        phone: "",
        file: null,
        message: "",
        gdpr: false
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
        <FormComponent
          name="registerCv"
          netlify="true"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            name="name"
            label="Full name"
            placeholder="Enter name"
            errors={errors}
            touched={touched}
            value={values.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="email"
            label="Email"
            placeholder="Enter email"
            errors={errors}
            touched={touched}
            value={values.email}
            onChange={handleChange}
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
              setFieldTouched("file", true);
              setFieldValue("file", file);
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
