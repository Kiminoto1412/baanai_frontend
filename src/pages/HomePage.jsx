import React, { useState } from "react";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import CreateModal from "../components/modals/CreateModal";
import Swal from "sweetalert2";

function HomePage() {
  // fetch data
  const [data, setData] = useState([]);
  const [postcodeData, setPostcodeData] = useState([]);
  //   url
  const [apiEndPoint, setApiEndPoint] = useState({ url: "", port: "" });
  const [baseURL, setBaseURL] = useState("");
  //   dropdown post code
  const [postCodeDropdown, setPostCodeDropdown] = useState("");
  const [average, setAverage] = useState(0);
  const [median, setMedian] = useState(0);
  //   pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApiEndPoint((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleConnect = async () => {
    try {
      const newUrl = `${apiEndPoint.url}${
        apiEndPoint.port ? `:${apiEndPoint.port}` : ""
      }`;

      setBaseURL(newUrl);
      const res = await axios.get(
        `${newUrl}/home?skip=${page * rowsPerPage}&take=${rowsPerPage}`
      );
      setData(res.data.payload);
      setTotal(res.data.count);
      const resPostcode = await axios.get(`${newUrl}/postCode`);

      setPostcodeData(resPostcode.data.payload);
    } catch (err) {
        Swal.fire('Error', 'An error occurred while fetching the data.', 'error');
    }
  };

  const handleChangePage = async (event, newPage) => {
    try {
      setPage(newPage);
      const res = await axios.get(
        `${baseURL}/home?skip=${newPage * rowsPerPage}&take=${rowsPerPage}`
      );
      setData(res.data.payload);
      setTotal(res.data.count);
    } catch (err) {
        Swal.fire('Error', 'An error occurred while fetching the data.', 'error');
    }
  };

  const handleChangeRowsPerPage = async (event) => {
    try {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      const res = await axios.get(
        `${baseURL}/home?skip=${
          page * parseInt(event.target.value, 10)
        }&take=${parseInt(event.target.value, 10)}`
      );
      setData(res.data.payload);
      setTotal(res.data.count);
    } catch (err) {
        Swal.fire('Error', 'An error occurred while fetching the data.', 'error');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="py-10 px-20  bg-blue-50">
        <div className="grid grid-flow-col grid-cols-5 gap-6 items-end">
          <div className="col-span-2">
            <div className="text-gray-700 font-bold">URL</div>
            <input
              type="text"
              name="url"
              placeholder="http://localhost"
              value={apiEndPoint.url}
              onChange={handleInputChange}
              className="border border-gray-400 text-sm rounded pl-2 w-full py-4"
            />
          </div>
          <div className="col-span-2">
            <div className="text-gray-700 font-bold">Port</div>
            <input
              type="text"
              name="port"
              placeholder="8000"
              value={apiEndPoint.port}
              onChange={handleInputChange}
              className="border border-gray-400 text-sm rounded pl-2 w-full py-4"
            />
          </div>
          <button
            onClick={handleConnect}
            className="col-span-1 bg-blue-900 hover:bg-blue-950 text-white  py-2 px-4 rounded h-[54px]"
          >
            Connect
          </button>
        </div>
      </div>

      {/* Table  */}
      <div className="px-20 py-10">
        {/* Header Table */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-semibold text-xl">HOUSE LIST</h3>
          <CreateModal
            setData={setData}
            baseURL={baseURL}
            page={page}
            rowsPerPage={rowsPerPage}
            setTotal={setTotal}
            setPostcodeData={setPostcodeData}
          />
        </div>

        <Table
          data={data}
          setData={setData}
          baseURL={baseURL}
          page={page}
          rowsPerPage={rowsPerPage}
          setTotal={setTotal}
          setPostcodeData={setPostcodeData}
        />

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* Dropdown */}
      <div className="px-14 py-10">
        <div className="py-10 bg-blue-50 flex flex-col justify-center items-center space-y-2 rounded-lg">
          <Dropdown
            baseURL={baseURL}
            data={data}
            postcodeData={postcodeData}
            setPostCodeDropdown={setPostCodeDropdown}
            postCodeDropdown={postCodeDropdown}
            setAverage={setAverage}
            setMedian={setMedian}
          />

          <div className="text-blue-600 text-xl font-semibold">
            Average : {average}
          </div>
          <div className="text-blue-600 text-xl font-semibold">
            Median : {median}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
