import { useState } from "react";

export default function ChatbotComponent() {
  const [result, setResult] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("question", question);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
      setResult("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #cce7ff, #5dade2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontSize: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: 'none',
    color: 'white',
    backgroundColor: loading ? '#aaa' : '#3498db',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontSize: '1rem'
  };

  const resultStyle = {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    textAlign: 'center',

  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
          AI Chatbot
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <label htmlFor="question" style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Question:
            </label>
            <input
              type="text"
              id="question"
              style={inputStyle}
              value={question}
              onChange={handleQuestionChange}
              placeholder="Ask your question here..."
              required
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={buttonStyle}
              disabled={loading || !question}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>

        {result && (
          <div style={resultStyle}>
            <h3 style={{ fontWeight: 'bold' }}>Result:</h3>
            <p style={{ fontFamily: 'Arial, sans-serif',
}}>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
