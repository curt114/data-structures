import { createContext } from "react";

const NavbarContext = createContext();

function Navbar(props) {
  return (
    <div style={props.navStyles}>
      <NavbarContext.Provider value={{ test: "testing parameter" }}>
        {props.children}
      </NavbarContext.Provider>
    </div>
  );
}

function Logo({ children }) {
  return <div>Logo</div>;
}

function Accounts({ children }) {
  return <div>Accounts</div>;
}

function Links({ children }) {
  return <div>Links</div>;
}

Navbar.Logo = Logo;
Navbar.Accounts = Accounts;
Navbar.Links = Links;

export default Navbar;
