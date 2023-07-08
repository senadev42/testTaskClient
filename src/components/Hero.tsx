import { Link } from "react-router-dom";

//react hero section
const Hero: React.FC = () => {
  const firstHero = (
    <div className="mt-14 | flex flex-col gap-x-2 p-4">
      <div className="w-[20rem]">
        <h1 className="text-center mb-4 text-2xl">WanderLust</h1>
      </div>

      <hr className="mt-2 mb-2"></hr>

      <div className=" flex flex-row justify-center ">
        <div className="border-black border-2 px-4 py-1 m-2">Login</div>
        <div className="border-black border-2 px-4 py-1 m-2">Register</div>
      </div>
    </div>
  );
  return (
    //black border
    <section className="relative flex items-center w-full bg-white md:h-screen">
      <div className="relative items-center w-full px-5 py-24 mx-auto lg:px-16 lg:py-36 max-w-7xl md:px-12">
        <div className="relative flex-col items-start m-auto align-middle">
          <div className="grid grid-cols-1 gap-6 lg:gap-24 lg:grid-cols-2">
            <div className="relative items-center gap-12 m-auto lg:inline-flex">
              <div className="max-w-xl text-center lg:text-left">
                <div>
                  <span className="w-auto px-4 py-2 mt-10 rounded-full bg-teal-500/10">
                    <span className="text-xs text-teal-500">
                      Powered by GeoDB Cities
                    </span>
                  </span>
                  <p className="mt-8 text-4xl font-semibold tracking-tighter lg:text-6xl text-slate-900">
                    Wanderlust
                  </p>
                  <p className="max-w-xl mt-4 text-lg tracking-tight lg:text-xl text-slate-500">
                    Find your next adventure.
                  </p>
                </div>
                <div className="flex items-center justify-center w-full pt-8 mx-auto lg:justify-start md:pt-6">
                  <Link to="/register">
                    <button
                      className="bg-teal-500 border-teal-500 border-2 hover:bg-teal-600 text-white font-medium py-2 px-4 mr-2"
                      type="submit"
                    >
                      Register
                    </button>
                  </Link>
                  <Link to="/login">
                    {" "}
                    <button
                      className="border-2 border-teal-500 hover:bg-teal-600 text-teal-500 font-medium py-2 px-4"
                      type="submit"
                    >
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
