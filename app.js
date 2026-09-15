const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const state = { secret: 0, message: 0, reactionTimer: null, reactionStart: 0, clickCount: 0, clickInterval: null };

const messages = [
  "hi issra", "idk why u clicked this", "ur actually a good person icl", "drink water", "stop staring at the screen",
  "why are u still clicking", "okay one more", "no seriously that's enough", "this website has officially had enough",
  "congratulations u achieved absolutely nothing", "ur patience is being tested rn", "i made this button and now i regret it",
  "another one??", "respectfully why are u clicking it this much", "okay i admit this is kinda funny", "u have excellent button pressing skills",
  "this message was approved by absolutely nobody", "go stretch your legs cuh", "ur doing great, probably", "a tiny digital hug but like. respectfully.",
  "i hope something nice happens to u today", "the archive says hi", "proof that i can commit to a bit", "pls don't overthink this one",
  "if this was a test, u passed by clicking", "ur chaos rating just went up", "imagine if every click cost 1p", "ykwim? exactly.",
  "the flowers would like to remind u that ur appreciated", "this is not a cry for attention from a button", "omds another click",
  "u are now legally allowed to have a snack", "take a tiny break rn", "the computer is judging us both", "i hope u smiled a little",
  "this button has become our whole personality", "not everything needs a deep meaning", "sending one (1) sparkle", "u make kindness look easy",
  "okay wait this one is actually nice: keep being genuine", "the desk is proud of u", "no thoughts, just red stationery",
  "ur click was received and filed under: iconic", "a very official reminder to be kind to yourself", "this website is running on vibes",
  "u are allowed to log off now", "i put 50 messages here and u found this one", "the tiny envelope has secrets but not really",
  "pls remember that being understood matters", "u survived another random message", "final one (lie)"
];

function burstAt(x, y, count = 12) {
  const layer = $("#burst-layer");
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "burst";
    el.textContent = ["♡", "✦", "✧", "✿"][i % 4];
    el.style.left = `${x}px`; el.style.top = `${y}px`;
    el.style.setProperty("--x", `${Math.cos(i / count * Math.PI * 2) * (55 + Math.random() * 65)}px`);
    el.style.setProperty("--y", `${Math.sin(i / count * Math.PI * 2) * (55 + Math.random() * 65)}px`);
    layer.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  }
}
function toast(text) {
  const el = document.createElement("div");
  el.className = "toast"; el.textContent = text;
  $("#toast-region").appendChild(el);
  setTimeout(() => el.remove(), 3200);
}
function sparkleTrail() {
  const chars = ["✦", "✧", "♡"];
  for (let i = 0; i < 4; i++) {
    const s = document.createElement("span");
    s.className = "sparkle-pop"; s.textContent = chars[i % chars.length];
    s.style.left = `${15 + Math.random() * 70}%`; s.style.top = `${15 + Math.random() * 65}%`;
    $("#particles").appendChild(s); setTimeout(() => s.remove(), 900);
  }
}
function render(type) {
  const content = $("#modal-content");
  const base = (kicker, title, intro, body) => `<span class="chapter-kicker">${kicker}</span><h2 id="modal-title" class="chapter-title">${title}</h2><p class="chapter-intro">${intro}</p>${body}`;
  if (type === "about") content.innerHTML = base("from the diary / page 01", "a little page about u", "some things deserve to be said plainly, so here we are.", `<div class="diary-page"><span class="page-doodle one">✦</span><span class="page-doodle two">♡</span><p>you're genuinely one of the most patient people i've met and i don't think i say that enough. you've put up with a lot from me and somehow still managed to care even when things got difficult and things between us weren't always easy. you've always been someone who actually tries to understand instead of just judging and i really appreciate that about u. you're honest about how you feel even when it's difficult to say and i respect that a lot because not everyone can be that open about their feelings. i also appreciate how caring you are because even when you're upset or annoyed you still have that side of you that genuinely cares about the people around you. you've always made me feel like i could talk to u about things and actually be listened to instead of feeling like i'm just talking for no reason. you're also someone who knows when something isn't right for you and you're not scared to be honest about it even if it's difficult and i genuinely respect that. you've been a really important person to me for a long time and even though things have changed between us i still appreciate everything about the friendship we've got now. you're genuinely a good person issra and i hope you realise that because you deserve to be reminded of it sometimes.</p></div>`);
  if (type === "according") {
    const items = [["patient","even when things get a bit much, u don't instantly give up on people."],["caring","u notice the little things. quietly, but properly."],["honest","u say what u actually feel, even when the sentence is difficult."],["understanding","u try to see the whole picture before deciding what someone meant."],["emotionally real","no fake mysterious act. if something matters, it matters."],["strong-minded","u know what feels right for u and u stand by it."],["genuine","what u see is very much what u get, and that's rare icl."],["someone who actually listens","not just waiting for ur turn to talk. actually listening."]].map(([a,i]) => `<button class="attribute" data-note="${i}">${a}</button>`).join("");
    content.innerHTML = base("sticker sheet / no. 02", "issra according to me", "peel a sticker. yes, literally click it. the internet can handle this.", `<div class="sticker-grid">${items}</div><div class="attribute-note" id="attribute-note">pick one and i'll explain myself a bit ↓</div>`);
    $$(".attribute", content).forEach(btn => btn.addEventListener("click", () => { $$(".attribute", content).forEach(b => b.classList.remove("active")); btn.classList.add("active"); $("#attribute-note").textContent = btn.dataset.note; burstAt(btn.getBoundingClientRect().left + 40, btn.getBoundingClientRect().top + 35, 5); }));
  }
  if (type === "appreciate") {
    const notes = [["your patience","you've been more patient with me than i probably deserved sometimes. i noticed."],["your honesty","there's something reassuring about knowing what u actually think."],["the way you communicate how you feel","even the awkward conversations matter. especially those, maybe."],["how you care even when you're upset","being upset doesn't cancel out your care. that's a big thing."],["how you try to do what's right for yourself","u don't just follow noise. u think about what aligns with u."],["how much your deen matters to you","i respect that u want your choices to feel honest to your beliefs."],["how you make people feel heard","u have a way of making someone feel like their words landed."],["how you've still been a good friend through everything","things can change and friendship can still be real. that's worth appreciating."],["your ability to be genuine","no performance, no pretending to be someone else."],["your personality","the actual you is pretty easy to appreciate, cuh."]].map(([t,n]) => `<button class="fold-note"><b>${t}</b><span>${n}</span></button>`).join("");
    content.innerHTML = base("tiny folded notes / no. 03", "things i appreciate about u", "open whichever note feels right. no order, no homework.", `<div class="notes-grid">${notes}</div>`);
    $$(".fold-note", content).forEach(note => note.addEventListener("click", () => { note.classList.toggle("open"); if (note.classList.contains("open")) burstAt(note.getBoundingClientRect().left + 30, note.getBoundingClientRect().top + 30, 4); }));
  }
  if (type === "message") content.innerHTML = base("the red machine / no. 04", "need a random message?", "for when u need a tiny interruption from the day. press the button. obviously.", `<div class="machine"><div class="vending"><div class="vending-top">tiny message co.</div><div class="vending-window"><div class="capsule">♡</div></div><button class="vending-lever" id="message-btn">give me one</button></div><div class="message-output"><div><p id="message-text">waiting patiently...</p><div class="message-count" id="message-count">0 messages dispensed</div></div></div></div>`);
    $("#message-btn").addEventListener("click", e => { state.message++; const text = messages[Math.floor(Math.random() * messages.length)]; $("#message-text").textContent = text; $("#message-count").textContent = `${state.message} message${state.message === 1 ? "" : "s"} dispensed`; burstAt(e.clientX, e.clientY, 7); });
  if (type === "ideas") content.innerHTML = base("little idea box / no. 05", "open a tiny thought", "three small cards for a little pause, a little laugh, or a tiny reminder.", `<div class="idea-box"><button class="idea-card" data-idea="u don't have to have everything figured out rn."><b>open when overthinking</b><span>✦</span></button><button class="idea-card" data-idea="drink water, stretch ur shoulders, and stop pretending ur not tired."><b>open when tired</b><span>♡</span></button><button class="idea-card" data-idea="ur allowed to choose what feels right for u, even if it takes time."><b>open when unsure</b><span>✿</span></button></div><div class="idea-output" id="idea-output">pick a card and i'll leave a tiny note here ↓</div>`);
  if (type === "exe") content.innerHTML = base("a very serious computer / no. 06", "issra.exe", "not futuristic. not a hacker interface. just a tiny computer with some suspiciously accurate stats.", `<div class="exe-window"><div class="exe-bar"><span>ISSRA.EXE</span><span>— □ ×</span></div><div class="exe-body"><div class="exe-line"><span>STATUS</span><b>ONLINE ♡</b></div><div class="exe-line"><span>PATIENCE</span><b>999+</b></div><div class="exe-line"><span>CHAOS</span><b>87%</b></div><div class="exe-line"><span>KINDNESS</span><b>100%</b></div><div class="exe-line"><span>ATTENTION SPAN</span><b>???%</b></div><div class="exe-line"><span>GENERAL VIBE</span><b>ACTIVE ♡</b></div><div class="system-buttons"><button data-system="system is functioning normally">run diagnostics</button><button data-system="no errors detected. just vibes.">check vibes</button><button data-system="issra.exe would like to remind u to drink water">random system message</button></div></div></div>`);
    $$(".system-buttons button", content).forEach(b => b.addEventListener("click", () => toast(b.dataset.system)));
  if (type === "archive") content.innerHTML = base("little archive / no. 07", "the archive", "not a collection of invented memories. just a little place for the kind of care this website is trying to celebrate.", `<div class="archive-board">${[["the brief","a small internet corner made for one specific person, with an unnecessarily large amount of red stationery."],["the theme","patience, honest communication, and choosing what feels right for u."],["the rule","no fake memories. no dramatic timeline. just appreciation, as-is."],["the evidence","a diary, a vending machine, a computer, and one suspicious button."],["the atmosphere","soft light, loud feelings, tiny chaos, and absolutely no cable management."],["the takeaway","some people can matter a lot without needing a dramatic explanation."]].map(([h,p]) => `<article class="archive-card"><h4>${h}</h4><p>${p}</p></article>`).join("")}</div><button class="glossy-btn" data-open="final" style="margin-top:28px">go to the end ♡</button>`);
  if (type === "final") content.innerHTML = `<div class="final-note"><div class="bow">୨୧</div><h3>you made it all the way here ♡</h3><p>idk if this website was necessary but i made it anyway</p><p>despite everything that's happened and everything that's changed, i'm glad we can still be friends. you've meant a lot to me and i genuinely hope everything goes well for you. take care of yourself and keep doing what's best for you.</p><p>okay bye before i make another section</p></div>`;
}
function openModal(type) {
  const modal = $("#modal");
  const content = $("#modal-content");
  if (!modal || !content) return;
  const safeChapter = {
    about: ["from the diary / page 01", "a little page about u", "some things deserve to be said plainly, so here we are.", `<div class="diary-page"><span class="page-doodle one">✦</span><span class="page-doodle two">♡</span><p>you're genuinely one of the most patient people i've met and i don't think i say that enough. you've put up with a lot from me and somehow still managed to care even when things got difficult and things between us weren't always easy. you've always been someone who actually tries to understand instead of just judging and i really appreciate that about u. you're honest about how you feel even when it's difficult to say and i respect that a lot because not everyone can be that open about their feelings. i also appreciate how caring you are because even when you're upset or annoyed you still have that side of you that genuinely cares about the people around you. you've always made me feel like i could talk to u about things and actually be listened to instead of feeling like i'm just talking for no reason. you're also someone who knows when something isn't right for you and you're not scared to be honest about it even if it's difficult and i genuinely respect that. you've been a really important person to me for a long time and even though things have changed between us i still appreciate everything about the friendship we've got now. you're genuinely a good person issra and i hope you realise that because you deserve to be reminded of it sometimes.</p></div>`],
    appreciate: ["tiny folded notes / no. 03", "things i appreciate about u", "open whichever note feels right. no order, no homework.", `<div class="notes-grid"><button class="fold-note"><b>your patience</b><span>you've been more patient with me than i probably deserved sometimes. i noticed.</span></button><button class="fold-note"><b>your honesty</b><span>there's something reassuring about knowing what u actually think.</span></button><button class="fold-note"><b>your personality</b><span>the actual you is pretty easy to appreciate, cuh.</span></button></div>`],
    according: ["sticker sheet / no. 02", "issra according to me", "peel a sticker. yes, literally click it.", `<div class="sticker-grid"><button class="attribute" data-note="even when things get a bit much, u don't instantly give up on people.">patient</button><button class="attribute" data-note="u notice the little things. quietly, but properly.">caring</button><button class="attribute" data-note="u say what u actually feel, even when the sentence is difficult.">honest</button><button class="attribute" data-note="what u see is very much what u get, and that's rare icl.">genuine</button></div><div class="attribute-note" id="attribute-note">pick one and i'll explain myself a bit ↓</div>`],
    message: ["the red machine / no. 04", "need a random message?", "press the button. obviously.", `<div class="message-output"><div><p id="message-text">waiting patiently...</p><button class="game-action" id="message-btn">give me one</button></div></div>`],
    ideas: ["little idea box / no. 05", "open a tiny thought", "three small cards for a little pause, a little laugh, or a tiny reminder.", `<div class="idea-box"><button class="idea-card" data-idea="u don't have to have everything figured out rn."><b>open when overthinking</b><span>✦</span></button><button class="idea-card" data-idea="drink water, stretch ur shoulders, and stop pretending ur not tired."><b>open when tired</b><span>♡</span></button><button class="idea-card" data-idea="ur allowed to choose what feels right for u, even if it takes time."><b>open when unsure</b><span>✿</span></button></div><div class="idea-output" id="idea-output">pick a card and i'll leave a tiny note here ↓</div>`],
    exe: ["a very serious computer / no. 06", "issra.exe", "a tiny computer with suspiciously accurate stats.", `<div class="exe-window"><div class="exe-body"><div class="exe-line"><span>STATUS</span><b>ONLINE ♡</b></div><div class="exe-line"><span>PATIENCE</span><b>999+</b></div><div class="exe-line"><span>CHAOS</span><b>87%</b></div><div class="exe-line"><span>KINDNESS</span><b>100%</b></div></div></div>`],
    archive: ["little archive / no. 07", "the archive", "a small place for the kind of care this website is trying to celebrate.", `<div class="archive-board"><article class="archive-card"><h4>the brief</h4><p>a tiny internet corner made for one specific person, with an unnecessarily large amount of red stationery.</p></article><article class="archive-card"><h4>the takeaway</h4><p>some people can matter a lot without needing a dramatic explanation.</p></article></div>`],
    final: ["last page / no. 08", "you made it all the way here", "idk if this website was necessary but i made it anyway.", `<div class="final-note"><div class="bow">୨୧</div><p>despite everything that's happened and everything that's changed, i'm glad we can still be friends. you've meant a lot to me and i genuinely hope everything goes well for you. take care of yourself and keep doing what's best for you.</p><p>okay bye before i make another section</p><small>made by arian</small></div>`]
  };
  const chapter = safeChapter[type] || safeChapter.about;
  const chapterOrder = ["about", "appreciate", "according", "message", "ideas", "exe", "archive", "final"];
  const chapterNumber = chapterOrder.indexOf(type) + 1 || 1;
  const escape = value => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
  content.innerHTML = `<div class="chapter-progress">chapter ${String(chapterNumber).padStart(2, "0")} / ${chapterOrder.length}<button class="back-to-desk" type="button">back to desk</button></div><span class="chapter-kicker">${escape(chapter[0])}</span><h2 id="modal-title" class="chapter-title">${escape(chapter[1])}</h2><p class="chapter-intro">${escape(chapter[2])}</p>${chapter[3]}`;
  modal.classList.remove("is-hidden");
  document.body.style.overflow = "hidden";
  if (type === "appreciate") $$(".fold-note", content).forEach(note => note.addEventListener("click", () => note.classList.toggle("open")));
  if (type === "according") $$(".attribute", content).forEach(sticker => sticker.addEventListener("click", () => {
    $$(".attribute", content).forEach(item => item.classList.remove("active"));
    sticker.classList.add("active");
    $("#attribute-note").textContent = sticker.dataset.note;
    burstAt(sticker.getBoundingClientRect().left + 40, sticker.getBoundingClientRect().top + 35, 5);
  }));
  if (type === "message") $("#message-btn").addEventListener("click", () => { state.message++; $("#message-text").textContent = messages[Math.floor(Math.random() * messages.length)]; });
  if (type === "ideas") $$(".idea-card", content).forEach(card => card.addEventListener("click", () => { $("#idea-output").textContent = card.dataset.idea; card.classList.add("opened"); burstAt(card.getBoundingClientRect().left + 35, card.getBoundingClientRect().top + 35, 5); }));
  $(".back-to-desk", content).addEventListener("click", closeModal);
  sparkleTrail();
}
function closeModal() {
  const modal = $("#modal");
  if (!modal) return;
  modal.classList.add("is-hidden");
  document.body.style.overflow = "";
}

function setupGames() {
  const box = $("#game-box"); if (!box) return;
  const renderGame = type => {
    $$(".game-tab").forEach(t => t.classList.toggle("active", t.dataset.game === type));
    if (type === "reaction") { box.innerHTML = `<span class="game-number">01 / reflex card</span><h4>quick hands</h4><p>press start, then tap the red circle when it turns cream. don't jump the gun cuh.</p><button class="game-action" id="reaction-start">start round</button><button class="reaction-target" id="reaction-target">wait…</button><div class="game-result" id="game-result"></div>`; $("#reaction-start").onclick = () => { $("#reaction-start").disabled = true; $("#reaction-target").classList.remove("ready"); $("#reaction-target").textContent = "wait…"; const delay = 900 + Math.random() * 2800; state.reactionTimer = setTimeout(() => { state.reactionStart = performance.now(); $("#reaction-target").classList.add("ready"); $("#reaction-target").textContent = "tap"; }, delay); }; $("#reaction-target").onclick = () => { if (!state.reactionStart) { clearTimeout(state.reactionTimer); $("#game-result").textContent = "too early — patience is literally one of ur stats"; $("#reaction-start").disabled = false; return; } const ms = Math.round(performance.now() - state.reactionStart); $("#game-result").textContent = `${ms}ms — ${ms < 350 ? "okay speedy?? leave some reflexes for the rest of us" : ms < 650 ? "not bad at all icl" : "a leisurely response. very on brand."}`; $("#reaction-start").disabled = false; state.reactionStart = 0; }; }
    if (type === "click") { box.innerHTML = `<span class="game-number">02 / speed card</span><h4>heart sprint</h4><p>u have 5 seconds. tap the little heart as many times as possible. no pressure (there is pressure).</p><button class="game-action" id="click-start">start challenge</button><button class="click-heart" id="click-heart" disabled>♡</button><div class="game-result" id="game-result">score: 0</div>`; let score = 0; $("#click-start").onclick = () => { score = 0; $("#click-heart").disabled = false; $("#game-result").textContent = "score: 0"; clearInterval(state.clickInterval); state.clickInterval = setTimeout(() => { $("#click-heart").disabled = true; $("#game-result").textContent = `final score: ${score} — ${score > 18 ? "your clicking finger is powerful" : "respectable. deeply respectable."}`; }, 5000); }; $("#click-heart").onclick = () => { score++; $("#game-result").textContent = `score: ${score}`; }; }
    if (type === "this") { const rounds = [["red stationery","an organised notes app"],["a tiny flower","a tiny computer"],["sweet tea","iced coffee"],["one perfect sticker","fifty slightly chaotic stickers"],["a quiet afternoon","a funny notification"],["honesty","pretending everything is fine"]]; let index = Math.floor(Math.random() * rounds.length); const show = () => { const [a,b] = rounds[index % rounds.length]; box.innerHTML = `<h4>this or that</h4><p>pick your fighter. there are no wrong answers, only questionable ones.</p><div class="that-choice"><button data-pick="${a}">${a}</button><button data-pick="${b}">${b}</button></div><div class="game-result" id="game-result"></div>`; $$(".that-choice button", box).forEach(btn => btn.onclick = () => { $("#game-result").textContent = `${btn.dataset.pick}? valid. the council will consider this. ♡`; index++; setTimeout(show, 900); }); }; show(); }
  };
  $$(".game-tab").forEach(t => t.addEventListener("click", () => renderGame(t.dataset.game))); renderGame("reaction");
}

$("#open-site").addEventListener("click", e => { burstAt(e.clientX, e.clientY, 16); $("#landing").classList.add("is-hidden"); $("#dashboard").classList.remove("is-hidden"); window.scrollTo(0, 0); });
document.addEventListener("click", e => {
  const target = e.target instanceof Element ? e.target : e.target.parentElement;
  if (!target) return;
  const opener = target.closest("[data-open]");
  if (opener) {
    e.preventDefault();
    e.stopPropagation();
    try {
      openModal(opener.dataset.open);
      if (opener.dataset.open === "games") setTimeout(setupGames, 0);
    } catch (error) {
      console.error("issra desk interaction failed", error);
      toast("this chapter tripped over its own ribbon — try again");
    }
    return;
  }
  if (target.matches("[data-close]") || target.closest(".close-btn")) closeModal();
});
document.addEventListener("click", e => {
  const button = e.target instanceof Element ? e.target.closest("#secret-button") : null;
  if (!button) return;
  state.secret++;
  document.body.classList.remove("wiggle"); void document.body.offsetWidth; document.body.classList.add("wiggle");
  burstAt(e.clientX, e.clientY, state.secret >= 3 ? 20 : 9);
  const lines = ["i said don't click this 😭", "okay stop bullying the button", "fine. u found it."];
  toast(lines[Math.min(state.secret - 1, lines.length - 1)]);
  button.style.transform = `translate(${Math.random() * 80 - 40}px,${Math.random() * 50 - 25}px) rotate(${Math.random() * 20 - 10}deg)`;
  if (state.secret === 3) {
    button.textContent = "secret found";
    button.style.background = "#d9efdf";
    button.disabled = true;
    $("#secret-egg").classList.add("is-found");
    $("#secret-egg").setAttribute("tabindex", "0");
    toast("the secret is staying right here now");
  }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
document.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && document.activeElement?.matches("[data-open]")) {
    e.preventDefault();
    document.activeElement.click();
  }
});
window.addEventListener("load", () => { setTimeout(() => { $("#loader-copy").textContent = "almost done"; }, 1050); setTimeout(() => { $("#loader-copy").textContent = "okay maybe i went a bit far with this"; }, 2050); setTimeout(() => { $("#loader").classList.add("is-hidden"); $("#site").classList.remove("is-hidden"); }, 3200); });
window.openModal = openModal;
window.closeModal = closeModal;
window.setupGames = setupGames;
