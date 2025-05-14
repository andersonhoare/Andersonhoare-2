import React from "react";
import {
  Dot,
  Typography,
  borderColorSecondary,
  borderColorPrimary,
  palette,
  media,
} from "../style";
import styled, { css } from "styled-components";
import { fetchImageContentful } from "../utils";

const getBorderColor = (type) => {
  switch (type) {
    case "dark":
      return borderColorSecondary;
    case "none":
      return "transparent";
    default:
      return borderColorPrimary;
  }
};

const getTextColor = (type) => {
  switch (type) {
    case "dark":
      return palette.secondary;
    default:
      return palette.primary;
  }
};

const HeaderWrap = styled.div`
  border-bottom: 0.1rem solid ${({ borderColor }) => borderColor};
  display: grid;
  /* grid-gap: 2rem; */
  padding-bottom: 8rem;
  padding-top: 1rem;
  ${media.mobile`
    padding-bottom: 4rem;
  `};

  &:last-of-type {
    border-bottom: none;
  }
`;

const HeaderTitle = styled.h2`
  margin-top: 2rem;
  color: ${({ textColor }) => textColor};
  padding-right: 8rem;
`;

const HeaderContent = styled.div`
  padding-top: 2rem;
  display: grid;
`;

const HeaderFullWrap = styled(HeaderWrap)``;

const HeaderHalfWrap = styled(HeaderWrap)`
  grid-template-columns: 2fr 3fr;
  padding-top: 2rem;

  ${media.mobile`
    padding-top: 1rem;
    grid-template-columns: 1fr;
  `};
`;

const HeaderEmptyWrap = styled(HeaderWrap)`
  grid-template-columns: 3fr 1fr;
  ${media.mobile`
    grid-template-columns: 1fr;
  `};
`;

const HeaderLeft = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 2rem;
`;

const Image = styled.img`
  width: 12rem;
  object-fit: cover;
`;

export const HeaderFull = ({ title, type, children }) => {
  const borderColor = getBorderColor(type);
  const textColor = getTextColor(type);
  return (
    <HeaderFullWrap borderColor={borderColor}>
      <Typography.H2 textColor={textColor} as={HeaderTitle}>
        {title}
      </Typography.H2>
      <Dot />
      <HeaderContent>{children}</HeaderContent>
    </HeaderFullWrap>
  );
};

export const HeaderHalf = ({ title, image, subtitle, children, type }) => {
  const borderColor = getBorderColor(type);
  const textColor = getTextColor(type);
  return (
    <HeaderHalfWrap borderColor={borderColor}>
      <HeaderLeft>
        <div>
          <Typography.H2 textColor={textColor} as={HeaderTitle}>
            {title}
          </Typography.H2>
          {subtitle ? (
            <Typography.H4 textColor={textColor}>{subtitle}</Typography.H4>
          ) : null}
        </div>
        <Dot />
        {image ? (
          <Image
            src={fetchImageContentful(image.file.url, {
              size: 1425,
              quality: 75,
            })}
          />
        ) : null}
      </HeaderLeft>
      <HeaderContent>{children}</HeaderContent>
    </HeaderHalfWrap>
  );
};

export const HeaderEmpty = ({ children, type }) => {
  const borderColor = getBorderColor(type);
  return (
    <HeaderEmptyWrap borderColor={borderColor}>
      <HeaderContent>{children}</HeaderContent>
    </HeaderEmptyWrap>
  );
};

const HeaderFullWrapFlex = styled.div`
  border-bottom: 0.1rem solid ${({ borderColor }) => borderColor};
  display: flex;
  flex-direction: column;
  align-items: center;
text-align: center;
  padding-bottom: 6rem;
  padding-top: 1rem;

  > h2,
  > span {
    margin-bottom: 2rem;
    
  }
`;

const HeaderContentFlex = styled.div`
  padding-top: 3rem;
`;

export const HeaderFullFlex = ({ title, type, children }) => {
  const borderColor = getBorderColor(type);
  const textColor = getTextColor(type);
  return (
    <HeaderFullWrapFlex borderColor={borderColor}>
      <Typography.H2 textColor={textColor} as={HeaderTitle}>
        {title}
      </Typography.H2>
      <Dot />
      <HeaderContentFlex>{children}</HeaderContentFlex>
    </HeaderFullWrapFlex>
  );
};
