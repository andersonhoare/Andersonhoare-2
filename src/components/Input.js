import React from "react";
import styled, { css, keyframes } from "styled-components";
import { Field } from "formik";
import {
  borderColorPrimary,
  InputCss,
  Typography,
  LinkCss,
  media,
  palette
} from "../style";
import { ButtonPrimary } from "./Button";
import UploadIcon from "../components/icons/Upload";
import TickIcon from "../components/icons/Tick";

const UploadButton = styled.label`
  ${LinkCss};
  > svg {
    padding-top: 0.2rem;
    margin: 0 1rem;
  }
`;

const WrapComponent = styled.div`
  display: ${({ type }) => (type == "hidden" ? "none" : "grid")};
  grid-template-columns: 0.2fr 1fr;
  textarea {
    min-height: 16rem;
  }
  ${media.mobile`
    grid-template-columns: 1fr;
    grid-gap: 0.6rem;
  `};

  ${media.ie`
    width: 100%;
    margin-bottom: 4rem;

    > :first-child {
      width: 20%;
      display: inline-block;
      vertical-align: top;
    }

    > :last-child {
      width: 80%;
      display: inline-block;
    }
    input, textarea {
      width: 100%;
    }
  `}
`;

const CheckboxWrap = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 2rem;
  align-items: center;
  cursor: pointer;
  label {
    cursor: pointer;
  }

  ${media.ie`
  > :first-child {
      margin-right: 2rem;
      margin-left: 18rem;
    }

   > * {
     display: inline-block;
     vertical-align: top;
   }

    `}
`;

const CheckboxComponent = styled.div`
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background: transparent;
  outline: none;
  border: 1px solid ${borderColorPrimary};
  border-radius: 0.4rem;
  display: grid;

  svg {
    width: 3rem;
    height: 3rem;
    top: -0.4rem;
    position: relative;
    right: -0.6rem;
  }
`;

const InputComponent = styled(Field)`
  padding: 1rem;
  background: transparent;
  outline: none;
  border: 1px solid ${borderColorPrimary};
  border-radius: 0.4rem;
  ${InputCss};
  ::-webkit-input-placeholder {
    opacity: 0.4;
  }
  ::-moz-placeholder {
    opacity: 0.4;
  }
`;

const ErrorWrap = styled.div`
  display: grid;
  grid-gap: 0.4rem;
  > div {
    justify-self: end;
  }
`;
const SubmitWrap = styled.div`
  justify-self: end;
  display: grid;
  grid-gap: 0.4rem;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

const ErrorWrapFile = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content;
  > div {
    justify-self: end;
  }
  ${media.mobile`
    grid-template-columns: 1fr;
    margin-top: 2rem;
    grid-gap: 1rem;
  `};
`;

const Label = styled.label``;

const dots = keyframes`
  0% {
    opacity: .2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
`;

const Loader = styled.div`
  div {
    margin-right: 2px;
    display: inline-block;
  }
  span {
    margin-right: 2px;
    animation: ${dots} 1.4s linear infinite;
    animation-fill-mode: both;
  }
  span:nth-child(2) {
    animation-delay: 0.4s;
  }
  span:nth-child(3) {
    animation-delay: 0.8s;
  }
`;

const SubmitButton = styled.button`
  justify-self: flex-end;
  ${({ disabled }) =>
    disabled
      ? css`
          pointer-events: none;
          opacity: 0.4;
          border-color: rgba(0, 0, 0, 0.3);
        `
      : ""};
`;

export const Submit = ({
  submitPending,
  submitSuccess,
  submitError,
  disabled
}) => {
  return (
    <WrapComponent>
      <br />
      <SubmitWrap>
        <div>
          {submitSuccess ? "CV submitted" : null}
          {submitError ? "Error submitting" : null}
          {submitPending ? (
            <Loader>
              <div>Submitting</div>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </Loader>
          ) : null}
        </div>
        <ButtonPrimary as={SubmitButton} disabled={disabled} type="submit">
          Submit
        </ButtonPrimary>
      </SubmitWrap>
    </WrapComponent>
  );
};

export const Checbox = ({
  label,
  type = "checkbox",
  name,
  value,
  onChange,
  Wrap = WrapComponent,
  Input = InputComponent
}) => {
  return (
    <WrapComponent as={WrapComponent}>
      <br />
      <CheckboxWrap onClick={() => onChange(!value)}>
        <CheckboxComponent>
          <Field style={{ display: "none" }} name={name} type="checkbox" />
          {value ? <TickIcon fill={palette.accent} /> : null}
        </CheckboxComponent>
        <Typography.Body as={Label}>{label}</Typography.Body>
      </CheckboxWrap>
    </WrapComponent>
  );
};

export const File = ({
  label,
  type = "file",
  errors,
  touched,
  name,
  value,
  onChange,
  Wrap = WrapComponent,
  Input = InputComponent
}) => {
  const [fileName, setFileName] = React.useState(null);
  return (
    <WrapComponent as={WrapComponent}>
      <Typography.Input as={Label}>{label}</Typography.Input>
      <Field
        style={{ display: "none" }}
        id="file-upload"
        onChange={event => {
          const file = event.currentTarget.files[0];
          setFileName(file.name);
          onChange(file);
        }}
        type={type}
        name={name}
        value={value}
      />
      <ErrorWrapFile>
        <UploadButton for="file-upload" className="custom-file-upload">
          {!fileName ? <UploadIcon fill={palette.accent} /> : null}
          {fileName || "Upload your CV"}
        </UploadButton>
        {errors[name] && touched[name] ? <div>{errors[name]}</div> : " "}
      </ErrorWrapFile>
    </WrapComponent>
  );
};

export const TextArea = ({
  label,
  errors,
  touched,
  type,
  name,
  value,
  onChange,
  placeholder,
  input
}) => (
  <WrapComponent type={type} as={WrapComponent}>
    <Typography.Input as={Label}>{label}</Typography.Input>
    <ErrorWrap>
      <InputComponent
        as="textarea"
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...input}
      />
      {errors[name] ? <div>{errors[name]}</div> : <br />}
    </ErrorWrap>
  </WrapComponent>
);

export default ({
  label,
  errors,
  touched,
  type,
  name,
  value,
  onChange,
  placeholder,
  input
}) => (
  <WrapComponent type={type} as={WrapComponent}>
    <Typography.Input as={Label}>{label}</Typography.Input>
    <ErrorWrap>
      <InputComponent
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...input}
      />
      {errors[name] && touched[name] ? <div>{errors[name]}</div> : <br />}
    </ErrorWrap>
  </WrapComponent>
);
