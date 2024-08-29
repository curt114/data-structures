import Navbar from "../../components/Navbar/Navbar";

function About() {
  return (
    <div>
      {" "}
      <Navbar activeTab="About">
        <Navbar.Tabs>
          <Navbar.Tab label="Algorithms" location={"/"} />
          <Navbar.Tab label="About" location={"/about"} />
        </Navbar.Tabs>
      </Navbar>
      <div>About Page</div>
    </div>
  );
}

export default About;
