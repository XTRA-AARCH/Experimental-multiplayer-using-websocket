// multiplayerSync.js

let otherPlayers = {};
let syncedEnemies = {};
let syncedBoss = {};

function sendPlayerUpdate(player) {
  IDKWHATIAMDOINGHERE.emit("playerUpdate", {
    id: IDKWHATIAMDOINGHERE.id,
    x: player.x,
    y: player.y,
    vx: player.vx,
    vy: player.vy
  });
}

IDKWHATIAMDOINGHERE.on("playerUpdate", data => {
  otherPlayers[data.id] = data;
});

function sendEnemyState(enemies) {
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

IDKWHATIAMDOINGHERE.on("enemyState", data => {
  data.enemies.forEach(e => {
    syncedEnemies[e.id] = e;
  });
});

function sendEnemyHit(enemyId, damage) {
  IDKWHATIAMDOINGHERE.emit("enemyHit", { enemyId, damage });
}

IDKWHATIAMDOINGHERE.on("enemyHit", data => {
  if (syncedEnemies[data.enemyId]) {
    syncedEnemies[data.enemyId].hp -= data.damage;
  }
});

function sendBossTrigger(bossId, damage) {
  IDKWHATIAMDOINGHERE.emit("bossTrigger", { bossId, damage });
}

IDKWHATIAMDOINGHERE.on("bossTrigger", data => {
  if (syncedBoss[data.bossId]) {
    syncedBoss[data.bossId].hp -= data.damage;
  }
});

function getSyncedPlayers() { return otherPlayers; }
function getSyncedEnemies() { return syncedEnemies; }
function getSyncedBoss() { return syncedBoss; }

// ✅ expose globally
window.sendPlayerUpdate = sendPlayerUpdate;
window.sendEnemyState = sendEnemyState;
window.sendEnemyHit = sendEnemyHit;
window.sendBossTrigger = sendBossTrigger;
window.getSyncedPlayers = getSyncedPlayers;
window.getSyncedEnemies = getSyncedEnemies;
window.getSyncedBoss = getSyncedBoss;
