import './style.css';

const discord='https://discord.gg/6ncAaPaj';
const games=['Snake','2048','Pong','Astro'];
const friends=['onyx','mark','adrian','alex','aj'];
const app=document.querySelector('#app');

app.innerHTML=`
<div class="app">
<header class="top">
  <button class="mobile-menu" id="menu">☰</button>
  <div class="brand"><span>Marcus</span> <b>Airflow</b><i>v1</i></div>
  <div class="omnibox"><button id="back">‹</button><button id="forward">›</button><input id="address" placeholder="Search or enter a URL"><button id="go">↵</button></div>
  <button class="circle" id="theme">☼</button>
</header>
<aside id="side">
  <div class="section-label">WORKSPACE</div>
  <button class="nav active" data-page="home">⌂ <span>Home</span></button>
  <button class="nav" data-page="videos">▶ <span>Videos</span></button>
  <button class="nav" data-page="games">◆ <span>Games</span></button>
  <button class="nav" data-page="friends">● <span>Friends</span></button>
  <div class="section-label">BOOKMARKS</div>
  <a class="nav" href="https://www.youtube.com" target="_blank">▶ <span>YouTube</span></a>
  <a class="nav" href="${discord}" target="_blank">◎ <span>Discord Group</span></a>
  <div class="side-bottom"><small>NO LOGIN REQUIRED</small><b>v1</b></div>
</aside>
<main id="main"></main>
<aside class="ai" id="ai">
  <div class="ai-title"><span>✦ Airflow AI</span><button id="minAI">−</button></div>
  <div class="chat" id="chat"><div class="msg bot">Welcome to Marcus Airflow. Ask me anything.</div></div>
  <div class="composer"><input id="prompt" placeholder="Message Airflow AI…"><button id="send">↑</button></div>
</aside>
<footer>Thanks ChatGPT ♡</footer>
</div>`;

const main=document.querySelector('#main');
function setActive(p){document.querySelectorAll('.nav[data-page]').forEach(x=>x.classList.toggle('active',x.dataset.page===p))}
function home(){
 main.innerHTML=`<section class="hero">
   <div class="eyebrow">WELCOME TO</div><h1>Marcus <span>Airflow</span></h1>
   <p>A browser made by the crew, for the crew.</p>
   <div class="search-card"><span>⌕</span><input id="heroSearch" placeholder="Search the web or enter a URL…"><button id="heroGo">Go</button></div>
   <div class="tiles">
    <button data-page="videos"><strong>▶</strong><b>Community Videos</b><small>Upload & watch</small></button>
    <button data-page="games"><strong>◆</strong><b>Built-in Games</b><small>Play instantly</small></button>
    <button data-page="friends"><strong>●</strong><b>Friend Hub</b><small>Onyx · Mark · Adrian · Alex · AJ</small></button>
   </div>
 </section>`;
 document.querySelector('#heroGo').onclick=()=>navigate(document.querySelector('#heroSearch').value);
 document.querySelector('#heroSearch').onkeydown=e=>e.key==='Enter'&&navigate(e.target.value);
 main.querySelectorAll('[data-page]').forEach(x=>x.onclick=()=>show(x.dataset.page));
}
function videos(){
 main.innerHTML=`<section class="page"><div class="page-head"><div><div class="eyebrow">COMMUNITY</div><h2>Videos</h2><p>Drop a video in and it appears here for this browser session.</p></div><label class="upload">＋ Upload video<input id="vid" type="file" accept="video/*"></label></div><div class="video-grid" id="vg"><div class="empty">No community videos yet.<br><small>Upload the first one.</small></div></div></section>`;
 document.querySelector('#vid').onchange=e=>{
  const f=e.target.files[0];if(!f)return;
  const u=URL.createObjectURL(f),g=document.querySelector('#vg');
  if(g.querySelector('.empty'))g.innerHTML='';
  const card=document.createElement('article');card.className='video';
  card.innerHTML=`<video controls src="${u}"></video><b>${esc(f.name)}</b><small>Anonymous · this session</small>`;
  g.prepend(card);
 };
}
function gamesPage(){
 main.innerHTML=`<section class="page"><div class="eyebrow">ARCADE</div><h2>Built-in Games</h2><div class="game-grid">${games.map(x=>`<button class="game" data-game="${x}"><span>${x==='2048'?'▦':x==='Snake'?'〰':x==='Pong'?'◉':'✦'}</span><b>${x}</b><small>Play now →</small></button>`).join('')}</div><div id="gameArea"></div></section>`;
 document.querySelectorAll('.game').forEach(b=>b.onclick=()=>launch(b.dataset.game));
}
function friendsPage(){
 main.innerHTML=`<section class="page"><div class="eyebrow">THE CREW</div><h2>Friend Hub</h2><p>Quick buttons for the Marcus Airflow crew.</p><div class="friends">${friends.map(x=>`<button><span>${x[0].toUpperCase()}</span>${x}</button>`).join('')}</div></section>`;
}
function show(p){setActive(p);({home,videos,games:gamesPage,friends:friendsPage}[p]||home)()}
function navigate(v){if(!v)return;if(!/^https?:\/\//i.test(v))v='https://www.google.com/search?q='+encodeURIComponent(v);document.querySelector('#address').value=v;window.open(v,'_blank','noopener')}
document.querySelector('#go').onclick=()=>navigate(document.querySelector('#address').value);
document.querySelector('#address').onkeydown=e=>e.key==='Enter'&&navigate(e.target.value);
document.querySelectorAll('.nav[data-page]').forEach(x=>x.onclick=()=>show(x.dataset.page));
document.querySelector('#minAI').onclick=()=>document.querySelector('#ai').classList.toggle('min');
document.querySelector('#menu').onclick=()=>document.querySelector('#side').classList.toggle('open');
document.querySelector('#theme').onclick=()=>document.body.classList.toggle('light');

function ask(){
 const i=document.querySelector('#prompt'),t=i.value.trim();if(!t)return;
 add(t,'user');i.value='';
 setTimeout(()=>add("I'm the Marcus Airflow AI demo. Connect your preferred AI API on a server to make this a full AI assistant.",'bot'),250)
}
function add(t,c){const el=document.createElement('div');el.className='msg '+c;el.textContent=t;document.querySelector('#chat').append(el);document.querySelector('#chat').scrollTop=99999}
document.querySelector('#send').onclick=ask;document.querySelector('#prompt').onkeydown=e=>e.key==='Enter'&&ask();

function launch(name){
 const a=document.querySelector('#gameArea');
 a.innerHTML=`<div class="game-panel"><h3>${name}</h3><p>This game slot is built into Marcus Airflow. Add the full game logic here.</p><button onclick="this.textContent='Launching…'">Start ${name}</button></div>`;
}
function esc(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
show('home');
