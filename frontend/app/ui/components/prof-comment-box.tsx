import React from "react";

interface ProfessorCommentBoxProps {
  comment: string;
}

const ProfessorCommentBox: React.FC<ProfessorCommentBoxProps> = ({ comment }) => {
  // Replace <c>...</c> with red-colored text
  const formattedComment = comment.replace(/<c>(.*?)<\/c>/g, '<span class="text-red-500 font-semibold">$1</span>');

  return (
    <>
    <label className="font-semibold">Professor Comments:</label>
    <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-800 min-h-[100px]">
      <div dangerouslySetInnerHTML={{ __html: formattedComment }} />
    </div>
    </>
  );
};

export default ProfessorCommentBox;
