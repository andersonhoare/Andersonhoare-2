import React from "react";
import styled, { css } from "styled-components";
import Video from "../../components/Video";
import { Alternative as MarkdownAlternative } from "../../components/Markdown";
import { Center, palette, media, sizes, Typography } from "../../style";
import { route } from "../../routes";

let stroke_width = "1.5";
// prettier-ignore
let Illustration = () => 
<svg width="206" height="205" viewBox="0 0 206 205" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="83.2115" cy="122.179" r="82.3496" fill="#FDEAE4"/>
    <path d="M77.1971 103.745C65.8994 97.0373 84.8984 85.7201 91.9594 72.0393C93.9012 73.2749 107.404 33.7229 112.921 33.7965L122.219 39.9173C115.158 56.3197 88.4948 110.454 77.1971 103.745Z" fill="white" stroke="white"/>
    <path d="M178.692 103.75C164.783 109.872 150.891 78.3111 147.509 70.6292L133.448 38.6846L161.267 26.4399L175.328 58.3845C178.709 66.0664 192.601 97.6276 178.692 103.75ZM178.692 103.75L190.32 130.167M190.32 130.167L176.41 136.289M190.32 130.167L204.229 124.045" stroke="#1D3B3E" strokeWidth={stroke_width} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M172.201 52.729C172.201 52.729 167.059 59.617 157.862 56.6056C148.665 53.5941 144.419 62.5213 144.419 62.5213" stroke="#1D3B3E" strokeWidth={stroke_width}/>
    <path d="M118.427 23.4046L107.292 12.269" stroke="#1D3B3E" strokeWidth={stroke_width} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M134.849 23.4046L145.984 12.269" stroke="#1D3B3E" strokeWidth={stroke_width} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M126.746 17.8368V1.68457" stroke="#1D3B3E" strokeWidth={stroke_width} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M77.2696 103.75C91.1789 109.872 105.071 78.3111 108.452 70.6292L122.513 38.6846L94.6943 26.4399L80.6335 58.3845C77.2523 66.0664 63.3603 97.6276 77.2696 103.75ZM77.2696 103.75L65.6417 130.167M65.6417 130.167L79.551 136.289M65.6417 130.167L51.7324 124.045" stroke="#1D3B3E" strokeWidth={stroke_width} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M83.7596 52.729C83.7596 52.729 88.902 59.617 98.0989 56.6056C107.296 53.5941 111.542 62.5213 111.542 62.5213" stroke="#1D3B3E" strokeWidth={stroke_width}/>
</svg>

const cssOuter = css`
  background: "white";
`;

const cssInner = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10rem 3rem;
`;

const Graphic = styled.div`
  align-items: center;
  position: relative;
  display: flex;
  justify-content: center;

  svg {
    height: 200px;
    width: auto;
  }
`;

const Content = styled.div`
  /* display: flex; */
`;

const Title = styled.span`
  position: absolute;
  font-family: "Libre Baskerville";
  font-size: 3rem;
  bottom: 31px;
  left: 77px;
`;
const SubTitle = styled.span`
  position: absolute;
  left: 162px;
  bottom: 12px;
  font-weight: 500;
`;

const Heading = styled(Typography.H2)`
  margin-bottom: 1.6rem;
`;

const Link = styled(Typography.Link)`
  padding-bottom: 0;
`;

export default class extends React.Component {
  render() {
    return (
      <Center cssOuter={cssOuter} cssInner={cssInner}>
        <Graphic>
          <Illustration />
          <Title>New Year offer</Title>
          <SubTitle>Sign up for free</SubTitle>
        </Graphic>
        <Content>
          <Heading>5 steps to work</Heading>
          <Typography.Body>
            <Link to={route.yourPotential}>5 Steps To Work</Link> is an online
            course designed to help you understand your personal brand and where
            you potential lies.
            <br />
            <br />
            Arming you with all the tools and resources to make finding,
            interviewing and securing your ideal job more achievable!
          </Typography.Body>
        </Content>
      </Center>
    );
  }
}
