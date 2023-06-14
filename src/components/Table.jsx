import React from "react";
import UpdateModal from "./modals/UpdateModal";
import DeleteModal from "./modals/DeleteModal";

function Table({ data, setData, baseURL, page, rowsPerPage,setTotal,setPostcodeData }) {
  return (
    <div>
      <div className="grid grid-cols-13 border border-gray-200 text-center">
        <div className="col-span-1 p-2 border-r border-gray-200 font-bold">
          ID
        </div>
        <div className="col-span-3 p-2 border-r border-gray-200 font-bold">
          Name
        </div>
        <div className="col-span-3 p-2 border-r border-gray-200 font-bold">
          Post Code
        </div>
        <div className="col-span-3 p-2 border-r border-gray-200 font-bold">
          Price
        </div>
        <div className="col-span-3 p-2 border-gray-200 font-bold">Action</div>
      </div>
      {data.map((item, index) => (
        <div
          key={item.id}
          className={`grid grid-cols-13 hover:bg-blue-50 border-b border-gray-200 text-center text-sm`}
        >
          <div className="col-span-1 p-2 border-x border-gray-200">
            {item.id}
          </div>
          <div className="col-span-3 p-2 border-r border-gray-200">
            {item.name}
          </div>
          <div className="col-span-3 p-2 border-r border-gray-200">
            {item.post_code}
          </div>
          <div className="col-span-3 p-2 border-r border-gray-200">
            {item.price}
          </div>
          <div className="col-span-3 p-2 border-r border-gray-200 flex justify-center items-center">
            <UpdateModal
              item={item}
              setData={setData}
              baseURL={baseURL}
              page={page}
              rowsPerPage={rowsPerPage}
              setTotal={setTotal}
              setPostcodeData={setPostcodeData}
            />
            <DeleteModal
              item={item}
              setData={setData}
              baseURL={baseURL}
              page={page}
              rowsPerPage={rowsPerPage}
              setTotal={setTotal}
              setPostcodeData={setPostcodeData}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Table;
