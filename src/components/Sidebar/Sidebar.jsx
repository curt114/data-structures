import { createContext, useContext, useRef, useState } from "react";
import styles from "./Sidebar.module.css";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

function Sidebar({ children }) {
  const [parentTab, setParentTab] = useState(null);
  const [childTab, setChildTab] = useState(null);
  const [grandChildTab, setGrandChildTab] = useState(null);
  const currentTabRef = useRef("Home");
  const familyTreeRef = useRef({
    parent: "Home",
    child: null,
    grandChild: null,
  });

  const handleParentTab = (label, dropDown) => {
    /*
      Arguments:
        1. label is the tab name. Ex: "Home"
        2. dropDown indicates if the tab is associated with children tabs. Ex: true or false.
      Code:
        1. If the tab is a dropDown, set state of parentTab to label to view associated children tabs. Close dropDown tab will not make children tabs visible.
        2. If the tab is not a dropDown, set state of parentTab to label. This tab is content a viewer wants to see.
        3. Store the most active parentTab in familyTreeRef and currentTabRef.
        4. Close all children and grandchildren tabs if a parent tab is selected.
    */
    if (dropDown) {
      setParentTab((prevParentTab) => (prevParentTab === label ? null : label));
    } else {
      setParentTab(label);
      familyTreeRef.current = { parent: label, child: null, grandChild: null };
      currentTabRef.current = label;
    }
    setChildTab(null);
    setGrandChildTab(null);
  };

  const handleChildTab = (label, dropDown) => {
    if (dropDown) {
      setChildTab((prevsetChildTab) =>
        prevsetChildTab === label ? null : label
      );
    } else {
      setChildTab(label);
      currentTabRef.current = label;
      familyTreeRef.current = {
        parent: parentTab,
        child: label,
        grandChild: null,
      };
    }
    setGrandChildTab(null);
  };

  const handleGrandChildTab = (label, dropDown) => {
    if (dropDown) {
      setGrandChildTab((prevsetGrandChildTab) =>
        prevsetGrandChildTab === label ? null : label
      );
    } else {
      setGrandChildTab(label);
      currentTabRef.current = label;
      familyTreeRef.current = {
        parent: parentTab,
        child: childTab,
        grandChild: label,
      };
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        parentTab,
        childTab,
        grandChildTab,
        handleParentTab,
        handleChildTab,
        handleGrandChildTab,
        currentTabRef,
        familyTreeRef,
      }}
    >
      <aside className={styles.sidebar}>{children}</aside>
    </SidebarContext.Provider>
  );
}

function Tabs({ children }) {
  return <ul className={styles.sidebar__tabs}>{children}</ul>;
}

function ParentTab({ label, icon, dropDown, location = "/", children }) {
  const { parentTab, handleParentTab, currentTabRef } =
    useContext(SidebarContext);

  const isOpen = parentTab === label;
  const isActive = currentTabRef.current === label;
  const dropDownActive =
    dropDown && isOpen && styles["sidebar__anchor--highlighted"];
  const arrowDirection = isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />;

  return (
    <>
      <li
        className={`${styles.sidebar__tab}
        ${isActive && styles.notDropDownActive}`}
        onClick={() => handleParentTab(label, dropDown)}
      >
        <Link
          to={!dropDown && location}
          className={`${styles.sidebar__anchor} ${dropDownActive}`}
        >
          <div className={styles["sidebar__icon--md"]}>{icon}</div>
          <div className={styles.sidebar__title}>
            <p>{label}</p>
          </div>
          <div className={styles["sidebar__icon--sm"]}>
            {dropDown && arrowDirection}
          </div>
        </Link>
      </li>
      {isOpen && children && (
        <ul className={styles.sidebar__tabs}>{children}</ul>
      )}
    </>
  );
}

function ChildTab({ label, dropDown, location = "/", children }) {
  const { parentTab, childTab, handleChildTab, familyTreeRef, currentTabRef } =
    useContext(SidebarContext);
  const isOpen = childTab === label;
  const parentActive = parentTab === familyTreeRef.current.parent;
  const currentTabActive = currentTabRef.current === label;
  const isActive = parentActive && currentTabActive;
  const dropDownActive =
    dropDown && isOpen && styles["sidebar__anchor--highlighted"];
  const arrowDirection = isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />;

  return (
    <>
      <li
        className={`${styles.sidebar__tab}
        ${isActive && styles.notDropDownActive}`}
        onClick={() => handleChildTab(label, dropDown)}
      >
        <Link
          className={`${styles.sidebar__anchor} ${dropDownActive}`}
          to={!dropDown && location}
        >
          <div className={styles["sidebar__icon--md"]}></div>
          <div className={styles.sidebar__title}>
            <p>{label}</p>
          </div>
          <div className={styles["sidebar__icon--sm"]}>
            {dropDown && arrowDirection}
          </div>
        </Link>
      </li>
      {isOpen && children && (
        <ul className={styles.sidebar__tabs}>{children}</ul>
      )}
    </>
  );
}

function GrandChildTab({ label, dropDown, location }) {
  const {
    parentTab,
    childTab,
    handleGrandChildTab,
    familyTreeRef,
    currentTabRef,
  } = useContext(SidebarContext);

  const parentActive = parentTab === familyTreeRef.current.parent;
  const childActive = childTab === familyTreeRef.current.child;
  const grandChildActive = currentTabRef.current === label;
  const isActive = parentActive && childActive && grandChildActive;

  return (
    <li
      className={`${styles.sidebar__tab}
    ${isActive && styles.notDropDownActive}`}
      onClick={() => handleGrandChildTab(label, dropDown)}
    >
      <Link className={styles.sidebar__anchor} to={!dropDown && location}>
        <div className={styles["sidebar__icon--md"]}></div>
        <div className={styles.sidebar__title}>
          <p>{label}</p>
        </div>
        <div className={styles["sidebar__icon--sm"]}></div>
      </Link>
    </li>
  );
}

Sidebar.Tabs = Tabs;
Sidebar.ParentTab = ParentTab;
Sidebar.ChildTab = ChildTab;
Sidebar.GrandChildTab = GrandChildTab;

export default Sidebar;
