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
    message.textContent = "You're on the MistWake VIP launch list.";
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

(function improveKickstarterPrelaunchPage() {
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
    if (document.getElementById("kickstarter-prelaunch-updates")) return;

    const style = document.createElement("style");
    style.id = "kickstarter-prelaunch-updates";
    style.textContent = `
      .product-gif-section {
        padding-top: 28px;
        background: radial-gradient(circle at top left, rgba(120, 213, 255, 0.08), transparent 34%);
      }

      .product-gif-card,
      .campaign-readiness-card {
        width: min(100%, 1120px);
        margin: 0 auto;
        border-radius: 28px;
        border: 1px solid rgba(120, 213, 255, 0.22);
        background:
          linear-gradient(135deg, rgba(120, 213, 255, 0.1), rgba(255, 184, 77, 0.06)),
          var(--panel);
        box-shadow: var(--shadow);
      }

      .product-gif-card {
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 26px;
        align-items: center;
        padding: 24px;
      }

      .product-gif-media {
        position: relative;
        overflow: hidden;
        border-radius: 24px;
        border: 1px solid var(--border);
        background: rgba(0, 0, 0, 0.28);
      }

      .product-demo-gif {
        display: block;
        width: 100%;
        aspect-ratio: 3 / 2;
        object-fit: cover;
        background: #05070b;
      }

      .gif-overlay-badge {
        position: absolute;
        left: 16px;
        bottom: 16px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        border-radius: 999px;
        background: rgba(8, 11, 16, 0.82);
        border: 1px solid rgba(255, 255, 255, 0.16);
        color: var(--text);
        font-size: 0.9rem;
        font-weight: 900;
        backdrop-filter: blur(12px);
      }

      .product-gif-copy {
        padding: 16px;
      }

      .product-gif-copy h2,
      .campaign-readiness-copy h2 {
        font-size: clamp(2rem, 4vw, 3.4rem);
        line-height: 1;
        letter-spacing: -1.5px;
        margin-bottom: 14px;
      }

      .product-gif-copy p,
      .campaign-readiness-copy p,
      .readiness-card p {
        color: var(--muted);
      }

      .gif-proof-points,
      .readiness-grid {
        display: grid;
        gap: 12px;
      }

      .gif-proof-points {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin: 20px 0 22px;
      }

      .gif-proof-points span,
      .readiness-card {
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.075);
        border: 1px solid rgba(255, 255, 255, 0.11);
      }

      .gif-proof-points span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        min-height: 48px;
        padding: 9px 13px;
        color: rgba(247, 241, 232, 0.86);
        font-size: 0.88rem;
        font-weight: 800;
      }

      .campaign-readiness-card {
        display: grid;
        grid-template-columns: 0.85fr 1.15fr;
        gap: 24px;
        align-items: center;
        padding: 30px;
      }

      .readiness-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      .readiness-card {
        padding: 20px;
      }

      .readiness-card strong {
        display: block;
        margin-bottom: 8px;
        color: var(--amber);
        font-size: 1.03rem;
      }

      .readiness-note {
        margin-top: 16px;
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px solid rgba(255, 184, 77, 0.22);
        background: rgba(255, 184, 77, 0.08);
        color: rgba(247, 241, 232, 0.82) !important;
        font-size: 0.94rem;
      }

      @media (max-width: 1050px) {
        .product-gif-card,
        .campaign-readiness-card {
          grid-template-columns: 1fr;
        }

        .product-gif-copy,
        .campaign-readiness-copy {
          text-align: center;
        }
      }

      @media (max-width: 700px) {
        .product-gif-section {
          padding-top: 20px;
        }

        .product-gif-card,
        .campaign-readiness-card {
          padding: 16px;
          border-radius: 20px;
          gap: 18px;
        }

        .product-gif-media {
          border-radius: 18px;
        }

        .gif-overlay-badge {
          left: 10px;
          right: 10px;
          bottom: 10px;
          justify-content: center;
          font-size: 0.8rem;
        }

        .product-gif-copy,
        .campaign-readiness-copy {
          padding: 4px 2px 2px;
        }

        .gif-proof-points,
        .readiness-grid {
          grid-template-columns: 1fr;
        }
      }
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

    if (proofLink) {
      proofLink.insertAdjacentElement("afterend", demoLink);
    } else {
      nav.insertBefore(demoLink, nav.firstChild);
    }
  }

  function resolveGifSource(img, index = 0) {
    if (!img || index >= gifCandidates.length) {
      if (img) {
        img.src = "assets/mistwake-hero-image.png?v=1";
        img.alt = "MistWake alarm clock preview image";
      }
      return;
    }

    img.onerror = function () {
      resolveGifSource(img, index + 1);
    };
    img.src = gifCandidates[index];
  }

  function injectGifSection() {
    const heroSection = document.querySelector(".hero-section");
    if (!heroSection || document.getElementById("demo")) return;

    const section = document.createElement("section");
    section.className = "section product-gif-section";
    section.id = "demo";
    section.setAttribute("aria-label", "MistWake product GIF demo");
    section.innerHTML = `
      <div class="product-gif-card">
        <div class="product-gif-media">
          <img class="product-demo-gif" data-gif-demo="true" src="assets/mistwake-hero-image.png?v=1" alt="MistWake product demo showing the mist wake-up cue" loading="eager" decoding="async" />
          <div class="gif-overlay-badge"><span class="pulse-dot"></span>See the mist cue in action</div>
        </div>
        <div class="product-gif-copy">
          <p class="eyebrow">See it in action</p>
          <h2>The idea is simple: sound first, mist when sound is not enough.</h2>
          <p>A short GIF is smoother than a video for mobile ad traffic. It quickly shows what makes MistWake different without forcing visitors to tap play or wait for a heavy video load.</p>
          <div class="gif-proof-points" aria-label="MistWake demo highlights">
            <span>Instant visual explanation</span>
            <span>Mobile-first preview</span>
            <span>No sound required</span>
          </div>
          <a class="primary-btn reserve-link section-mobile-cta" href="https://buy.stripe.com/aFa7sLcA3aXC3IIfQidIA00" target="_blank" rel="noopener">Reserve for $1</a>
        </div>
      </div>
    `;

    heroSection.insertAdjacentElement("afterend", section);
    resolveGifSource(section.querySelector('[data-gif-demo="true"]'));
  }

  function injectCampaignReadinessSection() {
    const roadmapSection = document.querySelector(".roadmap-section");
    if (!roadmapSection || document.getElementById("campaign-readiness")) return;

    const section = document.createElement("section");
    section.className = "section campaign-readiness-section";
    section.id = "campaign-readiness";
    section.innerHTML = `
      <div class="campaign-readiness-card">
        <div class="campaign-readiness-copy">
          <p class="eyebrow">Campaign readiness</p>
          <h2>Backers need proof, clarity, and realistic expectations.</h2>
          <p>MistWake should not look like a random gadget preorder. The page now emphasizes the working prototype, the launch plan, what the $1 reservation actually means, and what still needs to be finished before fulfillment.</p>
          <p class="readiness-note">Kickstarter backers are supporting a project, not buying from a finished retail store. That distinction should stay visible before launch.</p>
        </div>
        <div class="readiness-grid">
          <article class="readiness-card"><strong>Prototype proof</strong><p>Show the product working before asking for money.</p></article>
          <article class="readiness-card"><strong>Clear reward logic</strong><p>$1 reserves VIP access; Kickstarter pledge still comes later.</p></article>
          <article class="readiness-card"><strong>Manufacturing honesty</strong><p>Explain final enclosure, sourcing, testing, and fulfillment work.</p></article>
        </div>
      </div>
    `;

    roadmapSection.insertAdjacentElement("afterend", section);
  }

  function addKickstarterSpecificFaqs() {
    const faqList = document.querySelector(".faq-list");
    if (!faqList || faqList.querySelector('[data-added-faq="kickstarter-project"]')) return;

    const projectFaq = document.createElement("article");
    projectFaq.className = "card";
    projectFaq.setAttribute("data-added-faq", "kickstarter-project");
    projectFaq.innerHTML = `<h3>Is this a finished retail product?</h3><p>No. MistWake is preparing for Kickstarter. The prototype proves the core concept, but the final product still needs manufacturing refinement, supplier coordination, testing, packaging, and fulfillment planning.</p>`;

    const reservationFaq = document.createElement("article");
    reservationFaq.className = "card";
    reservationFaq.innerHTML = `<h3>Why show the prototype and roadmap before launch?</h3><p>Backers need to understand what already works, what still has to be built, and what risks exist before they support the campaign. That transparency increases trust and reduces confusion.</p>`;

    faqList.insertBefore(projectFaq, faqList.firstChild);
    faqList.insertBefore(reservationFaq, projectFaq.nextSibling);
  }

  function refineCopy() {
    const founderText = document.querySelector(".founder-card p:last-child");
    if (founderText) {
      founderText.textContent = "I built MistWake because sound-only alarms failed me at the exact moments when waking up mattered. The point is not to scare people awake. The point is to add a second physical cue when sound alone is not enough.";
    }

    const roadmapHeader = document.querySelector(".roadmap-section .section-header p:last-child");
    if (roadmapHeader) {
      roadmapHeader.textContent = "Kickstarter backers need to see the path from working prototype to production. This is the current execution plan before final dates and reward details are locked.";
    }
  }

  function init() {
    addStyles();
    addDemoNavLink();
    injectGifSection();
    injectCampaignReadinessSection();
    addKickstarterSpecificFaqs();
    refineCopy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
