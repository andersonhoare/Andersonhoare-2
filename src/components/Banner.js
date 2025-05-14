import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Center, sizes, media, palette } from "../style";
import styled, { css } from "styled-components";

import { route } from "../routes";

const cssOuter = css`
  background: ${palette.primary};
  color: ${palette.secondary};
  width: 100%;
  position: fixed;
  z-index: 2;

  * > :not(:last-child) {
    margin-right: 0.6rem;
  }
`;

const cssInner = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;

  height: 4rem;
  /* ${media.mobile`
    height: 7rem;    
  `}; */
`;

const Banner = styled.div`
  /* width: 100%; */

  /* height: 2rem; */
  position: fixed;
`;

const StyledLink = styled(Link)`
  /* border-bottom: 1px solid currentColor; */
  font-weight: 600;
`;

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      menuActive: false,
    };
  }

  toggleMenu = () => {
    this.setState(({ menuActive }) => ({
      menuActive: !menuActive,
    }));
  };

  closeMenu = () => {
    this.setState({
      menuActive: false,
    });
  };

  render() {
    const {
      location: { pathname },
    } = this.props;

    return (
      <Center
        cssOuter={cssOuter}
        cssInner={cssInner}
        maxWidth={sizes.desktop_xl}
        tagOuter="header"
      >
        {/* <span>
          Unlock your career potential with our free online course for
          jobseekers – 5 Steps To Work
        </span> */}
        {/* <StyledLink to={"/your-potential"}>{""}</StyledLink> */}
      </Center>
    );
  }
}

export default withRouter(Header);
