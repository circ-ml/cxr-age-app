import { XCircleIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import ResultsComponent from "../../components/Results";

const makeResultsURL = (requestId) =>
  `https://api.cxrage.org/results/${requestId}.json`;

export default function Results({ exampleCXRId }) {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const requestId = window.location.hash.split("results-")[1];
    const resultsRequestURL = makeResultsURL(requestId);
    fetch(resultsRequestURL)
      .catch(() => ({
        json: () => ({ isError: true }),
      }))
      .then((res) => res.json())
      .catch(() => ({ isError: true }))
      .then((data) => setResults(data));
  }, [setResults]);

  return (
    <div className="p-6 md:p-12">
      {results === null ? (
        <Loader />
      ) : results.isError ? (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-8 w-8 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">
                Invalid results link.
              </h3>
              <div className="mt-2 text-md text-red-700">
                <p>
                  Please check your URL and retry. Your results may have also
                  been deleted if you have viewed them before.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ResultsComponent exampleCXRId={exampleCXRId} data={results} />
      )}
    </div>
  );
}
