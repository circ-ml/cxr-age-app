import Container from "./components/Container";
import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";

const siteCopyrightAuthor = "Massachusetts General Hospital";
const authors = ["Gabriel Romualdo", "Yanru Chen", "Dr. Vineet Raghu"];
const pages = [
  {
    code: "home",
    title: "Home",
    subtitle: "Upload an X-Ray",
    description:
      "Upload a chest x-ray of an individual and get a measure of their biological age.",
    homepage: true,
    content: <Home />,
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
];

function App() {
  const [pageCode, setPageCode] = useState(pages[0].code);
  const setPageHash = (hash) => {
    window.location.hash = hash;
  };
  useEffect(() => {
    const refreshHash = () => {
      window.scrollTo({ top: 0 });
      const hash = window.location.hash.substr(1);
      if (pages.map((e) => e.code).includes(hash)) {
        setPageCode(hash);
      } else {
        setPageHash(pageCode);
      }
    };
    refreshHash();
    window.addEventListener("hashchange", refreshHash);
    return () => {
      window.removeEventListener("hashchange", refreshHash);
    };
  }, [pageCode]);
  const currentPage = pages.filter((e) => e.code === pageCode)[0];
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          CXR-Age —{" "}
          {currentPage.homepage
            ? "Detect Biological Age From Chest Imaging"
            : currentPage.subtitle}
        </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Container
        setPage={(pageCode) => setPageHash(pageCode)}
        currentPage={currentPage}
        pages={pages}
        pageContent={currentPage.content}
      />
      <Footer
        pages={pages}
        copyrightAuthor={siteCopyrightAuthor}
        authors={authors}
      />
    </div>
  );
}

export default App;
