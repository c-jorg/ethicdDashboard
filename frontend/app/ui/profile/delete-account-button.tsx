import { useState } from "react";
import { Button } from "@/app/ui/button";
import axios from "axios";
import api from '../../utils/api-auth'; //applies the auth headers 

interface ConfirmationModalProps {
  showModal: boolean;
  message: string;
  password: string;
  setPassword: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  errorMessage?: string;
}

const ConfirmationModal = ({
  showModal,
  message,
  password,
  setPassword,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  errorMessage,
}: ConfirmationModalProps) => {
  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
        <div className="bg-white w-full max-w-md lg:max-w-lg p-6 rounded-lg shadow-lg">
          <p className="text-gray-800 text-sm sm:text-base">{message}</p>

          {/* Password Input */}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Enter your password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Password"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <div className="mt-6 flex justify-end space-x-4">
            <Button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              {cancelText}
            </Button>
            <Button
              onClick={() => onConfirm()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
             
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

const DeleteAccountButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setPassword(""); // Reset password when modal closes
    setError(""); // Clear errors
  };

  const handleDeleteAccount = async () => {
    console.log("Deleting account...");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const studentID = localStorage.getItem("id") || "";
    console.log("id is " + studentID);

    if(password == ""){
        setError("Password is required.");
        return;
    }

    try {
      const response = await api.delete(`${apiUrl}/api/flask/auth/student`, {
        data: {
          password: password,
          student_id: studentID
        }
      });

      if (response.status === 200) {
        setError("");
        const consent = response.data.consent;
        //console.log("consent is " + consent);
        window.location.href = `/login?account_deleted=true&consented=${consent}`;
      } else {
        console.log(response.data.msg);
        setError(response.data.msg || "An error occurred.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.msg);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <Button
        type="button"
        id="delete-account"
        onClick={openModal}
        className="min-w-[200px] bg-red-600 text-center justify-center hover:bg-red-700 transition"
      >
        Delete Account
      </Button>

      {/* Confirmation Modal */}
      <ConfirmationModal
        showModal={showModal}
        message="Are you sure you want to delete your account? This action cannot be undone."
        password={password}
        setPassword={setPassword}
        onClose={closeModal}
        onConfirm={handleDeleteAccount}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        errorMessage={error}
      />
    </div>
  );
};

export default DeleteAccountButton;
