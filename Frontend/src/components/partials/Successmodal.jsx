import React from 'react';

const SuccessModal = ({ SuccessModalConfig }) => {
  if (!SuccessModalConfig.isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-labelledby="successModal"
      aria-hidden="false"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
        <div className="modal-header p-4 border-b bg-green-500 border-gray-200">
          <div className="flex justify-between items-center">
            <h5 className="text-2xl font-extrabold text-white">Successful</h5>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={SuccessModalConfig.onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div className="modal-body p-6 text-center bg-green-200">
          <h5 className="mt-4 text-lg text-black font-bold">Blog Created Successfully</h5>
          <p className="text-gray-600">
            Your blog has been created successfully. You may close the window now.
          </p>
        </div>
        <div className="modal-footer p-4 flex justify-center bg-green-200">
          <button
            type="button"
            onClick={() => window.location.href = '/'}
            className="bg-white text-gray-700 hover:bg-green-500 px-4 py-2 rounded-lg border"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
