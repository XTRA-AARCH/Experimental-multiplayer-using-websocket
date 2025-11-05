// multiplayerUI.js
import { IDKWHATIAMDOINGHERE } from "./socket.js";

const yourIdEl = document.getElementById("your-id");
const friendIdInput = document.getElementById("friend-id");
const connectBtn = document.getElementById("connect-btn");
const statusEl = document.getElementById("status");

IDKWHATIAMDOINGHERE.on("connect", () => {
  yourIdEl.textContent = IDKWHATIAMDOINGHERE.id;
  statusEl.textContent = "Status: Connected";
});

IDKWHATIAMDOINGHERE.on("disconnect", () => {
  statusEl.textContent = "Status: Disconnected";
});

connectBtn.onclick = () => {
  const targetId = friendIdInput.value.trim();
  if (targetId) {
    statusEl.textContent = "Status: Connecting...";
    IDKWHATIAMDOINGHERE.emit("connectToFriend", { targetId });
  }
};

IDKWHATIAMDOINGHERE.on("friendConnected", () => {
  statusEl.textContent = "Status: Connected to Friend";
});
