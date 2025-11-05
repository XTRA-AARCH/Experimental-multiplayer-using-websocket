// multiplayerSync.js
import { IDKWHATIAMDOINGHERE } from "./socket.js";

// Local player state
let otherPlayers = {};
let syncedEnemies = {};
let syncedBoss = {};

// Send your player position every frame
export function sendPlayerUpdate(player) {
  IDKWHATIAMDOINGHERE.emit("playerUpdate", {
    id: IDKWHATIAMDOINGHERE.id,
    x: player.x,
    y: player.y,
    vx: player.vx,
    vy: player.vy
  });
}

// Receive other players
IDKWHATIAMDOINGHERE.on("playerUpdate", data => {
  otherPlayers[data.id] = data;
});

// Send enemy positions
export function sendEnemyState(enemies) {
  IDKWHATIAMDOINGHERE.emit("enemyState", {
    enemies: enemies.map(e => ({
      id: e.id,
      x: e.x,
      y: e.y,
      vx: e.vx,
      vy: e.vy
    }))
  });
}

// Receive enemy positions
IDKWHATIAMDOINGHERE.on("enemyState", data => {
  data.enemies.forEach(e => {
    syncedEnemies[e.id] = e;
  });
});

// Send enemy damage
export function sendEnemyHit(enemyId, damage) {
  IDKWHATIAMDOINGHERE.emit("enemyHit", { enemyId, damage });
}

// Receive enemy damage
IDKWHATIAMDOINGHERE.on("enemyHit", data => {
  if (syncedEnemies[data.enemyId]) {
    syncedEnemies[data.enemyId].hp -= data.damage;
  }
});

// Send boss damage
export function sendBossTrigger(bossId, damage) {
  IDKWHATIAMDOINGHERE.emit("bossTrigger", { bossId, damage });
}

// Receive boss damage
IDKWHATIAMDOINGHERE.on("bossTrigger", data => {
  if (syncedBoss[data.bossId]) {
    syncedBoss[data.bossId].hp -= data.damage;
  }
});

// Export synced states
export function getSyncedPlayers() {
  return otherPlayers;
}

export function getSyncedEnemies() {
  return syncedEnemies;
}

export function getSyncedBoss() {
  return syncedBoss;
}
