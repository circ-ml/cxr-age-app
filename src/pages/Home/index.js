import { useState } from "react";
import Loader from "../../components/Loader";
import UploadPage from "./upload";

export default function Home() {
  const [imageURL, setImageURL] = useState("");
  const [stage, setStage] = useState("upload");

  return (
    <div className="p-6 md:p-12">
      {stage === "upload" ? (
        <UploadPage
          imageURL={imageURL}
          setImageURL={setImageURL}
          getResults={() => setStage("loading-results")}
        />
      ) : null}
      {stage === "loading-results" ? <Loader /> : null}
    </div>
  );
}
