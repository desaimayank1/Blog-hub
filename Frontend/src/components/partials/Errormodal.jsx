import React from 'react';

const Errormodal = ({ ErrorModalConfig }) => {
  if (!ErrorModalConfig.isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-labelledby="errorModal"
      aria-hidden="false"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
        <div className="p-4 border-b border-gray-200 bg-red-500">
          <div className="flex justify-between items-center">
            <h5 className="text-xl text-white font-bold">Something went wrong</h5>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={()=>{ErrorModalConfig.onClose()}}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div className="p-6 text-center bg-red-200">
          <i className="fas fa-frown text-4xl text-yellow-500"></i>
          <h5 className="mt-4 text-lg text-black font-bold">We're Sorry</h5>
          <p className="text-gray-600">
            Something went wrong while trying to process your request. Kindly try again later.
          </p>
        </div>
        <div className="p-4 flex justify-center bg-red-200">
          <button
            type="button"
            onClick={() => {
              // setErrorModalConfig({ isOpen: false });
              //  ErrorModalConfig.onClose();
              window.location.reload(true);
            }}
            className="bg-white text-gray-700 hover:bg-red-600 px-4 py-2 rounded-lg border"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Errormodal;
