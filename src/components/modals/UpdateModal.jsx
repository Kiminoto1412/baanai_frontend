import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UpdateModal = ({
  item,
  setData,
  baseURL,
  page,
  rowsPerPage,
  setTotal,
  setPostcodeData,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    postcode: "",
    price: "",
    description: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateButton = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  const handleClickUpdate = async () => {
    try {
      const { id, name, postcode, price, description } = formData;

      // Validate input
      if (!name || !postcode || !price || !description) {
        closeModal();
        Swal.fire("Error", "Please fill in all fields", "error");
        return;
      }

      //   update
      await axios.patch(`${baseURL}/home/${id}`, {
        id,
        name,
        post_code: postcode,
        price,
        desc: description,
      });
      // All input is valid

      // new Get
      const res = await axios.get(
        `${baseURL}/home?skip=${page * rowsPerPage}&take=${rowsPerPage}`
      );
      setData(res.data.payload);
      setTotal(res.data.count);
      const resPostcode = await axios.get(`${baseURL}/postCode`);

      setPostcodeData(resPostcode.data.payload);

      closeModal();
      Swal.fire("Success", "Data submitted successfully", "success");
    } catch (err) {
      closeModal();
      Swal.fire("Error", `${err.response.data.message}`, "error");
    }
  };

  useEffect(() => {
    setFormData({
      id: item.id,
      name: item.name,
      postcode: item.post_code,
      price: item.price,
      description: item.desc,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("click", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {}, [handleClickUpdate]);

  return (
    <div>
      <button
        className="text-yellow-500 bg-yellow-100 hover:bg-yellow-300 px-4 py-2 rounded-full"
        onClick={handleCreateButton}
      >
        VIEW DETAIL
      </button>

      {isOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-start mb-2 text-black font-semibold">Create</p>
            <div className="grid grid-cols-4 gap-2 mb-4 py-1">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="col-span-2 px-3 py-2 rounded-lg border-gray-400"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                id="postcode"
                name="postcode"
                placeholder="Post Code"
                className="px-3 py-2 rounded-lg border-gray-400"
                value={formData.postcode}
                onChange={handleChange}
              />
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                className="px-3 py-2 rounded-lg border-gray-400"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="4"
              className="w-full px-3 py-2 rounded-lg border-gray-400"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <div className="flex justify-center items-center space-x-3">
              <button
                className="bg-white hover:bg-gray-100  text-gray-500 border-[1px] border-gray-400 py-2 px-8 rounded mt-4 "
                onClick={closeModal}
              >
                CANCEL
              </button>
              <button
                className="bg-yellow-400 hover:bg-yellow-600 text-white  py-2 px-8 rounded mt-4"
                onClick={handleClickUpdate}
              >
                UPDATE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateModal;
