import React, { useState } from 'react';
import Errormodal from './partials/Errormodel';
import Loadingmodal from './partials/Loadingmodel';
import SuccessModal from './partials/Sucessmodel';

const Test = () => {
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);

  const ErrormodalConfig = {
    isOpen: isErrorModalOpen,
    onClose: () => setErrorModalOpen(false),
  };

  const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);

  const LoadingmodalConfig = {
    isOpen: isLoadingModalOpen,
    onClose: () => setLoadingModalOpen(false),
  };

  const [SuccessmodalConfig, setSuccessModalConfig] = useState({
    isOpen: false,
    onClose: () => setModalConfig({ ...SuccessmodalConfig, isOpen: false }),
  });

  const openSuccessModal = () => {
    setSuccessModalConfig({
      isOpen: true,
      onClose: () => setSuccessModalConfig({ ...SuccessmodalConfig, isOpen: false }),
    });
  };

  return (
    <>
    <div>
      <button onClick={() => setErrorModalOpen(true)} className="btn btn-primary">
        Show Error Modal
      </button>

      <Errormodal ErrormodalConfig={ErrormodalConfig} />
    </div>
    <div>
      {/* Button to trigger modal */}
      <button onClick={() => setLoadingModalOpen(true)} className="btn btn-primary">
        Show Loading Modal
      </button>

      {/* Loading Modal */}
      <Loadingmodal LoadingmodalConfig ={LoadingmodalConfig } />
    </div>
    <div>
      {/* Button to trigger success modal */}
      <button onClick={openSuccessModal} className="btn btn-success">
        Show Success Modal
      </button>

      {/* Success Modal */}
      <SuccessModal SuccessmodalConfig={SuccessmodalConfig} />
    </div>
    </>
  );
};

export default Test;
