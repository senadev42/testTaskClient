import React, { useEffect, useState } from "react";

const NearME = () => {
  const [position, setPosition] = useState<string | null>(null);

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
    } else {
      console.log("Geolocation is not available");
    }
  }, []);

  return (
    <div className="flex flex-row  h-full">
      <div className=" w-full bg-white p-8 mr-4 text-lg">
        <div className="flex flex-col items-center justify-center">
          {/* Current Position */}
          <div className="bg-red-100 p-10">
            {position ? (
              <p>Current position: {position}</p>
            ) : (
              <p>Retrieving current position...</p>
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

export default NearME;
