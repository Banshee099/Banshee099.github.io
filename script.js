(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO  = 'IntersectionObserver' in window;

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* =====================================================================
     DATA — single source of truth, rendered differently per theme
     ===================================================================== */
  var DATA = {
    name: 'Manas Bisht',
    roles: ['CTO', 'Founding Engineer', 'AI Engineer'],
    tagline: 'building secure, AI-powered enterprise software at Immunefiles',
    location: 'Noida, India',
    about: [
      'I take secure AI products from <b>zero to production</b> at enterprise scale. At <b>Immunefiles</b> — a secure enterprise document collaboration and AI platform — I own the full technical stack as CTO and founding engineer: architecture, infrastructure, the document-grounded LLM systems, and the compliance posture that closes enterprise deals.',
      'I took the product from nothing to live deployments at companies like <b>Toyota</b> and <b>Mitutoyo</b>, shipping iteratively against real customer feedback rather than fixed specs. I care about systems that stay up, AI that behaves predictably in regulated environments, and infrastructure that’s cheap to run and easy to trust.'
    ],
    skills: {
      core: ['Python', 'FastAPI', 'Docker', 'Kubernetes', 'Terraform', 'Azure', 'RAG', 'LangChain'],
      groups: [
        { label: 'languages', items: ['Python', 'SQL', 'Bash'] },
        { label: 'frameworks & libraries', items: ['FastAPI', 'Django', 'DRF', 'Streamlit', 'LangChain', 'HF Transformers', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'OpenCV', 'NumPy', 'Pandas', 'Matplotlib', 'Librosa'] },
        { label: 'ai / ml', items: ['RAG', 'Semantic Search', 'Embeddings', 'LLM Deployment', 'Multi-Agent Systems', 'Prompt Engineering', 'NLP', 'NER', 'Transformers', 'Transfer Learning', 'CNN Architectures', 'GPU Inference', 'CUDA'] },
        { label: 'cloud & devops', items: ['Docker', 'Kubernetes', 'Helm', 'Terraform', 'GitHub Actions', 'Azure App Gateway', 'Azure Key Vault', 'AWS EC2', 'Cloudflare', 'Nginx', 'Certbot', 'RabbitMQ'] },
        { label: 'observability & tools', items: ['Prometheus', 'Grafana', 'Sentry', 'k6', 'Git', 'Postman', 'Systemd', 'WOPI Servers'] },
        { label: 'practices', items: ['MLOps', 'CI/CD', 'Infrastructure as Code', 'Containerization', 'Observability', 'Distributed Systems', 'High Availability', 'Data Security & Privacy'] }
      ]
    },
    experience: {
      company: 'Immunefiles', org: 'Prudentbit', role: 'CTO & Founding Engineer',
      location: 'Noida, India', period: '2024 — present',
      summary: 'Secure enterprise document collaboration &amp; AI platform. In production at <b>Toyota, Mitutoyo, DC Technologies, Startup Movers</b> — serving 500+ users.',
      groups: [
        { title: 'product & leadership', items: [
          'Owned end-to-end technical direction as CTO — <b>architecture, stack, hiring, roadmap</b>, and customer-facing technical conversations through enterprise sales and onboarding.',
          'Took the platform <b>from zero to production</b> at five enterprise customers — including <b>Toyota</b> and <b>Mitutoyo</b> — shipping against real feedback rather than fixed specs.',
          'Led the security &amp; compliance posture to close enterprise buyers — <b>SSO, RBAC</b>, secrets management, audit logging, and SSL/TLS across all services.'
        ] },
        { title: 'ai / llm systems', items: [
          'Built the document-grounded LLM layer using <b>Retrieval-Augmented Generation</b>, semantic search, and embedding pipelines over enterprise documents in production.',
          'Designed modular ingestion for PDF, DOCX, PPTX, CSV, XLSX with automated parsing, <b>semantic chunking</b>, and indexing — onboarding customer corpora in hours.',
          'Architected <b>multi-agent workflows</b> with persistent context, stateful execution, and controlled prompt routing for complex document tasks.',
          'Implemented prompt governance and safety controls to reduce hallucinations and enforce <b>policy-bound responses</b>; shipped multilingual PII/financial/healthcare masking.',
          'Deployed AI as scalable <b>FastAPI microservices</b> with GPU-accelerated inference (CUDA), tracing, and exception handling.'
        ] },
        { title: 'infrastructure & platform', items: [
          'Architected and deployed <b>15+ containerized microservices</b> with Docker, Kubernetes, Helm, and Nginx at 99.9%+ availability.',
          'Built GitHub Actions CI/CD automating build, test, publish, rollout, and rollback — <b>cutting deploy time by 80%</b> and enabling multiple ships per week.',
          'Provisioned cloud infrastructure with <b>Terraform</b> for repeatable, consistent dev and production deployments.',
          'Implemented cloud-native traffic management and security with <b>Azure Application Gateway, Cloudflare, WAF</b>, and centralized SSL termination.',
          'Secured application secrets via <b>Azure Key Vault</b> with RBAC, eliminating plaintext credentials across production.',
          'Built end-to-end observability with Prometheus, Grafana, centralized logging, and Sentry — <b>reducing MTTR by 60%</b>.',
          'Optimized cloud architecture to <b>cut infrastructure costs by 40%</b> while maintaining 99.9%+ availability.',
          'Operated <b>RabbitMQ clusters</b> and Microsoft Office / Collabora WOPI servers for secure, event-driven document collaboration.',
          'Built reusable <b>k6</b> performance, load, and stress-testing suites to catch scalability issues before release.'
        ] }
      ]
    },
    projects: [
      { title: 'TinyVGG Image Classification', href: 'https://github.com/Banshee099/TinyVGG',
        img: 'assets/proj-tinyvgg.svg', alt: 'TinyVGG classifying a FashionMNIST garment',
        desc: 'A CNN using the <b>TinyVGG architecture</b> on FashionMNIST in PyTorch — custom training/eval loops, accuracy tracking, and model checkpointing across an end-to-end deep-learning workflow.',
        tags: ['PyTorch', 'CNN', 'TinyVGG', 'FashionMNIST'] },
      { title: 'Monet Style Transfer · CycleGAN', href: null,
        img: 'assets/proj-cyclegan.svg', alt: 'CycleGAN translating a photo into a Monet-style painting',
        desc: 'Unpaired image translation on the Kaggle Photo/Monet set (~8K photos, ~1.2K paintings) with <b>ResNet generators</b> and <b>PatchGAN discriminators</b>, 30+ epochs with checkpoint/resume.',
        tags: ['PyTorch', 'CycleGAN', 'GANs', 'ResNet', 'PatchGAN'] }
    ],
    infra: [
      { display: '15+',   count: 15,   suffix: '+', label: 'microservices' },
      { display: '99.9%', count: 99.9, suffix: '%', label: 'availability' },
      { display: '500+',  count: 500,  suffix: '+', label: 'users' },
      { display: '40%',   count: 40,   suffix: '%', label: 'cost ↓' },
      { display: '80%',   count: 80,   suffix: '%', label: 'faster deploys' },
      { display: '60%',   count: 60,   suffix: '%', label: 'mttr ↓' }
    ],
    infraNote: 'docker · k8s · helm · nginx · terraform IaC · azure key vault · WAF · CI/CD with rollback · prometheus + grafana + sentry',
    infraStack: ['Docker', 'Kubernetes', 'Helm', 'Terraform', 'GitHub Actions', 'Azure', 'Cloudflare', 'Prometheus', 'Grafana', 'Sentry', 'RabbitMQ'],
    blog: [
      { file: 'cuda/day-01.md', title: 'CUDA — Day 1: the GPU execution model, kernels, and the grid/block/thread hierarchy.', href: 'https://app.notion.com/p/CUDA-DAY-1-356f1ad91c6c807c92fbf5daa7aec5cd' },
      { file: 'cuda/streaming-multiprocessor.md', title: 'The Streaming Multiprocessor — CUDA cores, warp scheduling, and how blocks map to hardware.', href: 'https://app.notion.com/p/Streaming-Multiprocessor-359f1ad91c6c80579a4fcf2edb54c5ad' }
    ],
    credentials: {
      education: 'B.Tech, Computer Science (AI &amp; ML) · Sharda University · 2020–2024 · GPA 7.8/10',
      certs: 'Google Cloud Certification · Machine Learning A–Z: Python &amp; R in Data Science'
    },
    contact: {
      email: 'manasbisht2507@gmail.com',
      linkedin: 'https://www.linkedin.com/in/manas-bisht-402326202/',
      github: 'https://github.com/Banshee099',
      x: 'https://x.com/Banshee2507',
      resume: 'assets/Manas_Bisht.pdf'
    },
    narrative: [
      { lead: 'I build',        key: 'products.',       sub: 'Taking ideas from zero to live — used by real customers, every day.' },
      { lead: 'Then I build',   key: 'platforms.',      sub: 'Document-grounded AI, multi-agent workflows, and RAG at enterprise scale.' },
      { lead: 'Then I build',   key: 'infrastructure.', sub: '15+ microservices on Kubernetes, holding 99.9% uptime under real load.' },
      { lead: 'Then I',         key: 'scale companies.',sub: 'From nothing to five enterprise deployments and 500+ users in production.' }
    ]
  };

  /* =====================================================================
     THEME · DEVELOPER CONSOLE
     ===================================================================== */
  function chipsHTML(arr, cls) {
    return arr.map(function (c) { return '<span class="' + cls + '">' + c + '</span>'; }).join('');
  }
  function PS(cmd) {
    return '<p class="line"><span class="ps1"><span class="u">manas@immunefiles</span>:<span class="pp">~</span><span class="pd">$</span></span> <span class="typed">' + cmd + '</span></p>';
  }

  function renderConsole(d) {
    var skillGroups = '<div class="skill-grp"><span class="cm"># core</span><div class="chips">'
      + chipsHTML(d.skills.core, 'chip') + '</div></div>';
    d.skills.groups.forEach(function (g) {
      skillGroups += '<div class="skill-grp"><span class="cm"># ' + g.label + '</span><div class="chips">'
        + chipsHTML(g.items, 'chip') + '</div></div>';
    });

    var xpGroups = d.experience.groups.map(function (g) {
      return '<div class="grp"><span class="cm"># ' + g.title + '</span><ul>'
        + g.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul></div>';
    }).join('');

    var projCards = d.projects.map(function (p) {
      var open = p.href ? '<a class="pcard" href="' + p.href + '" target="_blank" rel="noopener">' : '<div class="pcard">';
      var close = p.href ? '</a>' : '</div>';
      var ttl = p.title + (p.href ? ' <span class="ext">↗</span>' : '');
      return open
        + '<img src="' + p.img + '" alt="' + esc(p.alt) + '" width="640" height="320" loading="lazy" />'
        + '<div class="ptitle">' + ttl + '</div><p>' + p.desc + '</p>'
        + '<div class="chips">' + chipsHTML(p.tags, 'chip') + '</div>' + close;
    }).join('');

    var statCells = d.infra.map(function (s) {
      return '<div class="stat"><span class="num">' + s.display + '</span><span class="lbl">' + s.label + '</span></div>';
    }).join('');

    var blogRows = d.blog.map(function (b) {
      return '<a class="blogrow" href="' + b.href + '" target="_blank" rel="noopener">'
        + '<span class="bk">' + b.file + '</span><span class="bt">' + b.title + '</span><span class="ext">↗</span></a>';
    }).join('');

    var c = d.contact;
    var contactRows =
        '<a class="crow" href="mailto:' + c.email + '"><span class="ky">email   </span> ' + c.email + '</a>'
      + '<a class="crow" href="' + c.linkedin + '" target="_blank" rel="noopener"><span class="ky">linkedin</span> /in/manas-bisht <span class="ext">↗</span></a>'
      + '<a class="crow" href="' + c.github + '" target="_blank" rel="noopener"><span class="ky">github  </span> /Banshee099 <span class="ext">↗</span></a>'
      + '<a class="crow" href="' + c.x + '" target="_blank" rel="noopener"><span class="ky">x       </span> @Banshee2507 <span class="ext">↗</span></a>'
      + '<a class="crow" href="' + c.resume + '" download><span class="ky">resume  </span> download Manas_Bisht.pdf <span class="ext">↓</span></a>';

    return '' +
      '<main class="term" id="term">' +
        '<header class="titlebar">' +
          '<span class="lights" aria-hidden="true"><i class="r"></i><i class="y"></i><i class="g"></i></span>' +
          '<span class="tb-title"><b>manas@immunefiles</b>: ~/portfolio — zsh</span>' +
          '<span class="tb-status"><span class="dot"></span><span>available</span></span>' +
        '</header>' +
        '<div class="termbody" id="log">' +
          '<div class="boot" id="boot" aria-hidden="true"></div>' +

          '<section class="block" id="whoami">' + PS('whoami') + '<div class="out"><div class="payload"><div class="who">' +
            '<h1 class="name">' + d.name + '</h1>' +
            '<div class="roles">' + d.roles.map(function (r) { return '<span class="role">' + r + '</span>'; }).join('') + '</div>' +
            '<p class="line"><span class="cm"># ' + d.tagline + '</span></p>' +
            '<div class="meta"><span class="badge"><span class="dot"></span> available for work</span>' +
            '<span class="badge">' + d.location + '</span>' +
            '<a class="badge act" href="mailto:' + d.contact.email + '">→ get in touch</a></div>' +
          '</div></div></div></section>' +

          '<section class="block" id="about">' + PS('cat about.md') + '<div class="out"><div class="payload">' +
            d.about.map(function (p) { return '<p class="doc">' + p + '</p>'; }).join('') +
          '</div></div></section>' +

          '<section class="block" id="skills">' + PS('skills --all') + '<div class="out"><div class="payload">' +
            skillGroups +
          '</div></div></section>' +

          '<section class="block" id="experience">' + PS('experience') + '<div class="out"><div class="payload"><div class="xp">' +
            '<div class="xp-h"><span class="ky">' + d.experience.company + '</span> <span class="cm">· ' + d.experience.org + '</span><span class="when">' + d.experience.period + '</span></div>' +
            '<div class="role-line">' + d.experience.role + ' · ' + d.experience.location + '</div>' +
            '<p class="doc">' + d.experience.summary + '</p>' + xpGroups +
          '</div></div></div></section>' +

          '<section class="block" id="projects" data-load>' + PS('ls ./projects') + '<div class="out">' +
            '<div class="loader"><span class="spin"></span> resolving ./projects ...</div>' +
            '<div class="payload"><div class="pgrid">' + projCards + '</div></div>' +
          '</div></section>' +

          '<section class="block" id="infra">' + PS('infra --status') + '<div class="out"><div class="payload">' +
            '<div class="statgrid">' + statCells + '</div>' +
            '<p class="doc"><span class="cm"># ' + d.infraNote + '</span></p>' +
            '<div class="chips">' + chipsHTML(d.infraStack, 'chip') + '</div>' +
          '</div></div></section>' +

          '<section class="block" id="blog">' + PS('ls ./blog') + '<div class="out"><div class="payload">' + blogRows + '</div></div></section>' +

          '<section class="block" id="credentials">' + PS('cat credentials.txt') + '<div class="out"><div class="payload">' +
            '<p class="doc"><span class="ky">education </span> ' + d.credentials.education + '</p>' +
            '<p class="doc"><span class="ky">certs     </span> ' + d.credentials.certs + '</p>' +
          '</div></div></section>' +

          '<section class="block" id="contact">' + PS('contact --list') + '<div class="out"><div class="payload"><div class="contact">' + contactRows + '</div></div></div></section>' +

          '<form class="inputline" id="form" autocomplete="off">' +
            '<label class="ps1" for="cli"><span class="u">guest@manas</span>:<span class="pp">~</span><span class="pd">$</span></label>' +
            '<span class="field"><span class="mirror" id="mirror"></span><span class="caret" aria-hidden="true"></span>' +
            '<input id="cli" type="text" spellcheck="false" autocapitalize="off" autocorrect="off" autocomplete="off" aria-label="terminal command input" /></span>' +
          '</form>' +
          '<p class="hint"><span class="cm"># try:</span> <span class="lnk" data-run="help">help</span> · <span class="lnk" data-run="whoami">whoami</span> · <span class="lnk" data-run="skills">skills</span> · <span class="lnk" data-run="projects">projects</span> · <span class="lnk" data-run="neofetch">neofetch</span> · <span class="lnk" data-run="clear">clear</span></p>' +
        '</div>' +
      '</main>' +
      '<footer class="foot">' +
        '<span>© 2026 Manas Bisht — Noida, India</span>' +
        '<span><a href="mailto:' + d.contact.email + '">email</a> · <a href="' + d.contact.linkedin + '" target="_blank" rel="noopener">linkedin</a> · <a href="' + d.contact.github + '" target="_blank" rel="noopener">github</a> · <a href="' + d.contact.x + '" target="_blank" rel="noopener">x</a></span>' +
      '</footer>';
  }

  function initConsole(root) {
    var bootEl = root.querySelector('#boot');
    var form   = root.querySelector('#form');
    var cli    = root.querySelector('#cli');
    var mirror = root.querySelector('#mirror');
    var io = null;
    var alive = true;

    function typeInto(el, text, speed) {
      return new Promise(function (res) {
        var i = 0; el.textContent = '';
        (function step() {
          if (!alive) { el.textContent = text; return res(); }
          if (i <= text.length) { el.textContent = text.slice(0, i); i++; setTimeout(step, speed); }
          else res();
        })();
      });
    }
    function showPayload(block) {
      var loader = block.querySelector('.loader');
      var payload = block.querySelector('.payload');
      if (loader) loader.style.display = 'none';
      if (payload) payload.classList.add('show');
    }
    function runBlock(block) {
      if (block.dataset.done) return Promise.resolve();
      block.dataset.done = '1';
      var line = block.querySelector('.line');
      var typed = block.querySelector('.typed');
      var full = typed.dataset.text || typed.textContent;
      if (reduce) { typed.textContent = full; showPayload(block); return Promise.resolve(); }
      line.classList.add('active');
      return typeInto(typed, full, 34).then(function () {
        line.classList.remove('active');
        var loader = block.querySelector('.loader');
        if (block.hasAttribute('data-load') && loader) {
          loader.style.display = '';
          return wait(780).then(function () { showPayload(block); });
        }
        showPayload(block);
      });
    }

    var blocks = Array.prototype.slice.call(root.querySelectorAll('.block'));
    blocks.forEach(function (b) {
      var typed = b.querySelector('.typed');
      if (typed) { typed.dataset.text = typed.textContent; if (!reduce) typed.textContent = ''; }
    });

    function boot() {
      var now = new Date();
      var stamp = now.toDateString() + ' ' + now.toTimeString().slice(0, 8);
      var lines = [
        { t: 'Last login: ' + stamp + ' on ttys001' },
        { t: '> initializing portfolio.sh …', cls: 'arrow' },
        { t: '[ ok ] mounted  /experience  /projects  /blog', cls: 'ok' },
        { t: '[ ok ] ai-systems online · rag pipeline warm', cls: 'ok' },
        { t: 'system ready — type `help` for available commands' }
      ];
      if (!bootEl) return Promise.resolve();
      if (reduce) { lines.forEach(function (l) { var dv = document.createElement('div'); dv.textContent = l.t; bootEl.appendChild(dv); }); return Promise.resolve(); }
      var chain = Promise.resolve();
      lines.forEach(function (l) {
        chain = chain.then(function () {
          if (!alive) return;
          var dv = document.createElement('div');
          if (l.cls) dv.className = l.cls;
          bootEl.appendChild(dv);
          return typeInto(dv, l.t, 7).then(function () { return wait(120); });
        });
      });
      return chain;
    }

    function startReveals() {
      if (!alive) return;
      if (!hasIO || reduce) { blocks.forEach(runBlock); return; }
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { runBlock(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
      blocks.forEach(function (b) { io.observe(b); });
      var vh = window.innerHeight || 800;
      blocks.forEach(function (b) {
        if (b.dataset.done) return;
        if (b.getBoundingClientRect().top < vh * 0.92) { io.unobserve(b); runBlock(b); }
      });
    }

    boot().then(startReveals);

    /* ---- interactive CLI ---- */
    var PS1 = '<span class="ps1"><span class="u">guest@manas</span>:<span class="pp">~</span><span class="pd">$</span></span> ';
    var history = [], hIdx = -1;
    var SOCIAL = { email: 'mailto:' + DATA.contact.email, linkedin: DATA.contact.linkedin, github: DATA.contact.github, x: DATA.contact.x };
    function sectionHTML(id) { var p = root.querySelector('#' + id + ' .payload'); return p ? p.innerHTML : null; }

    var COMMANDS = {
      help: function () {
        var rows = [['whoami', 'who is this'], ['about', 'the short version'], ['skills', 'tech I work with'],
          ['experience', 'where I have shipped'], ['projects', 'things I have built'], ['infra', 'production infrastructure status'],
          ['blog', 'things I am writing'], ['contact', 'how to reach me'], ['resume', 'download my resume (pdf)'],
          ['neofetch', 'system info'], ['social [name]', 'open a profile'], ['date', 'current date'], ['clear', 'clear the screen']];
        return '<div class="help-grid">' + rows.map(function (r) { return '<span class="ky">' + r[0] + '</span><span>' + r[1] + '</span>'; }).join('') + '</div>';
      },
      whoami: function () {
        return '<span class="ky">' + DATA.name + '</span> — ' + DATA.roles.join(' · ') + ' @ Immunefiles<br><span class="cm"># ' + DATA.tagline + ' · ' + DATA.location + '</span>';
      },
      about: function () { return sectionHTML('about'); },
      skills: function () { return sectionHTML('skills'); },
      experience: function () { return sectionHTML('experience'); },
      exp: function () { return sectionHTML('experience'); },
      projects: function () { return sectionHTML('projects'); },
      infra: function () { return sectionHTML('infra'); },
      blog: function () { return sectionHTML('blog'); },
      blogs: function () { return sectionHTML('blog'); },
      contact: function () { return sectionHTML('contact'); },
      credentials: function () { return sectionHTML('credentials'); },
      resume: function () {
        var a = document.createElement('a'); a.href = DATA.contact.resume; a.download = 'Manas_Bisht.pdf';
        document.body.appendChild(a); a.click(); a.remove();
        return '<span class="ok" style="color:var(--ok)">↓ downloading</span> Manas_Bisht.pdf …';
      },
      social: function (args) {
        var n = (args[0] || '').toLowerCase();
        if (SOCIAL[n]) { window.open(SOCIAL[n], '_blank', 'noopener'); return 'opening ' + n + ' …'; }
        return '<span class="cm"># usage: social [' + Object.keys(SOCIAL).join('|') + ']</span>';
      },
      date: function () { return new Date().toString(); },
      echo: function (args) { return esc(args.join(' ')); },
      ls: function () { return ['about.md', 'skills/', 'experience/', 'projects/', 'infra/', 'blog/', 'credentials.txt', 'contact', 'resume.pdf'].map(function (f) { return '<span class="fn">' + f + '</span>'; }).join('   '); },
      sudo: function () { return '<span class="err">guest is not in the sudoers file.</span> This incident will be reported. 😏'; },
      theme: function () { window.__mbSetTheme && window.__mbSetTheme('story'); return 'switching to Apple Storytelling …'; },
      neofetch: function () {
        var logo = ' __  __ ___ \n|  \\/  | _ )\n| |\\/| | _ \\\n|_|  |_|___/';
        var info = '<span class="ky">role    </span> CTO / Founding Engineer / AI Engineer<br>'
          + '<span class="ky">company </span> Immunefiles (Prudentbit)<br>'
          + '<span class="ky">stack   </span> Python · FastAPI · K8s · RAG · CUDA<br>'
          + '<span class="ky">uptime  </span> 99.9% · users 500+ · services 15+<br>'
          + '<span class="ky">location</span> ' + DATA.location + '<br>'
          + '<span class="ky">shell   </span> bash · zsh · the occasional vim ragequit';
        return '<div class="neofetch"><pre>' + logo + '</pre><div class="nf-info"><span class="ky">manas</span>@<span class="ky">immunefiles</span><br>------------------<br>' + info + '</div></div>';
      },
      history: function () { return history.length ? history.map(function (h, i) { return '  ' + (i + 1) + '  ' + esc(h); }).join('<br>') : '<span class="cm"># no history yet</span>'; }
    };

    function printBlock(cmd, outHTML) {
      var block = document.createElement('div');
      block.className = 'block cli-block';
      block.innerHTML = '<p class="line">' + PS1 + '<span class="typed">' + esc(cmd) + '</span></p>'
        + (outHTML != null ? '<div class="out"><div class="payload show">' + outHTML + '</div></div>' : '');
      log.insertBefore(block, form);
    }
    var log = root.querySelector('#log');

    function runCmd(raw) {
      var input = raw.trim();
      if (input) { history.push(input); hIdx = history.length; }
      if (input === '') { printBlock('', null); return; }
      if (input === 'clear' || input === 'cls') {
        Array.prototype.slice.call(root.querySelectorAll('.cli-block')).forEach(function (b) { b.remove(); });
        return;
      }
      var parts = input.split(/\s+/), name = parts[0].toLowerCase(), args = parts.slice(1);
      var fn = COMMANDS[name], out;
      if (fn) { try { out = fn(args); } catch (e) { out = '<span class="err"># error running ' + esc(name) + '</span>'; } }
      else { out = '<span class="err">command not found: ' + esc(name) + '</span> — type <span class="lnk" data-run="help">help</span>'; }
      if (out == null) out = '<span class="cm"># (no output)</span>';
      printBlock(input, out);
    }
    function syncMirror() { if (mirror) mirror.textContent = cli.value; }

    if (form && cli) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        runCmd(cli.value); cli.value = ''; syncMirror(); cli.focus();
        form.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
      });
      cli.addEventListener('input', syncMirror);
      cli.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp') { e.preventDefault(); if (history.length && hIdx > 0) { hIdx--; cli.value = history[hIdx]; syncMirror(); } }
        else if (e.key === 'ArrowDown') { e.preventDefault(); if (hIdx < history.length - 1) { hIdx++; cli.value = history[hIdx]; } else { hIdx = history.length; cli.value = ''; } syncMirror(); }
        else if (e.key === 'Tab') {
          e.preventDefault();
          var cur = cli.value.trim().toLowerCase(); if (!cur) return;
          var m = Object.keys(COMMANDS).filter(function (k) { return k.indexOf(cur) === 0; });
          if (m.length === 1) { cli.value = m[0]; syncMirror(); } else if (m.length > 1) { printBlock(cli.value, m.join('   ')); }
        } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); runCmd('clear'); }
      });
      var term = root.querySelector('#term');
      term.addEventListener('click', function (e) {
        if (e.target.closest('a, .lnk, [data-run]')) return;
        if (window.getSelection && String(window.getSelection())) return;
        cli.focus();
      });
      root.addEventListener('click', function (e) {
        var t = e.target.closest('[data-run]');
        if (!t) return;
        e.preventDefault(); runCmd(t.getAttribute('data-run')); cli.focus();
        form.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
      });
    }

    return function destroy() { alive = false; if (io) io.disconnect(); };
  }

  /* =====================================================================
     THEME · APPLE STORYTELLING
     ===================================================================== */
  function renderStory(d) {
    var hero =
      '<section class="st-hero reveal">' +
        '<p class="st-kicker">' + d.name + ' — ' + d.experience.role + '</p>' +
        '<h1 class="st-hero-title">I build secure <em>AI</em><br>that ships to production.</h1>' +
        '<p class="st-hero-sub">' + d.experience.role + ' at ' + d.experience.company + ' · ' + d.location + '</p>' +
        '<div class="st-scrollcue">scroll <span></span></div>' +
      '</section>';

    var statements = d.narrative.map(function (n, i) {
      return '<section class="st-statement reveal">' +
        '<p class="st-count">0' + (i + 1) + ' / 0' + d.narrative.length + '</p>' +
        '<h2>' + n.lead + ' <em>' + n.key + '</em></h2>' +
        '<p>' + n.sub + '</p></section>';
    }).join('');

    var about =
      '<section class="st-sec reveal"><p class="st-eyebrow">About</p>' +
        '<h3 class="st-h">I take secure AI products from zero to production at enterprise scale.</h3>' +
        '<div class="st-cols">' + d.about.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>' +
      '</section>';

    var skillRows = '<div class="st-skill"><span class="lab">core</span><div class="st-chips">'
      + chipsHTML(d.skills.core, 'st-chip') + '</div></div>';
    d.skills.groups.forEach(function (g) {
      skillRows += '<div class="st-skill"><span class="lab">' + g.label + '</span><div class="st-chips">'
        + chipsHTML(g.items, 'st-chip') + '</div></div>';
    });
    var skills =
      '<section class="st-sec reveal"><p class="st-eyebrow">Toolkit</p>' +
        '<h3 class="st-h">What I work with.</h3>' + skillRows +
      '</section>';

    var xpGroups = d.experience.groups.map(function (g) {
      return '<div class="st-group"><div class="gt">' + g.title + '</div><ul>'
        + g.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul></div>';
    }).join('');
    var experience =
      '<section class="st-sec reveal"><p class="st-eyebrow">Experience</p>' +
        '<h3 class="st-h">' + d.experience.company + '</h3>' +
        '<p class="st-xp-meta">' + d.experience.role + ' · ' + d.experience.org + ' · ' + d.experience.period + ' · ' + d.experience.location + '</p>' +
        '<p class="st-xp-sum">' + d.experience.summary + '</p>' + xpGroups +
      '</section>';

    var statCells = d.infra.map(function (s) {
      return '<div class="st-stat"><span class="st-num" data-count="' + s.count + '" data-suffix="' + s.suffix + '">' + s.display + '</span><span class="sl">' + s.label + '</span></div>';
    }).join('');
    var impact =
      '<section class="st-sec reveal"><p class="st-eyebrow">Impact</p>' +
        '<h3 class="st-h">Production, at scale.</h3>' +
        '<div class="st-stats">' + statCells + '</div>' +
      '</section>';

    var projCards = d.projects.map(function (p) {
      var link = p.href ? '<a class="lnk" href="' + p.href + '" target="_blank" rel="noopener">View repository ↗</a>' : '';
      return '<article class="st-proj"><img src="' + p.img + '" alt="' + esc(p.alt) + '" width="640" height="320" loading="lazy" />' +
        '<h4>' + p.title + '</h4><p>' + p.desc + '</p><div class="st-chips">' + chipsHTML(p.tags, 'st-chip') + '</div>' + link + '</article>';
    }).join('');
    var projects =
      '<section class="st-sec reveal"><p class="st-eyebrow">Selected work</p>' +
        '<h3 class="st-h">Things I’ve built.</h3>' +
        '<div class="st-projects">' + projCards + '</div>' +
      '</section>';

    var blogRows = d.blog.map(function (b, i) {
      return '<a class="st-blog" href="' + b.href + '" target="_blank" rel="noopener">' +
        '<span class="bnum">0' + (i + 1) + '</span><span class="bttl">' + b.title + '</span><span class="barrow">↗</span></a>';
    }).join('');
    var writing =
      '<section class="st-sec reveal"><p class="st-eyebrow">Writing</p>' +
        '<h3 class="st-h">Notes from the GPU.</h3>' + blogRows +
      '</section>';

    var c = d.contact;
    var contact =
      '<section class="st-sec st-contact reveal"><p class="st-eyebrow">Contact</p>' +
        '<h3 class="st-cta">Let’s build something<br>that ships.</h3>' +
        '<a class="st-mail" href="mailto:' + c.email + '">' + c.email + '</a>' +
        '<div class="st-links">' +
          '<a href="' + c.linkedin + '" target="_blank" rel="noopener">LinkedIn ↗</a>' +
          '<a href="' + c.github + '" target="_blank" rel="noopener">GitHub ↗</a>' +
          '<a href="' + c.x + '" target="_blank" rel="noopener">X ↗</a>' +
          '<a href="' + c.resume + '" download>Résumé ↓</a>' +
        '</div>' +
      '</section>';

    var foot = '<footer class="st-foot"><span>© 2026 ' + d.name + ' — ' + d.location + '</span><span>Built from scratch · two themes, one story</span></footer>';

    return '<main class="story">' + hero + statements + about + skills + experience + impact + projects + writing + contact + '</main>' + foot;
  }

  function initStory(root) {
    var alive = true;
    var ios = [];
    var progress = document.getElementById('progress');

    function countUp(elem) {
      var target = parseFloat(elem.dataset.count);
      var suf = elem.dataset.suffix || '';
      var dec = (elem.dataset.count.split('.')[1] || '').length;
      var dur = 1300, start = null;
      function tick(now) {
        if (!alive) { elem.textContent = target.toFixed(dec) + suf; return; }
        if (start === null) start = now;
        var p = Math.min(1, (now - start) / dur);
        var e = 1 - Math.pow(1 - p, 3);
        elem.textContent = (target * e).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(tick);
        else elem.textContent = target.toFixed(dec) + suf;
      }
      requestAnimationFrame(tick);
    }

    var reveals = Array.prototype.slice.call(root.querySelectorAll('.reveal'));
    var nums = Array.prototype.slice.call(root.querySelectorAll('[data-count]'));

    if (reduce || !hasIO) {
      reveals.forEach(function (el) { el.classList.add('in'); });
      // numbers keep their display text
      return function () { alive = false; };
    }

    nums.forEach(function (n) { n.textContent = '0' + (n.dataset.suffix || ''); });

    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        revealIO.unobserve(e.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(function (el) { revealIO.observe(el); });
    // reveal whatever is already on screen
    var vh = window.innerHeight || 800;
    reveals.forEach(function (el) { if (el.getBoundingClientRect().top < vh * 0.92) { el.classList.add('in'); revealIO.unobserve(el); } });
    ios.push(revealIO);

    var numIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); numIO.unobserve(e.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { numIO.observe(n); });
    ios.push(numIO);

    function onScroll() {
      if (!progress) return;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return function destroy() {
      alive = false;
      ios.forEach(function (o) { o.disconnect(); });
      window.removeEventListener('scroll', onScroll);
      if (progress) progress.style.width = '0';
    };
  }

  /* =====================================================================
     THEME ENGINE + SWITCHER
     ===================================================================== */
  var THEMES = {
    story:   { label: 'Storytelling', render: renderStory,   init: initStory },
    console: { label: 'Console',      render: renderConsole, init: initConsole }
  };
  var DEFAULT = 'story';

  var app = document.getElementById('app');
  var sw = document.getElementById('themeSwitch');
  var trigger = document.getElementById('tsTrigger');
  var menu = document.getElementById('tsMenu');
  var nameEl = document.getElementById('tsName');
  var current = null, destroy = null;

  function saved() { try { return localStorage.getItem('mb-theme'); } catch (e) { return null; } }

  function mount(name, persist) {
    if (!THEMES[name]) name = DEFAULT;
    if (name === current) { closeMenu(); return; }
    if (destroy) { try { destroy(); } catch (e) {} destroy = null; }
    document.documentElement.setAttribute('data-theme', name);
    app.style.opacity = '0';
    app.innerHTML = THEMES[name].render(DATA);
    window.scrollTo(0, 0);
    destroy = THEMES[name].init(app) || null;
    requestAnimationFrame(function () { app.style.opacity = '1'; });
    current = name;
    if (nameEl) nameEl.textContent = THEMES[name].label;
    if (menu) Array.prototype.slice.call(menu.querySelectorAll('[data-theme-pick]')).forEach(function (b) {
      b.setAttribute('aria-current', b.getAttribute('data-theme-pick') === name ? 'true' : 'false');
    });
    if (persist !== false) { try { localStorage.setItem('mb-theme', name); } catch (e) {} }
    closeMenu();
  }
  // let the console `theme` command switch back to story
  window.__mbSetTheme = function (n) { mount(n, true); };

  function openMenu() { sw.classList.add('open'); trigger.setAttribute('aria-expanded', 'true'); }
  function closeMenu() { sw.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }

  if (trigger) {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (sw.classList.contains('open')) closeMenu(); else openMenu();
    });
    menu.addEventListener('click', function (e) {
      var b = e.target.closest('[data-theme-pick]');
      if (!b) return;
      mount(b.getAttribute('data-theme-pick'), true);
    });
    document.addEventListener('click', function (e) { if (!sw.contains(e.target)) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  mount(saved() || DEFAULT, false);
})();
