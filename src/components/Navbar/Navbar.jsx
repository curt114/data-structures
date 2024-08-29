import { createContext, useContext } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const NavbarContext = createContext();

function Navbar({ activeTab, children }) {
  return (
    <nav className={styles.navbar}>
      <NavbarContext.Provider value={{ activeTab }}>
        {children}
      </NavbarContext.Provider>
    </nav>
  );
}

function Tabs({ children }) {
  return <ul className={styles.navTabs}>{children}</ul>;
}

function Tab({ label, location }) {
  const { activeTab } = useContext(NavbarContext);
  return (
    <li>
      <Link
        to={location}
        className={` ${styles.navTab} ${
          activeTab === label ? styles.navTabActive : styles.navTabNotActive
        }`}
      >
        {label}{" "}
      </Link>
    </li>
  );
}

Navbar.Tabs = Tabs;
Navbar.Tab = Tab;

export default Navbar;
