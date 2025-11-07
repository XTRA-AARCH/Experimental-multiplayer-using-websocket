// multiplayerSync.js

let otherPlayers = {};
let syncedEnemies = {};
let syncedBoss = {};

// --- SEND FUNCTIONS ---

function sendPlayerUpdate(player) {
  IDKWHATIAMDOINGHERE.emit("playerUpdate", {
    id: player.id,
    x: player.position.x,
    y: player.position.y,
    vx: player.velocity.x,
    vy: player.velocity.y,
    health: player.health   // players use health
  });
}

function sendEnemyState(enemies) {
  const state = enemies.map(enemy => ({
    id: enemy.id,
    x: enemy.position.x,
    y: enemy.position.y,
    vx: enemy.velocity.x,
    vy: enemy.velocity.y,
    hp: enemy.hp            // mobs use hp
  }));
  IDKWHATIAMDOINGHERE.emit("enemyState", state);
}

function sendEnemyHit(enemyId, damage) {
  IDKWHATIAMDOINGHERE.emit("enemyHit", { enemyId, damage });
}

function sendBossTrigger(bossId, damage) {
  IDKWHATIAMDOINGHERE.emit("bossTrigger", { bossId, damage });
}

// --- RECEIVE FUNCTIONS ---

// remote player updates
IDKWHATIAMDOINGHERE.on("playerUpdate", data => {
  otherPlayers[data.id] = data;
});

// enemy state updates (data is an array, not {enemies: [...]})
IDKWHATIAMDOINGHERE.on("enemyState", data => {
  data.forEach(e => {
    syncedEnemies[e.id] = e;
  });
});

// enemy hit events
IDKWHATIAMDOINGHERE.on("enemyHit", data => {
  if (syncedEnemies[data.enemyId]) {
    syncedEnemies[data.enemyId].hp -= data.damage;
  }
});

// boss trigger events
IDKWHATIAMDOINGHERE.on("bossTrigger", data => {
  if (syncedBoss[data.bossId]) {
    syncedBoss[data.bossId].hp -= data.damage;
  }
});

// --- GETTERS ---

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
