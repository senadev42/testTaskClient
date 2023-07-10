import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-black">
      <div className="px-4 py-16 mx-auto text-center lg:px-8 lg:py-48 max-w-7xl sm:px-6 sm:py-24">
        <div className="justify-center w-full text-center lg:p-10 max-auto">
          <div className="justify-center w-full mx-auto">
            <p className="text-5xl tracking-tight text-white  lg:text-9xl">
              404
            </p>
            <p className="max-w-xl mx-auto mt-4 text-lg tracking-tight text-gray-400">
              Please check the URL in the address bar and try again.
            </p>
          </div>
          <div className="flex justify-center gap-3 mt-10">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-semibold leading-6 text-white"
            >
              <span> Go back Home </span>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="flex-none w-3 h-3 ml-3 fill-blue-600 group-active:fill-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
