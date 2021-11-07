import { useState } from "react";
import { ExclamationIcon } from "@heroicons/react/solid";
import { MailIcon, PhoneIcon } from "@heroicons/react/outline";

export default function Contact({ contact }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formIsValid = () => {
    const fieldIsValid = (fieldVal) => fieldVal && fieldVal.trim().length > 0;
    for (const field of [firstName, lastName, email, subject, message]) {
      if (!fieldIsValid(field)) {
        return false;
      }
    }
    return true;
  };
  const handleSubmit = () => {
    if (formIsValid()) {
      const data = {
        firstName,
        lastName,
        email,
        phone,
        subject,
        message,
      };

      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      formData.append("form-name", "contact");

      const displayInternalError = () => {
        setError(
          "An internal error occurred; please try again or contact us over email instead."
        );
      };
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .catch(() => displayInternalError())
        .then((res) => res.json())
        .catch(() => {
          // TODO: add error better catching here
        })
        .then(() => {
          setSubmitted(true);
        });
    } else {
      setError("Please fill out all form fields.");
    }
  };

  return (
    <div>
      {error.length > 0 ? (
        <div
          className="fixed z-50 bg-red-500 p-4 shadow-xl rounded-lg overflow-hidden"
          style={{
            bottom: "5vh",
            left: "50%",
            width: "1000px",
            maxWidth: "95%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationIcon
                className="h-8 w-8 text-white"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-lg text-white">{error}</p>
            </div>
          </div>
        </div>
      ) : null}

      <h2 id="contact-heading" className="sr-only">
        Contact us
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Contact information */}
        <div className="relative overflow-hidden py-10 px-6 bg-gradient-to-b from-blue-500 to-blue-600 sm:px-10 xl:p-12">
          {/* Decorative angle backgrounds */}
          <div
            className="absolute inset-0 pointer-events-none sm:hidden"
            aria-hidden="true"
          >
            <svg
              className="absolute inset-0 w-full h-full"
              width={343}
              height={388}
              viewBox="0 0 343 388"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                fill="url(#linear1)"
                fillOpacity=".1"
              />
              <defs>
                <linearGradient
                  id="linear1"
                  x1="254.553"
                  y1="107.554"
                  x2="961.66"
                  y2="814.66"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden"
            aria-hidden="true"
          >
            <svg
              className="absolute inset-0 w-full h-full"
              width={359}
              height={339}
              viewBox="0 0 359 339"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                fill="url(#linear2)"
                fillOpacity=".1"
              />
              <defs>
                <linearGradient
                  id="linear2"
                  x1="192.553"
                  y1="28.553"
                  x2="899.66"
                  y2="735.66"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block"
            aria-hidden="true"
          >
            <svg
              className="absolute inset-0 w-full h-full"
              width={160}
              height={678}
              viewBox="0 0 160 678"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                fill="url(#linear3)"
                fillOpacity=".1"
              />
              <defs>
                <linearGradient
                  id="linear3"
                  x1="192.553"
                  y1="325.553"
                  x2="899.66"
                  y2="1032.66"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white">
            Contact information
          </h3>
          <p className="mt-6 text-base text-blue-50 max-w-3xl">
            {contact.description}
          </p>
          <dl className="mt-8 space-y-6">
            <dt>
              <span className="sr-only">Email</span>
            </dt>
            <dd className="flex text-base text-blue-50">
              <MailIcon
                className="flex-shrink-0 w-6 h-6 text-blue-200"
                aria-hidden="true"
              />
              <span className="ml-3">{contact.email}</span>
            </dd>
          </dl>
        </div>

        {/* Contact form */}
        {submitted ? (
          <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-700 mb-4">
              Thanks for contacting us!
            </h1>
            <p className="text-lg text-gray-500">
              You should hear back from us shortly. Feel free to contact us
              through our email address or phone number as well.
            </p>
            <div className="mt-4">
              <button
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-auto"
                onClick={() => window.location.reload()}
              >
                Contact Us Again
              </button>
            </div>
          </div>
        ) : (
          <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
            <h3 className="text-lg font-medium text-gray-900">
              Send us a message
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    onInput={(e) => setFirstName(e.target.value)}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    onInput={(e) => setLastName(e.target.value)}
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    onInput={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Phone
                  </label>
                  <span id="phone-optional" className="text-sm text-gray-500">
                    Optional
                  </span>
                </div>
                <div className="mt-1">
                  <input
                    onInput={(e) => setPhone(e.target.value)}
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border rounded-md"
                    aria-describedby="phone-optional"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-900"
                >
                  Subject
                </label>
                <div className="mt-1">
                  <input
                    onInput={(e) => setSubject(e.target.value)}
                    type="text"
                    name="subject"
                    id="subject"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Message
                  </label>
                </div>
                <div className="mt-1">
                  <textarea
                    onInput={(e) => setMessage(e.target.value)}
                    id="message"
                    name="message"
                    rows={5}
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border border rounded-md"
                    aria-describedby="message-max"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:flex sm:justify-end">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
