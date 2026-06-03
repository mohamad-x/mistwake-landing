let waitlistSubmitted = false;

function scrollToSignup() {
  const signup = document.getElementById("signup");
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

  if (form) {
    form.reset();
  }

  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = "Join Free List";
  }

  waitlistSubmitted = false;
}

(function improveMistWakePage() {
  const gifCandidates = [
    "assets/ProductHero.gif",
    "assets/producthero.gif",
    "assets/product-hero.gif",
    "assets/Product-Hero.gif",
    "assets/mistwake-demo.gif",
    "assets/mistwake-product-demo.gif",
    "assets/mistwake-product.gif",
    "assets/hero.gif",
    "assets/demo.gif",
    "assets/MistWake.gif",
    "assets/mistwake.gif"
  ];

  function addStyles() {
    if (document.getElementById("mistwake-page-updates")) return;

    const style = document.createElement("style");
    style.id = "mistwake-page-updates";
    style.textContent = `
      .founder-section { display: none !important; }
      .product-gif-section { padding-top: 28px; background: radial-gradient(circle at top left, rgba(120, 213, 255, 0.08), transparent 34%); }
      .product-gif-card { width: min(100%, 1120px); margin: 0 auto; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 26px; align-items: center; padding: 24px; border-radius: 28px; border: 1px solid rgba(120, 213, 255, 0.22); background: linear-gradient(135deg, rgba(120, 213, 255, 0.1), rgba(255, 184, 77, 0.06)), var(--panel); box-shadow: var(--shadow); }
      .product-gif-media { position: relative; overflow: hidden; border-radius: 24px; border: 1px solid var(--border); background: rgba(0, 0, 0, 0.28); }
      .product-demo-gif { display: block; width: 100%; aspect-ratio: 3 / 2; object-fit: cover; background: #05070b; }
      .gif-overlay-badge { position: absolute; left: 16px; bottom: 16px; display: inline-flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 999px; background: rgba(8, 11, 16, 0.82); border: 1px solid rgba(255, 255, 255, 0.16); color: var(--text); font-size: 0.9rem; font-weight: 900; backdrop-filter: blur(12px); }
      .product-gif-copy { padding: 16px; }
      .product-gif-copy h2 { font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1; letter-spacing: -1.5px; margin-bottom: 14px; }
      .product-gif-copy p { color: var(--muted); }
      .gif-proof-points { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 20px 0 22px; }
      .gif-proof-points span { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 9px 13px; border-radius: 18px; background: rgba(255, 255, 255, 0.075); border: 1px solid rgba(255, 255, 255, 0.11); color: rgba(247, 241, 232, 0.86); text-align: center; font-size: 0.88rem; font-weight: 800; }
      .faq-master { width: min(100%, 920px); margin: 0 auto; border-radius: 28px; border: 1px solid var(--border); background: var(--panel); box-shadow: var(--shadow); overflow: hidden; }
      .faq-master > summary { list-style: none; cursor: pointer; padding: 28px; text-align: center; }
      .faq-master > summary::-webkit-details-marker, .faq-item > summary::-webkit-details-marker { display: none; }
      .faq-master-title { display: block; font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1; letter-spacing: -1.2px; font-weight: 900; }
      .faq-master-note { display: inline-flex; margin-top: 14px; padding: 8px 12px; border-radius: 999px; background: rgba(255, 184, 77, 0.1); border: 1px solid rgba(255, 184, 77, 0.22); color: var(--amber); font-size: 0.88rem; font-weight: 900; }
      .faq-list.accordion-list { width: 100%; padding: 0 18px 22px; }
      .faq-item { margin-top: 12px; padding: 0; overflow: hidden; }
      .faq-item > summary { position: relative; list-style: none; cursor: pointer; padding: 20px 50px 20px 20px; color: var(--text); font-size: 1.05rem; font-weight: 900; }
      .faq-item > summary::after { content: '+'; position: absolute; right: 20px; top: 50%; transform: translateY(-50%); color: var(--amber); font-size: 1.5rem; line-height: 1; }
      .faq-item[open] > summary::after { content: '-'; }
      .faq-item p { padding: 0 20px 20px; color: var(--muted); }
      @media (max-width: 1050px) { .product-gif-card { grid-template-columns: 1fr; } .product-gif-copy { text-align: center; } }
      @media (max-width: 700px) { .product-gif-section { padding-top: 20px; } .product-gif-card { padding: 16px; border-radius: 20px; gap: 18px; } .product-gif-media { border-radius: 18px; } .gif-overlay-badge { left: 10px; right: 10px; bottom: 10px; justify-content: center; font-size: 0.8rem; } .product-gif-copy { padding: 4px 2px 2px; } .gif-proof-points { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(style);
  }

  function addDemoNavLink() {
    const nav = document.querySelector(".nav-links");
    if (!nav || nav.querySelector('a[href="#demo"]')) return;
    const proofLink = nav.querySelector('a[href="#proof"]');
    const demoLink = document.createElement("a");
    demoLink.href = "#demo";
    demoLink.textContent = "Demo";
    if (proofLink) proofLink.insertAdjacentElement("afterend", demoLink);
    else nav.insertBefore(demoLink, nav.firstChild);
  }

  function resolveGifSource(img, index = 0) {
    if (!img || index >= gifCandidates.length) {
      if (img) {
        img.src = "assets/mistwake-hero-image.png?v=1";
        img.alt = "MistWake alarm clock preview";
      }
      return;
    }
    img.onerror = function () { resolveGifSource(img, index + 1); };
    img.src = gifCandidates[index];
  }

  function injectGifSection() {
    const heroSection = document.querySelector(".hero-section");
    if (!heroSection || document.getElementById("demo")) return;
    const section = document.createElement("section");
    section.className = "section product-gif-section";
    section.id = "demo";
    section.setAttribute("aria-label", "MistWake product demo");
    section.innerHTML = `
      <div class="product-gif-card">
        <div class="product-gif-media">
          <img class="product-demo-gif" data-gif-demo="true" src="assets/mistwake-hero-image.png?v=1" alt="MistWake product demo showing the mist wake-up cue" loading="eager" decoding="async" />
          <div class="gif-overlay-badge"><span class="pulse-dot"></span>See the mist cue in action</div>
        </div>
        <div class="product-gif-copy">
          <p class="eyebrow">See it in action</p>
          <h2>Sound first. Fine mist when sound is not enough.</h2>
          <p>MistWake starts like a normal alarm, then adds a controlled mist cue to help you wake up when sound alone fails.</p>
          <div class="gif-proof-points" aria-label="MistWake demo highlights"><span>Controlled mist cue</span><span>Adjustable nozzle</span><span>Sound-only mode</span></div>
          <a class="primary-btn reserve-link section-mobile-cta" href="https://buy.stripe.com/aFa7sLcA3aXC3IIfQidIA00" target="_blank" rel="noopener">Reserve for $1</a>
        </div>
      </div>`;
    heroSection.insertAdjacentElement("afterend", section);
    resolveGifSource(section.querySelector('[data-gif-demo="true"]'));
  }

  function removeUnneededSections() {
    document.querySelector(".founder-section")?.remove();
    document.getElementById("campaign-readiness")?.remove();
  }

  function makeFaqExpandable() {
    const section = document.querySelector(".faq-section");
    const faqList = section?.querySelector(".faq-list");
    if (!section || !faqList || section.querySelector(".faq-master")) return;
    const items = [{ question: "Is this a finished retail product?", answer: "Not yet. MistWake is preparing for Kickstarter. The working prototype proves the core function, and the final version may still be refined before manufacturing." }];
    faqList.querySelectorAll("article.card").forEach(function(card) {
      const question = card.querySelector("h3")?.textContent?.trim();
      const answer = card.querySelector("p")?.textContent?.trim();
      if (question && answer && !items.some(function(item) { return item.question === question; })) items.push({ question, answer });
    });
    section.innerHTML = `<details class="faq-master"><summary><span class="eyebrow">FAQ</span><span class="faq-master-title">Quick answers before launch.</span><span class="faq-master-note">Tap to expand FAQs</span></summary><div class="faq-list accordion-list">${items.map(function(item) { return `<details class="faq-item card"><summary>${item.question}</summary><p>${item.answer}</p></details>`; }).join("")}</div></details>`;
  }

  function loadSocialLinksScript() {
    if (document.querySelector('script[src^="social-links.js"]')) return;
    const socialScript = document.createElement("script");
    socialScript.src = "social-links.js?v=1";
    socialScript.defer = true;
    document.body.appendChild(socialScript);
  }

  function refineCopy() {
    const roadmapHeader = document.querySelector(".roadmap-section .section-header p:last-child");
    if (roadmapHeader) roadmapHeader.textContent = "Here is the current path from working prototype to Kickstarter launch, manufacturing refinement, production, and fulfillment.";
    const funnelEyebrow = document.querySelector(".funnel-section .eyebrow");
    if (funnelEyebrow) funnelEyebrow.textContent = "Why reserve early";
    const funnelTitle = document.querySelector(".funnel-section h2");
    if (funnelTitle) funnelTitle.textContent = "Get first access when MistWake launches.";
    const funnelIntro = document.querySelector(".funnel-section .section-header p:last-child");
    if (funnelIntro) funnelIntro.textContent = "The $1 reservation puts you on the VIP list for the planned $89 Kickstarter price before the campaign opens.";
    const funnelCards = document.querySelectorAll(".funnel-section .card");
    const funnelCopy = [["1. Reserve your spot", "Secure VIP launch access before the Kickstarter campaign opens."], ["2. Get notified first", "VIP supporters will be notified when the campaign goes live."], ["3. Decide on Kickstarter", "The $1 reservation does not buy the product. You will still choose whether to pledge on Kickstarter."]];
    funnelCards.forEach(function(card, index) {
      if (!funnelCopy[index]) return;
      const title = card.querySelector("h3");
      const text = card.querySelector("p");
      if (title) title.textContent = funnelCopy[index][0];
      if (text) text.textContent = funnelCopy[index][1];
    });
  }

  function init() {
    addStyles();
    addDemoNavLink();
    removeUnneededSections();
    injectGifSection();
    refineCopy();
    makeFaqExpandable();
    loadSocialLinksScript();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
