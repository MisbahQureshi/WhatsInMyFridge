import React, { useState } from "react";
import axios from "axios";

const ChatSuggestion = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const getSuggestions = async () => {
    if (!input.trim()) return;
    setResponse("Thinking...");

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Suggest 3 meals I can cook using: ${input}`,
            },
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      setResponse(res.data.choices[0].message.content.trim());
    } catch (err) {
      setResponse("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="form-section">
      <h2>Need Ideas? Ask the AI 🍳</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="e.g. eggs, tomato, bread"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={getSuggestions} className="main-button small">
          Ask AI
        </button>
      </div>
      {response && (
        <div style={{ marginTop: "20px", background: "#fff7f0", padding: "20px", borderRadius: "12px" }}>
          <strong>Suggestions:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ChatSuggestion;
