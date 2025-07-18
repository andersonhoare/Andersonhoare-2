import React from "react";
import styled from "styled-components";
import { Field, ErrorMessage } from "formik";

const sharedStyles = `
  padding: 1rem;
  background: transparent;
  outline: none;
  border: 1px solid rgba(29, 59, 62, 0.2);
  border-radius: 0.4rem;
  font-family: Montserrat;
  font-size: 21px;
  font-weight: 500;
  font-style: normal;
  line-height: 1.48;
  letter-spacing: 0.5px;
  color: rgb(29, 59, 62);
  width: 100%;

  &::placeholder {
    color: rgba(29, 59, 62, 0.5); /* ← your desired placeholder color */
    font-weight: 400;
  }
`;

const Wrap = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled(Field)`
  ${sharedStyles}
`;

const StyledTextArea = styled(Field)`
  ${sharedStyles}
  min-height: 16rem;
  resize: vertical;
`;

const StyledCheckbox = styled(Field)`
  margin-right: 0.5rem;
  width: 20px;
  height: 20px;
`;

const StyledFileInput = styled.input`
  ${sharedStyles}
  padding: 0.75rem;
`;

const ErrorText = styled.div`
  color: rgb(29, 59, 62);
  font-size: 16px;
  font-weight: 400;
  margin-top: 0.5rem;
  flex: 1;
  text-align: right;
  width: 100%;
`;

const Submit = styled.button`
  justify-self: end;
  display: grid;
  gap: 0.4rem;
  align-items: center;
  text-align: center;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  border-radius: 4rem;
  padding: 1.5rem 4rem;
  font-family: Montserrat;
  font-size: 1.6rem;
  color: rgb(29, 59, 62);
  background-color: transparent;
  border: 2px solid
    ${({ disabled }) =>
      disabled ? "rgba(29, 59, 62, 0.3)" : "rgba(29, 59, 62, 0.6)"};
  transition: border-color 0.3s ease, transform 0.2s ease;

  &:hover {
    border-color: ${({ disabled }) =>
      disabled ? "rgba(29, 59, 62, 0.3)" : "rgba(255, 128, 0, 1)"};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.02)")};
  }

  &:active {
    border-color: ${({ disabled }) =>
      disabled ? "rgba(29, 59, 62, 0.3)" : "rgba(255, 128, 0, 1)"};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(0.98)")};
  }
`;


export const TextArea = ({ name, label, ...props }) => (
  <Wrap>
    {label && <Label htmlFor={name}>{label}</Label>}
    <StyledTextArea as="textarea" id={name} name={name} {...props} />
    <ErrorMessage name={name} component={ErrorText} />
  </Wrap>
);

export const Checbox = ({ name, label, ...props }) => (
  <Wrap>
    <Label>
      <StyledCheckbox type="checkbox" name={name} {...props} />
      {label}
    </Label>
    <ErrorMessage name={name} component={ErrorText} />
  </Wrap>
);

export const File = ({ name, label, ...props }) => (
  <Wrap>
    {label && <Label htmlFor={name}>{label}</Label>}
    <Field name={name}>
      {({ form }) => (
        <StyledFileInput
          type="file"
          id={name}
          onChange={(event) =>
            form.setFieldValue(name, event.currentTarget.files[0])
          }
          {...props}
        />
      )}
    </Field>
    <ErrorMessage name={name} component={ErrorText} />
  </Wrap>
);

const Input = ({ name, label, type = "text", ...props }) => (
  <Wrap>
    {label && <Label htmlFor={name}>{label}</Label>}
    <StyledInput type={type} id={name} name={name} {...props} />
    <ErrorMessage name={name} component={ErrorText} />
  </Wrap>
);

export default Input;
export { Submit };
