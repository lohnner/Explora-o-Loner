'use strict';

/* ================= DADOS ================= */

const JOBS = [
  { id:'carga',    name:'Carregador de Cargas',     icon:'📦', desc:'Mover contêineres na doca 7.',             min:25,  pay:11 },
  { id:'dutos',    name:'Limpeza de Dutos',         icon:'🧹', desc:'Ninguém gosta, mas alguém tem que fazer.', min:33,  pay:14 },
  { id:'manut',    name:'Técnico de Manutenção',    icon:'🔧', desc:'Apertar parafusos no anel externo.',       min:60,  pay:26 },
  { id:'cantina',  name:'Turno na Cantina',         icon:'🍜', desc:'Servir sopa de proteína aos mineradores.', min:45,  pay:19 },
  { id:'vigia',    name:'Vigia Noturno',            icon:'🌙', desc:'Ficar de olho no depósito B.',             min:120, pay:52 },
  { id:'sucata',   name:'Triagem de Sucata',        icon:'♻️', desc:'Separar o lixo do que ainda tem valor.',   min:40,  pay:17 },
  { id:'inspec',   name:'Inspeção de Contêineres',  icon:'📋', desc:'Conferir lacres e manifestos de carga.',   min:75,  pay:33 },
  { id:'doca',     name:'Assistente de Doca',       icon:'🛬', desc:'Guiar naves na atracação.',                min:50,  pay:22 },
];

const MISSIONS = [
  { id:'taxi',     name:'Táxi Orbital',            icon:'🛰️', desc:'Levar um passageiro até a plataforma vizinha.', min:33,  pay:30,  tier:1, lvl:1,  faction:'sindicato',   loc:{ name:'Plataforma Vex',    icon:'🛰️', x:36, y:28 } },
  { id:'gelo',     name:'Coleta de Gelo',          icon:'☄️', desc:'Raspar gelo de um cometa próximo.',             min:45,  pay:40,  tier:1, lvl:2,  faction:'mineradores', loc:{ name:'Cometa Idris',      icon:'☄️', x:68, y:18 } },
  { id:'entrega',  name:'Entrega ao Cinturão',     icon:'🪨', desc:'Suprimentos para os mineradores do cinturão.',  min:70,  pay:58,  tier:1, lvl:3,  faction:'mineradores', loc:{ name:'Cinturão de Ferro', icon:'🪨', x:20, y:52 } },
  { id:'patrulha', name:'Patrulha de Rotina',      icon:'📍', desc:'Uma volta completa pelo perímetro do setor.',   min:120, pay:105, tier:1, lvl:4,  faction:'corp',        loc:{ name:'Rota de Patrulha',  icon:'📍', x:72, y:62 } },
  { id:'resgate',  name:'Resgate de Sonda',        icon:'🛠️', desc:'Recuperar uma sonda perdida à deriva.',         min:60,  pay:88,  tier:2, lvl:8,  faction:'corp',        loc:{ name:'Campo de Destroços',icon:'🛠️', x:32, y:76 } },
  { id:'escolta',  name:'Escolta de Comboio',      icon:'🌀', desc:'Proteger cargueiros até o portal de salto.',    min:90,  pay:135, tier:2, lvl:9,  faction:'corp',        loc:{ name:'Portal de Salto',   icon:'🌀', x:86, y:38 } },
  { id:'minerar',  name:'Mineração em Asteroide',  icon:'💎', desc:'Extrair minério raro num asteroide instável.',  min:150, pay:215, tier:2, lvl:11, faction:'mineradores', loc:{ name:'Asteroide X-77',    icon:'💎', x:14, y:22 } },
  { id:'corp',     name:'Contrato Corporativo',    icon:'🏢', desc:'Transporte discreto. Não faça perguntas.',      min:120, pay:290, tier:3, lvl:16, faction:'corp',        loc:{ name:'Estação Helios',    icon:'🏢', x:58, y:80 } },
  { id:'nebulosa', name:'Expedição à Nebulosa',    icon:'🔮', desc:'Coletar dados dentro da nebulosa Carmim.',      min:180, pay:410, tier:3, lvl:18, faction:'sindicato',   loc:{ name:'Nebulosa Carmim',   icon:'🔮', x:88, y:80 } },
  { id:'mapear',   name:'Mapeamento de Setor',     icon:'❓', desc:'Cartografar uma região inexplorada.',           min:240, pay:540, tier:3, lvl:20, faction:'sindicato',   loc:{ name:'Zona Inexplorada',  icon:'❓', x:10, y:84 } },
];

const SHIPS = [
  { tier:0, name:'—',               icon:'',   desc:'', price:0, lvl:0, tank:0, slots:0 },
  { tier:1, name:'Vaga-Lume',       icon:'🛸', desc:'Um cargueiro usado, cheio de remendos, mas voa. Libera missões básicas.',       price:350,  lvl:1,  tank:40,  slots:2 },
  { tier:2, name:'Falcão de Ferro', icon:'🚀', desc:'Casco reforçado e motores decentes. Libera missões de médio alcance.',          price:1500, lvl:8,  tank:70,  slots:3 },
  { tier:3, name:'Aurora Estelar',  icon:'🛰️', desc:'Uma beleza de nave. Alcança os cantos mais fundos do setor. Missões de elite.', price:6000, lvl:16, tank:120, slots:5 },
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
  sucata:      { name:'Sucata de Metal',        icon:'🔩', value:3,   rarity:'comum' },
  cabo:        { name:'Cabo Usado',             icon:'🔌', value:2,   rarity:'comum' },
  racao:       { name:'Ração Espacial',         icon:'🥫', value:2,   rarity:'comum' },
  ferramenta:  { name:'Ferramenta Gasta',       icon:'🔧', value:4,   rarity:'comum' },
  minerio:     { name:'Minério de Ferro',       icon:'🪨', value:7,   rarity:'incomum' },
  gelo:        { name:'Fragmento de Gelo',      icon:'🧊', value:5,   rarity:'incomum' },
  circuito:    { name:'Circuito Recuperado',    icon:'💾', value:10,  rarity:'incomum' },
  chapa:       { name:'Chapa de Casco',         icon:'🛡️', value:22,  rarity:'incomum' },
  liga:        { name:'Liga Reforçada',         icon:'⚙️', value:28,  rarity:'raro' },
  nucleo:      { name:'Núcleo de Sonda',        icon:'🔋', value:42,  rarity:'raro' },
  minerioRaro: { name:'Minério Raro',           icon:'💎', value:35,  rarity:'raro' },
  componente:  { name:'Componente Eletrônico',  icon:'⚡', value:32,  rarity:'raro' },
  cristal:     { name:'Cristal da Nebulosa',    icon:'🔮', value:95,  rarity:'épico' },
  dados:       { name:'Dados de Setor',         icon:'🗺️', value:120, rarity:'épico' },
  ligaTemp:    { name:'Liga Temperada',         icon:'🔗', value:110, rarity:'épico' },
  baliza:      { name:'Baliza Estelar',         icon:'📡', value:160, rarity:'épico' },
  artefato:    { name:'Artefato Antigo',        icon:'🏺', value:220, rarity:'lendário' },
};

const LOOT_JOB = ['sucata', 'cabo', 'racao', 'ferramenta'];
const LOOT_T1  = ['minerio', 'gelo', 'circuito'];
const LOOT_T2  = ['liga', 'nucleo', 'minerioRaro'];
const LOOT_T3  = ['cristal', 'dados', 'artefato'];

const RECIPES = [
  { id:'chapa',      name:'Chapa de Casco',         icon:'🛡️', out:{ item:'chapa' },      needs:{ sucata:4, ferramenta:1 },  outDesc:'1× Chapa de Casco' },
  { id:'componente', name:'Componente Eletrônico',  icon:'⚡', out:{ item:'componente' }, needs:{ cabo:2, circuito:2 },      outDesc:'1× Componente Eletrônico' },
  { id:'celula',     name:'Célula de Combustível',  icon:'⛽', out:{ fuel:15 },           needs:{ gelo:2, sucata:1 },        outDesc:'+15 de combustível' },
  { id:'ligaTemp',   name:'Liga Temperada',         icon:'🔗', out:{ item:'ligaTemp' },   needs:{ liga:2, minerioRaro:1 },   outDesc:'1× Liga Temperada' },
  { id:'baliza',     name:'Baliza Estelar',         icon:'📡', out:{ item:'baliza' },     needs:{ nucleo:1, componente:2 },  outDesc:'1× Baliza Estelar' },
];

const MODULES = [
  { id:'motor',     name:'Motor Otimizado',    icon:'🔥', effect:'−10% tempo de missão',            price:450, needs:{ chapa:2, componente:1 } },
  { id:'porao',     name:'Porão Expandido',    icon:'📦', effect:'+1 item de loot em missões',      price:400, needs:{ chapa:3 } },
  { id:'tanque',    name:'Tanque Auxiliar',    icon:'⛽', effect:'+25 de combustível máximo',       price:300, needs:{ componente:2 } },
  { id:'antena',    name:'Antena Quântica',    icon:'📡', effect:'+15% XP ganho',                   price:600, needs:{ baliza:1 } },
  { id:'refinaria', name:'Refinaria Compacta', icon:'⚗️', effect:'+20% no valor de venda de itens', price:800, needs:{ ligaTemp:2 } },
];

const FACTIONS = {
  corp:        { name:'Corporação Helios',    icon:'🏢', color:'#4fa8ff', benefit:'Desconto no hangar e módulos (−2% por nível)', rival:'sindicato' },
  mineradores: { name:'União dos Mineradores', icon:'⛏️', color:'#ffc857', benefit:'Valor de venda de itens (+2% por nível)',      rival:null },
  sindicato:   { name:'Sindicato Livre',       icon:'🕶️', color:'#b784ff', benefit:'XP ganho (+2% por nível)',                     rival:'corp' },
};

const REP_LEVELS = [
  { at:0,   name:'Desconhecido' },
  { at:10,  name:'Conhecido' },
  { at:30,  name:'Respeitado' },
  { at:60,  name:'Aliado' },
  { at:100, name:'Lendário' },
];

const DAILY_POOL = [
  { id:'helios',   name:'Carga Prioritária Helios', icon:'🏢', desc:'A Corporação precisa disto entregue ontem. Pagamento à altura.',        faction:'corp' },
  { id:'vip',      name:'Resgate VIP',              icon:'🧑‍💼', desc:'Um executivo encalhado numa cápsula de fuga. Discrição total.',          faction:'corp' },
  { id:'platina',  name:'Veio de Platina',          icon:'💠', desc:'Os Mineradores acharam um veio raro e precisam de transporte urgente.',  faction:'mineradores' },
  { id:'geleira',  name:'Colheita da Geleira',      icon:'🧊', desc:'Janela curta para extrair gelo puro de um cometa em rota de saída.',     faction:'mineradores' },
  { id:'semnome',  name:'Encomenda Sem Rótulo',     icon:'📦', desc:'O Sindicato paga bem para quem não abre a caixa.',                       faction:'sindicato' },
  { id:'fantasma', name:'Sinal Fantasma',           icon:'👻', desc:'Um sinal estranho no limite do setor. O Sindicato quer saber o que é.',  faction:'sindicato' },
];

const ACHIEVEMENTS = [
  { id:'srv1',    name:'Primeiro Turno',       desc:'Complete 1 serviço na estação',        reward:10,   cond: lv => S.jobsDone >= 1 },
  { id:'srv25',   name:'Operário Dedicado',    desc:'Complete 25 serviços',                 reward:60,   cond: lv => S.jobsDone >= 25 },
  { id:'srv100',  name:'Veterano da Estação',  desc:'Complete 100 serviços',                reward:250,  cond: lv => S.jobsDone >= 100 },
  { id:'mis1',    name:'Primeira Missão',      desc:'Complete 1 missão espacial',           reward:25,   cond: lv => S.missionsDone >= 1 },
  { id:'mis50',   name:'Piloto Veterano',      desc:'Complete 50 missões',                  reward:350,  cond: lv => S.missionsDone >= 50 },
  { id:'lvl10',   name:'Década',               desc:'Alcance o nível 10',                   reward:100,  cond: lv => lv >= 10 },
  { id:'lvl25',   name:'Quarto de Século',     desc:'Alcance o nível 25',                   reward:500,  cond: lv => lv >= 25 },
  { id:'lvl50',   name:'Meio Século',          desc:'Alcance o nível 50',                   reward:2000, cond: lv => lv >= 50 },
  { id:'rico',    name:'Primeiro Milheiro',    desc:'Acumule 1.000 ₵ ganhos no total',      reward:100,  cond: lv => S.totalEarned >= 1000 },
  { id:'magnata', name:'Magnata do Setor',     desc:'Acumule 10.000 ₵ ganhos no total',     reward:500,  cond: lv => S.totalEarned >= 10000 },
  { id:'lend',    name:'Toque Lendário',       desc:'Obtenha um item lendário',             reward:150,  cond: lv => S.flags.legendary },
  { id:'aurora',  name:'Frota Própria',        desc:'Compre a Aurora Estelar',              reward:300,  cond: lv => S.ship >= 3 },
  { id:'craft10', name:'Artesão Espacial',     desc:'Fabrique 10 itens',                    reward:120,  cond: lv => S.crafts >= 10 },
  { id:'aliado',  name:'Diplomata',            desc:'Torne-se Aliado de alguma facção',     reward:200,  cond: lv => Object.values(S.rep).some(r => r >= 60) },
  { id:'daily5',  name:'Cliente Fiel',         desc:'Complete 5 contratos diários',         reward:250,  cond: lv => S.dailiesDone >= 5 },
];

const HOUR = 3600000;
const DAY = 86400000;
const FUEL_PRICE = 2;
const SAVE_KEY = 'exploracao-loner-save';

/* ================= ESTADO ================= */

let S = {
  credits: 0,
  xp: 0,
  ship: 0,
  fuel: 0,
  totalEarned: 0,
  jobsDone: 0,
  missionsDone: 0,
  dailiesDone: 0,
  crafts: 0,
  activity: null,   // {kind, name, tier, faction, startTs, endTs, reward, xp, day?}
  inventory: {},    // {itemId: qty}
  modules: [],      // ids de módulos instalados
  rep: { corp:0, mineradores:0, sindicato:0 },
  achievements: [],
  flags: { legendary:false },
  dailyDone: -1,    // dayIndex do último contrato diário concluído
  log: [],
  seenIntro: false,
};

function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) S = Object.assign(S, JSON.parse(raw));
  } catch (e) { /* save corrompido, começa do zero */ }
  // migração de saves antigos
  if (typeof S.xp !== 'number') S.xp = 0;
  if (typeof S.fuel !== 'number') S.fuel = S.ship > 0 ? Math.round(SHIPS[S.ship].tank / 2) : 0;
  if (typeof S.dailiesDone !== 'number') S.dailiesDone = 0;
  if (typeof S.crafts !== 'number') S.crafts = 0;
  if (typeof S.dailyDone !== 'number') S.dailyDone = -1;
  if (!S.inventory) S.inventory = {};
  if (!S.modules) S.modules = [];
  if (!S.rep) S.rep = { corp:0, mineradores:0, sindicato:0 };
  if (!S.achievements) S.achievements = [];
  if (!S.flags) S.flags = { legendary:false };
  if (S.activity && typeof S.activity.xp !== 'number') {
    S.activity.xp = Math.round(S.activity.reward || 10);
    S.activity.tier = S.activity.tier || 0;
  }
}

/* ================= LEVEL (fórmula do Tibia, sem limite) ================= */

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

/* ================= REPUTAÇÃO ================= */

function repLevel(f) {
  let lvl = 0;
  for (let i = 0; i < REP_LEVELS.length; i++) if (S.rep[f] >= REP_LEVELS[i].at) lvl = i;
  return lvl;
}

function repLevelName(f) { return REP_LEVELS[repLevel(f)].name; }

function gainRep(faction, amount) {
  S.rep[faction] = (S.rep[faction] || 0) + amount;
  const rival = FACTIONS[faction].rival;
  if (rival && S.rep[rival] > 0) S.rep[rival] = Math.max(0, S.rep[rival] - 1);
}

/* ================= BÔNUS ================= */

function moduleOwned(id) { return S.modules.includes(id); }
function maxFuel() { return S.ship === 0 ? 0 : SHIPS[S.ship].tank + (moduleOwned('tanque') ? 25 : 0); }
function xpMult() { return (moduleOwned('antena') ? 1.15 : 1) * (1 + repLevel('sindicato') * 0.02); }
function sellMult() { return (moduleOwned('refinaria') ? 1.2 : 1) * (1 + repLevel('mineradores') * 0.02); }
function hangarMult() { return 1 - repLevel('corp') * 0.02; }
function shipPrice(ship) { return Math.round(ship.price * hangarMult()); }
function modulePrice(mod) { return Math.round(mod.price * hangarMult()); }

/* ================= ROTAÇÃO E MERCADO (mudam a cada hora) ================= */

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0;
  return h;
}

function hourIndex() { return Math.floor(Date.now() / HOUR); }
function dayIndex() { return Math.floor(Date.now() / DAY); }

// multiplicador de mercado do item nesta hora (0.7x a 1.4x)
function marketMult(itemId) {
  const rng = mulberry32(hourIndex() * 2654435761 + hashStr(itemId));
  return 0.7 + rng() * 0.7;
}

function sellPrice(itemId) {
  return Math.max(1, Math.round(ITEMS[itemId].value * marketMult(itemId) * sellMult()));
}

function missionFuelCost(min, tier) { return Math.round(min / 6 + tier * 4); }

function decorateOffer(item, min, pay, kind) {
  let xp;
  if (kind === 'job') {
    xp = Math.round((min * 1.2 + pay * 0.5) * xpMult());
    return { ...item, min, pay, xp };
  }
  // missões: módulos e reputação
  if (moduleOwned('motor')) min = Math.max(10, Math.round(min * 0.9));
  pay = Math.round(pay * (1 + repLevel(item.faction) * 0.05));
  xp = Math.round((min * 1.8 + pay) * (1 + 0.25 * ((item.tier || 1) - 1)) * xpMult());
  const fuel = missionFuelCost(min, item.tier || 1);
  const { loc, ...rest } = item; // loc não precisa ir no botão
  return { ...rest, min, pay, xp, fuel };
}

function currentOffers(pool, seedSalt, count, kind) {
  const rng = mulberry32(hourIndex() * 2654435761 + seedSalt);
  const shuffled = pool.slice().sort(() => rng() - 0.5);
  return shuffled.slice(0, count).map(item => {
    const durVar = 0.85 + rng() * 0.3;
    const payVar = 0.9 + rng() * 0.25;
    const min = Math.max(15, Math.round(item.min * durVar));
    const pay = Math.max(5, Math.round(item.pay * payVar));
    return decorateOffer(item, min, pay, kind);
  });
}

function jobOffers() { return currentOffers(JOBS, 17, 3, 'job'); }
function missionOffers() {
  const available = MISSIONS.filter(m => m.tier <= S.ship);
  if (!available.length) return [];
  return currentOffers(available, 91, Math.min(3, available.length), 'mission');
}

// contrato diário: um por dia, escala com o nível do jogador
function dailyContract() {
  if (S.ship === 0) return null;
  const day = dayIndex();
  const rng = mulberry32(day * 2654435761 + 777);
  const base = DAILY_POOL[Math.floor(rng() * DAILY_POOL.length)];
  const lv = levelFromXp(S.xp);
  const min = Math.round(90 + rng() * 150);
  const pay = Math.round((90 + lv * 14) * (0.9 + rng() * 0.3) * (1 + repLevel(base.faction) * 0.05));
  const tier = lv >= 16 ? 3 : lv >= 8 ? 2 : 1;
  const adjMin = moduleOwned('motor') ? Math.max(10, Math.round(min * 0.9)) : min;
  const xp = Math.round((adjMin * 1.8 + pay) * 1.4 * xpMult());
  return {
    ...base, min: adjMin, pay, xp, tier,
    lvl: 5,
    fuel: missionFuelCost(adjMin, tier),
    day,
  };
}

/* ================= LOOT ================= */

function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }

function rollLoot(kind, tier) {
  const rng = mulberry32(Date.now() & 0xffffffff);
  const drops = [];
  if (kind === 'job') {
    if (rng() < 0.5) drops.push(pick(rng, LOOT_JOB));
    if (rng() < 0.06) drops.push(pick(rng, LOOT_T1));
    return drops;
  }
  if (tier === 1) {
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
  // Porão Expandido: +1 item garantido em missões
  if (moduleOwned('porao')) {
    const pools = { 1: LOOT_T1, 2: LOOT_T2, 3: LOOT_T3 };
    drops.push(pick(rng, pools[tier] || LOOT_T1));
  }
  return drops;
}

function invCount() {
  return Object.values(S.inventory).reduce((a, b) => a + b, 0);
}

function invTotalValue() {
  return Object.entries(S.inventory).reduce((sum, [id, qty]) => sum + sellPrice(id) * qty, 0);
}

/* ================= CONQUISTAS ================= */

function checkAchievements() {
  const news = [];
  let changed = true;
  while (changed) {
    changed = false;
    const lv = levelFromXp(S.xp);
    for (const a of ACHIEVEMENTS) {
      if (!S.achievements.includes(a.id) && a.cond(lv)) {
        S.achievements.push(a.id);
        S.credits += a.reward;
        S.totalEarned += a.reward;
        news.push(a);
        changed = true;
      }
    }
  }
  for (const a of news) addLog(`🏆 Conquista: <b>${a.name}</b> · +${a.reward} ₵`);
  if (news.length) toast(`🏆 ${news[news.length - 1].name} · +${news[news.length - 1].reward} ₵`);
  return news.length > 0;
}

/* ================= AÇÕES ================= */

function startActivity(kind, offer) {
  if (S.activity) return;
  if (offer.lvl && levelFromXp(S.xp) < offer.lvl) { toast(`Requer nível ${offer.lvl}!`); return; }
  if (kind !== 'job') {
    if (kind === 'daily' && S.dailyDone === offer.day) { toast('Contrato de hoje já concluído!'); return; }
    if (S.fuel < offer.fuel) { toast(`Combustível insuficiente (precisa de ${offer.fuel} ⛽)`); return; }
    S.fuel -= offer.fuel;
  }
  const now = Date.now();
  S.activity = {
    kind,
    name: offer.name,
    icon: offer.icon || null,
    tier: offer.tier || 0,
    faction: offer.faction || null,
    day: offer.day,
    startTs: now,
    endTs: now + offer.min * 60000,
    reward: offer.pay,
    xp: offer.xp,
  };
  S.seenIntro = true;
  const label = kind === 'job' ? 'Serviço' : kind === 'daily' ? 'Contrato diário' : 'Missão';
  addLog(`${label} iniciado: ${offer.name} (${fmtDur(offer.min)})`);
  save();
  render();
}

function collectActivity() {
  const a = S.activity;
  if (!a || Date.now() < a.endTs) return;
  S.credits += a.reward;
  S.totalEarned += a.reward;

  if (a.kind === 'job') {
    S.jobsDone++;
  } else {
    S.missionsDone++;
    if (a.kind === 'daily') {
      S.dailiesDone++;
      if (typeof a.day === 'number') S.dailyDone = a.day;
    }
    if (a.faction) gainRep(a.faction, a.kind === 'daily' ? 5 : 1 + a.tier);
  }

  const leveled = gainXp(a.xp);
  const drops = rollLoot(a.kind === 'job' ? 'job' : 'mission', a.tier || 1);
  for (const id of drops) {
    S.inventory[id] = (S.inventory[id] || 0) + 1;
    if (ITEMS[id].rarity === 'lendário') S.flags.legendary = true;
  }

  const dropTxt = drops.length
    ? ' · ' + drops.map(id => `${ITEMS[id].icon} ${ITEMS[id].name}`).join(', ')
    : '';
  const label = a.kind === 'job' ? 'Serviço' : a.kind === 'daily' ? 'Contrato diário' : 'Missão';
  addLog(`${label} concluído: ${a.name} · <b>+${a.reward} ₵</b> · <span class="xpg">+${a.xp} XP</span>${dropTxt}`);

  S.activity = null;
  const gotAch = checkAchievements();
  save();
  if (!leveled && !gotAch) toast(`+${a.reward} ₵ · +${a.xp} XP${drops.length ? ' · ' + drops.map(id => ITEMS[id].icon).join(' ') : ''}`);
  render();
}

function abandonActivity() {
  if (!S.activity) return;
  const wasFlight = S.activity.kind !== 'job';
  if (!confirm(`Abandonar sem receber nada?${wasFlight ? ' O combustível gasto não volta.' : ''}`)) return;
  addLog(`Abandonado: ${S.activity.name} (sem pagamento)`);
  S.activity = null;
  save();
  render();
}

function buyShip(tier) {
  const ship = SHIPS[tier];
  const price = shipPrice(ship);
  if (S.credits < price || S.ship >= tier) return;
  if (levelFromXp(S.xp) < ship.lvl) { toast(`Requer nível ${ship.lvl}!`); return; }
  S.credits -= price;
  S.ship = tier;
  S.fuel = Math.min(maxFuel(), Math.max(S.fuel, Math.round(ship.tank / 2)));
  addLog(`Nave adquirida: <b>${ship.name}</b> por ${fmtCredits(price)} ₵`);
  checkAchievements();
  save();
  toast(`${ship.icon} ${ship.name} é sua!`);
  if (tier === 1) setTab('missions');
  render();
}

function buyFuel(qty) {
  const room = maxFuel() - S.fuel;
  if (room <= 0) { toast('Tanque cheio!'); return; }
  const n = Math.min(qty, room, Math.floor(S.credits / FUEL_PRICE));
  if (n <= 0) { toast('Créditos insuficientes!'); return; }
  S.credits -= n * FUEL_PRICE;
  S.fuel += n;
  addLog(`Abastecido: +${n} ⛽ por ${n * FUEL_PRICE} ₵`);
  save();
  render();
}

function buyModule(id) {
  const mod = MODULES.find(m => m.id === id);
  if (!mod || moduleOwned(id)) return;
  if (S.ship === 0) { toast('Você precisa de uma nave!'); return; }
  if (S.modules.length >= SHIPS[S.ship].slots) { toast('Sem slots livres nesta nave!'); return; }
  const price = modulePrice(mod);
  if (S.credits < price) { toast('Créditos insuficientes!'); return; }
  for (const [itemId, need] of Object.entries(mod.needs)) {
    if ((S.inventory[itemId] || 0) < need) { toast(`Falta: ${ITEMS[itemId].name}`); return; }
  }
  S.credits -= price;
  for (const [itemId, need] of Object.entries(mod.needs)) {
    S.inventory[itemId] -= need;
    if (S.inventory[itemId] <= 0) delete S.inventory[itemId];
  }
  S.modules.push(id);
  addLog(`Módulo instalado: <b>${mod.icon} ${mod.name}</b>`);
  save();
  toast(`${mod.icon} ${mod.name} instalado!`);
  render();
}

function craft(recipeId) {
  const r = RECIPES.find(x => x.id === recipeId);
  if (!r) return;
  for (const [itemId, need] of Object.entries(r.needs)) {
    if ((S.inventory[itemId] || 0) < need) { toast(`Falta: ${ITEMS[itemId].name}`); return; }
  }
  if (r.out.fuel && maxFuel() === 0) { toast('Você precisa de uma nave para usar combustível!'); return; }
  for (const [itemId, need] of Object.entries(r.needs)) {
    S.inventory[itemId] -= need;
    if (S.inventory[itemId] <= 0) delete S.inventory[itemId];
  }
  S.crafts++;
  if (r.out.item) {
    S.inventory[r.out.item] = (S.inventory[r.out.item] || 0) + 1;
    addLog(`Fabricado: ${r.icon} <b>${r.name}</b>`);
    toast(`${r.icon} ${r.name} fabricado!`);
  } else if (r.out.fuel) {
    const gained = Math.min(r.out.fuel, maxFuel() - S.fuel);
    S.fuel += gained;
    addLog(`Fabricado: ${r.icon} Célula de Combustível · +${gained} ⛽`);
    toast(`⛽ +${gained} combustível!`);
  }
  checkAchievements();
  save();
  render();
}

function sellItem(id, qty) {
  const have = S.inventory[id] || 0;
  if (!have) return;
  const n = Math.min(qty, have);
  const total = sellPrice(id) * n;
  S.inventory[id] = have - n;
  if (S.inventory[id] <= 0) delete S.inventory[id];
  S.credits += total;
  S.totalEarned += total;
  addLog(`Vendido: ${n}× ${ITEMS[id].icon} ${ITEMS[id].name} · <b>+${total} ₵</b>`);
  checkAchievements();
  save();
  toast(`+${total} ₵`);
  render();
}

function sellAll() {
  const total = invTotalValue();
  if (!total) return;
  if (!confirm(`Vender todos os itens por ${fmtCredits(total)} ₵ (preços de mercado desta hora)?`)) return;
  S.inventory = {};
  S.credits += total;
  S.totalEarned += total;
  addLog(`Inventário inteiro vendido · <b>+${fmtCredits(total)} ₵</b>`);
  checkAchievements();
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

function factionChip(f) {
  const fx = FACTIONS[f];
  return `<span class="faction-chip" style="color:${fx.color}">${fx.icon} ${fx.name}</span>`;
}

/* ================= UI ================= */

let tab = 'jobs';
let mapSel = null;

function setTab(t) {
  if (t === 'missions' && S.ship === 0) { toast('Você precisa de uma nave primeiro!'); return; }
  tab = t;
  render();
}

function selectLoc(id) {
  mapSel = mapSel === id ? null : id;
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

  // combustível
  const fuelRow = document.getElementById('fuelRow');
  if (S.ship > 0) {
    fuelRow.style.display = 'flex';
    const mx = maxFuel();
    document.getElementById('fuelBar').style.width = (mx ? (S.fuel / mx) * 100 : 0).toFixed(1) + '%';
    document.getElementById('fuelText').textContent = `${S.fuel}/${mx}`;
  } else {
    fuelRow.style.display = 'none';
  }

  // estatísticas
  document.getElementById('stJobs').textContent = S.jobsDone;
  document.getElementById('stMissions').textContent = S.missionsDone;
  document.getElementById('stEarned').textContent = fmtCredits(S.totalEarned);
  document.getElementById('stItems').textContent = invCount();

  document.getElementById('introBox').style.display =
    (!S.seenIntro && S.totalEarned === 0) ? 'block' : 'none';

  // abas
  for (const t of ['jobs', 'missions', 'map', 'hangar', 'inventory', 'profile']) {
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
  const label = a.kind === 'job' ? '🔧 Serviço em andamento'
    : a.kind === 'daily' ? '⭐ Contrato diário em andamento'
    : '🚀 Missão em andamento';

  panel.className = 'active-panel';
  panel.innerHTML = `
    <div class="active-head">
      <span class="active-emoji">${a.icon || (a.kind === 'job' ? '🔧' : '🚀')}</span>
      <div>
        <div class="type-tag">${label}</div>
        <h3>${a.name}</h3>
      </div>
    </div>
    <div class="progress-outer"><div class="progress-inner" style="width:${(done * 100).toFixed(1)}%"></div></div>
    <div class="active-row">
      <div class="active-rewards">
        <span class="chip chip-pay">+${a.reward} ₵</span>
        <span class="chip chip-xp">+${a.xp} XP</span>
        ${a.faction ? `<span class="chip">${factionChip(a.faction)}</span>` : ''}
      </div>
      ${finished
        ? `<button class="collect" onclick="collectActivity()">✔ Concluir e receber</button>`
        : `<span class="countdown">⏱ ${fmtCountdown(remaining)}</span>`}
    </div>
    ${finished ? '' : `<div style="text-align:right;margin-top:10px"><button class="danger" onclick="abandonActivity()">Abandonar</button></div>`}
  `;
}

const TAB_DESCS = {
  jobs: 'Trabalhos na estação — não exigem nave. Pagam pouco, mas sempre tem algo.',
  missions: 'Contratos espaciais — exigem nave e combustível. Pagam mais e dão reputação.',
  map: 'Visão do setor — locais com anel verde têm contratos disponíveis agora.',
  hangar: 'Compre naves, abasteça o tanque e instale módulos de melhoria.',
  inventory: 'Venda seu loot (preços mudam a cada hora) e fabrique peças.',
  profile: 'Sua reputação com as facções do setor e suas conquistas.',
};

function renderRotation() {
  document.getElementById('tabDesc').textContent = TAB_DESCS[tab] || '';
  const el = document.getElementById('rotationNote');
  if (!['jobs', 'missions', 'map', 'inventory'].includes(tab)) { el.textContent = ''; return; }
  const msLeft = (hourIndex() + 1) * HOUR - Date.now();
  const what = tab === 'inventory' ? 'preços mudam' : 'novas ofertas';
  el.textContent = `↻ ${what} em ${fmtCountdown(msLeft)}`;
}

function renderContent() {
  const c = document.getElementById('content');
  const busy = !!S.activity;
  const lv = levelFromXp(S.xp);

  if (tab === 'jobs') {
    c.innerHTML = `<div class="offers-grid">${jobOffers().map(j => offerCard(j, 'job', busy, lv)).join('')}</div>`;
  } else if (tab === 'missions') {
    renderMissions(c, busy, lv);
  } else if (tab === 'map') {
    renderMap(c, busy, lv);
  } else if (tab === 'hangar') {
    renderHangar(c, lv);
  } else if (tab === 'inventory') {
    renderInventory(c);
  } else {
    renderProfile(c, lv);
  }
}

function renderMissions(c, busy, lv) {
  let html = '';

  // combustível rápido
  html += fuelStationHtml();

  // contrato diário
  const daily = dailyContract();
  if (daily) {
    if (S.dailyDone === daily.day) {
      const msLeft = (daily.day + 1) * DAY - Date.now();
      html += `<div class="daily-done">⭐ <b>Contrato diário concluído.</b> Um novo aparece em ${fmtCountdown(msLeft)}.</div>`;
    } else {
      html += offerCard(daily, 'daily', busy, lv, true);
    }
  }

  const offers = missionOffers();
  html += offers.length
    ? `<div class="offers-grid">${offers.map(m => offerCard(m, 'mission', busy, lv)).join('')}</div>`
    : `<div class="empty-note">Nenhuma missão disponível.</div>`;

  c.innerHTML = html;
}

function fuelStationHtml() {
  if (S.ship === 0) return '';
  const mx = maxFuel();
  const fillCost = (mx - S.fuel) * FUEL_PRICE;
  return `
    <div class="fuel-station">
      <span class="fs-info">⛽ Combustível: <b>${S.fuel}/${mx}</b> · ${FUEL_PRICE} ₵ por unidade</span>
      <span class="fs-actions">
        <button class="fuel-btn" ${S.fuel >= mx ? 'disabled' : ''} onclick="buyFuel(10)">+10 (${10 * FUEL_PRICE} ₵)</button>
        <button class="fuel-btn" ${S.fuel >= mx ? 'disabled' : ''} onclick="buyFuel(${mx - S.fuel})">Encher (${fmtCredits(fillCost)} ₵)</button>
      </span>
    </div>`;
}

function renderMap(c, busy, lv) {
  const offers = missionOffers();
  const offerById = {};
  for (const o of offers) offerById[o.id] = o;

  const locs = MISSIONS.map(m => {
    let status;
    if (offerById[m.id] && lv >= m.lvl) status = 'open';
    else if (m.tier <= S.ship) status = 'idle';
    else status = 'locked';
    const sel = mapSel === m.id ? ' selected' : '';
    return `
      <div class="map-loc ${status}${sel}" style="left:${m.loc.x}%;top:${m.loc.y}%" onclick="selectLoc('${m.id}')">
        <span class="loc-icon">${m.loc.icon}</span>
        <span class="loc-name">${m.loc.name}</span>
      </div>`;
  }).join('');

  let detail = '';
  if (mapSel) {
    const m = MISSIONS.find(x => x.id === mapSel);
    const offer = offerById[m.id];
    if (offer && lv >= m.lvl) {
      detail = `<div class="map-detail">${offerCard(offer, 'mission', busy, lv)}</div>`;
    } else if (m.tier > S.ship) {
      const needShip = SHIPS.find(s => s.tier === m.tier);
      detail = `<div class="map-detail"><div class="daily-done">🔒 <b>${m.loc.name}</b> — fora do alcance da sua nave. Requer <b>${needShip.icon} ${needShip.name}</b>.</div></div>`;
    } else if (lv < m.lvl) {
      detail = `<div class="map-detail"><div class="daily-done">🔒 <b>${m.loc.name}</b> — ${m.name} requer <b>nível ${m.lvl}</b>.</div></div>`;
    } else {
      const msLeft = (hourIndex() + 1) * HOUR - Date.now();
      detail = `<div class="map-detail"><div class="daily-done">📭 <b>${m.loc.name}</b> — sem contratos nesta rotação. Novas ofertas em <b>${fmtCountdown(msLeft)}</b>.</div></div>`;
    }
  }

  c.innerHTML = `
    <div class="map-box">
      <div class="map-station"><span class="st-icon">🛰️</span><span class="st-name">PONTO ZERO</span></div>
      ${locs}
    </div>
    ${detail}
    <div class="map-hint">${S.ship === 0
      ? '🔒 Compre uma nave no Hangar para voar até esses destinos.'
      : 'Pontos com anel verde têm contratos disponíveis nesta rotação. Clique para ver.'}</div>`;
}

function renderHangar(c, lv) {
  let html = '';

  // naves
  const discount = repLevel('corp') > 0;
  html += `<div class="hangar-grid">` + SHIPS.slice(1).map(ship => {
    const owned = S.ship >= ship.tier;
    const current = S.ship === ship.tier;
    const lockedPrev = !owned && S.ship < ship.tier - 1;
    const lockedLvl = !owned && lv < ship.lvl;
    const price = shipPrice(ship);
    const canBuy = !owned && !lockedPrev && !lockedLvl && S.credits >= price;
    return `
      <div class="card ship-card ${owned ? 'owned' : ''} ${current ? 'current' : ''}">
        <div class="info">
          <h4><span class="ship-icon">${ship.icon}</span>${ship.name} ${current ? '· <span class="owned-tag">sua nave</span>' : owned ? '· <span class="owned-tag">adquirida</span>' : ''}</h4>
          <p>${ship.desc}</p>
          <p style="color:var(--dim);margin-top:4px">⛽ Tanque: ${ship.tank} · 🔧 Slots de módulo: ${ship.slots}</p>
          ${lockedPrev ? `<p style="color:var(--red);margin-top:4px">Requer a nave anterior primeiro.</p>` : ''}
          ${!owned && ship.lvl > 1 ? `<p style="color:${lockedLvl ? 'var(--red)' : 'var(--dim)'};margin-top:4px">Requer nível ${ship.lvl}</p>` : ''}
        </div>
        ${owned ? '' : `<button class="buy" ${canBuy ? '' : 'disabled'} onclick="buyShip(${ship.tier})">${fmtCredits(price)} ₵${discount && price < ship.price ? ' 🏢' : ''}</button>`}
      </div>`;
  }).join('') + `</div>`;

  // posto de combustível
  if (S.ship > 0) {
    html += `<div class="section-title">⛽ Posto de abastecimento</div>`;
    html += fuelStationHtml();
  }

  // módulos
  if (S.ship > 0) {
    const slots = SHIPS[S.ship].slots;
    html += `<div class="section-title">🔧 Oficina de módulos</div>`;
    html += `<div class="slots-note">Slots usados: <b>${S.modules.length}/${slots}</b> — módulos exigem créditos e peças fabricadas (aba Itens).</div>`;
    html += `<div class="module-grid">` + MODULES.map(mod => {
      const owned = moduleOwned(mod.id);
      const price = modulePrice(mod);
      const partsOk = Object.entries(mod.needs).every(([id, n]) => (S.inventory[id] || 0) >= n);
      const canBuy = !owned && S.modules.length < slots && S.credits >= price && partsOk;
      const needsHtml = Object.entries(mod.needs).map(([id, n]) => {
        const have = S.inventory[id] || 0;
        return `<span class="need ${have >= n ? 'ok' : 'missing'}">${ITEMS[id].icon} ${ITEMS[id].name} ${have}/${n}</span>`;
      }).join('');
      return `
        <div class="module-card ${owned ? 'installed' : ''}">
          <div class="module-top">
            <span class="m-icon">${mod.icon}</span>
            <div>
              <h5>${mod.name} ${owned ? '· <span class="owned-tag">instalado</span>' : ''}</h5>
              <div class="module-effect">${mod.effect}</div>
            </div>
          </div>
          ${owned ? '' : `<div class="recipe-needs">${needsHtml}</div>
          <div class="actions" style="display:flex;justify-content:flex-end">
            <button class="buy" ${canBuy ? '' : 'disabled'} onclick="buyModule('${mod.id}')">${fmtCredits(price)} ₵</button>
          </div>`}
        </div>`;
    }).join('') + `</div>`;
  }

  c.innerHTML = html;
}

function offerCard(o, kind, busy, lv, isDaily) {
  const lvLocked = o.lvl && lv < o.lvl;
  const isFlight = kind !== 'job';
  const noFuel = isFlight && S.fuel < o.fuel;
  const disabled = busy || lvLocked || noFuel;
  const btnLabel = busy ? 'Ocupado' : lvLocked ? `Requer nível ${o.lvl}` : noFuel ? 'Sem combustível ⛽' : 'Aceitar';
  return `
    <div class="card ${isDaily ? 'daily-card' : ''}">
      ${isDaily ? '<div class="daily-tag">⭐ Contrato diário — recompensa especial</div>' : ''}
      <div class="offer-head">
        <span class="offer-icon">${o.icon || (isFlight ? '🚀' : '🔧')}</span>
        <div>
          <h4>${o.name}</h4>
          <p>${o.desc}</p>
        </div>
      </div>
      <div class="chips">
        <span class="chip chip-time">⏱ ${fmtDur(o.min)}</span>
        <span class="chip chip-pay">+${fmtCredits(o.pay)} ₵</span>
        <span class="chip chip-xp">+${fmtCredits(o.xp)} XP</span>
        ${isFlight ? `<span class="chip chip-fuel">⛽ ${o.fuel}</span>` : ''}
        ${o.lvl && o.lvl > 1 ? `<span class="chip chip-lvl ${lvLocked ? 'req' : ''}">Nv. ${o.lvl}+</span>` : ''}
      </div>
      <div class="offer-foot">
        ${o.faction ? factionChip(o.faction) : '<span></span>'}
        <button class="accept" ${disabled ? 'disabled' : ''} onclick='startActivity("${kind}", ${JSON.stringify(o).replace(/'/g, "&#39;")})'>${btnLabel}</button>
      </div>
    </div>`;
}

function renderInventory(c) {
  let html = '';
  const entries = Object.entries(S.inventory);

  if (!entries.length) {
    html += `<div class="empty-note">🎒 Inventário vazio.<br>Serviços e missões podem render itens para vender ou fabricar.</div>`;
  } else {
    entries.sort((a, b) => sellPrice(b[0]) - sellPrice(a[0]));
    const bonusTxt = [];
    if (moduleOwned('refinaria')) bonusTxt.push('⚗️ Refinaria +20%');
    if (repLevel('mineradores') > 0) bonusTxt.push(`⛏️ Mineradores +${repLevel('mineradores') * 2}%`);
    html += `
      <div class="inv-header">
        <span>${invCount()} itens · valor de mercado <b style="color:var(--gold)">${fmtCredits(invTotalValue())} ₵</b></span>
        <button class="sell" onclick="sellAll()">Vender tudo</button>
      </div>
      <div class="market-note">📈 Os preços flutuam a cada hora. Setas mostram o mercado atual vs. valor base.${bonusTxt.length ? ' Bônus: ' + bonusTxt.join(' · ') : ''}</div>`;

    const cards = entries.map(([id, qty]) => {
      const it = ITEMS[id];
      const price = sellPrice(id);
      const mult = marketMult(id);
      const trend = mult > 1.05 ? `<span class="trend-up">▲</span>` : mult < 0.95 ? `<span class="trend-down">▼</span>` : `<span class="trend-flat">▬</span>`;
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
            <span class="item-value">${trend} ${price} ₵ /un</span>
          </div>
          <div class="item-actions">
            <button class="sell" onclick="sellItem('${id}', 1)">Vender 1</button>
            <button class="sell" onclick="sellItem('${id}', ${qty})">Vender ${qty}</button>
          </div>
        </div>`;
    }).join('');
    html += `<div class="inv-grid">${cards}</div>`;
  }

  // fabricação
  html += `<div class="section-title">🔨 Fabricação</div>`;
  html += `<div class="recipe-grid">` + RECIPES.map(r => {
    const canCraft = Object.entries(r.needs).every(([id, n]) => (S.inventory[id] || 0) >= n)
      && !(r.out.fuel && maxFuel() === 0);
    const needsHtml = Object.entries(r.needs).map(([id, n]) => {
      const have = S.inventory[id] || 0;
      return `<span class="need ${have >= n ? 'ok' : 'missing'}">${ITEMS[id].icon} ${ITEMS[id].name} ${have}/${n}</span>`;
    }).join('');
    return `
      <div class="recipe-card">
        <div class="recipe-top">
          <span class="r-icon">${r.icon}</span>
          <div>
            <h5>${r.name}</h5>
            <div class="r-out">Produz: ${r.outDesc}</div>
          </div>
        </div>
        <div class="recipe-needs">${needsHtml}</div>
        <div class="actions">
          <button class="accept" ${canCraft ? '' : 'disabled'} onclick="craft('${r.id}')">Fabricar</button>
        </div>
      </div>`;
  }).join('') + `</div>`;

  c.innerHTML = html;
}

function renderProfile(c, lv) {
  let html = '';

  // estatísticas
  html += `<div class="profile-stats">
    <div class="pstat"><b>${lv}</b><span>nível</span></div>
    <div class="pstat"><b>${fmtCredits(S.xp)}</b><span>XP total</span></div>
    <div class="pstat"><b>${S.dailiesDone}</b><span>contratos diários</span></div>
    <div class="pstat"><b>${S.crafts}</b><span>fabricações</span></div>
    <div class="pstat"><b>${S.modules.length}</b><span>módulos</span></div>
    <div class="pstat"><b>${S.achievements.length}/${ACHIEVEMENTS.length}</b><span>conquistas</span></div>
  </div>`;

  // reputação
  html += `<div class="section-title">🤝 Reputação</div>`;
  html += Object.entries(FACTIONS).map(([id, f]) => {
    const rep = S.rep[id] || 0;
    const lvl = repLevel(id);
    const nextThreshold = lvl < REP_LEVELS.length - 1 ? REP_LEVELS[lvl + 1].at : null;
    const prevThreshold = REP_LEVELS[lvl].at;
    const pct = nextThreshold
      ? ((rep - prevThreshold) / (nextThreshold - prevThreshold)) * 100
      : 100;
    return `
      <div class="rep-card">
        <div class="rep-head">
          <h4>${f.icon} ${f.name}</h4>
          <span class="rep-level" style="color:${f.color}">${REP_LEVELS[lvl].name}</span>
        </div>
        <div class="rep-outer"><div class="rep-inner" style="width:${pct.toFixed(1)}%;background:${f.color}"></div></div>
        <div style="display:flex;justify-content:space-between">
          <span class="rep-benefit">${f.benefit} · missões da facção pagam +5%/nível</span>
          <span class="rep-pts">${rep}${nextThreshold ? ' / ' + nextThreshold : ' (máx)'}</span>
        </div>
      </div>`;
  }).join('');

  // conquistas
  html += `<div class="section-title">🏆 Conquistas (${S.achievements.length}/${ACHIEVEMENTS.length})</div>`;
  html += `<div class="ach-grid">` + ACHIEVEMENTS.map(a => {
    const done = S.achievements.includes(a.id);
    return `
      <div class="ach-card ${done ? 'done' : ''}">
        <span class="ach-check">${done ? '✅' : '🔒'}</span>
        <div class="ach-info">
          <h5>${a.name}</h5>
          <p>${a.desc}</p>
        </div>
        <span class="ach-reward">+${a.reward} ₵</span>
      </div>`;
  }).join('') + `</div>`;

  c.innerHTML = html;
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
checkAchievements();
save();

let lastHour = hourIndex();
render();

setInterval(() => {
  const h = hourIndex();
  if (h !== lastHour) {
    lastHour = h;
    if (!S.activity) toast('↻ Novas ofertas e preços de mercado!');
  }
  render();
}, 1000);

window.addEventListener('beforeunload', save);
