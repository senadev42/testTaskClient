import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { useNearbyCitiesMutation } from "../../slices/exploreApiSlice";

//visual components
import { toast } from "react-toastify";

import { RootState } from "../../store";

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

  //fetch handling
  const [position, setPosition] = useState<string | null>(null);
  const [geolocationAvailable, setGeolocationAvailable] = useState(false);
  const [locationReject, setIsLocationReject] = useState(false);

  const fetchCities = async () => {
    //location permission asking
    if ("geolocation" in navigator) {
      await navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log(latitude, longitude);

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
      setGeolocationAvailable(true);
      console.log("Geolocation is available" + position);
      setIsLocationReject(false);
    } else {
      console.log("Geolocation is not available");
      setGeolocationAvailable(false);
    }
  };

  useEffect(() => {
    if (position) {
      apiCall()
        .then(() => {
          toast.success("Fetched Cities Near You");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  }, [position]);

  const apiCall = async () => {
    try {
      //DEMO Test
      //let coords = "+32.109333+34.855499";
      //let _id = "23456";

      let _id = userInfo._id;
      let coords = position;

      console.log(coords);
      console.log(position);

      const res = await nearbyCities({ _id, coords }).unwrap();

      setCityData(res);

      console.log(res);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-row  h-full">
      <div className=" w-full bg-white p-8 mr-4 text-lg">
        <div className="flex flex-col items-center justify-center">
          {/* Current Position */}
          {/* <div className="bg-red-100 p-10">
            {position ? (
              <p> debug: Curr_position: {position}</p>
            ) : (
              <p>Retrieving current position...</p>
            )}
          </div> */}
          {/* What's near me button */}
          {/* TODO: slider to decide distance */}
          <div className=" flex flex-col items-center">
            <button
              className={`mt-4 border-2 border-teal-200 px-4 py-2 hover:bg-teal-200`}
              onClick={fetchCities}
            >
              What's Near Me?
            </button>
            {locationReject ? (
              <p className="text-xs mt-2 text-center bg-red-100">
                You need to turn on location to see what's near you.
              </p>
            ) : (
              " "
            )}
          </div>

          {/* Cities Near You */}
          {/* expects back a list of cities */}
          {cityData && (
            <div className="mt-4 px-6">
              <table className="table-auto w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      <button>City Name</button>
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      Distance
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      Region
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      Population
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {cityData.map((city) => (
                    <tr key={city.cityname} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border border-gray-300">
                        {city.cityname}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {city.distance} km
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {city.region}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {city.population}
                      </td>
                    </tr>
                  ))}
                  {cityData.map((city) => (
                    <tr key={city.cityname} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border border-gray-300">
                        {city.cityname}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {city.distance} km
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {city.region}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {city.population}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
