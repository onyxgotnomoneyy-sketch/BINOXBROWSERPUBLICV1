import './style.css';

const games = [
  ['Snake', 'snake'], ['2048', '2048'], ['Pong', 'pong'], ['Astro', 'astro']
];

const app = document.querySelector('#root');
app.innerHTML = `
  <div class="shell">
    <header class="topbar">
      <div class="brand"><span>Marcus</span> <b>Airflow</b></div>
      <div class="address">
        <button id="back">‹</button><button id="forward">›</button>
        <input id="url" value="https://www.google.com" aria-label="Address" />
        <button id="go">Go</button>
      </div>
      <button id="home" class="icon">⌂</button>
    </header>

    <aside class="sidebar">
      <h3>Bookmarks</h3>
      <button class="nav active" data-page="home">🏠 Home</button>
      <button class="nav" data-page="videos">🎬 Videos</button>
      <button class="nav" data-page="games">🎮 Games</button>
      <button class="nav" data-page="friends">👥 Friends</button>
      <a class="nav" href="https://discord.gg/6ncAaPaj" target="_blank" rel="noopener">💬 Discord Group</a>
      <div class="side-note">No login required.</div>
      <div class="version">v1</div>
    </aside>

    <main id="content"></main>

    <section class="ai">
      <div class="ai-head"><span>🤖 Airflow AI</span><button id="collapse">−</button></div>
      <div id="chat" class="chat">
        <div class="bubble bot">Yo! I'm Airflow AI. Ask me something.</div>
      </div>
      <div class="chatbox">
        <input id="prompt" placeholder="Ask Airflow AI..." />
        <button id="send">➤</button>
      </div>
    </section>

    <footer>Thanks ChatGPT ♡</footer>
  </div>
`;

const content = document.querySelector('#content');

function pageHome() {
  content.innerHTML = `
    <div class="welcome">
      <div class="logo">Marcus <span>Airflow</span></div>
      <p>Your browser. Your crew. Your airflow.</p>
      <div class="quick">
        <button data-url="https://www.youtube.com">YouTube</button>
        <button data-page="videos">Community Videos</button>
        <button data-page="games">Built-in Games</button>
        <button data-page="friends">Friend Hub</button>
      </div>
    </div>`;
  content.querySelectorAll('[data-url]').forEach(b => b.onclick=()=>navigate(b.dataset.url));
  content.querySelectorAll('[data-page]').forEach(b => b.onclick=()=>showPage(b.dataset.page));
}

function pageVideos() {
  content.innerHTML = `
    <div class="page">
      <h1>🎬 Community Videos</h1>
      <p>Upload videos without creating an account. This v1 demo keeps selected videos in your browser.</p>
      <label class="upload"><input id="videoInput" type="file" accept="video/*"> ⬆ Choose a video</label>
      <div id="videoGrid" class="video-grid"></div>
    </div>`;
  const grid = content.querySelector('#videoGrid');
  content.querySelector('#videoInput').onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    grid.insertAdjacentHTML('afterbegin',
      `<article class="video-card"><video controls src="${url}"></video><b>${escapeHtml(file.name)}</b><small>Anonymous uploader</small></article>`);
  };
}

function pageGames() {
  content.innerHTML = `
    <div class="page"><h1>🎮 Built-in Games</h1><div class="game-grid">
      ${games.map(([name,id])=>`<button class="game" data-game="${id}">${name}<small>Play</small></button>`).join('')}
    </div><div id="gameArea"></div></div>`;
  content.querySelectorAll('.game').forEach(b=>b.onclick=()=>launchGame(b.dataset.game));
}

function pageFriends() {
  content.innerHTML = `
    <div class="page"><h1>👥 Friend Hub</h1><p>Just buttons. No accounts.</p>
    <div class="friends">${['onyx','mark','adrian','alex','aj'].map(x=>`<button>${x}</button>`).join('')}</div></div>`;
}

function showPage(name) {
  document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('active', x.dataset.page===name));
  ({home:pageHome,videos:pageVideos,games:pageGames,friends:pageFriends}[name]||pageHome)();
}
function navigate(url) {
  if (!/^https?:\/\//i.test(url)) url='https://www.google.com/search?q='+encodeURIComponent(url);
  document.querySelector('#url').value=url;
  window.open(url, '_blank', 'noopener');
}
document.querySelector('#go').onclick=()=>navigate(document.querySelector('#url').value);
document.querySelector('#url').onkeydown=e=>{if(e.key==='Enter')navigate(e.target.value)};
document.querySelector('#home').onclick=()=>showPage('home');
document.querySelectorAll('.nav[data-page]').forEach(b=>b.onclick=()=>showPage(b.dataset.page));

document.querySelector('#collapse').onclick=()=>{
  document.querySelector('.ai').classList.toggle('closed');
  document.querySelector('#collapse').textContent=document.querySelector('.ai').classList.contains('closed')?'+':'−';
};

function addChat(text, cls) {
  const c=document.querySelector('#chat');
  c.insertAdjacentHTML('beforeend', `<div class="bubble ${cls}">${escapeHtml(text)}</div>`);
  c.scrollTop=c.scrollHeight;
}
document.querySelector('#send').onclick=askAI;
document.querySelector('#prompt').onkeydown=e=>{if(e.key==='Enter')askAI()};
function askAI(){
  const input=document.querySelector('#prompt'), text=input.value.trim();
  if(!text)return;
  addChat(text,'user'); input.value='';
  setTimeout(()=>addChat("I'm the built-in demo AI. Connect an AI API on your server to make me fully conversational.",'bot'),250);
}

function launchGame(id) {
  const area=document.querySelector('#gameArea');
  if(id==='2048') {
    let n=Array(16).fill(0); n[Math.floor(Math.random()*16)]=2; render2048();
    function render2048(){area.innerHTML='<div class="board">'+n.map((x,i)=>`<button class="tile" data-i="${i}">${x||''}</button>`).join('')+'</div><p>Click a tile to add a 2.</p>'; area.querySelectorAll('.tile').forEach(b=>b.onclick=()=>{if(!n[b.dataset.i]){n[b.dataset.i]=2;render2048()}})}
  } else {
    area.innerHTML=`<div class="mini-game"><h2>${id.toUpperCase()}</h2><p>This built-in game slot is ready for the next update.</p><button onclick="this.textContent='Nice!'">Start</button></div>`;
  }
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}

showPage('home');
