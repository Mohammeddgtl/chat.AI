document.getElementById("input-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form refresh

    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    // Display user message
    appendMessage("You", userInput);

    try {
        const response = await fetch("https://aef7-45-112-59-196.ngrok-free.app/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "dolphin3.0-llama3.1-8b",
                messages: [
                    { "role": "system", "content": "Always answer in rhymes. Today is Thursday" },
                    { "role": "user", "content": userInput }
                ],
                temperature: 0.7,
                max_tokens: 200,
                stream: false
            })
        });

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        // Display AI response
        appendMessage("AI", aiResponse);
    } catch (error) {
        console.error("Error:", error);
        appendMessage("AI", "Error connecting to AI.");
    }

    document.getElementById("user-input").value = ""; // Clear input field
});

function appendMessage(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "You" ? "user-message" : "ai-message");
    messageDiv.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageDiv);

    // Auto-scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}
