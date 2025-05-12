import React from 'react';
import { media, Typography, Center, palette } from '../../style';
import styled, { css } from 'styled-components';
import { HeroFull } from '../../components/Hero';
import Markdown from '../../components/Markdown';
import { HeaderHalf, HeaderEmpty } from '../../components/Header';
import Info from './Info';
import Links from './Links';
import { fetchImageContentful } from '../../utils';

const cssOuter = css`
  /* background: ${palette.grey}; */
  background: ${'white'};
  ${media.mobile`
  > div {
    padding-top: 8rem;
  }`}
`;

export default ({ college }) => {
  const { heroImage, intro, subTitle, colleges } = college;

  return (
    <React.Fragment>
      <HeroFull
        light
        background={palette.primary}
        // spacer={palette.grey}
        spacer={'white'}
        title="Colleges"
        subtitle={subTitle}
        imageSrc={fetchImageContentful(heroImage.file.url, {
          size: 1425,
          quality: 75
        })}
      />
      <Center cssOuter={cssOuter}>
        <HeaderHalf type="light" title="Overview">
          <Typography.Body>{intro}</Typography.Body>
        </HeaderHalf>
        {colleges && colleges.length
          ? colleges.map(({ title, body, subtitle, image }) => (
              <HeaderHalf
                type="light"
                title={title}
                subtitle={subtitle}
                image={image}
              >
                <Markdown source={body} />
              </HeaderHalf>
            ))
          : null}
      </Center>

      <Links />
    </React.Fragment>
  );
};
