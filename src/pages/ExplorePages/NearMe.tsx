import React, { useEffect, useState } from "react";

//redux
import { useSelector } from "react-redux";
import { useNearbyCitiesMutation } from "../../slices/exploreApiSlice";

//visual components
import { toast } from "react-toastify";

import { RootState } from "../../store";
import Loader from "../../components/Loader";

type CityNearMe = {
  cityname: string;
  countryCode: string;
  region: string;
  population: number;
  distance: number;
};

const NearMe = () => {
  //Global State
  const [nearbyCities, { isLoading }] = useNearbyCitiesMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  //Local State
  const [cityData, setCityData] = useState<CityNearMe[]>();
  const [distance, setDistance] = useState(20);

  //fetch handling
  const [position, setPosition] = useState<string | null>(null);
  //const [geolocationAvailable, setGeolocationAvailable] = useState(false); //what does this serve?
  const [locationReject, setIsLocationReject] = useState(false);

  //input handler
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(parseInt(event.target.value));
  };

  //Utility Functions
  const getLocationFromBrowser = async () => {
    //location permission asking
    if ("geolocation" in navigator) {
      await navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          //     console.log(latitude, longitude);

          setPosition(
            `${latitude >= 0 ? "+" : "-"}${Math.abs(latitude).toFixed(6)}${
              longitude >= 0 ? "+" : "-"
            }${Math.abs(longitude).toFixed(6)}`
          );
        },
        (err) => {
          console.error(err);
          setIsLocationReject(true);
        }
      );
      //  setGeolocationAvailable(true);
      console.log("Geolocation is available" + position);
      setIsLocationReject(false);
    } else {
      console.log("Geolocation is not available");
      //  setGeolocationAvailable(false);
    }
  };

  useEffect(() => {
    if (position) {
      apiCall();
    }
  }, [position]);

  const apiCall = async () => {
    try {
      //no need to make the call if data already exists on the page
      if (cityData) return;

      //1. Set Body Variables
      let _id = userInfo._id;
      let coords = position;
      let authToken = userInfo.token;

      //2. Send off request
      const res = await nearbyCities({ _id, coords, authToken }).unwrap();

      //3. Checking for and throwing errors
      if (res === undefined) {
        throw new Error("No cities found");
      }
      if (res.message) {
        throw new Error(res.message);
      }

      // 4. if it clears error handling, it can load
      setCityData(res);
      toast.success("Fetched Cities Near You");
    } catch (err: any) {
      //Rate limited error
      if (err.message.includes("rate limit")) {
        toast.error("Rate limited exceeded. Try again later.");
      } else {
        toast.error("Sorry something went wrong.");
      }
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-row  h-full">
      <div className=" w-full bg-white p-8 mr-4 text-lg">
        <div className="flex flex-col items-center justify-center">
          <div>
            <div className=" flex flex-col items-center shadow-sm">
              <button
                className={`mt-4 border-2 border-teal-200 px-4 py-2 hover:bg-teal-200 text-center 
                flex items-center justify-center`}
                onClick={getLocationFromBrowser}
              >
                {isLoading ? <Loader /> : " What's Near Me?"}
              </button>
              {locationReject ? (
                <p className="text-xs mt-2 text-center bg-red-100">
                  You need to turn on location to see what's near you.
                </p>
              ) : (
                " "
              )}
            </div>
            <div>
              {/* slider to filter cityData by city.distance*/}
              {cityData && (
                <div className="my-4">
                  <input
                    className="slider w-full"
                    type="range"
                    min="0"
                    max="60"
                    value={distance}
                    onChange={handleSliderChange}
                  />
                  <div className="text-center">Distance</div>
                </div>
              )}
            </div>
          </div>

          {/* Cities Near You */}
          {/* expects back a list of cities */}
          {cityData && (
            <div className="mt-4 px-6 mb-12">
              <div className="flex flex-col items-center">
                <table className="table-auto w-full text-sm sm:text-md">
                  <thead className="bg-gray-200 text-zinc-700 border-b-2 border-black ">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold  border ">
                        <button className="w-full">City Name</button>
                      </th>
                      <th className="px-4 py-2 text-left font-semibold  border ">
                        Distance
                      </th>
                      <th className="px-4 py-2 text-left font-semibold  border w-[12rem] ">
                        Region
                      </th>
                      <th className="px-4 py-2 text-left font-semibold  border">
                        Population
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {cityData &&
                      cityData
                        .filter((city) => city.distance <= distance)
                        .map((city) => (
                          <tr
                            key={city.cityname}
                            className="hover:bg-gray-100 border border-gray-300"
                          >
                            <td className="px-4 py-2 ">{city.cityname}</td>
                            <td className="px-4 py-2">{city.distance} KM</td>
                            <td className="px-4 py-2 ">{city.region}</td>
                            <td className="px-4 py-2">
                              {city.population == 0 ? "~" : city.population}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Places Near You */}
          {/* expects back a list of places  */}
        </div>
      </div>
    </div>
  );
};

export default NearMe;
