import { useState } from "react";


export default function CreateQuestions() {
  const [question, setQuestion] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // index of the question being edited
  const [editingText, setEditingText] = useState(""); // temp text while editing

  // Add question
  const addQuestion = () => {
    if (!question.trim()) return;
    setQuestionList([...questionList, question]);
    setQuestion("");
  };

  // Start editing
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditingText(questionList[index]);
  };

  // Save edit
  const saveEdit = (index) => {
    const updated = [...questionList];
    updated[index] = editingText.trim() || updated[index]; // prevent empty
    setQuestionList(updated);
    setEditingIndex(null);
    setEditingText("");
  };

  // Submit all questions
  const submitQuestions = async () => {
    try {
         const res = await fetch("http://localhost:3000/createQuestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({data:questionList}),
        credentials: "include",
      });

      if(!res.ok){
        alert("error creating queston")
      }
      const data=await res.json();

    
      alert(`Questions submitted!${data.data._id}`);
      setQuestionList([]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed submitting questions");
    }
  };

  return (
   <div className="h-screen bg-background">
     <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Questions</h2>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={addQuestion}
          className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700"
        >
          Add
        </button>
      </div>

      {/* Vertical Cards */}
      <div className="flex flex-col gap-4 mb-4">
        {questionList.map((q, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition cursor-pointer"
            onClick={() => startEdit(i)}
          >
            {editingIndex === i ? (
              <input
                autoFocus
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => saveEdit(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(i);
                }}
              />
            ) : (
              <p className="font-semibold text-gray-800">{i + 1}. {q}</p>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {questionList.length > 0 && (
        <button
          onClick={submitQuestions}
          className="w-full bg-primary text-white p-3 rounded-lg hover:bg-hover-primary"
        >
          Submit All Questions
        </button>
      )}
    </div>
   </div>
  );
}
