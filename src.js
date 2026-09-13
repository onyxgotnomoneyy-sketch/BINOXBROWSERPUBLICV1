import './style.css';

const discord = 'https://discord.gg/6ncAaPaj';

const games = [
  'Snake',
  '2048',
  'Pong',
  'Astro'
];

const friends = [
  'onyx',
  'mark',
  'adrian',
  'alex',
  'aj'
];

const app = document.querySelector('#app');

app.innerHTML = `
<div class="app">

  <header class="top">

    <button
      class="mobile-menu"
      id="menu"
      type="button"
      aria-label="Open menu"
    >
      ☰
    </button>

    <div class="brand">
      <span>Marcus</span>
      <b>Airflow</b>
      <i>v1</i>
    </div>

    <div class="omnibox">

      <button
        id="back"
        type="button"
        aria-label="Back"
      >
        ‹
      </button>

      <button
        id="forward"
        type="button"
        aria-label="Forward"
      >
        ›
      </button>

      <input
        id="address"
        type="text"
        inputmode="url"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        placeholder="Search or enter a URL"
      >

      <button
        id="go"
        type="button"
        aria-label="Go"
      >
        ↵
      </button>

    </div>

    <button
      class="circle"
      id="theme"
      type="button"
      aria-label="Change theme"
    >
      ☼
    </button>

  </header>


  <aside id="side">

    <div class="section-label">
      WORKSPACE
    </div>

    <button
      class="nav active"
      data-page="home"
      type="button"
    >
      ⌂ <span>Home</span>
    </button>

    <button
      class="nav"
      data-page="videos"
      type="button"
    >
      ▶ <span>Videos</span>
    </button>

    <button
      class="nav"
      data-page="games"
      type="button"
    >
      ◆ <span>Games</span>
    </button>

    <button
      class="nav"
      data-page="friends"
      type="button"
    >
      ● <span>Friends</span>
    </button>


    <div class="section-label">
      BOOKMARKS
    </div>

    <a
      class="nav"
      href="https://www.youtube.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      ▶ <span>YouTube</span>
    </a>

    <a
      class="nav"
      href="${discord}"
      target="_blank"
      rel="noopener noreferrer"
    >
      ◎ <span>Discord Group</span>
    </a>


    <div class="side-bottom">
      <small>NO LOGIN REQUIRED</small>
      <b>v1</b>
    </div>

  </aside>


  <main id="main"></main>


  <aside class="ai" id="ai">

    <div class="ai-title">

      <span>
        ✦ Airflow AI
      </span>

      <button
        id="minAI"
        type="button"
        aria-label="Minimize AI"
      >
        −
      </button>

    </div>


    <div
      class="chat"
      id="chat"
    >

      <div class="msg bot">
        Welcome to Marcus Airflow. Ask me anything.
      </div>

    </div>


    <div class="composer">

      <input
        id="prompt"
        type="text"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="sentences"
        spellcheck="true"
        placeholder="Message Airflow AI…"
      >

      <button
        id="send"
        type="button"
        aria-label="Send message"
      >
        ↑
      </button>

    </div>

  </aside>


  <footer>
    Thanks ChatGPT ♡
  </footer>

</div>
`;


const main = document.querySelector('#main');


/* =========================
   NAVIGATION
========================= */

function setActive(page) {

  document
    .querySelectorAll('.nav[data-page]')
    .forEach(button => {

      button.classList.toggle(
        'active',
        button.dataset.page === page
      );

    });

}


/* =========================
   HOME
========================= */

function home() {

  main.innerHTML = `
    <section class="hero">

      <div class="eyebrow">
        WELCOME TO
      </div>

      <h1>
        Marcus <span>Airflow</span>
      </h1>

      <p>
        A browser made by the crew, for the crew.
      </p>


      <div class="search-card">

        <span>⌕</span>

        <input
          id="heroSearch"
          type="text"
          inputmode="url"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="Search the web or enter a URL…"
        >

        <button
          id="heroGo"
          type="button"
        >
          Go
        </button>

      </div>


      <div class="tiles">

        <button
          data-page="videos"
          type="button"
        >
          <strong>▶</strong>
          <b>Community Videos</b>
          <small>Upload & watch</small>
        </button>


        <button
          data-page="games"
          type="button"
        >
          <strong>◆</strong>
          <b>Built-in Games</b>
          <small>Play instantly</small>
        </button>


        <button
          data-page="friends"
          type="button"
        >
          <strong>●</strong>
          <b>Friend Hub</b>
          <small>
            Onyx · Mark · Adrian · Alex · AJ
          </small>
        </button>

      </div>

    </section>
  `;


  const heroSearch =
    document.querySelector('#heroSearch');

  const heroGo =
    document.querySelector('#heroGo');


  /*
    iPad/iOS:
    explicitly focus the input when tapped.
  */

  heroSearch.addEventListener(
    'click',
    event => {
      event.stopPropagation();
    }
  );


  heroSearch.addEventListener(
    'touchstart',
    event => {
      event.stopPropagation();
    },
    {
      passive: true
    }
  );


  heroSearch.addEventListener(
    'input',
    event => {
      /*
        Keep the native input value untouched.
        This listener intentionally does not
        modify the value.
      */
      const value = event.target.value;
      void value;
    }
  );


  heroGo.addEventListener(
    'click',
    () => {
      navigate(heroSearch.value);
    }
  );


  heroSearch.addEventListener(
    'keydown',
    event => {

      if (event.key === 'Enter') {
        event.preventDefault();

        navigate(heroSearch.value);
      }

    }
  );


  main
    .querySelectorAll('[data-page]')
    .forEach(button => {

      button.addEventListener(
        'click',
        () => {
          show(button.dataset.page);
        }
      );

    });

}


/* =========================
   VIDEOS
========================= */

function videos() {

  main.innerHTML = `
    <section class="page">

      <div class="page-head">

        <div>

          <div class="eyebrow">
            COMMUNITY
          </div>

          <h2>
            Videos
          </h2>

          <p>
            Drop a video in and it appears here
            for this browser session.
          </p>

        </div>


        <label class="upload">

          ＋ Upload video

          <input
            id="vid"
            type="file"
            accept="video/*"
          >

        </label>

      </div>


      <div
        class="video-grid"
        id="vg"
      >

        <div class="empty">

          No community videos yet.

          <br>

          <small>
            Upload the first one.
          </small>

        </div>

      </div>

    </section>
  `;


  const videoInput =
    document.querySelector('#vid');


  videoInput.addEventListener(
    'change',
    event => {

      const file =
        event.target.files[0];

      if (!file) {
        return;
      }


      const url =
        URL.createObjectURL(file);


      const grid =
        document.querySelector('#vg');


      if (grid.querySelector('.empty')) {
        grid.innerHTML = '';
      }


      const card =
        document.createElement('article');


      card.className = 'video';


      card.innerHTML = `
        <video
          controls
          playsinline
          src="${url}"
        ></video>

        <b>
          ${escapeHTML(file.name)}
        </b>

        <small>
          Anonymous · this session
        </small>
      `;


      grid.prepend(card);

    }
  );

}


/* =========================
   GAMES
========================= */

function gamesPage() {

  main.innerHTML = `
    <section class="page">

      <div class="eyebrow">
        ARCADE
      </div>

      <h2>
        Built-in Games
      </h2>


      <div class="game-grid">

        ${games
          .map(game => {

            let icon = '✦';

            if (game === '2048') {
              icon = '▦';
            }

            if (game === 'Snake') {
              icon = '〰';
            }

            if (game === 'Pong') {
              icon = '◉';
            }

            return `
              <button
                class="game"
                data-game="${game}"
                type="button"
              >

                <span>
                  ${icon}
                </span>

                <b>
                  ${game}
                </b>

                <small>
                  Play now →
                </small>

              </button>
            `;

          })
          .join('')}

      </div>


      <div id="gameArea"></div>

    </section>
  `;


  document
    .querySelectorAll('.game')
    .forEach(button => {

      button.addEventListener(
        'click',
        () => {
          launch(button.dataset.game);
        }
      );

    });

}


/* =========================
   FRIENDS
========================= */

function friendsPage() {

  main.innerHTML = `
    <section class="page">

      <div class="eyebrow">
        THE CREW
      </div>

      <h2>
        Friend Hub
      </h2>

      <p>
        Quick buttons for the Marcus Airflow crew.
      </p>


      <div class="friends">

        ${friends
          .map(name => `
            <button
              type="button"
            >

              <span>
                ${name[0].toUpperCase()}
              </span>

              ${name}

            </button>
          `)
          .join('')}

      </div>

    </section>
  `;

}


/* =========================
   PAGE SWITCHING
========================= */

function show(page) {

  setActive(page);


  const pages = {
    home,
    videos,
    games: gamesPage,
    friends: friendsPage
  };


  if (pages[page]) {
    pages[page]();
  } else {
    home();
  }

}


/* =========================
   SEARCH / URL
========================= */

function navigate(value) {

  const input =
    String(value || '').trim();


  if (!input) {
    return;
  }


  let destination =
    input;


  /*
    If it already looks like a URL,
    open it directly.
  */

  if (
    !/^https?:\/\//i.test(destination)
  ) {

    /*
      Search Google for normal text.
    */

    destination =
      'https://www.google.com/search?q=' +
      encodeURIComponent(destination);

  }


  const address =
    document.querySelector('#address');


  if (address) {
    address.value = input;
  }


  window.open(
    destination,
    '_blank',
    'noopener,noreferrer'
  );

}


/* =========================
   TOP ADDRESS BAR
========================= */

const address =
  document.querySelector('#address');


const goButton =
  document.querySelector('#go');


address.addEventListener(
  'click',
  event => {
    event.stopPropagation();
  }
);


address.addEventListener(
  'touchstart',
  event => {
    event.stopPropagation();
  },
  {
    passive: true
  }
);


address.addEventListener(
  'keydown',
  event => {

    if (event.key === 'Enter') {

      event.preventDefault();

      navigate(address.value);

    }

  }
);


goButton.addEventListener(
  'click',
  () => {
    navigate(address.value);
  }
);


/* =========================
   TOP BUTTONS
========================= */

document
  .querySelector('#back')
  .addEventListener(
    'click',
    () => {

      if (window.history.length > 1) {
        window.history.back();
      }

    }
  );


document
  .querySelector('#forward')
  .addEventListener(
    'click',
    () => {

      window.history.forward();

    }
  );


document
  .querySelector('#menu')
  .addEventListener(
    'click',
    () => {

      document
        .querySelector('#side')
        .classList.toggle('open');

    }
  );


document
  .querySelector('#theme')
  .addEventListener(
    'click',
    () => {

      document.body.classList.toggle('light');

    }
  );


/* =========================
   AI
========================= */

document
  .querySelector('#minAI')
  .addEventListener(
    'click',
    () => {

      document
        .querySelector('#ai')
        .classList.toggle('min');

    }
  );


function ask() {

  const input =
    document.querySelector('#prompt');


  const text =
    input.value.trim();


  if (!text) {
    return;
  }


  add(text, 'user');


  input.value = '';


  setTimeout(
    () => {

      add(
        "I'm the Marcus Airflow AI demo. Connect your preferred AI API on a server to make this a full AI assistant.",
        'bot'
      );

    },
    250
  );

}


function add(text, type) {

  const element =
    document.createElement('div');


  element.className =
    'msg ' + type;


  element.textContent =
    text;


  const chat =
    document.querySelector('#chat');


  chat.appendChild(element);


  chat.scrollTop =
    chat.scrollHeight;

}


const promptInput =
  document.querySelector('#prompt');


promptInput.addEventListener(
  'keydown',
  event => {

    if (event.key === 'Enter') {

      event.preventDefault();

      ask();

    }

  }
);


document
  .querySelector('#send')
  .addEventListener(
    'click',
    ask
  );


/* =========================
   GAMES
========================= */

function launch(name) {

  const area =
    document.querySelector('#gameArea');


  area.innerHTML = `
    <div class="game-panel">

      <h3>
        ${escapeHTML(name)}
      </h3>

      <p>
        This game slot is built into
        Marcus Airflow.
        Add the full game logic here.
      </p>

      <button
        id="startGame"
        type="button"
      >
        Start ${escapeHTML(name)}
      </button>

    </div>
  `;


  document
    .querySelector('#startGame')
    .addEventListener(
      'click',
      event => {

        event.target.textContent =
          'Launching…';

      }
    );

}


/* =========================
   HTML ESCAPING
========================= */

function escapeHTML(value) {

  return String(value).replace(
    /[&<>"']/g,
    character => {

      const replacements = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };


      return replacements[character];

    }
  );

}


/* =========================
   START
========================= */

show('home');
