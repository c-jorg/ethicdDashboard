import React from 'react';

interface FormCompletedCardProps {
  isVisible: boolean;
}

const FormCompletedCard: React.FC<FormCompletedCardProps> = ({ isVisible }) => {
  return (
    <div
      id="form-completed"
      data-html2canvas-ignore
      className={`text-center text-green-600 font-semibold mb-4 text-md md:text-2xl bg-white p-6 rounded-lg shadow-lg border border-green-200 transition-all duration-300 ${
        isVisible ? 'block' : 'hidden'
      }`}
    >
        You have completed this form.
    </div>
  );
};

export default FormCompletedCard;
