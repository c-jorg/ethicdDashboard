import { useState } from 'react';

// Optional Confirmation Modal
interface ConfirmationModalProps {
  showModal: boolean;
  onConfirm: () => void;
  onClose: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal = ({ showModal, onConfirm, onClose, message, confirmText = "Yes, Clear", cancelText = "Cancel" }: ConfirmationModalProps) => {
  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
        <div className="bg-white w-full max-w-md lg:max-w-lg p-6 rounded-lg shadow-lg">
          <p className="text-gray-800 text-sm sm:text-base">{message}</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
              {cancelText}
            </button>
            <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

// Reusable button component to clear local storage
const ClearLocalStorageButton = ({ buttonText = "Clear Local Storage", confirmationMessage = "Are you sure you want to clear all data from local storage?" }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClearLocalStorage = () => {
    localStorage.clear();
    console.log("Local storage cleared");
    setShowModal(false); // Close the modal after clearing
  };

  const openModal = () => {
    setShowModal(true); // Show confirmation modal
  };

  const closeModal = () => {
    setShowModal(false); // Close confirmation modal
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {buttonText}
      </button>

      {/* Confirmation Modal */}
      <ConfirmationModal
        showModal={showModal}
        message={confirmationMessage}
        onConfirm={handleClearLocalStorage}
        onClose={closeModal}
        confirmText="Yes, Clear"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ClearLocalStorageButton;
