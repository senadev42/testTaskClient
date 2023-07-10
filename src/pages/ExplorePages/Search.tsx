import React, { useState } from "react";

//the input data
import iso3166Data from "../../utils/ISO3166.json";
import Select from "react-select";

//redux
import { useSelector } from "react-redux";
import { useCountryDataMutation } from "../../slices/exploreApiSlice";
import { RootState } from "../../store";

//visual components
import { toast } from "react-toastify";

type CountryDetails = {
  callingCode: string;
  capital: string;
  code: string;
  currencyCodes: string[];
  flagImageUri: string;
  name: string;
  numRegions: number;
  wikiDataId: string;
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
  };
  const [remainingOptions, setRemainingOptions] = useState(iso3166Data.length);

  //Global State
  const [countryData] = useCountryDataMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  //Local State
  const [countryDetails, setCountryDetails] = useState<CountryDetails>();

  //Various Input handlers
  const handleKeyDown = (event: any) => {
    if (event.code == "Enter" && remainingOptions == 0) {
      event.preventDefault();

      toast.error("Please enter a valid country.");
    }
  };
  const handleInputChange = (e: any) => {
    let remaining = iso3166Options.filter((option) =>
      option.label.toLowerCase().includes(e.toLowerCase())
    );
    setRemainingOptions(remaining.length);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // regular control flow
    if (selectedOption) {
      toast.info(`Searching for ${selectedOption.value} ...`);
      try {
        //1. setting body variables
        let countryCode = iso3166Data[selectedOption.index].isoCode;
        let query_user_id = userInfo._id;
        let authToken = userInfo.token;

        console.log(
          `Attempting to fetch with ${countryCode} and ${query_user_id}`
        );

        //2. Make request and fetch data
        const res = await countryData({
          query_user_id,
          countryCode,
          authToken,
        }).unwrap();
        //log response
        console.log(res.data);

        //3. Set state with response data
        setCountryDetails(res.data);

        console.log(`Fetched with ${countryCode} and ${query_user_id}`);

        toast.success(`Found ${selectedOption.value} `);
      } catch (err: any) {
        toast.error(err.message);
      }
    } else {
      toast.error("Please select a country");
    }
  };

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
                  onInputChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  options={iso3166Options}
                  className="react-select__control block w-[18rem] px-2 py-1 text-xs font-medium text-gray-800
                             placeholder-teal-400 rounded-md disabled:opacity-50 "
                  placeholder="Enter a Country . . ."
                  isClearable={true}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 md:mt-0 flex items-center justify-center w-full px-6 py-1 
                  text-center text-white duration-200 bg-black border-2 border-black rounded-md hover:bg-transparent 
                 hover:border-black hover:text-black lg:w-auto text-sm mx-0"
              >
                Search
              </button>
            </div>
            <p className="text-xs text-gray-400 text-start mt-2">
              The ISO-3166 recognizes 249 countries
            </p>
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
      <div className=" mx-2 md:mx-[10rem] lg:mx-[15rem] pb-6">
        {" "}
        {/* Country details exists, why isn't it being rendered? */}
        {countryDetails && (
          <div className="bg-white rounded-md shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">{countryDetails.name}</h2>
              <img
                src={countryDetails.flagImageUri}
                alt={countryDetails.name}
                className="w-12 h-auto"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Country Code
                </h3>
                <div className="bg-gray-100 rounded-md px-2 py-1">
                  {countryDetails.code}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Capital
                </h3>
                <div className="bg-gray-100 rounded-md px-2 py-1">
                  {countryDetails.capital}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Calling Code
                </h3>
                <div className="bg-gray-100 rounded-md px-2 py-1">
                  {countryDetails.callingCode}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Currency Codes
                </h3>
                <div className="bg-gray-100 rounded-md px-2 py-1">
                  {countryDetails.currencyCodes.join(", ")}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Number of Regions
                </h3>
                <div className="bg-gray-100 rounded-md px-2 py-1">
                  {countryDetails.numRegions}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  WikiData ID
                </h3>
                <div className="bg-gray-100 rounded-md px-2 py-1">
                  {countryDetails.wikiDataId}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
