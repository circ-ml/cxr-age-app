import Container from "./components/Container";
import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import Results from "./pages/Results";

const exampleCXRId = "61a7454948f62";
const siteCopyrightAuthor = "Massachusetts General Hospital";
const pages = [
  {
    code: "home",
    title: "Home",
    subtitle: "Upload an X-Ray",
    description:
      "Upload a chest x-ray of an individual and get a measure of their biological age.",
    homepage: true,
    content: <Home exampleCXRId={exampleCXRId} />,
  },
  {
    code: "about",
    subtitle: "About",
    description:
      "Learn more about this application and our work with biological age detection.",
    title: "About",
    content: <About />,
  },
  {
    code: "contact",
    subtitle: "Contact",
    description: "Feel free to contact us to learn more about our work!",
    title: "Contact",
    content: (
      <Contact
        contact={{
          email: "vraghu@mgh.harvard.edu",
          phone: "617-726-0287",
          description:
            "We're based in the Cardiovascular Imaging Research Center (CIRC) Lab at Massachusetts General Hospital in Boston, MA. Our group is focused on ML applied to Cardiovascular Diseases.",
        }}
      />
    ),
  },
  {
    code: "results-",
    subtitle: "Results",
    description: "View your Chest X-Ray Age results below.",
    title: "Results",
    hidden: true,
    prefixedHash: true,
    content: <Results exampleCXRId={exampleCXRId} />,
  },
];

function App() {
  const [pageCode, setPageCode] = useState(pages[0].code);
  const setPageHash = (hash) => {
    window.location.hash = hash;
  };
  useEffect(() => {
    const refreshHash = () => {
      const hash = window.location.hash.substr(1);
      const matchingPages = pages.filter(
        (e) => e.code === hash || (e.prefixedHash && hash.startsWith(e.code))
      );
      if (matchingPages.length > 0) {
        setPageCode(matchingPages[0].code);
      } else {
        setPageHash(pageCode);
      }
    };
    refreshHash();
    const reload = () => {
      // Make sure to scroll to the top when page changes
      // window.scrollTo({ top: 0, left: 0 });
      window.location.reload();
    };
    window.addEventListener("hashchange", reload);
    return () => {
      window.removeEventListener("hashchange", reload);
    };
  }, [pageCode]);
  const currentPage = pages.filter((e) => e.code === pageCode)[0];
  const nonHiddenPages = pages.filter((e) => !e.hidden);
  return (
    <div>
      <Helmet>
        <title>
          CXR-Age —{" "}
          {currentPage.homepage
            ? "Detect Biological Age From Chest Imaging"
            : currentPage.subtitle}
        </title>
      </Helmet>
      <Container
        setPage={(pageCode) => setPageHash(pageCode)}
        currentPage={currentPage}
        pages={nonHiddenPages}
        pageContent={currentPage.content}
      />
      <Footer pages={nonHiddenPages} copyrightAuthor={siteCopyrightAuthor} />
    </div>
  );
}

export default App;
