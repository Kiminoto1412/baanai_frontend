import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

function Dropdown({ postcodeData, data, baseURL, setAverage, setMedian }) {
  const [postCodeDropdown, setPostCodeDropdown] = useState("SELECT POST CODE");

  const handleChangePostCodeDropdown = async (postCodeId) => {
    try {
      setPostCodeDropdown(postCodeId);
      const res = await axios.get(`${baseURL}/postCode/${postCodeId}`);
      setAverage(res.data.payload.average);
      setMedian(res.data.payload.median);
    } catch (err) {
      Swal.fire('Error', 'An error occurred while fetching the data.', 'error');
    }
  };

  return (
    <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="w-[200px] bg-white border border-gray-400 text-gray-400 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center  focus:border-blue-600 focus:border-2"
        type="button"
      >
        <div className="flex justify-between items-center w-full">
          <p
            className={
              postCodeDropdown !== "SELECT POST CODE"
                ? "text-black"
                : "text-gray-400"
            }
          >
            {postCodeDropdown}
          </p>

          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </button>
      <div
        id="dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {postcodeData?.map((data, index) => (
            <li
              key={index}
              value={data.post_code}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => handleChangePostCodeDropdown(data.post_code)}
            >
              {data.post_code}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
