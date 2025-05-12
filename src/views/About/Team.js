import React from "react";
import styled from "styled-components";
import { Center, Heading, media, Typography } from "../../style";
import { HeaderFullFlex } from "../../components/Header";
import { fetchImageContentful } from "../../utils";
import Markdown from "../../components/Markdown";

const ImageProfile = styled.img`
  width: 100%;
  object-fit: cover;
  height: 34.5rem;
`;

const Team = styled.ul`
  display: grid;
  grid-gap: 8rem;
  grid-template-columns: repeat(3, 1fr);
  ${media.mobile`
    grid-template-columns: 1fr 1fr;
  `};
  ${media.mobile_small`
    grid-template-columns: 1fr;
  `};
`;

const TeamProfile = styled.li`
  /* display: grid;
  grid-auto-flow: row;
  grid-gap: 2rem; */
`;

const Description = styled.div`
  padding: 2rem 0;
`;

const Info = styled.ul`
  margin-top: 1rem;
  /* padding-left: 1.8rem; */
`;

const InfoItem = styled(Typography.Body)`
  list-style: none;
`;

const Italic = styled.div`
  font-style: italic;
`;

export default ({ team }) => {
  return (
    <Center>
      <HeaderFullFlex title="Meet the leadership team">
        <Team>
          {team && team.length
            ? team.map(({ name, jobTitle, description, image }, key) => (
                <TeamProfile key={key}>
                  <ImageProfile src={fetchImageContentful(image.file.url)} />
                  <Description>
                    <Typography.H4>{name}</Typography.H4>
                    <Italic as={Typography.H4}>{jobTitle}</Italic>
                    {description && description.length ? (
                      <Info>
                        {description.map((x, key) => (
                          <InfoItem as={"li"} key={key}>
                            {x}
                          </InfoItem>
                        ))}
                      </Info>
                    ) : null}
                  </Description>
                </TeamProfile>
              ))
            : null}
        </Team>
      </HeaderFullFlex>
    </Center>
  );
};
