import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

function DeleteModal({ item,setData, baseURL, page, rowsPerPage,setTotal,setPostcodeData }) {
    const handleDelete = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`${baseURL}/home/${item.id}`)
              .then(async (response) => {
                if (response.status === 200) {
                  try {
                    // Perform the subsequent asynchronous operations inside an IIFE
                    (async () => {
                      const res = await axios.get(`${baseURL}/home?skip=${page * rowsPerPage}&take=${rowsPerPage}`);
                      setData(res.data.payload);
                      setTotal(res.data.count);
        
                      const resPostcode = await axios.get(`${baseURL}/postCode`);
                      setPostcodeData(resPostcode.data.payload);
        
                      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                    })();
                  } catch (error) {
                    Swal.fire('Error', 'An error occurred while fetching the data.', 'error');
                  }
                } else {
                  Swal.fire('Error', 'Failed to delete the house.', 'error');
                }
              })
              .catch((error) => {
                Swal.fire('Error', 'An error occurred while deleting the house.', 'error');
              });
          }
        });
      };
      

  return (
    <button
      className="text-red-500 bg-red-100 hover:bg-red-300 px-4 py-2 rounded-full ml-2"
      onClick={handleDelete}
    >
      DELETE
    </button>
  );
}

export default DeleteModal;
