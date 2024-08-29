import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard/DashboardLayout.jsx";
import ArrayOverview from "./pages/arrays/overview/Overview.jsx";
import Uncompress from "./pages/arrays/uncompress/Uncompress.jsx";
import Compress from "./pages/arrays/compress/Compress.jsx";
import Anagrams from "./pages/arrays/anagrams/Anagrams.jsx";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import MostFrequentChar from "./pages/arrays/MostFrequentChar/MostFrequentChar.jsx";
import PairSum from "./pages/arrays/PairSum/PairSum.jsx";
import PairProduct from "./pages/arrays/PairProduct/PairProduct.jsx";
import Intersection from "./pages/arrays/Intersection/Intersection.jsx";
import FiveSort from "./pages/arrays/FiveSort/FiveSort.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout content={<Home />} />} />
        <Route
          path="/arrays-and-strings/overview"
          element={<DashboardLayout content={<ArrayOverview />} />}
        />
        <Route
          path="/arrays-and-strings/uncompress"
          element={<DashboardLayout content={<Uncompress />} />}
        />
        <Route
          path="/arrays-and-strings/compress"
          element={<DashboardLayout content={<Compress />} />}
        />
        <Route
          path="/arrays-and-strings/anagrams"
          element={<DashboardLayout content={<Anagrams />} />}
        />
        <Route
          path="/arrays-and-strings/most-frequent-char"
          element={<DashboardLayout content={<MostFrequentChar />} />}
        />
        <Route
          path="/arrays-and-strings/pair-sum"
          element={<DashboardLayout content={<PairSum />} />}
        />
        <Route
          path="/arrays-and-strings/pair-product"
          element={<DashboardLayout content={<PairProduct />} />}
        />
        <Route
          path="/arrays-and-strings/intersection"
          element={<DashboardLayout content={<Intersection />} />}
        />
        <Route
          path="/arrays-and-strings/five-sort"
          element={<DashboardLayout content={<FiveSort />} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
