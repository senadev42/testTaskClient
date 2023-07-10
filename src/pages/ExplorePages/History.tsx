import { useEffect, useState } from "react";

//redux
import { useSelector } from "react-redux";
import { useCountryHistoryMutation } from "../../slices/exploreApiSlice";
import { RootState } from "../../store";

//visual components
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

interface CountrySearch {
  callingCode: string;
  countryCapital: string;
  countryCode: string;
  countryName: string;
  createdAt: string;
  flagUri: string;
  numRegions: number;
  query_user_id: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const History = () => {
  //Global State
  const [countryHistory, { isLoading }] = useCountryHistoryMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  //Local State
  const [countrySearchHistory, setCountrySearchHistory] = useState<
    CountrySearch[]
  >([]);

  useEffect(() => {
    //apiCall()
  }, []);

  const apiCall = async () => {
    try {
      let query_user_id = userInfo._id;
      let authToken = userInfo.token;

      if (!navigator.onLine) {
        toast.error("No internet connection");
        return;
      }

      try {
        toast.info("Fetching History...");

        const res = await Promise.race([
          countryHistory({ query_user_id, authToken }).unwrap(),
          new Promise((reject) =>
            setTimeout(() => reject(new Error("Request timed out.")), 15000)
          ),
        ]);

        setCountrySearchHistory(res);

        // if res is an empty array
        if (res.length === 0) toast.info("No History Found");
        else toast.success("History Fetched");
      } catch (err: any) {
        if (err.message === "Request timed out.") {
          toast.error("Request timed out");
        } else {
          toast.error("Couldn't fetch the history");
          console.log(err);
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-row  h-full">
      <div className=" w-full bg-white p-8 mr-4 text-lg">
        <div className="flex flex-col items-center justify-center">
          <div className=" flex flex-col items-center mb-5">
            <button
              className={`mt-4 border-2 border-teal-200 px-4 py-2 hover:bg-teal-200`}
              onClick={apiCall}
            >
              {isLoading ? <Loader /> : "Fetch History"}
            </button>
          </div>

          {/* Cities Near You */}
          {/* expects back a list of cities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countrySearchHistory &&
              countrySearchHistory.map((country) => (
                // card object
                <div
                  key={country._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={country?.flagUri}
                    alt={`Flag of ${country.countryName}`}
                    className="w-full h-48 object-cover"
                  />
                  {/* text parts */}
                  <div className="p-4 border-b border-gray-300">
                    <h2 className="text-xl font-bold mb-2">
                      {country.countryName} | {country.countryCode}
                    </h2>
                    <div className="flex flex-col text-sm gap-2">
                      {/* blocks */}

                      <div className="flex flex-row justify-between">
                        <div>
                          <p className="text-gray-700 font-medium">Capital</p>
                          <p className="text-gray-500">
                            {country.countryCapital}
                          </p>
                        </div>{" "}
                        <div>
                          <p className="text-gray-700 font-medium">
                            Calling Code
                          </p>
                          <p className="text-gray-500">{country.callingCode}</p>
                        </div>
                        <div>
                          <p className="text-gray-700 font-medium">Regions</p>
                          <p className="text-gray-500">{country.numRegions}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-700 font-medium">
                          Last Searched
                        </p>
                        <p className="text-gray-500">
                          {new Date(country.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Places Near You */}
          {/* expects back a list of places  */}
        </div>
      </div>
    </div>
  );
};

export default History;
