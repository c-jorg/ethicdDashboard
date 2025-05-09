import React from 'react';

interface FeedbackContentProps {
  question: string;
  index: number;
  topics: string[];
}

const FeedbackDisplay: React.FC<FeedbackContentProps> = ({ question, index, topics }) => {
  //console.log("FeedbackDisplay: ", topics);
  if(topics.length === 0) {
    return (
      <>
        <div className="text-gray-800">{question}</div>
        <div className="border border-gray-300 rounded-lg p-2 mt-2"> </div>
      </>
    );
  }
  return (
    <>
      <div className="text-gray-800">{question}</div>
      <div
        className="border border-gray-300 rounded-lg p-2 mt-2 min-h-[100px]"
        dangerouslySetInnerHTML={{
          __html: topics[index] ? topics[index].replace(
            /<c>(.*?)<\/c>/g,
            '<span class="text-red-500">$1</span>'
          ) : '',
        }}
      />
    </>
    
  );
 
};

export default FeedbackDisplay;
