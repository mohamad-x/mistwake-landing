let waitlistSubmitted = false;

function scrollToSignup() {
  const signup = document.getElementById("free-list-section") || document.getElementById("signup");
  if (!signup) return;
  signup.scrollIntoView({ behavior: "smooth" });
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  section.scrollIntoView({ behavior: "smooth" });
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

(function cleanMistWakeLandingPage() {
  const gifCandidates = [
    "assets/ProductHero.gif",
    "assets/producthero.gif",
    "assets/product-hero.gif",
    "assets/mistwake-demo.gif",
    "assets/mistwake-product-demo.gif",
    "assets/hero.gif",
    "assets/demo.gif"
  ];

  function addStyles() {
    if (document.getElementById("mistwake-clean-landing-styles")) return;

    const style = document.createElement("style");
    style.id = "mistwake-clean-landing-styles";
    style.textContent = `
      .kickstarter-green { color: #05ce78 !important; display: inline !important; padding: 0 !important; margin: 0 !important; border: 0 !important; background: transparent !important; box-shadow: none !important; border-radius: 0 !important; font-family: "Maison Neue", "Helvetica Neue", Helvetica, Arial, sans-serif !important; }
      .demo-overlay, .gif-overlay-badge { display: none !important; }
      .founder-section, .problem-section, .funnel-section, .roadmap-section, .why-section, #demo { display: none !important; }
      .hero-visual img { display: block !important; width: 100% !important; height: auto !important; aspect-ratio: 16 / 9; object-fit: cover; }
      .compact-badges { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
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
        .hero-section { padding-top: 16px !important; padding-bottom: 18px !important; }
        .hero-copy h1 { font-size: clamp(2.05rem, 10vw, 3.25rem) !important; line-height: 0.98 !important; letter-spacing: -1.3px !important; }
        .hero-subtitle { margin-top: 12px !important; font-size: 0.98rem !important; }
        .hero-offer-callout { font-size: 0.96rem !important; margin-top: 12px !important; }
        .trust-row span:nth-child(n+3) { display: none !important; }
        .hero-urgency { display: none !important; }
        .compact-badges { grid-template-columns: 1fr !important; }
        .section { padding-top: 34px !important; padding-bottom: 34px !important; }
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
      const fragment = document.createDocumentFragment();
      const parts = node.nodeValue.split("Kickstarter");
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

  function restoreHeroGif() {
    const visual = document.querySelector(".hero-visual");
    if (!visual) return;

    visual.querySelectorAll("video, .demo-overlay, .gif-overlay-badge").forEach(function(el) { el.remove(); });

    let image = visual.querySelector("img");
    if (!image) {
      image = document.createElement("img");
      image.className = "asset-placeholder-img";
      image.alt = "MistWake alarm clock on a nightstand";
      visual.appendChild(image);
    }

    image.classList.remove("hero-image-fallback");
    image.alt = "MistWake alarm clock on a nightstand";
    resolveGifSource(image, 0);
  }

  function resolveGifSource(image, index) {
    if (!image) return;
    if (index >= gifCandidates.length) {
      image.onerror = null;
      image.src = "assets/mistwake-hero-image.png?v=1";
      return;
    }
    image.onerror = function() { resolveGifSource(image, index + 1); };
    image.src = gifCandidates[index];
  }

  function removeBadAndLongSections() {
    document.getElementById("demo")?.remove();
    document.querySelector(".founder-section")?.remove();
    document.querySelector(".problem-section")?.remove();
    document.querySelector(".funnel-section")?.remove();
    document.querySelector(".roadmap-section")?.remove();
    document.querySelector(".why-section")?.remove();
  }

  function simplifyProofBadges() {
    document.querySelectorAll(".proof-badges span").forEach(function(item, index) {
      if (index > 2) item.remove();
    });
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

    section.innerHTML = `<details class="faq-master"><summary><span class="eyebrow">FAQ</span><span class="faq-master-title">Quick answers.</span><span class="faq-master-note">Tap to expand</span></summary><div class="faq-list accordion-list">${items.slice(0, 6).map(function(item) { return `<details class="faq-item card"><summary>${item.question}</summary><p>${item.answer}</p></details>`; }).join("")}</div></details>`;
  }

  function loadSocialLinksScript() {
    if (document.querySelector('script[src^="social-links.js"]')) return;
    const socialScript = document.createElement("script");
    socialScript.src = "social-links.js?v=1";
    socialScript.defer = true;
    document.body.appendChild(socialScript);
  }

  function init() {
    addStyles();
    removeBadAndLongSections();
    restoreHeroGif();
    simplifyProofBadges();
    makeFaqExpandable();
    greenKickstarterWords();
    loadSocialLinksScript();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();