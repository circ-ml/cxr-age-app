import { useState } from "react";
import Loader from "../../components/Loader";
import Results from "../../components/Results";
import UploadPage from "./upload";

const PROCESS_IMAGE_URL = "https://api.cxrage.org/process-image.php";

export default function Home({ exampleCXRId }) {
  const [imageURL, setImageURL] = useState("");
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState("upload");
  const [results, setResults] = useState("upload");

  const getResults = () => {
    const requestBody = {
      image: imageURL,
    };
    if (email.length > 0) {
      requestBody.email = email;
    }
    fetch(PROCESS_IMAGE_URL, {
      method: "POST",
      headers: {},
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setStage("results");
      });
    setStage("loading-results");
  };

  return (
    <div className="p-6 md:p-12">
      {stage === "upload" ? (
        <UploadPage
          imageURL={imageURL}
          setEmail={(email) => setEmail(email)}
          setImageURL={(url) => setImageURL(url)}
          getResults={() => getResults()}
          exampleCXRId={exampleCXRId}
        />
      ) : null}
      {stage === "loading-results" ? <Loader /> : null}
      {stage === "results" ? (
        <Results exampleCXRId={exampleCXRId} data={results} />
      ) : null}
    </div>
  );
}
