import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Input, { Submit, Checbox, TextArea } from "../components/Input";
import OnSuccess from "./OnSuccess";
import axios from "axios";

const Container = styled.div`
  padding: 5rem 2rem;
`;

const UploadButton = styled.label`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  cursor: pointer;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: rgb(29, 59, 62);
  border-bottom: 2px solid rgb(255, 179, 102);
  padding-bottom: 0.3rem;
  width: fit-content;

  span:hover {
    color: rgb(255, 179, 102);
  }
`;

const UploadIcon = styled.div`
  color: rgb(255, 179, 102);
  font-size: 30px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Label = styled.label`
  width: 14rem;
  font-weight: 500;
  font-size: 21px;
  color: rgb(29, 59, 62);
  padding-top: 0.5rem;
`;

const FieldWrap = styled.div`
  flex: 1;
`;

const LargeCheckbox = styled.div`
  input[type="checkbox"] {
    width: 3rem;
    height: 3rem;
    border: 1px solid rgba(29, 59, 62, 0.2);
    accent-color: rgba(255, 128, 0, 1);
  }
`;

const UploadRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const FileName = styled.div`
  font-family: Montserrat;
  font-size: 14px;
  color: rgb(29, 59, 62);
`;

const FileError = styled.div`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  color: red;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;

const validationSchema = Yup.object({
  name: Yup.string().required("Name Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  file: Yup.mixed()
    .required("Required")
    .test(
      "fileType",
      "Must be PDF, JPG, PNG or DOC",
      (value) =>
        value &&
        ["application/pdf", "image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(
          value.type
        )
    ),
  consent: Yup.bool().oneOf([true], "Consent is required"),
});

export default function ApplyForJob() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    return () => { isMounted = false; };
  }, []);

  async function handleSubmit(values, { resetForm }) {
    setError(null);
    let isMounted = true;
    try {
      // Read file as base64
      const file = values.file;
      const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };
      const fileBase64 = await getBase64(file);
      // Prepare payload for lambda
      const payload = {
        candidate_name: values.name,
        candidate_email: values.email,
        phone: values.phone,
        message: values.message,
        file: {
          file: fileBase64,
          type: file.name.split('.').pop() || 'pdf',
        },
        application_email: process.env.REACT_APP_APPLICATION_EMAIL || "info@andersonhoare.co.uk"
      };
      // Call Netlify lambda function
      await axios.post("/.netlify/functions/applyJob", payload);
      if (isMounted) {
        setSubmitted(true);
        resetForm();
      }
    } catch (err) {
      if (isMounted) {
        setError("There was a problem submitting your application. Please try again.");
      }
      console.error(err);
    }
  }

  return (
    <Container>
      {submitted ? (
        <OnSuccess />
      ) : (
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            message: "",
            file: null,
            consent: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, isValid, dirty }) => (
            <Form>
              <FormRow>
                <Label htmlFor="name">Full name</Label>
                <FieldWrap>
                  <Input name="name" placeholder="Enter name" />
                </FieldWrap>
              </FormRow>

              <FormRow>
                <Label htmlFor="email">Email</Label>
                <FieldWrap>
                  <Input name="email" type="email" placeholder="Enter Email" />
                </FieldWrap>
              </FormRow>

              <FormRow>
                <Label htmlFor="phone">Phone</Label>
                <FieldWrap>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Enter phone (optional)"
                  />
                </FieldWrap>
              </FormRow>

              <FormRow>
                <Label htmlFor="message">Message</Label>
                <FieldWrap>
                  <TextArea
                    name="message"
                    placeholder="Enter message (optional)"
                  />
                </FieldWrap>
              </FormRow>

              <FormRow>
                <Label htmlFor="file">Upload CV</Label>
                <FieldWrap>
                  <UploadRow>
                    <UploadButton htmlFor="file">
                      <UploadIcon>↑</UploadIcon>
                      <span>Upload your CV</span>
                    </UploadButton>
                    <HiddenFileInput
                      id="file"
                      name="file"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        setFieldValue("file", file);
                      }}
                    />
                    {values.file && <FileName>{values.file.name}</FileName>}
                  </UploadRow>
                  <ErrorMessage name="file" component={FileError} />
                </FieldWrap>
              </FormRow>

              <FormRow>
                <Label />
                <CheckboxRow>
                  <LargeCheckbox>
                    <Checbox name="consent" />
                  </LargeCheckbox>
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      fontWeight: 300,
                      fontStyle: "normal",
                      fontStretch: "normal",
                      lineHeight: 1.6,
                      letterSpacing: "normal",
                      color: "rgb(29, 59, 62)",
                      marginLeft: "10px",
                    }}
                  >
                    I consent to Anderson Hoare collecting and storing my data
                  </span>
                </CheckboxRow>
              </FormRow>

              <FormRow>
                <Label />
                <FieldWrap>
                  <Submit type="submit" disabled={!(isValid && dirty)}>
                    Submit
                  </Submit>
                </FieldWrap>
              </FormRow>
              {error && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
              )}
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
}
