let waitlistSubmitted = false;

function scrollToSignup() {
  const signup = document.getElementById("free-list-section") || document.getElementById("signup");
  if (!signup) return;
  signup.scrollIntoView({ behavior: "smooth" });
}

function handleWaitlistSubmit() {
  const message = document.getElementById("form-message");
  const submitButton = document.querySelector(".waitlist-inline-form button");

  waitlistSubmitted = true;

  if (message) {
    message.textContent = "Submitting...";
    message.classList.remove("success-message");
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
  }

  return true;
}

function handleGoogleFormLoad() {
  if (!waitlistSubmitted) return;

  const form = document.getElementById("waitlist-form");
  const message = document.getElementById("form-message");
  const submitButton = document.querySelector(".waitlist-inline-form button");

  if (message) {
    message.textContent = "You're on the MistWake launch list.";
    message.classList.add("success-message");
  }

  if (form) form.reset();

  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = "Join Free List";
  }

  waitlistSubmitted = false;
}

(function simplifyMistWakeLandingPage() {
  function addMobileFirstStyles() {
    if (document.getElementById("mistwake-simple-mobile-styles")) return;
    const style = document.createElement("style");
    style.id = "mistwake-simple-mobile-styles";
    style.textContent = `
      .kickstarter-green { color: #05ce78 !important; display: inline !important; padding: 0 !important; margin: 0 !important; border: 0 !important; background: transparent !important; box-shadow: none !important; border-radius: 0 !important; font-family: "Maison Neue", "Helvetica Neue", Helvetica, Arial, sans-serif !important; }
      .hero-video { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; background: #05070b; }
      .hero-video.is-missing { display: none; }
      .hero-image-fallback { display: none; }
      .hero-video.is-missing + .hero-image-fallback { display: block; }
      .compact-hero .hero-copy h1 { max-width: 760px; }
      .compact-badges { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .compact-how-grid .how-card p { min-height: 0; }
      .faq-master { width: min(100%, 920px); margin: 0 auto; border-radius: 28px; border: 1px solid var(--border); background: var(--panel); box-shadow: var(--shadow); overflow: hidden; }
      .faq-master > summary { list-style: none; cursor: pointer; padding: 26px; text-align: center; }
      .faq-master > summary::-webkit-details-marker, .faq-item > summary::-webkit-details-marker { display: none; }
      .faq-master-title { display: block; font-size: clamp(1.8rem, 4vw, 3rem); line-height: 1; letter-spacing: -1px; font-weight: 900; }
      .faq-master-note { display: inline-flex; margin-top: 12px; padding: 8px 12px; border-radius: 999px; background: rgba(255, 184, 77, 0.1); border: 1px solid rgba(255, 184, 77, 0.22); color: var(--amber); font-size: 0.88rem; font-weight: 900; }
      .faq-list.accordion-list { width: 100%; padding: 0 16px 20px; }
      .faq-item { margin-top: 12px; padding: 0; overflow: hidden; }
      .faq-item > summary { position: relative; list-style: none; cursor: pointer; padding: 18px 48px 18px 18px; color: var(--text); font-size: 1rem; font-weight: 900; }
      .faq-item > summary::after { content: '+'; position: absolute; right: 18px; top: 50%; transform: translateY(-50%); color: var(--amber); font-size: 1.4rem; line-height: 1; }
      .faq-item[open] > summary::after { content: '-'; }
      .faq-item p { padding: 0 18px 18px; color: var(--muted); }
      @media (max-width: 700px) {
        .hero-shell { display: flex !important; flex-direction: column !important; gap: 16px !important; }
        .hero-visual { order: -1 !important; margin-top: 4px !important; border-radius: 18px !important; }
        .hero-copy h1 { font-size: clamp(2.05rem, 10vw, 3.25rem) !important; line-height: 0.98 !important; letter-spacing: -1.3px !important; }
        .hero-section { padding-top: 16px !important; padding-bottom: 18px !important; }
        .hero-subtitle { margin-top: 12px !important; font-size: 0.98rem !important; }
        .hero-offer-callout { font-size: 0.96rem !important; margin-top: 12px !important; }
        .trust-row span:nth-child(n+3) { display: none !important; }
        .hero-urgency { display: none !important; }
        .demo-overlay { font-size: 0.78rem !important; left: 10px !important; right: 10px !important; justify-content: center !important; }
        .compact-badges { grid-template-columns: 1fr !important; }
        .section { padding-top: 34px !important; padding-bottom: 34px !important; }
        .offer-card, .visual-proof-grid, .visual-split { gap: 18px !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function greenKickstarterWords() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (!node.nodeValue || !node.nodeValue.includes("Kickstarter")) return NodeFilter.FILTER_REJECT;
        const parent = node.parentNode;
        if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.nodeName)) return NodeFilter.FILTER_REJECT;
        if (parent.classList && parent.classList.contains("kickstarter-green")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function(node) {
      const parts = node.nodeValue.split("Kickstarter");
      const fragment = document.createDocumentFragment();
      parts.forEach(function(part, index) {
        if (part) fragment.appendChild(document.createTextNode(part));
        if (index < parts.length - 1) {
          const span = document.createElement("span");
          span.className = "kickstarter-green";
          span.textContent = "Kickstarter";
          fragment.appendChild(span);
        }
      });
      node.parentNode.replaceChild(fragment, node);
    });
  }

  function addHeroVideo() {
    const visual = document.querySelector(".hero-visual");
    if (!visual || visual.querySelector("video")) return;
    const currentImage = visual.querySelector("img");
    const video = document.createElement("video");
    video.className = "hero-video";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.poster = "assets/mistwake-hero-image.png?v=1";
    video.innerHTML = '<source src="assets/ProductHero.mp4" type="video/mp4">';
    video.addEventListener("error", function() { video.classList.add("is-missing"); });
    if (currentImage) {
      currentImage.classList.add("hero-image-fallback");
      visual.insertBefore(video, currentImage);
    }
  }

  function removeLongSections() {
    document.querySelector(".founder-section")?.remove();
    document.querySelector(".problem-section")?.remove();
    document.querySelector(".funnel-section")?.remove();
    document.querySelector(".roadmap-section")?.remove();
    const visualSections = document.querySelectorAll(".visual-section");
    visualSections.forEach(function(section) { section.remove(); });
  }

  function simplifyCopy() {
    const heroTitle = document.querySelector(".hero-copy h1");
    if (heroTitle) heroTitle.textContent = "The World's First Alarm That Wakes You With Mist.";
    const desktopSubtitle = document.querySelector(".hero-subtitle.desktop-copy") || document.querySelector(".hero-subtitle");
    if (desktopSubtitle) desktopSubtitle.textContent = "MistWake combines sound with a controlled fine mist cue — a second sensory trigger that makes it harder to sleep through your alarm.";
    const mobileSubtitle = document.querySelector(".hero-subtitle.mobile-copy");
    if (mobileSubtitle) mobileSubtitle.textContent = "Sound first. Fine mist if sound is not enough.";
    const offer = document.querySelector(".hero-offer-callout");
    if (offer) offer.innerHTML = 'Reserve for $1 → VIP <span class="kickstarter-green">Kickstarter</span> price $89 instead of $139 MSRP.';
    const proofTitle = document.querySelector(".short-proof-card h2");
    if (proofTitle) proofTitle.textContent = "The first of its kind. And it's already built.";
    const proofBody = document.querySelector(".short-proof-card p:not(.eyebrow)");
    if (proofBody) proofBody.textContent = "No other bedside alarm does this. MistWake is the first alarm clock to combine sound with a controlled mist cue — and a working prototype already exists.";
  }

  function makeFaqExpandable() {
    const section = document.querySelector(".faq-section");
    const faqList = section?.querySelector(".faq-list");
    if (!section || !faqList || section.querySelector(".faq-master")) return;
    const items = [];
    faqList.querySelectorAll("article.card").forEach(function(card) {
      const question = card.querySelector("h3")?.textContent?.trim();
      const answer = card.querySelector("p")?.textContent?.trim();
      if (question && answer) items.push({ question, answer });
    });
    section.innerHTML = `<details class="faq-master"><summary><span class="eyebrow">FAQ</span><span class="faq-master-title">Quick answers.</span><span class="faq-master-note">Tap to expand</span></summary><div class="faq-list accordion-list">${items.slice(0, 5).map(function(item) { return `<details class="faq-item card"><summary>${item.question}</summary><p>${item.answer}</p></details>`; }).join("")}</div></details>`;
  }

  function loadSocialLinksScript() {
    if (document.querySelector('script[src^="social-links.js"]')) return;
    const socialScript = document.createElement("script");
    socialScript.src = "social-links.js?v=1";
    socialScript.defer = true;
    document.body.appendChild(socialScript);
  }

  function init() {
    addMobileFirstStyles();
    addHeroVideo();
    removeLongSections();
    simplifyCopy();
    makeFaqExpandable();
    greenKickstarterWords();
    loadSocialLinksScript();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();