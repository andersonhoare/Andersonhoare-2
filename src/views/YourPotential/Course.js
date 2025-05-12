import React from "react";
import { Center, palette, Typography, media } from "../../style";
import { route } from "../../routes";
import { fetchImageContentful } from "../../utils";
import styled, { css } from "styled-components";
import Markdown from "../../components/Markdown";

const cssOuter = css`
  background: ${palette.primary};
  padding: 6rem 0 12rem 0;
`;

const cssInner = css`
  text-align: center;
  display: grid;
  grid-gap: 4rem;
  width: 50%;
  ${media.mobile`
  width: 100%;
  `};
`;

const Input = styled.input`
  font-family: "Montserrat";
  height: 5rem;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1rem 2rem;
  background: ${palette.primary};
  color: ${palette.secondary};
  outline: none;
  border: none;
`;

const Submit = styled.button`
  font-family: "Montserrat";
  height: 5rem;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1rem 2rem;
  background: ${palette.accent};
  outline: none;
  border: none;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  height: 50rem;
  ${media.mobile`
    height: 20rem;
  `};
`;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  width: 50%;

  img {
    height: 25rem;
    border-radius: 5rem;
    opacity: ${({ isLocked }) => (isLocked ? "0.5" : "1")};
  }
  a {
    pointer-events: ${({ isLocked }) => (isLocked ? "none" : "initial")};
  }
  ${media.mobile`
  width: 100%;
  `};
`;

const Unlock = styled.div`
  position: absolute;
  z-index: 1;
`;

const MD = styled.div`
  p {
    text-align: center;
    color: ${palette.secondary} !important;
  }

  a:not(:hover) {
    color: ${palette.secondary} !important;
  }
`;

export default ({ unlockCode, courseInfo, courseImage }) => {
  let [value, setValue] = React.useState("");
  let [isLocked, setIslocked] = React.useState(true);

  return (
    <Center cssOuter={cssOuter} cssInner={cssInner}>
      <Typography.H2 light>5 Steps To Work</Typography.H2>
      <Container isLocked={isLocked}>
        <Unlock>
          {isLocked ? (
            <React.Fragment>
              <Input
                placeholder="Enter code"
                value={value}
                onChange={(e) => {
                  let value = e.target.value;
                  setValue((_) => value);
                }}
              />
              <Submit
                onClick={(_) => {
                  if (unlockCode.toLowerCase() == value.toLowerCase()) {
                    setIslocked((_) => false);
                  } else {
                    setValue((_) => "");
                  }
                }}
              >
                Enter
              </Submit>
            </React.Fragment>
          ) : (
            <a href={"https://anderson-hoare.thinkific.com/"} target="_blank">
              <Submit>View course</Submit>
            </a>
          )}
        </Unlock>
        <Image
          src={fetchImageContentful(courseImage.file.url, {
            size: 1425,
            quality: 75,
          })}
        />
      </Container>
      <Markdown as={MD} source={courseInfo} />
    </Center>
  );
};
