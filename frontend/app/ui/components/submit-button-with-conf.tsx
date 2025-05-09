import { useState, useRef } from 'react';

interface ConfirmationModalProps {
  showModal: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal = ({
  showModal,
  message,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel"
}: ConfirmationModalProps) => {
  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
        <div className="bg-white w-full max-w-md lg:max-w-lg p-6 rounded-lg shadow-lg">
          <p className="text-gray-800 text-sm sm:text-base whitespace-pre-line">{message}</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

interface SubmitButtonWithConfirmationProps {
  formRef?: React.RefObject<HTMLFormElement | null>;
  buttonText?: string;
  onClick?: (e:any) => void; // Add onClick prop
}

const SubmitButtonWithConfirmation = ({ formRef, buttonText = "Submit", onClick }: SubmitButtonWithConfirmationProps) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmSubmission = () => {
    setShowModal(false);
    // Trigger form submission directly by calling submit on the form
    if (onClick) {
      onClick(new Event('submit')); // Call the onClick handler if provided
    }
   
    if (formRef && formRef.current) {
      formRef.current.requestSubmit(); // Use requestSubmit for native form submit behavior
    }
 
  };

  return (
    <div>
      <button
        type="button"
        data-html2canvas-ignore
        onClick={openModal}
        className="final-button text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-xl"
        style={{ backgroundColor: '#25a18e' }}
      >
        {buttonText}
      </button>

      {/* Confirmation Modal */}
      <ConfirmationModal
        showModal={showModal}
        message="Are you sure you want to submit this form? Once you do, the form will be locked."
        onClose={closeModal}
        onConfirm={confirmSubmission}
        confirmText="Yes, Submit"
        cancelText="Cancel"
      />
    </div>
  );
};

export default SubmitButtonWithConfirmation;
