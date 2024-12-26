import React from 'react';

const Loadingmodal = ({  LoadingModalConfig  }) => {
  if (! LoadingModalConfig.isOpen ) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-labelledby="loadingModal"
      aria-hidden="false"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
        <div className="modal-body p-6 text-center">
          <div className="flex justify-center mb-4">
            {/* Loading Spinners */}
            <div className="flex space-x-4">
              <div className="spinner-grow animate-spin rounded-full border-4 border-t-transparent border-blue-500 w-12 h-12"></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="py-3">
            <p>Your Blog is getting uploaded.</p>
            <p className="font-semibold text-gray-700">
              Don't reload or close this window, as it might take a little time depending upon the size of the Image...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loadingmodal;
