import React, { useState } from "react";

function FeedbackPage() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("피드백이 제출되었습니다. 감사합니다!");
    setFeedback("");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">피드백</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="축제에 대한 의견을 남겨주세요!"
          className="w-full p-4 border rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          제출하기
        </button>
      </form>
    </div>
  );
}

export default FeedbackPage;
