// multiplayerUI.js
import { IDKWHATIAMDOINGHERE } from "./socket.js";

const yourIdEl = document.getElementById("your-id");
const friendIdInput = document.getElementById("friend-id");
const connectBtn = document.getElementById("connect-btn");
const statusEl = document.getElementById("status");

// Show your own ID when connected
IDKWHATIAMDOINGHERE.on("yourId", id => {
  yourIdEl.textContent = id;
  statusEl.textContent = "Status: Connected";
});

// Handle disconnect
IDKWHATIAMDOINGHERE.on("disconnect", () => {
  statusEl.textContent = "Status: Disconnected";
});

// Connect to a friend
connectBtn.onclick = () => {
  const targetId = friendIdInput.value.trim();
  if (targetId) {
    statusEl.textContent = "Status: Connecting...";
    IDKWHATIAMDOINGHERE.emit("connectToFriend", targetId);
  }
};

// Update when friend connects
IDKWHATIAMDOINGHERE.on("friendConnected", friendId => {
  statusEl.textContent = "Status: Connected to Friend " + friendId;
});
