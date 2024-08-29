import styles from "./DashboardLayout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import {
  CubeIcon,
  Square3Stack3DIcon,
  ShareIcon,
  ChartBarIcon,
  AdjustmentsHorizontalIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../../components/Navbar/Navbar.jsx";

function DashboardLayout({ content }) {
  function drawTopNav() {
    return (
      <Navbar activeTab="Algorithms">
        <Navbar.Tabs>
          <Navbar.Tab label="Algorithms" location={"/"} />
          <Navbar.Tab label="About" location={"/about"} />
        </Navbar.Tabs>
      </Navbar>
    );
  }

  function drawSideBar() {
    return (
      <Sidebar>
        <Sidebar.Tabs>
          <Sidebar.ParentTab
            label={"Home"}
            icon={<HomeIcon />}
            dropDown={false}
            location={"/"}
          />
          <Sidebar.ParentTab
            label={"Arrays & Strings"}
            icon={<CubeIcon />}
            dropDown={true}
          >
            <Sidebar.ChildTab
              label="Overview"
              dropDown={false}
              location={"/arrays-and-strings/overview"}
            />
            <Sidebar.ChildTab label="Problems" dropDown={true}>
              <Sidebar.GrandChildTab
                label="uncompress"
                dropDown={false}
                location={"/arrays-and-strings/uncompress"}
              />
              <Sidebar.GrandChildTab
                label="compress"
                dropDown={false}
                location={"/arrays-and-strings/compress"}
              />
              <Sidebar.GrandChildTab
                label="anagrams"
                dropDown={false}
                location={"/arrays-and-strings/anagrams"}
              />
              <Sidebar.GrandChildTab
                label="most frequent char"
                dropDown={false}
                location={"/arrays-and-strings/most-frequent-char"}
              />
              <Sidebar.GrandChildTab
                label="pair sum"
                dropDown={false}
                location={"/arrays-and-strings/pair-sum"}
              />
              <Sidebar.GrandChildTab
                label="pair product"
                dropDown={false}
                location={"/arrays-and-strings/pair-product"}
              />
              <Sidebar.GrandChildTab
                label="intersection"
                dropDown={false}
                location={"/arrays-and-strings/intersection"}
              />
              <Sidebar.GrandChildTab
                label="five sort"
                dropDown={false}
                location={"/arrays-and-strings/five-sort"}
              />
            </Sidebar.ChildTab>
          </Sidebar.ParentTab>
          <Sidebar.ParentTab
            label={"Recursion"}
            icon={<Square3Stack3DIcon />}
            dropDown={true}
          >
            <Sidebar.ChildTab label="Overview" dropDown={false} />
          </Sidebar.ParentTab>
          <Sidebar.ParentTab
            label={"Linked Lists"}
            icon={<AdjustmentsHorizontalIcon />}
            dropDown={true}
          ></Sidebar.ParentTab>
          <Sidebar.ParentTab
            label={"Binary Trees"}
            icon={<ShareIcon />}
            dropDown={true}
          ></Sidebar.ParentTab>
          <Sidebar.ParentTab
            label={"Graphs"}
            icon={<ChartBarIcon />}
            dropDown={true}
          ></Sidebar.ParentTab>
        </Sidebar.Tabs>
      </Sidebar>
    );
  }

  return (
    <div className={styles.container}>
      {drawTopNav()}
      {drawSideBar()}
      <main>{content}</main>
    </div>
  );
}

export default DashboardLayout;
