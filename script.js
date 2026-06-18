let waitlistSubmitted = false;

function scrollToSignup() {
  const signup = document.getElementById("free-list-section");
  if (!signup) return;
  signup.scrollIntoView({ behavior: "smooth" });
}

function handleWaitlistSubmit() {
  waitlistSubmitted = true;
  const message = document.getElementById("form-message");
  const buttons = document.querySelectorAll(".waitlist-form button");

  if (message) {
    message.textContent = "Submitting...";
    message.classList.remove("success-message");
  }

  buttons.forEach(function(button) {
    button.disabled = true;
    button.textContent = "Submitting...";
  });

  if (typeof fbq === "function") fbq("track", "Lead");
  if (window.ttq && typeof ttq.track === "function") ttq.track("CompleteRegistration");
  if (typeof gtag === "function") {
    gtag("event", "lead", { event_category: "conversion", event_label: "free_email_signup" });
  }

  return true;
}

function handleGoogleFormLoad() {
  if (!waitlistSubmitted) return;

  const forms = document.querySelectorAll(".waitlist-form");
  const message = document.getElementById("form-message");
  const buttons = document.querySelectorAll(".waitlist-form button");

  if (message) {
    message.textContent = "You're on the MistWake launch list.";
    message.classList.add("success-message");
  }

  forms.forEach(function(form) { form.reset(); });
  buttons.forEach(function(button) {
    button.disabled = false;
    button.textContent = button.dataset.originalText || "Join Free List";
  });

  waitlistSubmitted = false;
}

function trackReservationClick() {
  if (typeof fbq === "function") fbq("track", "InitiateCheckout", { value: 1.00, currency: "USD" });
  if (window.ttq && typeof ttq.track === "function") ttq.track("InitiateCheckout", { value: 1.00, currency: "USD" });
  if (typeof gtag === "function") {
    gtag("event", "begin_checkout", { currency: "USD", value: 1.00, event_label: "stripe_reservation" });
  }
}

function applyNewMistWakeAssets() {
  const hero = document.querySelector(".hero-visual img");
  if (hero) {
    hero.src = "assets/kickstarter-hero.webp";
    hero.alt = "MistWake alarm clock on a nightstand with gentle water spray";
  }

  const proof = document.querySelector("#proof .visual-proof-image img");
  if (proof) {
    proof.src = "assets/prototype-demo.gif";
    proof.alt = "MistWake working prototype demo";
  }

  document.querySelectorAll(".proof-badges span").forEach(function(item) {
    item.textContent = item.textContent.replace("5-inch", "3.5-inch");
  });

  const how = document.getElementById("how");
  if (how && !document.getElementById("how-visual-new")) {
    how.insertAdjacentHTML("beforeend", '<div id="how-visual-new" class="visual-proof-grid wide-media" style="margin-top:26px;grid-template-columns:1fr;"><div class="visual-proof-image"><img class="asset-placeholder-img" src="assets/how-mistwake-works.webp" alt="Four-step graphic showing how MistWake works"></div></div>');
  }

  const objection = document.querySelector(".objection-section .comparison-grid");
  if (objection && !document.getElementById("comparison-visual-new")) {
    objection.outerHTML = '<div id="comparison-visual-new" class="product-strip-image"><img class="asset-placeholder-img" src="assets/old-vs-better-way.webp" alt="Comparison showing traditional alarms versus MistWake"></div>';
  }

  const safety = document.querySelector("#safety .product-strip-image img");
  if (safety) {
    safety.src = "assets/product-internal-diagram.webp";
    safety.alt = "MistWake internal water tank, pump, and electronics separation";
  }

  const specsTitle = document.querySelector("#specs .compact-card strong");
  if (specsTitle) specsTitle.textContent = "3.5-inch touchscreen";

  const specsCards = document.querySelectorAll("#specs .compact-card");
  if (specsCards[3]) specsCards[3].innerHTML = "<strong>Hidden drainage drawer</strong><span>Collects excess water for easier cleanup.</span>";

  const specs = document.getElementById("specs");
  if (specs && !document.getElementById("cleanup")) {
    specs.insertAdjacentHTML("beforebegin", '<section class="section visual-section" id="cleanup"><div class="visual-split"><div class="big-visual-copy"><p class="eyebrow">Easy cleanup</p><h2>Hidden side drawer for cleaner mornings.</h2><p>The drainage drawer is designed to catch excess water out of sight so the nightstand setup stays simple and easy to maintain.</p></div><div class="product-strip-image"><img class="asset-placeholder-img" src="assets/easy-cleanup.webp" alt="MistWake hidden side drainage drawer"></div></div></section>');
    specs.insertAdjacentHTML("afterend", '<section class="section visual-section" id="touchscreen"><div class="visual-split"><div class="product-strip-image"><img class="asset-placeholder-img" src="assets/touchscreen-control.webp" alt="MistWake touchscreen controls for spray duration, spray count, and settings"></div><div class="big-visual-copy"><p class="eyebrow">Smart touchscreen</p><h2>Control alarm, spray, and settings from one screen.</h2><p>Adjust the wake-up time, sound, spray duration, spray count, brightness, and display mode directly from the touchscreen.</p></div></div></section>');
  }

  const box = document.querySelector("#box .product-strip-image img");
  if (box) {
    box.src = "assets/package-contents.webp";
    box.alt = "MistWake alarm, power adapter, waterproof mat, and guide";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".reserve-link").forEach(function(link) {
    link.addEventListener("click", trackReservationClick);
  });

  document.querySelectorAll(".waitlist-form button").forEach(function(button) {
    button.dataset.originalText = button.textContent;
  });

  applyNewMistWakeAssets();
});
