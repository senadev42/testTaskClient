import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { useNearbyCitiesMutation } from "../../slices/exploreApiSlice";

import { RootState } from "../../store";

type CityNearMe = {
  cityname: string;
  countryCode: string;
  region: string;
  population: number;
  distance: number;
};

const NearMe = () => {
  const [position, setPosition] = useState<string | null>(null);
  const [geolocationAvailable, setGeolocationAvailable] = useState(false);

  //cityData
  const [cityData, setCityData] = useState<CityNearMe[]>();

  //state
  const [nearbyCities, { isLoading }] = useNearbyCitiesMutation();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition(
            `${latitude >= 0 ? "+" : "-"}${Math.abs(latitude).toFixed(6)}${
              longitude >= 0 ? "+" : "-"
            }${Math.abs(longitude).toFixed(6)}`
          );
        },
        (err) => {
          console.error(err);
        }
      );
      setGeolocationAvailable(true);
    } else {
      console.log("Geolocation is not available");
      setGeolocationAvailable(false);
    }
  }, []);

  const fetchCities = async () => {
    try {
      let _id = "23456";
      let coords = "+9.022700+38.746800";

      const res = await nearbyCities({ _id, coords }).unwrap();
      console.log(res);
      setCityData(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row  h-full">
      <div className=" w-full bg-white p-8 mr-4 text-lg">
        <div className="flex flex-col items-center justify-center">
          {/* Current Position */}
          <div className="bg-red-100 p-10">
            {position ? (
              <p> debug: Curr_position: {position}</p>
            ) : (
              <p>Retrieving current position...</p>
            )}
          </div>
          {/* What's near me button */}
          <div>
            <button
              className={`mt-4 border-2 border-teal-200 px-4 py-2  ${
                geolocationAvailable
                  ? "hover:bg-teal-200"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={fetchCities}
              disabled={!geolocationAvailable}
            >
              What's Near Me?
            </button>
            {!geolocationAvailable ? (
              <p className="text-xs mt-2">You need to turn on location 😢 </p>
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
                      City Name
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
