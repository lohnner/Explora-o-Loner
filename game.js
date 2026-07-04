'use strict';

/* ================= DADOS ================= */

const JOBS = [
  { id:'carga',    name:'Carregador de Cargas',     desc:'Mover contêineres na doca 7.',             min:25,  pay:11 },
  { id:'dutos',    name:'Limpeza de Dutos',         desc:'Ninguém gosta, mas alguém tem que fazer.', min:33,  pay:14 },
  { id:'manut',    name:'Técnico de Manutenção',    desc:'Apertar parafusos no anel externo.',       min:60,  pay:26 },
  { id:'cantina',  name:'Turno na Cantina',         desc:'Servir sopa de proteína aos mineradores.', min:45,  pay:19 },
  { id:'vigia',    name:'Vigia Noturno',            desc:'Ficar de olho no depósito B.',             min:120, pay:52 },
  { id:'sucata',   name:'Triagem de Sucata',        desc:'Separar o lixo do que ainda tem valor.',   min:40,  pay:17 },
  { id:'inspec',   name:'Inspeção de Contêineres',  desc:'Conferir lacres e manifestos de carga.',   min:75,  pay:33 },
  { id:'doca',     name:'Assistente de Doca',       desc:'Guiar naves na atracação.',                min:50,  pay:22 },
];

const MISSIONS = [
  { id:'taxi',     name:'Táxi Orbital',            desc:'Levar um passageiro até a plataforma vizinha.', min:33,  pay:30,  tier:1, lvl:1  },
  { id:'gelo',     name:'Coleta de Gelo',          desc:'Raspar gelo de um cometa próximo.',             min:45,  pay:40,  tier:1, lvl:2  },
  { id:'entrega',  name:'Entrega ao Cinturão',     desc:'Suprimentos para os mineradores do cinturão.',  min:70,  pay:58,  tier:1, lvl:3  },
  { id:'patrulha', name:'Patrulha de Rotina',      desc:'Uma volta completa pelo perímetro do setor.',   min:120, pay:105, tier:1, lvl:4  },
  { id:'resgate',  name:'Resgate de Sonda',        desc:'Recuperar uma sonda perdida à deriva.',         min:60,  pay:88,  tier:2, lvl:8  },
  { id:'escolta',  name:'Escolta de Comboio',      desc:'Proteger cargueiros até o portal de salto.',    min:90,  pay:135, tier:2, lvl:9  },
  { id:'minerar',  name:'Mineração em Asteroide',  desc:'Extrair minério raro num asteroide instável.',  min:150, pay:215, tier:2, lvl:11 },
  { id:'corp',     name:'Contrato Corporativo',    desc:'Transporte discreto. Não faça perguntas.',      min:120, pay:290, tier:3, lvl:16 },
  { id:'nebulosa', name:'Expedição à Nebulosa',    desc:'Coletar dados dentro da nebulosa Carmim.',      min:180, pay:410, tier:3, lvl:18 },
  { id:'mapear',   name:'Mapeamento de Setor',     desc:'Cartografar uma região inexplorada.',           min:240, pay:540, tier:3, lvl:20 },
];

const SHIPS = [
  { tier:0, name:'—',               icon:'',   desc:'', price:0, lvl:0 },
  { tier:1, name:'Vaga-Lume',       icon:'🛸', desc:'Um cargueiro usado, cheio de remendos, mas voa. Libera missões básicas.',       price:350,  lvl:1  },
  { tier:2, name:'Falcão de Ferro', icon:'🚀', desc:'Casco reforçado e motores decentes. Libera missões de médio alcance.',          price:1500, lvl:8  },
  { tier:3, name:'Aurora Estelar',  icon:'🛰️', desc:'Uma beleza de nave. Alcança os cantos mais fundos do setor. Missões de elite.', price:6000, lvl:16 },
];

const RANKS = [
  { at:0,     name:'Trabalhador' },
  { at:100,   name:'Operário Espacial' },
  { at:400,   name:'Piloto Novato' },
  { at:1200,  name:'Explorador' },
  { at:3500,  name:'Capitão' },
  { at:8000,  name:'Comandante' },
  { at:20000, name:'Lenda do Setor' },
];

const ITEMS = {
  sucata:      { name:'Sucata de Metal',      icon:'🔩', value:3,   rarity:'comum' },
  cabo:        { name:'Cabo Usado',           icon:'🔌', value:2,   rarity:'comum' },
  racao:       { name:'Ração Espacial',       icon:'🥫', value:2,   rarity:'comum' },
  ferramenta:  { name:'Ferramenta Gasta',     icon:'🔧', value:4,   rarity:'comum' },
  minerio:     { name:'Minério de Ferro',     icon:'🪨', value:7,   rarity:'incomum' },
  gelo:        { name:'Fragmento de Gelo',    icon:'🧊', value:5,   rarity:'incomum' },
  circuito:    { name:'Circuito Recuperado',  icon:'💾', value:10,  rarity:'incomum' },
  liga:        { name:'Liga Reforçada',       icon:'⚙️', value:28,  rarity:'raro' },
  nucleo:      { name:'Núcleo de Sonda',      icon:'🔋', value:42,  rarity:'raro' },
  minerioRaro: { name:'Minério Raro',         icon:'💎', value:35,  rarity:'raro' },
  cristal:     { name:'Cristal da Nebulosa',  icon:'🔮', value:95,  rarity:'épico' },
  dados:       { name:'Dados de Setor',       icon:'🗺️', value:120, rarity:'épico' },
  artefato:    { name:'Artefato Antigo',      icon:'🏺', value:220, rarity:'lendário' },
};

const LOOT_JOB = ['sucata', 'cabo', 'racao', 'ferramenta'];
const LOOT_T1  = ['minerio', 'gelo', 'circuito'];
const LOOT_T2  = ['liga', 'nucleo', 'minerioRaro'];
const LOOT_T3  = ['cristal', 'dados', 'artefato'];

const HOUR = 3600000;
const SAVE_KEY = 'exploracao-loner-save';

/* ================= ESTADO ================= */

let S = {
  credits: 0,
  xp: 0,
  ship: 0,
  totalEarned: 0,
  jobsDone: 0,
  missionsDone: 0,
  activity: null,   // {kind, name, tier, startTs, endTs, reward, xp}
  inventory: {},    // {itemId: qty}
  log: [],
  seenIntro: false,
};

function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) S = Object.assign(S, JSON.parse(raw));
  } catch (e) { /* save corrompido, começa do zero */ }
  if (typeof S.xp !== 'number') S.xp = 0;
  if (!S.inventory) S.inventory = {};
  // migração de save antigo: atividade sem XP/tier definidos
  if (S.activity && typeof S.activity.xp !== 'number') {
    S.activity.xp = Math.round(S.activity.reward || 10);
    S.activity.tier = S.activity.tier || 0;
  }
}

/* ================= LEVEL (fórmula do Tibia, sem limite) ================= */

// XP total necessário para alcançar o nível L
function xpForLevel(L) {
  return Math.floor((50 / 3) * (L * L * L - 6 * L * L + 17 * L - 12));
}

function levelFromXp(xp) {
  let lv = 1;
  while (xpForLevel(lv + 1) <= xp) lv++;
  return lv;
}

function gainXp(amount) {
  const before = levelFromXp(S.xp);
  S.xp += amount;
  const after = levelFromXp(S.xp);
  if (after > before) showLevelUp(after);
  return after > before;
}

/* ================= ROTAÇÃO (muda a cada hora) ================= */

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hourIndex() { return Math.floor(Date.now() / HOUR); }

function currentOffers(pool, seedSalt, count, kind) {
  const rng = mulberry32(hourIndex() * 2654435761 + seedSalt);
  const shuffled = pool.slice().sort(() => rng() - 0.5);
  return shuffled.slice(0, count).map(item => {
    // variação leve de tempo e pagamento a cada rotação
    const durVar = 0.85 + rng() * 0.3;
    const payVar = 0.9 + rng() * 0.25;
    const min = Math.max(15, Math.round(item.min * durVar));
    const pay = Math.max(5, Math.round(item.pay * payVar));
    const xp = kind === 'job'
      ? Math.round(min * 1.2 + pay * 0.5)
      : Math.round((min * 1.8 + pay) * (1 + 0.25 * (item.tier - 1)));
    return { ...item, min, pay, xp };
  });
}

function jobOffers() { return currentOffers(JOBS, 17, 3, 'job'); }
function missionOffers() {
  const available = MISSIONS.filter(m => m.tier <= S.ship);
  if (!available.length) return [];
  return currentOffers(available, 91, Math.min(3, available.length), 'mission');
}

/* ================= LOOT ================= */

function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }

function rollLoot(kind, tier) {
  const rng = mulberry32(Date.now() & 0xffffffff);
  const drops = [];
  if (kind === 'job') {
    if (rng() < 0.5) drops.push(pick(rng, LOOT_JOB));
    if (rng() < 0.06) drops.push(pick(rng, LOOT_T1));
  } else if (tier === 1) {
    drops.push(pick(rng, LOOT_T1));
    if (rng() < 0.35) drops.push(pick(rng, LOOT_T1));
    if (rng() < 0.08) drops.push(pick(rng, LOOT_T2));
  } else if (tier === 2) {
    drops.push(pick(rng, LOOT_T2));
    if (rng() < 0.4) drops.push(pick(rng, LOOT_T1));
    if (rng() < 0.06) drops.push(pick(rng, LOOT_T3));
  } else {
    drops.push(pick(rng, LOOT_T3));
    if (rng() < 0.5) drops.push(pick(rng, LOOT_T2));
  }
  return drops;
}

function invCount() {
  return Object.values(S.inventory).reduce((a, b) => a + b, 0);
}

function invTotalValue() {
  return Object.entries(S.inventory).reduce((sum, [id, qty]) => sum + ITEMS[id].value * qty, 0);
}

/* ================= AÇÕES ================= */

function startActivity(kind, offer) {
  if (S.activity) return;
  if (offer.lvl && levelFromXp(S.xp) < offer.lvl) { toast(`Requer nível ${offer.lvl}!`); return; }
  const now = Date.now();
  S.activity = {
    kind,
    name: offer.name,
    tier: offer.tier || 0,
    startTs: now,
    endTs: now + offer.min * 60000,
    reward: offer.pay,
    xp: offer.xp,
  };
  S.seenIntro = true;
  addLog(`${kind === 'job' ? 'Serviço' : 'Missão'} iniciado: ${offer.name} (${fmtDur(offer.min)})`);
  save();
  render();
}

function collectActivity() {
  const a = S.activity;
  if (!a || Date.now() < a.endTs) return;
  S.credits += a.reward;
  S.totalEarned += a.reward;
  if (a.kind === 'job') S.jobsDone++; else S.missionsDone++;

  const leveled = gainXp(a.xp);
  const drops = rollLoot(a.kind, a.tier);
  for (const id of drops) S.inventory[id] = (S.inventory[id] || 0) + 1;

  const dropTxt = drops.length
    ? ' · ' + drops.map(id => `${ITEMS[id].icon} ${ITEMS[id].name}`).join(', ')
    : '';
  addLog(`${a.kind === 'job' ? 'Serviço' : 'Missão'} concluído: ${a.name} · <b>+${a.reward} ₵</b> · <span class="xpg">+${a.xp} XP</span>${dropTxt}`);

  S.activity = null;
  save();
  if (!leveled) toast(`+${a.reward} ₵ · +${a.xp} XP${drops.length ? ' · ' + drops.map(id => ITEMS[id].icon).join(' ') : ''}`);
  render();
}

function abandonActivity() {
  if (!S.activity) return;
  if (!confirm('Abandonar sem receber nada?')) return;
  addLog(`Abandonado: ${S.activity.name} (sem pagamento)`);
  S.activity = null;
  save();
  render();
}

function buyShip(tier) {
  const ship = SHIPS[tier];
  if (S.credits < ship.price || S.ship >= tier) return;
  if (levelFromXp(S.xp) < ship.lvl) { toast(`Requer nível ${ship.lvl}!`); return; }
  S.credits -= ship.price;
  S.ship = tier;
  addLog(`Nave adquirida: <b>${ship.name}</b> por ${fmtCredits(ship.price)} ₵`);
  save();
  toast(`${ship.icon} ${ship.name} é sua!`);
  if (tier === 1) setTab('missions');
  render();
}

function sellItem(id, qty) {
  const have = S.inventory[id] || 0;
  if (!have) return;
  const n = Math.min(qty, have);
  const total = ITEMS[id].value * n;
  S.inventory[id] = have - n;
  if (S.inventory[id] <= 0) delete S.inventory[id];
  S.credits += total;
  S.totalEarned += total;
  addLog(`Vendido: ${n}× ${ITEMS[id].icon} ${ITEMS[id].name} · <b>+${total} ₵</b>`);
  save();
  toast(`+${total} ₵`);
  render();
}

function sellAll() {
  const total = invTotalValue();
  if (!total) return;
  if (!confirm(`Vender todos os itens por ${fmtCredits(total)} ₵?`)) return;
  S.inventory = {};
  S.credits += total;
  S.totalEarned += total;
  addLog(`Inventário inteiro vendido · <b>+${fmtCredits(total)} ₵</b>`);
  save();
  toast(`+${fmtCredits(total)} ₵`);
  render();
}

function addLog(html) {
  const t = new Date();
  const hh = String(t.getHours()).padStart(2, '0');
  const mm = String(t.getMinutes()).padStart(2, '0');
  S.log.unshift({ t: `${hh}:${mm}`, html });
  S.log = S.log.slice(0, 12);
}

/* ================= FORMATAÇÃO ================= */

function fmtDur(min) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60), m = min % 60;
  return m ? `${h}h ${m}min` : `${h}h`;
}

function fmtCountdown(ms) {
  if (ms < 0) ms = 0;
  const s = Math.ceil(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const p = n => String(n).padStart(2, '0');
  return h ? `${h}:${p(m)}:${p(sec)}` : `${p(m)}:${p(sec)}`;
}

function fmtCredits(n) { return n.toLocaleString('pt-BR'); }

function rankName() {
  let r = RANKS[0].name;
  for (const rk of RANKS) if (S.totalEarned >= rk.at) r = rk.name;
  return r;
}

function rarityClass(r) {
  return 'r-' + r.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/* ================= UI ================= */

let tab = 'jobs';

function setTab(t) {
  if (t === 'missions' && S.ship === 0) { toast('Você precisa de uma nave primeiro!'); return; }
  tab = t;
  render();
}

function render() {
  const lv = levelFromXp(S.xp);

  document.getElementById('credits').textContent = fmtCredits(S.credits);
  document.getElementById('level').textContent = lv;
  document.getElementById('rank').textContent = rankName();
  document.getElementById('shipName').textContent =
    S.ship === 0 ? 'a pé na estação' : `${SHIPS[S.ship].icon} ${SHIPS[S.ship].name}`;
  document.getElementById('avatar').textContent = S.ship === 0 ? '🧑‍🚀' : SHIPS[S.ship].icon;

  // barra de XP
  const cur = xpForLevel(lv);
  const next = xpForLevel(lv + 1);
  const pct = ((S.xp - cur) / (next - cur)) * 100;
  document.getElementById('xpBar').style.width = pct.toFixed(1) + '%';
  document.getElementById('xpText').textContent =
    `${fmtCredits(S.xp - cur)} / ${fmtCredits(next - cur)} XP`;
  document.getElementById('xpNext').textContent =
    `faltam ${fmtCredits(next - S.xp)} XP para o nível ${lv + 1}`;

  // estatísticas
  document.getElementById('stJobs').textContent = S.jobsDone;
  document.getElementById('stMissions').textContent = S.missionsDone;
  document.getElementById('stEarned').textContent = fmtCredits(S.totalEarned);
  document.getElementById('stItems').textContent = invCount();

  document.getElementById('introBox').style.display =
    (!S.seenIntro && S.totalEarned === 0) ? 'block' : 'none';

  // abas
  for (const t of ['jobs', 'missions', 'hangar', 'inventory']) {
    const el = document.getElementById('tab-' + t);
    el.classList.toggle('on', tab === t);
    el.classList.toggle('locked', t === 'missions' && S.ship === 0);
  }
  const badge = document.getElementById('invBadge');
  const count = invCount();
  badge.style.display = count ? 'inline-block' : 'none';
  badge.textContent = count;

  renderActive();
  renderRotation();
  renderContent();
  renderLog();
}

function renderActive() {
  const panel = document.getElementById('activePanel');
  const a = S.activity;
  if (!a) { panel.style.display = 'none'; return; }
  panel.style.display = 'block';

  const now = Date.now();
  const total = a.endTs - a.startTs;
  const done = Math.min(1, (now - a.startTs) / total);
  const remaining = a.endTs - now;
  const finished = remaining <= 0;

  panel.className = 'active-panel';
  panel.innerHTML = `
    <div class="type-tag">${a.kind === 'job' ? '🔧 Serviço em andamento' : '🚀 Missão em andamento'}</div>
    <h3>${a.name}</h3>
    <div class="progress-outer"><div class="progress-inner" style="width:${(done * 100).toFixed(1)}%"></div></div>
    <div class="active-row">
      <div class="active-rewards">
        <span class="rw-pay">+${a.reward} ₵</span>
        <span class="rw-xp">+${a.xp} XP</span>
      </div>
      ${finished
        ? `<button class="collect" onclick="collectActivity()">✔ Concluir e receber</button>`
        : `<span class="countdown">⏱ ${fmtCountdown(remaining)}</span>`}
    </div>
    ${finished ? '' : `<div style="text-align:right;margin-top:10px"><button class="danger" onclick="abandonActivity()">Abandonar</button></div>`}
  `;
}

function renderRotation() {
  const el = document.getElementById('rotationNote');
  if (tab === 'hangar' || tab === 'inventory') { el.textContent = ''; return; }
  const msLeft = (hourIndex() + 1) * HOUR - Date.now();
  el.textContent = `↻ Novas ofertas em ${fmtCountdown(msLeft)}`;
}

function renderContent() {
  const c = document.getElementById('content');
  const busy = !!S.activity;
  const lv = levelFromXp(S.xp);

  if (tab === 'jobs') {
    c.innerHTML = `<div class="offers-grid">${jobOffers().map(j => offerCard(j, 'job', busy, lv)).join('')}</div>`;

  } else if (tab === 'missions') {
    const offers = missionOffers();
    c.innerHTML = offers.length
      ? `<div class="offers-grid">${offers.map(m => offerCard(m, 'mission', busy, lv)).join('')}</div>`
      : `<div class="empty-note">Nenhuma missão disponível.</div>`;

  } else if (tab === 'hangar') {
    c.innerHTML = `<div class="hangar-grid">` + SHIPS.slice(1).map(ship => {
      const owned = S.ship >= ship.tier;
      const current = S.ship === ship.tier;
      const lockedPrev = !owned && S.ship < ship.tier - 1;
      const lockedLvl = !owned && lv < ship.lvl;
      const canBuy = !owned && !lockedPrev && !lockedLvl && S.credits >= ship.price;
      return `
        <div class="card ship-card ${owned ? 'owned' : ''} ${current ? 'current' : ''}">
          <div class="info">
            <h4><span class="ship-icon">${ship.icon}</span>${ship.name} ${current ? '· <span class="owned-tag">sua nave</span>' : owned ? '· <span class="owned-tag">adquirida</span>' : ''}</h4>
            <p>${ship.desc}</p>
            ${lockedPrev ? `<p style="color:var(--red);margin-top:4px">Requer a nave anterior primeiro.</p>` : ''}
            ${!owned && ship.lvl > 1 ? `<p style="color:${lockedLvl ? 'var(--red)' : 'var(--dim)'};margin-top:4px">Requer nível ${ship.lvl}</p>` : ''}
          </div>
          ${owned ? '' : `<button class="buy" ${canBuy ? '' : 'disabled'} onclick="buyShip(${ship.tier})">${fmtCredits(ship.price)} ₵</button>`}
        </div>`;
    }).join('') + `</div>`;

  } else {
    renderInventory(c);
  }
}

function offerCard(o, kind, busy, lv) {
  const lvLocked = o.lvl && lv < o.lvl;
  return `
    <div class="card">
      <div class="info">
        <h4>${o.name}</h4>
        <p>${o.desc}</p>
      </div>
      <div class="meta">
        <span class="dur">⏱ ${fmtDur(o.min)}</span>
        <span class="pay">+${o.pay} ₵</span>
        <span class="xp">+${o.xp} XP</span>
        ${o.lvl && o.lvl > 1 ? `<span class="${lvLocked ? 'req' : ''}">Nv. ${o.lvl}+</span>` : ''}
      </div>
      <div class="actions">
        <button ${busy || lvLocked ? 'disabled' : ''} onclick='startActivity("${kind}", ${JSON.stringify(o).replace(/'/g, "&#39;")})'>${lvLocked ? `Nível ${o.lvl}` : 'Aceitar'}</button>
      </div>
    </div>`;
}

function renderInventory(c) {
  const entries = Object.entries(S.inventory);
  if (!entries.length) {
    c.innerHTML = `<div class="empty-note">🎒 Inventário vazio.<br>Serviços e missões podem render itens para vender.</div>`;
    return;
  }
  // ordena por valor (mais valioso primeiro)
  entries.sort((a, b) => ITEMS[b[0]].value - ITEMS[a[0]].value);

  const header = `
    <div class="inv-header">
      <span>${invCount()} itens · valor total <b style="color:var(--gold)">${fmtCredits(invTotalValue())} ₵</b></span>
      <button class="sell" onclick="sellAll()">Vender tudo</button>
    </div>`;

  const cards = entries.map(([id, qty]) => {
    const it = ITEMS[id];
    return `
      <div class="item-card ${rarityClass(it.rarity)}">
        <div class="item-top">
          <span class="item-icon">${it.icon}</span>
          <div>
            <div class="item-name">${it.name}</div>
            <div class="item-rarity">${it.rarity}</div>
          </div>
        </div>
        <div class="item-bottom">
          <span class="item-qty">qtd. <b>${qty}</b></span>
          <span class="item-value">${it.value} ₵ /un</span>
        </div>
        <div class="item-actions">
          <button class="sell" onclick="sellItem('${id}', 1)">Vender 1</button>
          <button class="sell" onclick="sellItem('${id}', ${qty})">Vender ${qty}</button>
        </div>
      </div>`;
  }).join('');

  c.innerHTML = header + `<div class="inv-grid">${cards}</div>`;
}

function renderLog() {
  const el = document.getElementById('log');
  el.innerHTML = S.log.length
    ? S.log.map(e => `<div class="log-entry"><span class="lt">${e.t}</span>${e.html}</div>`).join('')
    : `<div class="log-entry">Nada registrado ainda.</div>`;
}

let toastTimer = null;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

let levelupTimer = null;
function showLevelUp(lv) {
  const el = document.getElementById('levelup');
  el.innerHTML = `⭐ LEVEL UP!<br><span style="font-size:14px;color:#d0b8ff">Você alcançou o nível ${lv}</span>`;
  el.classList.add('show');
  clearTimeout(levelupTimer);
  levelupTimer = setTimeout(() => el.classList.remove('show'), 3200);
  addLog(`<span class="xpg">⭐ Subiu para o nível ${lv}!</span>`);
}

/* ================= LOOP ================= */

load();
if (S.totalEarned > 0) S.seenIntro = true;

let lastHour = hourIndex();
render();

setInterval(() => {
  const h = hourIndex();
  if (h !== lastHour) {
    lastHour = h;
    if (!S.activity) toast('↻ Novas ofertas disponíveis!');
  }
  render();
}, 1000);

window.addEventListener('beforeunload', save);
