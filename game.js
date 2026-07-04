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
  { id:'mensagem', name:'Mensageiro da Estação',    icon:'📨', desc:'Entregar recados entre os anéis da estação.', min:20, pay:9 },
  { id:'hidro',    name:'Jardineiro de Hidroponia', icon:'🌱', desc:'Cuidar das plantações do anel agrícola.',  min:55,  pay:24 },
  { id:'reator',   name:'Auxiliar de Reator',       icon:'☢️', desc:'Monitorar os níveis do núcleo. Sem tocar em nada.', min:90, pay:41 },
  { id:'arquivo',  name:'Arquivista de Registros',  icon:'🗄️', desc:'Organizar manifestos antigos no arquivo central.', min:35, pay:15 },
];

const MISSIONS = [
  { id:'taxi',     name:'Táxi Orbital',            icon:'🛰️', desc:'Levar um passageiro até a plataforma vizinha.', min:33,  pay:30,  tier:1, lvl:1,  faction:'sindicato',   loc:{ name:'Plataforma Vex',    icon:'🛰️', x:36, y:28 } },
  { id:'gelo',     name:'Coleta de Gelo',          icon:'☄️', desc:'Raspar gelo de um cometa próximo.',             min:45,  pay:40,  tier:1, lvl:2,  faction:'mineradores', loc:{ name:'Cometa Idris',      icon:'☄️', x:68, y:18 } },
  { id:'entrega',  name:'Entrega ao Cinturão',     icon:'🪨', desc:'Suprimentos para os mineradores do cinturão.',  min:70,  pay:58,  tier:1, lvl:3,  faction:'mineradores', loc:{ name:'Cinturão de Ferro', icon:'🪨', x:20, y:52 } },
  { id:'patrulha', name:'Patrulha de Rotina',      icon:'📍', desc:'Uma volta completa pelo perímetro do setor.',   min:120, pay:105, tier:1, lvl:4,  faction:'corp',        loc:{ name:'Rota de Patrulha',  icon:'📍', x:72, y:62 } },
  { id:'satelite', name:'Reparo de Satélite',      icon:'📡', desc:'Trocar as placas queimadas de um satélite de comunicação.', min:55, pay:48, tier:1, lvl:5, faction:'corp', loc:{ name:'Satélite Kilo', icon:'📡', x:52, y:12 } },
  { id:'resgate',  name:'Resgate de Sonda',        icon:'🛠️', desc:'Recuperar uma sonda perdida à deriva.',         min:60,  pay:88,  tier:2, lvl:8,  faction:'corp',        loc:{ name:'Campo de Destroços',icon:'🛠️', x:32, y:76 } },
  { id:'escolta',  name:'Escolta de Comboio',      icon:'🌀', desc:'Proteger cargueiros até o portal de salto.',    min:90,  pay:135, tier:2, lvl:9,  faction:'corp',        loc:{ name:'Portal de Salto',   icon:'🌀', x:86, y:38 } },
  { id:'minerar',  name:'Mineração em Asteroide',  icon:'💎', desc:'Extrair minério raro num asteroide instável.',  min:150, pay:215, tier:2, lvl:11, faction:'mineradores', loc:{ name:'Asteroide X-77',    icon:'💎', x:14, y:22 } },
  { id:'contrab',  name:'Rastrear Contrabando',    icon:'🕶️', desc:'Seguir uma carga suspeita sem ser visto.',      min:110, pay:160, tier:2, lvl:12, faction:'sindicato',   loc:{ name:'Rota Sombria',      icon:'🕶️', x:8,  y:45 } },
  { id:'lab',      name:'Suprimentos ao Laboratório', icon:'🧪', desc:'Levar amostras congeladas ao laboratório orbital.', min:130, pay:185, tier:2, lvl:13, faction:'corp', loc:{ name:'Lab Órbita Alta',  icon:'🧪', x:92, y:58 } },
  { id:'corp',     name:'Contrato Corporativo',    icon:'🏢', desc:'Transporte discreto. Não faça perguntas.',      min:120, pay:290, tier:3, lvl:16, faction:'corp',        loc:{ name:'Estação Helios',    icon:'🏢', x:58, y:80 } },
  { id:'nebulosa', name:'Expedição à Nebulosa',    icon:'🔮', desc:'Coletar dados dentro da nebulosa Carmim.',      min:180, pay:410, tier:3, lvl:18, faction:'sindicato',   loc:{ name:'Nebulosa Carmim',   icon:'🔮', x:88, y:80 } },
  { id:'mapear',   name:'Mapeamento de Setor',     icon:'❓', desc:'Cartografar uma região inexplorada.',           min:240, pay:540, tier:3, lvl:20, faction:'sindicato',   loc:{ name:'Zona Inexplorada',  icon:'❓', x:10, y:84 } },
  { id:'colonia',  name:'Abastecer a Colônia',     icon:'🏜️', desc:'A colônia Nova Duna depende dessa entrega.',    min:200, pay:460, tier:3, lvl:22, faction:'mineradores', loc:{ name:'Nova Duna',         icon:'🏜️', x:24, y:88 } },
  { id:'anomalia', name:'Sondar a Anomalia',       icon:'🌌', desc:'Algo distorce o espaço perto da estação. Chegue perto. Não muito.', min:300, pay:700, tier:3, lvl:25, faction:'sindicato', loc:{ name:'Anomalia Delta', icon:'🌌', x:30, y:40 } },
  { id:'titan',    name:'Comboio Titã',            icon:'🚛', desc:'Liderar o maior comboio de carga do semestre.', min:240, pay:950, tier:4, lvl:26, faction:'corp',        loc:{ name:'Estaleiro Titã',    icon:'🚛', x:70, y:90 } },
  { id:'vazio',    name:'Expedição ao Vazio',      icon:'🕳️', desc:'Além da última estrela do setor não há mapas. Só rumores.', min:360, pay:1200, tier:4, lvl:28, faction:'sindicato', loc:{ name:'O Vazio', icon:'🕳️', x:90, y:12 } },
];

const LORE = {
  taxi:     'A Vex já foi um cassino orbital famoso. Hoje é parada obrigatória de quem não pode pagar hotel na estação.',
  gelo:     'Idris visita o setor a cada 4 anos. Seu gelo é o combustível de fusão mais puro da região.',
  entrega:  'Milhares de mineradores vivem no Cinturão. Dizem que quem nasce lá reconhece minério pelo cheiro.',
  patrulha: 'A rota traça o perímetro seguro do setor. Além dela, a Corporação não garante socorro.',
  satelite: 'Kilo retransmite toda a comunicação do setor. Há décadas ninguém lembra quem o instalou.',
  resgate:  'Restos da Batalha de Ponto Zero, 40 anos atrás. Ainda há sinais de vida ocasionais entre os cascos.',
  escolta:  'O único portal do setor. Quem controla o Portal, controla o comércio — por isso todos o vigiam.',
  minerar:  'O X-77 gira rápido demais para mineração segura. O minério raro compensa o risco. Geralmente.',
  contrab:  'Corredor cego dos radares. O Sindicato cobra pedágio — a Corporação finge que não existe.',
  lab:      'O laboratório estuda amostras da Anomalia. Os cientistas trocam de turno a cada 30 dias. Ninguém estende.',
  corp:     'Sede da Corporação no setor. Os andares superiores não aparecem em nenhuma planta oficial.',
  nebulosa: 'A poeira vermelha da Carmim engole sinais de rádio. O que acontece lá dentro, fica lá dentro.',
  mapear:   'Os mapas terminam aqui. Os cartógrafos que avançaram além voltaram com coordenadas que não fecham.',
  colonia:  'Fundada por famílias que fugiram das dívidas da Corporação. Orgulhosa, pobre e livre.',
  anomalia: 'Apareceu há 3 anos. Instrumentos falham perto dela. As leituras sugerem que ela... observa.',
  titan:    'Onde nascem os cargueiros-colônia. O martelo hidráulico do Titã é ouvido pelo rádio a um setor de distância.',
  vazio:    'Além da última estrela não há nada — é o que dizem os que nunca foram. Os que foram não dizem nada.',
};

const SHIPS = [
  { tier:0, name:'—',               icon:'',   desc:'', price:0, lvl:0, tank:0, slots:0 },
  { tier:1, name:'Vaga-Lume',       icon:'🛸', desc:'Um cargueiro usado, cheio de remendos, mas voa. Libera missões básicas.',       price:350,  lvl:1,  tank:40,  slots:2 },
  { tier:2, name:'Falcão de Ferro', icon:'🚀', desc:'Casco reforçado e motores decentes. Libera missões de médio alcance.',          price:1500, lvl:8,  tank:70,  slots:3 },
  { tier:3, name:'Aurora Estelar',  icon:'🛰️', desc:'Uma beleza de nave. Alcança os cantos mais fundos do setor. Missões de elite.', price:6000, lvl:16, tank:120, slots:5 },
  { tier:4, name:'Espectro do Vazio', icon:'🌠', desc:'Tecnologia experimental recuperada da Anomalia. Vai onde nenhuma nave voltou.', price:20000, lvl:25, tank:200, slots:7 },
];

const RANKS = [
  { at:0,      name:'Trabalhador' },
  { at:100,    name:'Operário Espacial' },
  { at:400,    name:'Piloto Novato' },
  { at:1200,   name:'Explorador' },
  { at:3500,   name:'Capitão' },
  { at:8000,   name:'Comandante' },
  { at:20000,  name:'Lenda do Setor' },
  { at:50000,  name:'Barão Estelar' },
  { at:150000, name:'Mito do Vazio' },
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
  kit:         { name:'Kit de Reparos',         icon:'🧰', value:45,  rarity:'raro' },
  nucleoDrone: { name:'Núcleo de Drone',        icon:'🤖', value:60,  rarity:'raro' },
  cristal:     { name:'Cristal da Nebulosa',    icon:'🔮', value:95,  rarity:'épico' },
  dados:       { name:'Dados de Setor',         icon:'🗺️', value:120, rarity:'épico' },
  ligaTemp:    { name:'Liga Temperada',         icon:'🔗', value:110, rarity:'épico' },
  baliza:      { name:'Baliza Estelar',         icon:'📡', value:160, rarity:'épico' },
  cristalLap:  { name:'Cristal Lapidado',       icon:'✨', value:190, rarity:'épico' },
  banPirata:   { name:'Bandeira Pirata',        icon:'🏴‍☠️', value:260, rarity:'épico' },
  prisma:      { name:'Prisma Estelar',         icon:'🌈', value:300, rarity:'épico' },
  singular:    { name:'Núcleo Singular',        icon:'🧿', value:380, rarity:'épico' },
  tentaculo:   { name:'Fragmento do Kraken',    icon:'🐙', value:420, rarity:'épico' },
  artefato:    { name:'Artefato Antigo',        icon:'🏺', value:220, rarity:'lendário' },
  reliquia:    { name:'Relíquia do Vazio',      icon:'🗿', value:480, rarity:'lendário' },
  ceifa:       { name:'Lâmina Ceifadora',       icon:'💀', value:600, rarity:'lendário' },
};

const LOOT_JOB = ['sucata', 'cabo', 'racao', 'ferramenta'];
const LOOT_T1  = ['minerio', 'gelo', 'circuito'];
const LOOT_T2  = ['liga', 'nucleo', 'minerioRaro'];
const LOOT_T3  = ['cristal', 'dados', 'artefato'];
const LOOT_T4  = ['prisma', 'singular', 'reliquia'];

const RECIPES = [
  { id:'chapa',      name:'Chapa de Casco',         icon:'🛡️', out:{ item:'chapa' },      needs:{ sucata:4, ferramenta:1 },  outDesc:'1× Chapa de Casco' },
  { id:'componente', name:'Componente Eletrônico',  icon:'⚡', out:{ item:'componente' }, needs:{ cabo:2, circuito:2 },      outDesc:'1× Componente Eletrônico' },
  { id:'celula',     name:'Célula de Combustível',  icon:'⛽', out:{ fuel:15 },           needs:{ gelo:2, sucata:1 },        outDesc:'+15 de combustível' },
  { id:'ligaTemp',   name:'Liga Temperada',         icon:'🔗', out:{ item:'ligaTemp' },   needs:{ liga:2, minerioRaro:1 },   outDesc:'1× Liga Temperada' },
  { id:'baliza',     name:'Baliza Estelar',         icon:'📡', out:{ item:'baliza' },     needs:{ nucleo:1, componente:2 },  outDesc:'1× Baliza Estelar' },
  { id:'kit',        name:'Kit de Reparos',         icon:'🧰', out:{ item:'kit' },        needs:{ sucata:3, ferramenta:2, circuito:1 }, outDesc:'1× Kit de Reparos' },
  { id:'cristalLap', name:'Cristal Lapidado',       icon:'✨', out:{ item:'cristalLap' }, needs:{ cristal:1, ligaTemp:1 },   outDesc:'1× Cristal Lapidado' },
];

const MODULES = [
  { id:'motor',     name:'Motor Otimizado',    icon:'🔥', effect:'−10% tempo de missão',            price:450, needs:{ chapa:2, componente:1 } },
  { id:'porao',     name:'Porão Expandido',    icon:'📦', effect:'+1 item de loot em missões',      price:400, needs:{ chapa:3 } },
  { id:'tanque',    name:'Tanque Auxiliar',    icon:'⛽', effect:'+25 de combustível máximo',       price:300, needs:{ componente:2 } },
  { id:'antena',    name:'Antena Quântica',    icon:'📡', effect:'+15% XP ganho',                   price:600, needs:{ baliza:1 } },
  { id:'refinaria', name:'Refinaria Compacta', icon:'⚗️', effect:'+20% no valor de venda de itens', price:800, needs:{ ligaTemp:2 } },
  { id:'scanner',   name:'Scanner Profundo',   icon:'🔍', effect:'+10% pagamento de missões',       price:700, needs:{ nucleo:1, componente:2 } },
  { id:'autopiloto',name:'Piloto Automático',  icon:'🤖', effect:'−15% consumo de combustível',     price:550, needs:{ kit:1, componente:1 } },
];

const CREW = [
  { id:'dex',   name:'Piloto Novato "Dex"',      icon:'🧑‍✈️', effect:'−5% tempo de missão',        bonus:{ time:0.95 },           hire:200,  salary:5,  lvl:3,  rarity:'comum' },
  { id:'vera',  name:'Mecânica "Vera"',          icon:'🔧', effect:'−10% consumo de combustível', bonus:{ fuel:0.9 },            hire:350,  salary:8,  lvl:5,  rarity:'comum' },
  { id:'silas', name:'Negociador "Silas"',       icon:'🤝', effect:'+8% pagamento de missões',    bonus:{ pay:1.08 },            hire:500,  salary:12, lvl:8,  rarity:'incomum' },
  { id:'kira',  name:'Batedora "Kira"',          icon:'🔭', effect:'+25% chance de loot extra',   bonus:{ loot:0.25 },           hire:450,  salary:10, lvl:7,  rarity:'incomum' },
  { id:'enzo',  name:'Cientista "Dr. Enzo"',     icon:'🧬', effect:'+10% XP em missões',          bonus:{ xp:1.1 },              hire:700,  salary:15, lvl:12, rarity:'raro' },
  { id:'rhea',  name:'Ás de Voo "Rhea"',         icon:'🛩️', effect:'−12% tempo de missão',        bonus:{ time:0.88 },           hire:1500, salary:25, lvl:18, rarity:'raro' },
  { id:'moss',  name:'Veterano do Vazio "Moss"', icon:'🌌', effect:'+15% pagamento e +5% XP',     bonus:{ pay:1.15, xp:1.05 },   hire:4000, salary:40, lvl:25, rarity:'lendário' },
];

const GEAR = [
  { id:'traje1', slot:'traje',      name:'Traje Remendado',      icon:'🥼', effect:'+10% pagamento de serviços', bonus:{ jobPay:1.10 }, price:150,  lvl:2 },
  { id:'traje2', slot:'traje',      name:'Traje Reforçado',      icon:'🦺', effect:'+20% pagamento de serviços', bonus:{ jobPay:1.20 }, price:800,  lvl:10 },
  { id:'traje3', slot:'traje',      name:'Exotraje Helios',      icon:'🤖', effect:'+35% pagamento de serviços', bonus:{ jobPay:1.35 }, price:3500, lvl:20 },
  { id:'ferr1',  slot:'ferramenta', name:'Multichave',           icon:'🔧', effect:'−10% tempo de serviços',     bonus:{ jobTime:0.9 },  price:200,  lvl:3 },
  { id:'ferr2',  slot:'ferramenta', name:'Kit Hidráulico',       icon:'⚙️', effect:'−20% tempo de serviços',     bonus:{ jobTime:0.8 },  price:1000, lvl:12 },
  { id:'ferr3',  slot:'ferramenta', name:'Braço Servo-Assistido',icon:'🦾', effect:'−30% tempo de serviços',     bonus:{ jobTime:0.7 },  price:4000, lvl:22 },
  { id:'data1',  slot:'datapad',    name:'Datapad Usado',        icon:'📱', effect:'+10% XP de serviços',        bonus:{ jobXp:1.1 },    price:250,  lvl:4 },
  { id:'data2',  slot:'datapad',    name:'Datapad Quântico',     icon:'💠', effect:'+25% XP de serviços',        bonus:{ jobXp:1.25 },   price:1200, lvl:14 },
  { id:'data3',  slot:'datapad',    name:'Implante Neural',      icon:'🧠', effect:'+45% XP de serviços',        bonus:{ jobXp:1.45 },   price:5000, lvl:24 },
];
const GEAR_SLOTS = { traje:'Traje', ferramenta:'Ferramenta', datapad:'Datapad' };

const THREATS = [
  { id:'enxame',   name:'Enxame de Drones',  icon:'🤖', desc:'Drones de mineração corrompidos atacam cargueiros na saída da estação.',            min:60,  pay:250,  tier:1, lvl:6,  faction:'corp',      lootItem:'nucleoDrone' },
  { id:'pirata',   name:'Cargueiro Pirata',  icon:'🏴‍☠️', desc:'Um cargueiro armado saqueia rotas no Cinturão. A Corporação paga pela cabeça do capitão.', min:90, pay:420, tier:2, lvl:10, faction:'corp', lootItem:'banPirata' },
  { id:'kraken',   name:'Kraken do Vazio',   icon:'🐙', desc:'Algo enorme envolveu uma sonda perto da Nebulosa. E está com fome.',                min:150, pay:900,  tier:3, lvl:20, faction:'sindicato', lootItem:'tentaculo' },
  { id:'ceifador', name:'Nave Ceifadora',    icon:'💀', desc:'Ninguém sabe quem pilota. Só sabem que ela não deixa sobreviventes.',               min:200, pay:1600, tier:4, lvl:27, faction:'sindicato', lootItem:'ceifa' },
];

const DRONES = [
  { id:'azul',    name:'Relâmpago Azul',  icon:'⚡' },
  { id:'furia',   name:'Fúria Escarlate', icon:'🔴' },
  { id:'fantasma',name:'Fantasma Cinza',  icon:'👻' },
  { id:'vespa',   name:'Vespa Dourada',   icon:'🐝' },
  { id:'cometa',  name:'Cometa Negro',    icon:'☄️' },
  { id:'turbina', name:'Turbina Louca',   icon:'🌀' },
  { id:'pardal',  name:'Pardal de Aço',   icon:'🐦' },
  { id:'vibora',  name:'Víbora Verde',    icon:'🐍' },
];
const RACE_ODDS = [1.8, 2.6, 3.8, 6.5];

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
  { id:'expresso', name:'Expresso Interestelar',    icon:'⚡', desc:'Entrega corporativa com prazo impossível. Por isso paga o dobro.',       faction:'corp' },
  { id:'derrelito',name:'Nave à Deriva',            icon:'🛳️', desc:'Um cargueiro abandonado apareceu no radar. Os Mineradores querem o casco.', faction:'mineradores' },
];

const ACHIEVEMENTS = [
  { id:'srv1',    name:'Primeiro Turno',       desc:'Complete 1 serviço na estação',        reward:10,   cond: lv => S.jobsDone >= 1 },
  { id:'srv25',   name:'Operário Dedicado',    desc:'Complete 25 serviços',                 reward:60,   cond: lv => S.jobsDone >= 25 },
  { id:'srv100',  name:'Veterano da Estação',  desc:'Complete 100 serviços',                reward:250,  cond: lv => S.jobsDone >= 100 },
  { id:'mis1',    name:'Primeira Missão',      desc:'Complete 1 missão espacial',           reward:25,   cond: lv => S.missionsDone >= 1 },
  { id:'mis50',   name:'Piloto Veterano',      desc:'Complete 50 missões',                  reward:350,  cond: lv => S.missionsDone >= 50 },
  { id:'mis200',  name:'Lenda do Vácuo',       desc:'Complete 200 missões',                 reward:1500, cond: lv => S.missionsDone >= 200 },
  { id:'lvl10',   name:'Década',               desc:'Alcance o nível 10',                   reward:100,  cond: lv => lv >= 10 },
  { id:'lvl25',   name:'Quarto de Século',     desc:'Alcance o nível 25',                   reward:500,  cond: lv => lv >= 25 },
  { id:'lvl50',   name:'Meio Século',          desc:'Alcance o nível 50',                   reward:2000, cond: lv => lv >= 50 },
  { id:'lvl75',   name:'Três Quartos',         desc:'Alcance o nível 75',                   reward:5000, cond: lv => lv >= 75 },
  { id:'lvl100',  name:'Centenário',           desc:'Alcance o nível 100',                  reward:10000, cond: lv => lv >= 100 },
  { id:'rico',    name:'Primeiro Milheiro',    desc:'Acumule 1.000 ₵ ganhos no total',      reward:100,  cond: lv => S.totalEarned >= 1000 },
  { id:'magnata', name:'Magnata do Setor',     desc:'Acumule 10.000 ₵ ganhos no total',     reward:500,  cond: lv => S.totalEarned >= 10000 },
  { id:'lend',    name:'Toque Lendário',       desc:'Obtenha um item lendário',             reward:150,  cond: lv => S.flags.legendary },
  { id:'aurora',  name:'Frota Própria',        desc:'Compre a Aurora Estelar',              reward:300,  cond: lv => S.ship >= 3 },
  { id:'espectro',name:'Além do Mapa',         desc:'Compre a Espectro do Vazio',           reward:1000, cond: lv => S.ship >= 4 },
  { id:'craft10', name:'Artesão Espacial',     desc:'Fabrique 10 itens',                    reward:120,  cond: lv => S.crafts >= 10 },
  { id:'mod5',    name:'Engenheiro de Bordo',  desc:'Instale 5 módulos na nave',            reward:400,  cond: lv => S.modules.length >= 5 },
  { id:'aliado',  name:'Diplomata',            desc:'Torne-se Aliado de alguma facção',     reward:200,  cond: lv => Object.values(S.rep).some(r => r >= 60) },
  { id:'replend', name:'Ídolo do Setor',       desc:'Reputação Lendário com alguma facção', reward:600,  cond: lv => Object.values(S.rep).some(r => r >= 100) },
  { id:'daily5',  name:'Cliente Fiel',         desc:'Complete 5 contratos diários',         reward:250,  cond: lv => S.dailiesDone >= 5 },
  { id:'entrega5',name:'Entregador Oficial',   desc:'Complete 5 encomendas',                reward:300,  cond: lv => S.stats.ordersDone >= 5 },
  { id:'sortudo', name:'Sortudo',              desc:'Vença uma corrida de drones',          reward:250,  cond: lv => S.stats.raceWins >= 1 },
  { id:'cacador', name:'Caçador do Setor',     desc:'Elimine 3 ameaças do setor',           reward:800,  cond: lv => S.stats.bossesDone >= 3 },
  { id:'codex10', name:'Cartógrafo',           desc:'Descubra 10 locais do setor',          reward:350,  cond: lv => Object.keys(S.visited).length >= 10 },
];

const HOUR = 3600000;
const DAY = 86400000;
const BRT_OFFSET = 3 * HOUR; // Brasília = UTC−3
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
  activity: null,
  inventory: {},
  modules: [],
  crew: [],
  gear: { traje:null, ferramenta:null, datapad:null },
  visited: {},
  rep: { corp:0, mineradores:0, sindicato:0 },
  achievements: [],
  flags: { legendary:false },
  dailyDone: -1,
  threatDone: -1,
  orders: { dDay:-1, dDeliv:0, dDone:false, wWeek:-1, wDeliv:0, wDone:false },
  bet: null,        // {raceDay, drone, amount, odds}
  lastRace: null,   // {raceDay, winnerName, droneName, won, amount, payout}
  stats: null,      // preenchido no load
  log: [],
  seenIntro: false,
};

function defaultStats() {
  return { spent:0, itemsSold:0, biggestSale:0, fuelBought:0, minutes:0, racesBet:0, raceWins:0, bossesDone:0, ordersDone:0, byDay:{} };
}

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
  if (typeof S.threatDone !== 'number') S.threatDone = -1;
  if (!S.inventory) S.inventory = {};
  if (!S.modules) S.modules = [];
  if (!S.crew) S.crew = [];
  if (!S.gear) S.gear = { traje:null, ferramenta:null, datapad:null };
  if (!S.visited) S.visited = {};
  if (!S.rep) S.rep = { corp:0, mineradores:0, sindicato:0 };
  if (!S.achievements) S.achievements = [];
  if (!S.flags) S.flags = { legendary:false };
  if (!S.orders) S.orders = { dDay:-1, dDeliv:0, dDone:false, wWeek:-1, wDeliv:0, wDone:false };
  S.stats = Object.assign(defaultStats(), S.stats || {});
  if (S.activity && typeof S.activity.xp !== 'number') {
    S.activity.xp = Math.round(S.activity.reward || 10);
    S.activity.tier = S.activity.tier || 0;
  }
}

// todo crédito ganho passa por aqui (alimenta o gráfico de 7 dias)
function addEarn(n) {
  S.credits += n;
  S.totalEarned += n;
  const d = dayIndex();
  S.stats.byDay[d] = (S.stats.byDay[d] || 0) + n;
  for (const k of Object.keys(S.stats.byDay)) if (+k < d - 6) delete S.stats.byDay[k];
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

function gainRep(faction, amount) {
  S.rep[faction] = (S.rep[faction] || 0) + amount;
  const rival = FACTIONS[faction].rival;
  if (rival && S.rep[rival] > 0) S.rep[rival] = Math.max(0, S.rep[rival] - 1);
}

/* ================= BÔNUS (módulos, tripulação, equipamento) ================= */

function moduleOwned(id) { return S.modules.includes(id); }
function maxFuel() { return S.ship === 0 ? 0 : SHIPS[S.ship].tank + (moduleOwned('tanque') ? 25 : 0); }
function xpMult() { return (moduleOwned('antena') ? 1.15 : 1) * (1 + repLevel('sindicato') * 0.02); }
function sellMult() { return (moduleOwned('refinaria') ? 1.2 : 1) * (1 + repLevel('mineradores') * 0.02); }
function hangarMult() { return 1 - repLevel('corp') * 0.02; }
function shipPrice(ship) { return Math.round(ship.price * hangarMult()); }
function modulePrice(mod) { return Math.round(mod.price * hangarMult()); }

function crewMembers() { return S.crew.map(id => CREW.find(c => c.id === id)).filter(Boolean); }
function crewCap() { return S.ship; } // 1 vaga por tier de nave
function crewMult(k) { return crewMembers().reduce((m, c) => m * (c.bonus[k] || 1), 1); }
function crewSalary() { return crewMembers().reduce((s, c) => s + c.salary, 0); }
function crewLootChance() { return crewMembers().reduce((s, c) => s + (c.bonus.loot || 0), 0); }

function gearEquipped() { return Object.values(S.gear).map(id => GEAR.find(g => g.id === id)).filter(Boolean); }
function gearMult(k) { return gearEquipped().reduce((m, g) => m * (g.bonus[k] || 1), 1); }

/* ================= TEMPO / ROTAÇÃO / MERCADO ================= */

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
function weekIndex() { return Math.floor(dayIndex() / 7); }

// horário de Brasília (UTC−3)
function brtMs() { return Date.now() - BRT_OFFSET; }
function brtClock() {
  const d = new Date(brtMs());
  const p = n => String(n).padStart(2, '0');
  return `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
}

function marketMult(itemId) {
  const rng = mulberry32(hourIndex() * 2654435761 + hashStr(itemId));
  return 0.7 + rng() * 0.7;
}

function sellPrice(itemId) {
  return Math.max(1, Math.round(ITEMS[itemId].value * marketMult(itemId) * sellMult()));
}

function missionFuelCost(min, tier) {
  let cost = Math.round((min / 6 + tier * 4) * crewMult('fuel'));
  if (moduleOwned('autopiloto')) cost = Math.round(cost * 0.85);
  return Math.max(1, cost);
}

function decorateOffer(item, min, pay, kind) {
  if (kind === 'job') {
    min = Math.max(5, Math.round(min * gearMult('jobTime')));
    pay = Math.max(1, Math.round(pay * gearMult('jobPay')));
    const xp = Math.round((min * 1.2 + pay * 0.5) * xpMult() * gearMult('jobXp'));
    return { ...item, min, pay, xp };
  }
  // missões: módulos, tripulação e reputação
  min = Math.max(10, Math.round(min * (moduleOwned('motor') ? 0.9 : 1) * crewMult('time')));
  pay = Math.round(pay * (1 + repLevel(item.faction) * 0.05) * (moduleOwned('scanner') ? 1.1 : 1) * crewMult('pay'));
  pay = Math.max(1, pay - crewSalary());
  const xp = Math.round((min * 1.8 + pay) * (1 + 0.25 * ((item.tier || 1) - 1)) * xpMult() * crewMult('xp'));
  const fuel = missionFuelCost(min, item.tier || 1);
  const { loc, ...rest } = item;
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

function jobOffers() { return currentOffers(JOBS, 17, 4, 'job'); }
function missionOffers() {
  const available = MISSIONS.filter(m => m.tier <= S.ship);
  if (!available.length) return [];
  return currentOffers(available, 91, Math.min(2 + S.ship, available.length), 'mission');
}

function dailyContract() {
  if (S.ship === 0) return null;
  const day = dayIndex();
  const rng = mulberry32(day * 2654435761 + 777);
  const base = DAILY_POOL[Math.floor(rng() * DAILY_POOL.length)];
  const lv = levelFromXp(S.xp);
  const rawMin = Math.round(90 + rng() * 150);
  const rawPay = Math.round((90 + lv * 14) * (0.9 + rng() * 0.3));
  const lvTier = lv >= 25 ? 4 : lv >= 16 ? 3 : lv >= 8 ? 2 : 1;
  const tier = Math.max(1, Math.min(S.ship, lvTier));
  const o = decorateOffer({ ...base, tier }, rawMin, rawPay, 'mission');
  o.xp = Math.round(o.xp * 1.4);
  o.lvl = 5;
  o.day = day;
  return o;
}

/* ================= AMEAÇAS (chefes) ================= */

function currentThreat() {
  const day = dayIndex();
  if (S.threatDone === day) return null;
  const rng = mulberry32(day * 2654435761 + 4242);
  if (rng() < 0.3) return null; // dia calmo no setor
  const base = THREATS[Math.floor(rng() * THREATS.length)];
  const startH = 6 + Math.floor(rng() * 12);
  const spawn = day * DAY + startH * HOUR;
  const end = Math.min(spawn + 8 * HOUR, (day + 1) * DAY);
  const now = Date.now();
  if (now < spawn || now >= end) return null;
  const o = decorateOffer(base, base.min, base.pay, 'mission');
  o.day = day;
  o.end = end;
  o.lootItem = base.lootItem;
  return o;
}

/* ================= ENCOMENDAS ================= */

function currentDailyOrder() {
  const day = dayIndex();
  const rng = mulberry32(day * 2654435761 + 5151);
  const lv = levelFromXp(S.xp);
  const pool = LOOT_JOB.concat(LOOT_T1);
  const item = pool[Math.floor(rng() * pool.length)];
  const qty = 4 + Math.floor(rng() * 6);
  const v = ITEMS[item].value;
  return { scope:'daily', key:day, item, qty, pay: Math.round(qty * v * 2 + 20 + lv * 2), xp: Math.round(qty * v * 1.5 + 25 + lv * 2) };
}

function currentWeeklyOrder() {
  const week = weekIndex();
  const rng = mulberry32(week * 2654435761 + 6262);
  const lv = levelFromXp(S.xp);
  let pool = LOOT_T1;
  if (lv >= 16) pool = LOOT_T2.concat(LOOT_T3);
  else if (lv >= 8) pool = LOOT_T1.concat(LOOT_T2);
  const item = pool[Math.floor(rng() * pool.length)];
  const qty = 12 + Math.floor(rng() * 10);
  const v = ITEMS[item].value;
  return { scope:'weekly', key:week, item, qty, pay: Math.round(qty * v * 2.5 + 100 + lv * 10), xp: Math.round(qty * v * 2 + 80 + lv * 8) };
}

function syncOrders() {
  if (S.orders.dDay !== dayIndex()) { S.orders.dDay = dayIndex(); S.orders.dDeliv = 0; S.orders.dDone = false; }
  if (S.orders.wWeek !== weekIndex()) { S.orders.wWeek = weekIndex(); S.orders.wDeliv = 0; S.orders.wDone = false; }
}

function deliverOrder(scope) {
  syncOrders();
  const order = scope === 'daily' ? currentDailyOrder() : currentWeeklyOrder();
  const p = scope === 'daily'
    ? { get deliv() { return S.orders.dDeliv; }, set deliv(v) { S.orders.dDeliv = v; }, get done() { return S.orders.dDone; }, set done(v) { S.orders.dDone = v; } }
    : { get deliv() { return S.orders.wDeliv; }, set deliv(v) { S.orders.wDeliv = v; }, get done() { return S.orders.wDone; }, set done(v) { S.orders.wDone = v; } };
  if (p.done) return;
  const have = S.inventory[order.item] || 0;
  const need = order.qty - p.deliv;
  const give = Math.min(have, need);
  if (give <= 0) { toast(`Você não tem ${ITEMS[order.item].name}!`); return; }
  S.inventory[order.item] -= give;
  if (S.inventory[order.item] <= 0) delete S.inventory[order.item];
  p.deliv += give;
  if (p.deliv >= order.qty) {
    p.done = true;
    addEarn(order.pay);
    const xpGain = Math.round(order.xp * xpMult());
    S.stats.ordersDone++;
    addLog(`Encomenda ${scope === 'daily' ? 'diária' : 'semanal'} concluída: ${order.qty}× ${ITEMS[order.item].icon} ${ITEMS[order.item].name} · <b>+${fmtCredits(order.pay)} ₵</b> · <span class="xpg">+${xpGain} XP</span>`);
    const leveled = gainXp(xpGain);
    const gotAch = checkAchievements();
    if (!leveled && !gotAch) toast(`📦 Encomenda entregue! +${fmtCredits(order.pay)} ₵`);
  } else {
    addLog(`Entrega parcial: ${give}× ${ITEMS[order.item].icon} ${ITEMS[order.item].name} (${p.deliv}/${order.qty})`);
    toast(`Entregue ${give}× ${ITEMS[order.item].name} (${p.deliv}/${order.qty})`);
  }
  save();
  render();
}

/* ================= CORRIDA DE DRONES (23h de Brasília) ================= */

function betRaceDay() {
  const b = brtMs();
  const rd = Math.floor(b / DAY);
  return (b - rd * DAY) < 23 * HOUR ? rd : rd + 1;
}

function raceUtc(rd) { return rd * DAY + 23 * HOUR + BRT_OFFSET; }

function raceLineup(rd) {
  const rng = mulberry32(rd * 2654435761 + 999);
  const pool = DRONES.slice().sort(() => rng() - 0.5).slice(0, 4);
  const lineup = pool.map((d, i) => ({ ...d, odds: RACE_ODDS[i] }));
  const weights = lineup.map(x => 1 / x.odds);
  const totalW = weights.reduce((a, b) => a + b, 0);
  let roll = rng() * totalW;
  let winner = lineup[0];
  for (let i = 0; i < lineup.length; i++) { roll -= weights[i]; if (roll <= 0) { winner = lineup[i]; break; } }
  return { lineup, winner };
}

function placeBet(droneId, odds) {
  if (S.bet) { toast('Você já apostou nesta corrida!'); return; }
  const input = document.getElementById('betInput');
  const amount = Math.floor(Number(input && input.value));
  if (!amount || amount < 5) { toast('Aposta mínima: 5 ₵'); return; }
  if (amount > 500) { toast('Aposta máxima: 500 ₵'); return; }
  if (S.credits < amount) { toast('Créditos insuficientes!'); return; }
  S.credits -= amount;
  S.stats.spent += amount;
  S.stats.racesBet++;
  S.bet = { raceDay: betRaceDay(), drone: droneId, amount, odds };
  const d = DRONES.find(x => x.id === droneId);
  addLog(`Aposta feita: ${amount} ₵ no ${d.icon} <b>${d.name}</b> (${odds}x)`);
  save();
  render();
}

function settleBet() {
  if (!S.bet) return false;
  if (Date.now() < raceUtc(S.bet.raceDay)) return false;
  const { winner } = raceLineup(S.bet.raceDay);
  const myDrone = DRONES.find(x => x.id === S.bet.drone);
  const won = winner.id === S.bet.drone;
  let payout = 0;
  if (won) {
    payout = Math.round(S.bet.amount * S.bet.odds);
    addEarn(payout);
    S.stats.raceWins++;
    addLog(`🏁 ${winner.icon} <b>${winner.name}</b> venceu! Sua aposta pagou <b>+${fmtCredits(payout)} ₵</b>`);
  } else {
    addLog(`🏁 ${winner.icon} <b>${winner.name}</b> venceu. Seu ${myDrone.icon} ${myDrone.name} ficou para trás (−${S.bet.amount} ₵)`);
  }
  S.lastRace = { raceDay: S.bet.raceDay, winnerName: `${winner.icon} ${winner.name}`, droneName: `${myDrone.icon} ${myDrone.name}`, won, amount: S.bet.amount, payout };
  S.bet = null;
  checkAchievements();
  save();
  return true;
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
  const pools = { 1: LOOT_T1, 2: LOOT_T2, 3: LOOT_T3, 4: LOOT_T4 };
  if (tier === 1) {
    drops.push(pick(rng, LOOT_T1));
    if (rng() < 0.35) drops.push(pick(rng, LOOT_T1));
    if (rng() < 0.08) drops.push(pick(rng, LOOT_T2));
  } else if (tier === 2) {
    drops.push(pick(rng, LOOT_T2));
    if (rng() < 0.4) drops.push(pick(rng, LOOT_T1));
    if (rng() < 0.06) drops.push(pick(rng, LOOT_T3));
  } else if (tier === 3) {
    drops.push(pick(rng, LOOT_T3));
    if (rng() < 0.5) drops.push(pick(rng, LOOT_T2));
  } else {
    drops.push(pick(rng, LOOT_T4));
    if (rng() < 0.5) drops.push(pick(rng, LOOT_T3));
  }
  if (moduleOwned('porao')) drops.push(pick(rng, pools[tier] || LOOT_T1));
  if (rng() < crewLootChance()) drops.push(pick(rng, pools[tier] || LOOT_T1));
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
        addEarn(a.reward);
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
    if (S.ship === 0) { toast('Você precisa de uma nave!'); return; }
    if (kind === 'threat' && S.ship < offer.tier) { toast(`Requer ${SHIPS[offer.tier].icon} ${SHIPS[offer.tier].name}!`); return; }
    if (kind === 'daily' && S.dailyDone === offer.day) { toast('Contrato de hoje já concluído!'); return; }
    if (S.fuel < offer.fuel) { toast(`Combustível insuficiente (precisa de ${offer.fuel} ⛽)`); return; }
    S.fuel -= offer.fuel;
  }
  const now = Date.now();
  S.activity = {
    kind,
    mid: offer.id || null,
    name: offer.name,
    icon: offer.icon || null,
    tier: offer.tier || 0,
    faction: offer.faction || null,
    day: offer.day,
    lootItem: offer.lootItem || null,
    startTs: now,
    endTs: now + offer.min * 60000,
    reward: offer.pay,
    xp: offer.xp,
  };
  S.seenIntro = true;
  const label = kind === 'job' ? 'Serviço' : kind === 'daily' ? 'Contrato diário' : kind === 'threat' ? 'Caçada' : 'Missão';
  addLog(`${label} iniciado: ${offer.name} (${fmtDur(offer.min)})`);
  save();
  render();
}

function collectActivity() {
  const a = S.activity;
  if (!a || Date.now() < a.endTs) return;
  addEarn(a.reward);
  S.stats.minutes += Math.round((a.endTs - a.startTs) / 60000);

  let codexHtml = '';
  if (a.kind === 'job') {
    S.jobsDone++;
  } else {
    S.missionsDone++;
    if (a.kind === 'daily') {
      S.dailiesDone++;
      if (typeof a.day === 'number') S.dailyDone = a.day;
      if (a.faction) gainRep(a.faction, 5);
    } else if (a.kind === 'threat') {
      S.stats.bossesDone++;
      if (typeof a.day === 'number') S.threatDone = a.day;
      if (a.faction) gainRep(a.faction, 8);
    } else {
      if (a.faction) gainRep(a.faction, 1 + a.tier);
      // diário de exploração: primeira visita ao local
      if (a.mid && LORE[a.mid] && !S.visited[a.mid]) {
        S.visited[a.mid] = true;
        const m = MISSIONS.find(x => x.id === a.mid);
        const bonus = Math.round((30 + a.tier * 40) * xpMult());
        gainXp(bonus);
        codexHtml = ` · 📖 <b>${m ? m.loc.name : a.name}</b> registrado no diário (+${bonus} XP)`;
      }
    }
  }

  const leveled = gainXp(a.xp);
  const drops = rollLoot(a.kind === 'job' ? 'job' : 'mission', a.tier || 1);
  if (a.kind === 'threat' && a.lootItem) drops.push(a.lootItem);
  for (const id of drops) {
    S.inventory[id] = (S.inventory[id] || 0) + 1;
    if (ITEMS[id].rarity === 'lendário') S.flags.legendary = true;
  }

  const dropTxt = drops.length
    ? ' · ' + drops.map(id => `${ITEMS[id].icon} ${ITEMS[id].name}`).join(', ')
    : '';
  const label = a.kind === 'job' ? 'Serviço' : a.kind === 'daily' ? 'Contrato diário' : a.kind === 'threat' ? '⚔️ Ameaça eliminada' : 'Missão';
  addLog(`${label}: ${a.name} · <b>+${fmtCredits(a.reward)} ₵</b> · <span class="xpg">+${a.xp} XP</span>${dropTxt}${codexHtml}`);

  S.activity = null;
  const gotAch = checkAchievements();
  save();
  if (!leveled && !gotAch) toast(`+${fmtCredits(a.reward)} ₵ · +${a.xp} XP${drops.length ? ' · ' + drops.map(id => ITEMS[id].icon).join(' ') : ''}`);
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
  S.stats.spent += price;
  S.ship = tier;
  S.fuel = Math.min(maxFuel(), Math.max(S.fuel, Math.round(ship.tank / 2)));
  addLog(`Nave adquirida: <b>${ship.name}</b> por ${fmtCredits(price)} ₵`);
  checkAchievements();
  save();
  toast(`${ship.icon} ${ship.name} é sua!`);
  render();
}

function buyFuel(qty) {
  const room = maxFuel() - S.fuel;
  if (room <= 0) { toast('Tanque cheio!'); return; }
  const n = Math.min(qty, room, Math.floor(S.credits / FUEL_PRICE));
  if (n <= 0) { toast('Créditos insuficientes!'); return; }
  S.credits -= n * FUEL_PRICE;
  S.stats.spent += n * FUEL_PRICE;
  S.stats.fuelBought += n;
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
  S.stats.spent += price;
  for (const [itemId, need] of Object.entries(mod.needs)) {
    S.inventory[itemId] -= need;
    if (S.inventory[itemId] <= 0) delete S.inventory[itemId];
  }
  S.modules.push(id);
  addLog(`Módulo instalado: <b>${mod.icon} ${mod.name}</b>`);
  checkAchievements();
  save();
  toast(`${mod.icon} ${mod.name} instalado!`);
  render();
}

function buyGear(id) {
  const g = GEAR.find(x => x.id === id);
  if (!g) return;
  const current = GEAR.find(x => x.id === S.gear[g.slot]);
  if (current && current.price >= g.price) { toast('Você já tem algo igual ou melhor!'); return; }
  if (levelFromXp(S.xp) < g.lvl) { toast(`Requer nível ${g.lvl}!`); return; }
  if (S.credits < g.price) { toast('Créditos insuficientes!'); return; }
  S.credits -= g.price;
  S.stats.spent += g.price;
  S.gear[g.slot] = g.id;
  addLog(`Equipamento adquirido: <b>${g.icon} ${g.name}</b>`);
  save();
  toast(`${g.icon} ${g.name} equipado!`);
  render();
}

function hireCrew(id) {
  const c = CREW.find(x => x.id === id);
  if (!c || S.crew.includes(id)) return;
  if (S.ship === 0) { toast('Você precisa de uma nave para ter tripulação!'); return; }
  if (S.crew.length >= crewCap()) { toast(`Sua nave só comporta ${crewCap()} tripulante(s)!`); return; }
  if (levelFromXp(S.xp) < c.lvl) { toast(`Requer nível ${c.lvl}!`); return; }
  if (S.credits < c.hire) { toast('Créditos insuficientes!'); return; }
  S.credits -= c.hire;
  S.stats.spent += c.hire;
  S.crew.push(id);
  addLog(`Tripulante contratado: <b>${c.icon} ${c.name}</b>`);
  save();
  toast(`${c.icon} ${c.name} embarcou!`);
  render();
}

function fireCrew(id) {
  const c = CREW.find(x => x.id === id);
  if (!c || !S.crew.includes(id)) return;
  if (!confirm(`Dispensar ${c.name}? Não há reembolso da contratação.`)) return;
  S.crew = S.crew.filter(x => x !== id);
  addLog(`Tripulante dispensado: ${c.icon} ${c.name}`);
  save();
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
  addEarn(total);
  S.stats.itemsSold += n;
  S.stats.biggestSale = Math.max(S.stats.biggestSale, total);
  addLog(`Vendido: ${n}× ${ITEMS[id].icon} ${ITEMS[id].name} · <b>+${fmtCredits(total)} ₵</b>`);
  checkAchievements();
  save();
  toast(`+${fmtCredits(total)} ₵`);
  render();
}

function sellAll() {
  const total = invTotalValue();
  if (!total) return;
  if (!confirm(`Vender todos os itens por ${fmtCredits(total)} ₵ (preços de mercado desta hora)?`)) return;
  S.stats.itemsSold += invCount();
  S.stats.biggestSale = Math.max(S.stats.biggestSale, total);
  S.inventory = {};
  addEarn(total);
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

/* ================= NAVEGAÇÃO ================= */

let tab = 'station';
let sub = { station:'jobs', missions:'contracts', map:'sector', hangar:'ships', cargo:'items', profile:'rep' };
let mapSel = null;

const SUBTABS = {
  station:  [ { id:'jobs', label:'Serviços', icon:'🔧' }, { id:'gear', label:'Equipamento', icon:'🧑‍🚀' }, { id:'bar', label:'Bar', icon:'🍻' }, { id:'races', label:'Apostas', icon:'🏁' } ],
  missions: [ { id:'contracts', label:'Contratos', icon:'📜' }, { id:'orders', label:'Encomendas', icon:'📦' }, { id:'threats', label:'Ameaças', icon:'⚠️' } ],
  map:      [ { id:'sector', label:'Setor', icon:'🗺️' }, { id:'codex', label:'Diário', icon:'📖' } ],
  hangar:   [ { id:'ships', label:'Naves', icon:'🚀' }, { id:'modules', label:'Módulos', icon:'🔧' } ],
  cargo:    [ { id:'items', label:'Itens', icon:'🎒' }, { id:'craft', label:'Fabricação', icon:'🔨' } ],
  profile:  [ { id:'rep', label:'Reputação', icon:'🤝' }, { id:'ach', label:'Conquistas', icon:'🏆' }, { id:'stats', label:'Estatísticas', icon:'📊' } ],
};

const PAGE_DESCS = {
  'station.jobs':      'Trabalhos na estação — não exigem nave. Novas ofertas a cada hora.',
  'station.gear':      'Equipamento pessoal — bônus permanentes nos serviços da estação.',
  'station.bar':       'Contrate tripulantes para a nave. O salário é descontado do pagamento de cada missão.',
  'station.races':     'Corrida de drones todo dia às 23h (horário de Brasília). Aposte com sabedoria.',
  'missions.contracts':'Contratos espaciais — exigem nave e combustível. Pagam mais e dão reputação.',
  'missions.orders':   'Entregue os itens pedidos antes do prazo e receba um bônus gordo.',
  'missions.threats':  'Ameaças aparecem por poucas horas. Elimine-as por recompensas e loot exclusivo.',
  'map.sector':        'Locais com anel verde têm contratos disponíveis nesta rotação.',
  'map.codex':         'Complete uma missão em cada local para registrá-lo no diário (+XP na primeira visita).',
  'hangar.ships':      'Naves melhores alcançam locais mais distantes e carregam mais módulos.',
  'hangar.modules':    'Módulos melhoram a nave. Exigem créditos e peças fabricadas.',
  'cargo.items':       'Venda seu loot — os preços de mercado mudam a cada hora.',
  'cargo.craft':       'Combine itens para fabricar peças, consumíveis e componentes de módulos.',
  'profile.rep':       'Sua relação com as facções do setor. Reputação dá bônus permanentes.',
  'profile.ach':       'Conquistas pagam créditos ao desbloquear.',
  'profile.stats':     'Números e recordes da sua jornada.',
};

const ROTATION_PAGES = ['station.jobs', 'station.bar', 'missions.contracts', 'map.sector', 'cargo.items'];

function setTab(t) { tab = t; render(); }
function setSub(page, id) { sub[page] = id; render(); }
function selectLoc(id) { mapSel = mapSel === id ? null : id; render(); }

function subnavHtml(page) {
  return `<div class="subtabs">${SUBTABS[page].map(i =>
    `<div class="subtab ${sub[page] === i.id ? 'on' : ''}" onclick="setSub('${page}','${i.id}')">${i.icon} ${i.label}</div>`
  ).join('')}</div>`;
}

/* ================= RENDER ================= */

function render() {
  const lv = levelFromXp(S.xp);
  threatWasActive = !!currentThreat();

  document.getElementById('credits').textContent = fmtCredits(S.credits);
  document.getElementById('level').textContent = lv;
  document.getElementById('rank').textContent = rankName();
  document.getElementById('shipName').textContent =
    S.ship === 0 ? 'a pé na estação' : `${SHIPS[S.ship].icon} ${SHIPS[S.ship].name}`;
  document.getElementById('avatar').textContent = S.ship === 0 ? '🧑‍🚀' : SHIPS[S.ship].icon;

  const cur = xpForLevel(lv);
  const next = xpForLevel(lv + 1);
  const pct = ((S.xp - cur) / (next - cur)) * 100;
  document.getElementById('xpBar').style.width = pct.toFixed(1) + '%';
  document.getElementById('xpText').textContent = `${fmtCredits(S.xp - cur)} / ${fmtCredits(next - cur)} XP`;
  document.getElementById('xpNext').textContent = `faltam ${fmtCredits(next - S.xp)} XP para o nível ${lv + 1}`;

  const fuelRow = document.getElementById('fuelRow');
  if (S.ship > 0) {
    fuelRow.style.display = 'flex';
    const mx = maxFuel();
    document.getElementById('fuelBar').style.width = (mx ? (S.fuel / mx) * 100 : 0).toFixed(1) + '%';
    document.getElementById('fuelText').textContent = `${S.fuel}/${mx}`;
  } else {
    fuelRow.style.display = 'none';
  }

  document.getElementById('stJobs').textContent = S.jobsDone;
  document.getElementById('stMissions').textContent = S.missionsDone;
  document.getElementById('stEarned').textContent = fmtCredits(S.totalEarned);
  document.getElementById('stItems').textContent = invCount();

  document.getElementById('introBox').style.display =
    (!S.seenIntro && S.totalEarned === 0) ? 'block' : 'none';

  for (const t of ['station', 'missions', 'map', 'hangar', 'cargo', 'profile']) {
    document.getElementById('tab-' + t).classList.toggle('on', tab === t);
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
  if (!a) { panel.style.display = 'none'; activityWasFinished = false; return; }
  panel.style.display = 'block';

  const now = Date.now();
  const total = a.endTs - a.startTs;
  const done = Math.min(1, (now - a.startTs) / total);
  const remaining = a.endTs - now;
  const finished = remaining <= 0;
  activityWasFinished = finished;
  const label = a.kind === 'job' ? '🔧 Serviço em andamento'
    : a.kind === 'daily' ? '⭐ Contrato diário em andamento'
    : a.kind === 'threat' ? '⚔️ Caçada em andamento'
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
    <div class="progress-outer"><div class="progress-inner" id="activeProgress" style="width:${(done * 100).toFixed(1)}%"></div></div>
    <div class="active-row">
      <div class="active-rewards">
        <span class="chip chip-pay">+${fmtCredits(a.reward)} ₵</span>
        <span class="chip chip-xp">+${a.xp} XP</span>
        ${a.faction ? `<span class="chip">${factionChip(a.faction)}</span>` : ''}
      </div>
      ${finished
        ? `<button class="collect" onclick="collectActivity()">✔ Concluir e receber</button>`
        : `<span class="countdown" id="activeCountdown">⏱ ${fmtCountdown(remaining)}</span>`}
    </div>
    ${finished ? '' : `<div style="text-align:right;margin-top:10px"><button class="danger" onclick="abandonActivity()">Abandonar</button></div>`}
  `;
}

function renderRotation() {
  const key = `${tab}.${sub[tab]}`;
  document.getElementById('tabDesc').textContent = PAGE_DESCS[key] || '';
  const el = document.getElementById('rotationNote');
  if (!ROTATION_PAGES.includes(key)) { el.textContent = ''; return; }
  const msLeft = (hourIndex() + 1) * HOUR - Date.now();
  const what = key === 'cargo.items' ? 'preços mudam' : 'novas ofertas';
  el.textContent = `↻ ${what} em ${fmtCountdown(msLeft)}`;
}

function renderContent() {
  const c = document.getElementById('content');
  const busy = !!S.activity;
  const lv = levelFromXp(S.xp);
  let html = '';

  if (tab === 'station') {
    html = subnavHtml('station');
    if (sub.station === 'jobs') html += renderJobs(busy, lv);
    else if (sub.station === 'gear') html += renderGear(lv);
    else if (sub.station === 'bar') html += renderBar(lv);
    else html += renderRaces();
  } else if (tab === 'missions') {
    html = subnavHtml('missions');
    if (sub.missions === 'contracts') html += renderContracts(busy, lv);
    else if (sub.missions === 'orders') html += renderOrders();
    else html += renderThreats(busy, lv);
  } else if (tab === 'map') {
    html = subnavHtml('map');
    if (sub.map === 'sector') html += renderMap(busy, lv);
    else html += renderCodex();
  } else if (tab === 'hangar') {
    html = subnavHtml('hangar');
    if (sub.hangar === 'ships') html += renderShips(lv);
    else html += renderModules();
  } else if (tab === 'cargo') {
    html = subnavHtml('cargo');
    if (sub.cargo === 'items') html += renderItems();
    else html += renderCraft();
  } else {
    html = subnavHtml('profile');
    if (sub.profile === 'rep') html += renderRep();
    else if (sub.profile === 'ach') html += renderAchievements();
    else html += renderStats(lv);
  }

  c.innerHTML = html;
}

/* ---------- Estação ---------- */

function renderJobs(busy, lv) {
  return `<div class="offers-grid">${jobOffers().map(j => offerCard(j, 'job', busy, lv)).join('')}</div>`;
}

function renderGear(lv) {
  let html = '';
  for (const [slot, slotName] of Object.entries(GEAR_SLOTS)) {
    const equipped = S.gear[slot];
    html += `<div class="gear-slot-title">${slotName}${equipped ? ` — usando ${GEAR.find(g => g.id === equipped).name}` : ''}</div>`;
    html += `<div class="gear-grid">` + GEAR.filter(g => g.slot === slot).map(g => {
      const isEquipped = equipped === g.id;
      const current = GEAR.find(x => x.id === equipped);
      const outdated = current && current.price >= g.price && !isEquipped;
      const lvLocked = lv < g.lvl;
      const canBuy = !isEquipped && !outdated && !lvLocked && S.credits >= g.price;
      return `
        <div class="gear-card ${isEquipped ? 'equipped' : ''}">
          <div class="gear-top">
            <span class="g-icon">${g.icon}</span>
            <div>
              <h5>${g.name} ${isEquipped ? '· <span class="owned-tag">equipado</span>' : ''}</h5>
              <div class="gear-effect">${g.effect}</div>
            </div>
          </div>
          ${g.lvl > 1 ? `<span class="chip chip-lvl ${lvLocked ? 'req' : ''}">Nv. ${g.lvl}+</span>` : ''}
          ${isEquipped ? '' : outdated ? '<span class="chip">já superado</span>' : `
          <div class="actions" style="display:flex;justify-content:flex-end">
            <button class="buy" ${canBuy ? '' : 'disabled'} onclick="buyGear('${g.id}')">${fmtCredits(g.price)} ₵</button>
          </div>`}
        </div>`;
    }).join('') + `</div>`;
  }
  return html;
}

function renderBar(lv) {
  let html = '';
  const cap = crewCap();
  html += `<div class="slots-note">Tripulação: <b>${S.crew.length}/${cap || 0}</b> vaga(s) — 1 vaga por tier de nave.${crewSalary() ? ` Salários somam <b>${crewSalary()} ₵</b> por missão.` : ''}</div>`;

  if (S.crew.length) {
    html += `<div class="section-title">👥 Sua tripulação</div><div class="crew-grid">`;
    html += crewMembers().map(c => `
      <div class="crew-card hired">
        <div class="crew-top">
          <span class="c-icon">${c.icon}</span>
          <div>
            <h5>${c.name} · <span class="owned-tag">a bordo</span></h5>
            <div class="crew-effect">${c.effect}</div>
          </div>
        </div>
        <div class="crew-salary">Salário: <b>${c.salary} ₵</b> por missão</div>
        <div class="actions" style="display:flex;justify-content:flex-end">
          <button class="danger" onclick="fireCrew('${c.id}')">Dispensar</button>
        </div>
      </div>`).join('');
    html += `</div>`;
  }

  const rng = mulberry32(hourIndex() * 2654435761 + 313);
  const candidates = CREW.filter(c => !S.crew.includes(c.id)).sort(() => rng() - 0.5).slice(0, 3);
  html += `<div class="section-title">🍻 No bar agora</div>`;
  if (!candidates.length) {
    html += `<div class="empty-note">O bar está vazio. Todo mundo já trabalha pra você.</div>`;
  } else {
    html += `<div class="crew-grid">` + candidates.map(c => {
      const lvLocked = lv < c.lvl;
      const canHire = !lvLocked && S.ship > 0 && S.crew.length < cap && S.credits >= c.hire;
      return `
        <div class="crew-card">
          <div class="crew-top">
            <span class="c-icon">${c.icon}</span>
            <div>
              <h5>${c.name}</h5>
              <div class="crew-effect">${c.effect}</div>
            </div>
          </div>
          <div class="chips">
            <span class="chip chip-pay">Contrato: ${fmtCredits(c.hire)} ₵</span>
            <span class="chip">Salário: ${c.salary} ₵/missão</span>
            ${c.lvl > 1 ? `<span class="chip chip-lvl ${lvLocked ? 'req' : ''}">Nv. ${c.lvl}+</span>` : ''}
          </div>
          <div class="actions" style="display:flex;justify-content:flex-end">
            <button class="accept" ${canHire ? '' : 'disabled'} onclick="hireCrew('${c.id}')">${lvLocked ? `Requer nível ${c.lvl}` : S.ship === 0 ? 'Precisa de nave' : S.crew.length >= cap ? 'Sem vagas' : 'Contratar'}</button>
          </div>
        </div>`;
    }).join('') + `</div>`;
  }
  return html;
}

function renderRaces() {
  const rd = betRaceDay();
  const { lineup } = raceLineup(rd);
  const msToRace = raceUtc(rd) - Date.now();
  let html = `
    <div class="race-clock">
      <span>🕓 Horário de Brasília: <b class="live-brt">${brtClock()}</b></span>
      <span>🏁 Próxima corrida em <b class="live-race">${fmtCountdown(msToRace)}</b></span>
    </div>`;

  if (S.lastRace) {
    html += `
      <div class="race-result">
        <b>Última corrida:</b> ${S.lastRace.winnerName} venceu.<br>
        Você apostou ${fmtCredits(S.lastRace.amount)} ₵ no ${S.lastRace.droneName} —
        ${S.lastRace.won ? `<span class="win">GANHOU +${fmtCredits(S.lastRace.payout)} ₵! 🎉</span>` : `<span class="lose">perdeu.</span>`}
      </div>`;
  }

  if (S.bet && S.bet.raceDay === rd) {
    const d = DRONES.find(x => x.id === S.bet.drone);
    html += `<div class="daily-done">🎫 Aposta feita: <b>${fmtCredits(S.bet.amount)} ₵</b> no ${d.icon} <b>${d.name}</b> (${S.bet.odds}x). A corrida começa às 23h de Brasília — volte para ver o resultado!</div>`;
  } else {
    html += `
      <div class="bet-box">
        <span>Valor da aposta (5–500 ₵):</span>
        <input type="number" id="betInput" value="25" min="5" max="500">
      </div>`;
  }

  html += `<div class="drone-grid">` + lineup.map(d => {
    const isMine = S.bet && S.bet.drone === d.id && S.bet.raceDay === rd;
    return `
      <div class="drone-card ${isMine ? 'my-bet' : ''}">
        <span class="drone-icon">${d.icon}</span>
        <span class="drone-name">${d.name}${isMine ? ' 🎫' : ''}</span>
        <span class="drone-odds">${d.odds.toFixed(1)}x</span>
        ${S.bet ? '' : `<button class="accept" onclick="placeBet('${d.id}', ${d.odds})">Apostar</button>`}
      </div>`;
  }).join('') + `</div>`;

  html += `<div class="map-hint">O favorito paga menos, o azarão paga ${RACE_ODDS[3]}x. Uma aposta por corrida.</div>`;
  return html;
}

/* ---------- Missões ---------- */

function renderContracts(busy, lv) {
  if (S.ship === 0) {
    return `<div class="empty-note">🔒 Contratos espaciais exigem uma nave.<br>Junte <b>${fmtCredits(shipPrice(SHIPS[1]))} ₵</b> nos serviços e visite o <b>Hangar</b>.</div>`;
  }
  let html = fuelStationHtml();

  const daily = dailyContract();
  if (daily) {
    if (S.dailyDone === daily.day) {
      const msLeft = (daily.day + 1) * DAY - Date.now();
      html += `<div class="daily-done">⭐ <b>Contrato diário concluído.</b> Um novo aparece em <b class="live-day">${fmtCountdown(msLeft)}</b>.</div>`;
    } else {
      html += offerCard(daily, 'daily', busy, lv, true);
    }
  }

  const offers = missionOffers();
  html += offers.length
    ? `<div class="offers-grid">${offers.map(m => offerCard(m, 'mission', busy, lv)).join('')}</div>`
    : `<div class="empty-note">Nenhuma missão disponível.</div>`;
  return html;
}

function renderOrders() {
  syncOrders();
  const daily = currentDailyOrder();
  const weekly = currentWeeklyOrder();
  const msDay = (dayIndex() + 1) * DAY - Date.now();
  const msWeek = (weekIndex() + 1) * 7 * DAY - Date.now();

  const orderHtml = (order, deliv, done, msLeft, liveClass) => {
    const it = ITEMS[order.item];
    const have = S.inventory[order.item] || 0;
    const pctDone = Math.min(100, (deliv / order.qty) * 100);
    return `
      <div class="card order-card ${done ? 'done' : ''}">
        <div class="order-scope ${order.scope === 'weekly' ? 'weekly' : ''}">${order.scope === 'daily' ? '📦 Encomenda diária' : '📦 Encomenda semanal'} — expira em <span class="${liveClass}">${fmtCountdown(msLeft)}</span></div>
        <div class="offer-head">
          <span class="offer-icon">${it.icon}</span>
          <div>
            <h4>Entregar ${order.qty}× ${it.name}</h4>
            <p>Você tem <b>${have}</b> no inventário${done ? ' · <b style="color:var(--green)">Concluída!</b>' : ''}</p>
          </div>
        </div>
        <div class="order-progress-outer"><div class="order-progress-inner" style="width:${pctDone.toFixed(0)}%"></div></div>
        <div class="order-progress-text">${deliv} / ${order.qty} entregues</div>
        <div class="chips">
          <span class="chip chip-pay">+${fmtCredits(order.pay)} ₵</span>
          <span class="chip chip-xp">+${fmtCredits(Math.round(order.xp * xpMult()))} XP</span>
        </div>
        <div class="offer-foot">
          <span></span>
          <button class="accept" ${done || !have ? 'disabled' : ''} onclick="deliverOrder('${order.scope}')">${done ? 'Concluída ✔' : have ? `Entregar (${Math.min(have, order.qty - deliv)})` : 'Sem itens'}</button>
        </div>
      </div>`;
  };

  return orderHtml(daily, S.orders.dDeliv, S.orders.dDone, msDay, 'live-day')
       + orderHtml(weekly, S.orders.wDeliv, S.orders.wDone, msWeek, 'live-week');
}

function renderThreats(busy, lv) {
  const t = currentThreat();
  if (S.threatDone === dayIndex()) {
    return `<div class="threat-calm">⚔️ <b>Ameaça de hoje eliminada.</b><br>O setor respira aliviado. Volte amanhã.</div>`;
  }
  if (!t) {
    return `<div class="threat-calm">📡 Nenhuma ameaça detectada no momento.<br>Elas aparecem sem aviso e somem em poucas horas — fique atento.</div>`;
  }
  const endTime = new Date(t.end);
  const p = n => String(n).padStart(2, '0');
  const card = `
    <div class="card threat-card">
      <div class="threat-tag">⚠️ Ameaça ativa no setor — some às ${p(endTime.getHours())}:${p(endTime.getMinutes())}</div>
      <div class="offer-head">
        <span class="offer-icon">${t.icon}</span>
        <div>
          <h4>${t.name}</h4>
          <p>${t.desc}</p>
        </div>
      </div>
      <div class="chips">
        <span class="chip chip-time">⏱ ${fmtDur(t.min)}</span>
        <span class="chip chip-pay">+${fmtCredits(t.pay)} ₵</span>
        <span class="chip chip-xp">+${fmtCredits(t.xp)} XP</span>
        <span class="chip chip-fuel">⛽ ${t.fuel}</span>
        <span class="chip chip-lvl ${lv < t.lvl ? 'req' : ''}">Nv. ${t.lvl}+</span>
        <span class="chip ${S.ship < t.tier ? 'chip-lvl req' : ''}">${SHIPS[t.tier].icon} ${SHIPS[t.tier].name}+</span>
        <span class="chip">🎁 ${ITEMS[t.lootItem].icon} ${ITEMS[t.lootItem].name}</span>
      </div>
      <div class="offer-foot">
        ${factionChip(t.faction)}
        <button class="accept" ${busy || lv < t.lvl || S.ship < t.tier || S.fuel < t.fuel ? 'disabled' : ''}
          onclick='startActivity("threat", ${JSON.stringify(t).replace(/'/g, "&#39;")})'>
          ${busy ? 'Ocupado' : lv < t.lvl ? `Requer nível ${t.lvl}` : S.ship < t.tier ? `Requer ${SHIPS[t.tier].name}` : S.fuel < t.fuel ? 'Sem combustível ⛽' : '⚔️ Caçar'}</button>
      </div>
    </div>`;
  return card;
}

/* ---------- Mapa ---------- */

function renderMap(busy, lv) {
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
        <span class="loc-icon">${S.visited[m.id] ? m.loc.icon : m.loc.icon}</span>
        <span class="loc-name">${S.visited[m.id] ? '✓ ' : ''}${m.loc.name}</span>
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
      detail = `<div class="map-detail"><div class="daily-done">📭 <b>${m.loc.name}</b> — sem contratos nesta rotação. Novas ofertas em <b class="live-rot">${fmtCountdown(msLeft)}</b>.</div></div>`;
    }
  }

  return `
    <div class="map-box">
      <div class="map-station"><span class="st-icon">🛰️</span><span class="st-name">PONTO ZERO</span></div>
      ${locs}
    </div>
    ${detail}
    <div class="map-hint">${S.ship === 0
      ? '🔒 Compre uma nave no Hangar para voar até esses destinos.'
      : 'Pontos com anel verde têm contratos disponíveis nesta rotação. Clique para ver. ✓ = registrado no diário.'}</div>`;
}

function renderCodex() {
  const found = Object.keys(S.visited).length;
  let html = `<div class="codex-count">📖 Locais descobertos: <b>${found} / ${MISSIONS.length}</b> — complete uma missão em cada local para registrá-lo.</div>`;
  html += `<div class="codex-grid">` + MISSIONS.map(m => {
    const known = !!S.visited[m.id];
    return `
      <div class="codex-card ${known ? '' : 'locked'}">
        <span class="codex-icon">${known ? m.loc.icon : '❔'}</span>
        <div class="codex-info">
          <h5>${known ? m.loc.name : '???'}</h5>
          <p>${known ? LORE[m.id] : 'Complete uma missão neste local para revelar seu registro.'}</p>
        </div>
      </div>`;
  }).join('') + `</div>`;
  return html;
}

/* ---------- Hangar ---------- */

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

function renderShips(lv) {
  const discount = repLevel('corp') > 0;
  let html = fuelStationHtml();
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
          <p style="color:var(--dim);margin-top:4px">⛽ Tanque: ${ship.tank} · 🔧 Slots: ${ship.slots} · 👥 Tripulação: ${ship.tier}</p>
          ${lockedPrev ? `<p style="color:var(--red);margin-top:4px">Requer a nave anterior primeiro.</p>` : ''}
          ${!owned && ship.lvl > 1 ? `<p style="color:${lockedLvl ? 'var(--red)' : 'var(--dim)'};margin-top:4px">Requer nível ${ship.lvl}</p>` : ''}
        </div>
        ${owned ? '' : `<button class="buy" ${canBuy ? '' : 'disabled'} onclick="buyShip(${ship.tier})">${fmtCredits(price)} ₵${discount && price < ship.price ? ' 🏢' : ''}</button>`}
      </div>`;
  }).join('') + `</div>`;
  return html;
}

function renderModules() {
  if (S.ship === 0) {
    return `<div class="empty-note">🔒 Você precisa de uma nave para instalar módulos.</div>`;
  }
  const slots = SHIPS[S.ship].slots;
  let html = `<div class="slots-note">Slots usados: <b>${S.modules.length}/${slots}</b> — módulos exigem créditos e peças fabricadas (Carga → Fabricação).</div>`;
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
        <div class="actions">
          <button class="buy" ${canBuy ? '' : 'disabled'} onclick="buyModule('${mod.id}')">${fmtCredits(price)} ₵</button>
        </div>`}
      </div>`;
  }).join('') + `</div>`;
  return html;
}

/* ---------- Carga ---------- */

function renderItems() {
  const entries = Object.entries(S.inventory);
  if (!entries.length) {
    return `<div class="empty-note">🎒 Inventário vazio.<br>Serviços e missões podem render itens para vender, entregar ou fabricar.</div>`;
  }
  entries.sort((a, b) => sellPrice(b[0]) - sellPrice(a[0]));
  const bonusTxt = [];
  if (moduleOwned('refinaria')) bonusTxt.push('⚗️ Refinaria +20%');
  if (repLevel('mineradores') > 0) bonusTxt.push(`⛏️ Mineradores +${repLevel('mineradores') * 2}%`);
  let html = `
    <div class="inv-header">
      <span>${invCount()} itens · valor de mercado <b style="color:var(--gold)">${fmtCredits(invTotalValue())} ₵</b></span>
      <button class="sell" onclick="sellAll()">Vender tudo</button>
    </div>
    <div class="market-note">📈 Os preços flutuam a cada hora. Setas mostram o mercado atual vs. valor base.${bonusTxt.length ? ' Bônus: ' + bonusTxt.join(' · ') : ''}</div>`;

  html += `<div class="inv-grid">` + entries.map(([id, qty]) => {
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
  }).join('') + `</div>`;
  return html;
}

function renderCraft() {
  return `<div class="recipe-grid">` + RECIPES.map(r => {
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
}

/* ---------- Perfil ---------- */

function renderRep() {
  return Object.entries(FACTIONS).map(([id, f]) => {
    const rep = S.rep[id] || 0;
    const lvl = repLevel(id);
    const nextThreshold = lvl < REP_LEVELS.length - 1 ? REP_LEVELS[lvl + 1].at : null;
    const prevThreshold = REP_LEVELS[lvl].at;
    const pct = nextThreshold ? ((rep - prevThreshold) / (nextThreshold - prevThreshold)) * 100 : 100;
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
}

function renderAchievements() {
  let html = `<div class="codex-count">🏆 Desbloqueadas: <b>${S.achievements.length} / ${ACHIEVEMENTS.length}</b></div>`;
  html += `<div class="ach-grid">` + ACHIEVEMENTS.map(a => {
    const done = S.achievements.includes(a.id);
    return `
      <div class="ach-card ${done ? 'done' : ''}">
        <span class="ach-check">${done ? '✅' : '🔒'}</span>
        <div class="ach-info">
          <h5>${a.name}</h5>
          <p>${a.desc}</p>
        </div>
        <span class="ach-reward">+${fmtCredits(a.reward)} ₵</span>
      </div>`;
  }).join('') + `</div>`;
  return html;
}

function renderStats(lv) {
  const st = S.stats;
  const today = dayIndex();
  const days = [];
  for (let i = 6; i >= 0; i--) days.push(today - i);
  const vals = days.map(d => st.byDay[d] || 0);
  const maxVal = Math.max(...vals, 1);
  const weekNames = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  let html = `
    <div class="chart-box">
      <div class="chart-title">💰 Ganhos dos últimos 7 dias</div>
      <div class="chart-bars">${days.map((d, i) => `
        <div class="chart-col">
          <span class="chart-val">${vals[i] ? fmtCredits(vals[i]) : ''}</span>
          <div class="chart-bar" style="height:${Math.max(3, (vals[i] / maxVal) * 80)}%"></div>
          <span class="chart-day">${weekNames[new Date((d * DAY) + 12 * HOUR).getDay()]}</span>
        </div>`).join('')}
      </div>
    </div>`;

  html += `<div class="section-title">📊 Números</div>
    <div class="records-grid">
      <div class="pstat"><b>${lv}</b><span>nível</span></div>
      <div class="pstat"><b>${fmtCredits(S.xp)}</b><span>XP total</span></div>
      <div class="pstat"><b>${fmtDur(st.minutes)}</b><span>tempo trabalhado</span></div>
      <div class="pstat"><b>${fmtCredits(S.totalEarned)}</b><span>₵ ganhos</span></div>
      <div class="pstat"><b>${fmtCredits(st.spent)}</b><span>₵ gastos</span></div>
      <div class="pstat"><b>${fmtCredits(st.biggestSale)}</b><span>maior venda</span></div>
      <div class="pstat"><b>${st.itemsSold}</b><span>itens vendidos</span></div>
      <div class="pstat"><b>${st.fuelBought}</b><span>⛽ comprado</span></div>
      <div class="pstat"><b>${S.dailiesDone}</b><span>contratos diários</span></div>
      <div class="pstat"><b>${st.ordersDone}</b><span>encomendas</span></div>
      <div class="pstat"><b>${st.raceWins}/${st.racesBet}</b><span>corridas (v/total)</span></div>
      <div class="pstat"><b>${st.bossesDone}</b><span>ameaças eliminadas</span></div>
      <div class="pstat"><b>${S.crafts}</b><span>fabricações</span></div>
      <div class="pstat"><b>${S.modules.length}</b><span>módulos</span></div>
      <div class="pstat"><b>${Object.keys(S.visited).length}/${MISSIONS.length}</b><span>locais descobertos</span></div>
    </div>`;
  return html;
}

/* ---------- card de oferta ---------- */

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
settleBet();          // resolve corrida que aconteceu enquanto estava fora
checkAchievements();
save();

let lastHour = hourIndex();
let activityWasFinished = false;
let threatWasActive = false;
render();

// tick de 1s: atualiza SÓ contadores e barras (rebuild completo faz a tela piscar)
function tick() {
  const now = Date.now();

  // virada de hora → ofertas/preços novos
  const h = hourIndex();
  if (h !== lastHour) {
    lastHour = h;
    toast('↻ Novas ofertas e preços de mercado!');
    render();
    return;
  }

  // corrida das 23h de Brasília resolvida?
  if (settleBet()) { render(); return; }

  // ameaça apareceu ou sumiu?
  const ta = !!currentThreat();
  if (ta !== threatWasActive) { threatWasActive = ta; if (ta) toast('⚠️ Ameaça detectada no setor!'); render(); return; }

  // contadores ao vivo
  renderRotation();
  const msRot = (hourIndex() + 1) * HOUR - now;
  document.querySelectorAll('.live-rot').forEach(el => { el.textContent = fmtCountdown(msRot); });
  const msDay = (dayIndex() + 1) * DAY - now;
  document.querySelectorAll('.live-day').forEach(el => { el.textContent = fmtCountdown(msDay); });
  const msWeek = (weekIndex() + 1) * 7 * DAY - now;
  document.querySelectorAll('.live-week').forEach(el => { el.textContent = fmtCountdown(msWeek); });
  const msRace = raceUtc(betRaceDay()) - now;
  document.querySelectorAll('.live-race').forEach(el => { el.textContent = fmtCountdown(msRace); });
  document.querySelectorAll('.live-brt').forEach(el => { el.textContent = brtClock(); });

  // atividade em andamento
  const a = S.activity;
  if (a) {
    const finished = now >= a.endTs;
    if (finished && !activityWasFinished) { render(); return; }
    if (!finished) {
      const bar = document.getElementById('activeProgress');
      const cd = document.getElementById('activeCountdown');
      if (bar) bar.style.width = (Math.min(1, (now - a.startTs) / (a.endTs - a.startTs)) * 100).toFixed(1) + '%';
      if (cd) cd.textContent = `⏱ ${fmtCountdown(a.endTs - now)}`;
    }
  }
}

setInterval(tick, 1000);

window.addEventListener('beforeunload', save);
