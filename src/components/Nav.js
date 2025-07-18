import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Center, LinkCss, sizes, media, palette } from "../style";
import styled, { css } from "styled-components";
import logo_full from "../assets/logo_full.png";
import logo_private from "../assets/logo_private.png";
import logo_mark from "../assets/logo_mark.svg";
import Menu from "./icons/Menu";
import Cross from "./icons/Cross";
import { route } from "../routes";

const cssOuter = css`
  background: white;
  width: 100%;
  position: fixed;
  z-index: 2;
  box-shadow: -1px 3px 4px 4px #00000005;
  top: 4rem;
  ${media.mobile`
    top: 0rem;
  `};
`;

const cssInner = css`
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  min-height: 8rem;
  height: auto;
  ${media.mobile`
    height: 7rem;    
  `};
`;

const MenuWrap = styled.svg`
  display: none;
  z-index: 10;
  width: 2rem;
  height: 2rem;
  ${media.mobile`
    display: initial;
  `};
`;

const Wrap = styled.ul`
  height: 100%;
  padding-left: 2rem;

  li {
    display: inline-block;
    padding: 2rem;
    padding-bottom: 0;
  }

  li:last-child {
    padding-bottom: 2rem;
  }

  ${media.mobile`
    position: fixed;
    left: 0;
    right: 0;
    top: 7rem;
    bottom: 0;
    background: white;
    grid-auto-flow: row;
    z-index: 1;
    display: ${({ menuActive }) => (menuActive ? "initial" : "none")};
    padding: 3rem;
    li {
      display: block;
    }
  `};
`;

const Item = styled.li`
  color: ${({ isActive }) => (isActive ? palette.accent : palette.primary)};
  font-weight: ${({ isActive }) => (isActive ? "600" : "400")};
  ${({ disabled }) =>
    disabled
      ? css`
          pointer-events: none;
          opacity: 0.5;
        `
      : ""}
`;

const Logo = styled.div`
  background-image: url(${logo_full});
  background-repeat: no-repeat;
  background-size: cover;
  width: 14rem;
  height: 6rem;
  ${media.mobile`
    width: 11rem;
    height: 4.8rem;
  `};
`;

const LogoPrivate = styled.div`
  background-image: url(${logo_private});
  background-repeat: no-repeat;
  background-size: contain;
  width: 14rem;
  height: 5rem;
  ${media.mobile`
    width: 11rem;
    height: 4.8rem;
  `};
`;

const Border = styled.li`
  border-right: 1px solid #dadad8;
  padding: 2rem !important;
  ${media.mobile`
    border-right: none;
    padding: 0;
  `};
`;

const PrivatePA = styled.li`
  height: 100%;
  align-content: center;
  display: grid;
  padding-left: 2rem;
  font-weight: ${({ isActive }) => (isActive ? "600" : "500")} !important;
  ${media.mobile`
    padding: 0;
  `};
`;

const NavSub = styled.div`
  position: relative;
  padding: 0 !important;
  cursor: pointer;
  display: inline-block;
  li {
    display: block !important;
  }
  ${media.mobile`
    display: block;

    > li {
      padding-bottom: 0 !important;
    }

    li:not(:last-of-type) {
      padding-bottom: 0 !important;
    }

  `};
`;

const NavSubMenu = styled.div`
  position: absolute;
  z-index: 1;
  background: white;
  box-shadow: 0px 5px 5px 4px #0000001a;
  top: 50px;

  a {
    white-space: nowrap;
  }
`;

const links = [
  { to: route.about, label: "About us" },
  {
    title: "Clients",
    links: [
      { to: route.clients, label: "Clients" },
      { to: route.services, label: "Our Services" },
      { to: route.yourPotential, label: "Employability Training" },
    ],
  },
  {
    title: "Candidates",
    links: [
      { to: route.candidates, label: "Candidates" },
      { to: route.yourPotential, label: "Free, Online Jobseeker Training" },
      { to: route.roles, label: "Roles" },
    ],
  },
  { to: route.jobs, label: "Jobs" },
  { to: route.colleges, label: "Colleges" },
  { to: route.blog, label: "Blog & Events" },
  { to: route.contact, label: "Contact us", as: Border },
  { to: route.private, label: "Private PA", as: PrivatePA },
];

const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const LinkComponent = ({
  pathname,
  toggleMenu,
  to,
  label,
  disabled,
  rel,
  as,
}) => (
  <Item
    as={as}
    disabled={disabled}
    isActive={`/${pathname.split("/")[1]}` == to}
  >
    <Link to={to} onClick={toggleMenu} rel="canonical">
      {label}
    </Link>
  </Item>
);

const LinkSub = ({
  subMenu,
  setSubMenu,
  pathname,
  toggleMenu,
  title,
  links,
}) => {
  let ref = React.useRef(null);
  let [isOpen, setIsOpen] = React.useState(false);

  useOnClickOutside(ref, (_) => {
    setIsOpen((_) => false);
  });

  let isActive =
    links.map((x) => x.to).includes(`/${pathname.split("/")[1]}`) &&
    title == subMenu;

  return (
    <NavSub>
      <Item isActive={isActive} onClick={(_) => setIsOpen((_) => true)}>
        {title}
      </Item>

      {isOpen ? (
        <NavSubMenu ref={ref}>
          {links.map((link, key) => {
            return (
              <LinkComponent
                key={link.to || link.label || key}
                pathname={pathname}
                toggleMenu={() => {
                  toggleMenu();
                  setSubMenu(title);
                  setIsOpen((_) => false);
                }}
                {...link}
              />
            );
          })}
        </NavSubMenu>
      ) : null}
    </NavSub>
  );
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      menuActive: false,
      subMenu: "",
    };
  }

  toggleMenu = () => {
    this.setState(({ menuActive, ...rest }) => ({
      ...rest,
      menuActive: !menuActive,
    }));
  };

  closeMenu = () => {
    this.setState((rest) => ({
      ...rest,
      menuActive: false,
    }));
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
        <Link to={route.home}>
          {pathname == route.private ? <LogoPrivate /> : <Logo />}
        </Link>
        <Wrap menuActive={this.state.menuActive}>
          {links.map((link, key) => {
            if (link.links) {
              return (
                <LinkSub
                  subMenu={this.state.subMenu}
                  setSubMenu={(subMenu) => {
                    this.setState((props) => ({
                      ...props,
                      subMenu,
                    }));
                  }}
                  key={link.title || key}
                  pathname={pathname}
                  toggleMenu={this.closeMenu}
                  {...link}
                />
              );
            }
            return (
              <LinkComponent
                key={link.to || link.label || key}
                pathname={pathname}
                toggleMenu={this.closeMenu}
                {...link}
              />
            );
          })}
        </Wrap>
        <MenuWrap
          fill={palette.primary}
          onClick={this.toggleMenu}
          menuActive={this.state.menuActive}
          as={this.state.menuActive ? Cross : Menu}
        />
      </Center>
    );
  }
}

export default withRouter(Header);
