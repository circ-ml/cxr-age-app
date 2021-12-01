import { DownloadIcon } from "@heroicons/react/solid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  ClipboardCopyIcon,
  ClipboardCheckIcon,
  CloudUploadIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import React from "react";

const DELETE_RESULT_URL = "https://api.cxrage.org/remove-result.php";

export default function Results({ data, exampleCXRId }) {
  const [copied, setCopied] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);

  const isExampleCXR = exampleCXRId === data.requestID;

  const deleteResults = () => {
    fetch(`${DELETE_RESULT_URL}?request_id=${data.requestID}`, {
      method: "GET",
      headers: {},
    }).then(() => setDeleted(true));
  };

  const resultsURL = new URL("#results-" + data.requestID, window.location.href)
    .href;

  const downloadImage = (imageURL, downloadFilename) => {
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = downloadFilename;
    link.click();
  };

  const predictedBiologicalAge = data.csv
    .split("\n")[1]
    .split(",")[2]
    .split(" ")[0];
  const titleClasses =
    "py-2 text-2xl mb-1 lg:mb-4 text-center rounded-lg text-gray-800";
  const imageClasses = "w-full h-auto rounded";
  const columnClasses = "flex-1 flex flex-col justify-between";
  const buttonClasses =
    "justify-center w-full inline-flex items-center px-2.5 py-2 border border-gray-300 shadow-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ";
  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-8 lg:space-y-0">
      <div className={columnClasses}>
        <h2 className={titleClasses}>Predicted Biological Age</h2>
        <div
          className="py-12 mb-4 bg-blue-100 mx-auto rounded flex flex-col justify-center items-center"
          style={{
            width: "85%",
            aspectRatio: 1,
          }}
        >
          <h1 className="mt-2 mb-1 text-6xl text-blue-700 font-bold">
            {predictedBiologicalAge}
          </h1>
          <p className="uppercase text-xl text-blue-600 font-light tracking-widest">
            Years
          </p>
        </div>
        <div>
          {deleted ? null : (
            <CopyToClipboard
              text={resultsURL}
              onCopy={(e) => {
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 1000);
              }}
            >
              <button type="button" className={buttonClasses}>
                {copied ? (
                  <ClipboardCheckIcon
                    className="mr-3 -ml-1 h-5 w-5"
                    aria-hidden="true"
                  />
                ) : (
                  <ClipboardCopyIcon
                    className="mr-3 -ml-1 h-5 w-5"
                    aria-hidden="true"
                  />
                )}
                {copied ? "Copied!" : "Copy Link To Results"}
              </button>
            </CopyToClipboard>
          )}
          <button
            type="button"
            className={buttonClasses + "mt-3"}
            onClick={() => window.open("./", "_self")}
          >
            <CloudUploadIcon
              className="mr-3 -ml-1 h-5 w-5"
              aria-hidden="true"
            />
            Upload Another Chest X-Ray
          </button>
          {isExampleCXR ? null : (
            <button
              type="button"
              className={buttonClasses + "mt-3"}
              onClick={() => deleteResults()}
              disabled={deleted}
              style={
                deleted ? { pointerEvents: "none", touchAction: "none" } : {}
              }
            >
              <TrashIcon className="mr-3 -ml-1 h-5 w-5" aria-hidden="true" />
              {deleted ? "Results Deleted" : "Delete Results From Our Servers"}
            </button>
          )}
        </div>
      </div>
      <div className={columnClasses}>
        <h2 className={titleClasses}>Saliency Map</h2>
        <img
          className={imageClasses}
          src={data.saliencyMap}
          alt="Saliency Map"
        />
        <button
          type="button"
          className={buttonClasses + "mt-6"}
          onClick={() => downloadImage(data.saliencyMap, "saliency-map.png")}
        >
          <DownloadIcon className="mr-3 -ml-1 h-5 w-5" aria-hidden="true" />
          Download Saliency Map
        </button>
      </div>
      <div className={columnClasses}>
        <h2 className={titleClasses}>Original Chest X-Ray</h2>
        <img
          className={imageClasses}
          src={data.originalImage}
          alt="Original Chest X-Ray"
        />
        <button
          type="button"
          className={buttonClasses + "mt-6"}
          onClick={() => downloadImage(data.originalImage, "original-cxr.png")}
        >
          <DownloadIcon className="mr-3 -ml-1 h-5 w-5" aria-hidden="true" />
          Download Original Chest X-Ray
        </button>
      </div>
    </div>
  );
}
