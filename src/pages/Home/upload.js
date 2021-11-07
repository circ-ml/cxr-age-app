import sampleImage from "./sample-image.png";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Upload from "../../components/Upload";

export default function UploadPage({
  imageURL,
  setImageURL,
  getResults,
  setEmail,
}) {
  return (
    <>
      <div className="rounded-md bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <InformationCircleIcon
              className="h-8 w-8 text-blue-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <div>
              <p className="text-blue-700">
                Before uploading the chest XRay, please ensure that all
                protected health information is removed and the image is
                anonymized. We suggest adding black boxes to the image to remove
                PHI. The model was also trained on images that were similar in
                appearance.
              </p>
              <p className="mt-2 text-blue-700">
                <strong>
                  Patient data and images are not stored on our cloud server or
                  elsewhere.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-6 md:mt-12">
        <div className="flex-1 md:mr-8 flex flex-col justify-between">
          <div className="mb-3">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Get Results Sent To Your Email:
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                onInput={(e) => setEmail(e.target.value)}
                className="shadow-sm px-6 py-4 focus:ring-blue-900 focus:border-blue-900 block w-full border rounded-md text-md"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <Upload onUploadComplete={(url) => setImageURL(url)} />
          <div className="rounded-md bg-gray-100 p-4 mt-3">
            <div className="flex">
              <div>
                <p className="text-gray-700">
                  Click below to calculate the biological age of the patient
                  with the uploaded Chest X-Ray. If you entered your email
                  address, you will receive an email with the results.
                </p>
              </div>
            </div>
          </div>
          <button
            disabled={imageURL.length === 0}
            className={
              "mt-3 w-full inline-flex items-center justify-center px-4 py-3 border border-transparent shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 " +
              (imageURL.length === 0
                ? "text-gray-500 bg-gray-100 cursor-default"
                : "text-white bg-blue-600 hover:bg-blue-700")
            }
            onClick={() => getResults()}
          >
            Get Results &nbsp;&rarr;
          </button>
        </div>
        <div className="flex-1 hidden md:block">
          <p className="text-center font-medium mb-1 text-gray-700">
            Example Chest X-Ray
          </p>
          <img
            className="rounded w-full h-auto"
            src={sampleImage}
            alt="CXR Example"
          />
        </div>
      </div>
    </>
  );
}
