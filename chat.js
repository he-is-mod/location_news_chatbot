// Send and display chatbot message
function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value.trim();
  if (!userText) return;

  displayMessage("user", userText);
  input.value = "";
  getBotResponse(userText);
}

// Add message bubble
function displayMessage(sender, message) {
  const bubble = document.createElement("div");
  bubble.className = `mb-2 text-${sender === "user" ? "end" : "start"}`;
  bubble.innerHTML = `
    <div class="d-inline-block px-3 py-2 rounded ${sender === "user" ? "bg-primary text-white" : "bg-secondary text-white"}">
      ${message}
    </div>`;
  chatbox.appendChild(bubble);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Use OpenAI API for smart replies
async function getBotResponse(userMessage) {
  displayMessage("bot", "Typing...");
 try {
     const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPEN_AI_KEY}`,
       "HTTP-Referer": "http://localhost", // 👈 Use your domain in production
        "X-Title": "MOD Chat App" 
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [ { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }],
    }),
  });

  const data = await res.json();
      console.log("OpenRouter response:", data);

  const reply = data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't respond.";
  chatbox.lastChild.remove();
  displayMessage("bot", reply);
 } catch (error) {
     console.error("Fetch error:", error);
    chatbox.lastChild.remove();
    displayMessage("bot", "❌ Network or API error occurred.");
 }
}