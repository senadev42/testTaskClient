import React, { useEffect, useState } from "react";

//the input data
import iso3166Data from "../../utils/ISO3166.json";
import Select from "react-select";

//redux
import { useDispatch, useSelector } from "react-redux";
import { useNearbyCitiesMutation } from "../../slices/exploreApiSlice";

//visual components
import { toast } from "react-toastify";

import { RootState } from "../../store";

type City = {
  cityname: string;
  countryCode: string;
  region: string;
  population: number;
  distance: number;
};

const Search = () => {
  //Autocomplete Handler
  const iso3166Options = iso3166Data.map((item, index) => ({
    value: item.country,
    label: item.country.toUpperCase(),
    index: index,
  }));
  const [selectedOption, setSelectedOption] = useState(iso3166Options[0]);
  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    setCountry(selectedOption.value);
  };

  //Submit Handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedOption) {
      alert(`Handling Country submit ${selectedOption.value}`);
    }
  };

  const [country, setCountry] = useState("");

  const searchCounty = (
    <div className=" mb-12  px-12 lg:px-16 max-w-7xl">
      <div className=" mx-auto   p-20 sm:p-10 rounded-xl shadow-2xl shadow-teal-100">
        {/* title */}
        <div className="w-full">
          <p className="text-xl sm:text-4xl font-medium  text-center tracking-tighter text-black mb-4 ">
            Search for a Country
          </p>
        </div>
        {/* form */}
        <div className=" flex flex-col  items-center ">
          <form
            className=" items-center max-w-lg"
            action=""
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full gap-x-6 mt-3  md:flex-row sm:items-center sm:justify-center">
              {/* City Search */}

              <div className="flex-1 | flex flex-row items-center mb-4 sm:mb-auto ">
                {" "}
                {selectedOption && (
                  <div className="flex bg-zinc-300 px-3 py-2 rounded-md text-sm font-medium text-gray-800 ">
                    {iso3166Data[selectedOption.index].isoCode}
                  </div>
                )}
                <Select
                  name="country"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  options={iso3166Options}
                  className=" block w-[18rem] px-2 py-1 text-xs font-medium text-gray-800
                             placeholder-teal-400 rounded-md disabled:opacity-50 "
                  placeholder="Enter a Country . . ."
                  isClearable={true}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex items-center justify-center w-full px-6 py-1 
                  text-center text-white duration-200 bg-black border-2 border-black rounded-md hover:bg-transparent 
                 hover:border-black hover:text-black lg:w-auto text-sm mx-0"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    // the container
    <div className="flex flex-col h-full">
      {/* search block*/}
      <div className="flex flex-col items-center justify-center ">
        {/* Search */}
        {searchCounty}
      </div>
      <div>{/* Results */}</div>
    </div>
  );
};

const searchArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    className="w-4 h-auto ml-2"
  >
    <path
      fill-rule="evenodd"
      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
      clip-rule="evenodd"
    ></path>
  </svg>
);

export default Search;
