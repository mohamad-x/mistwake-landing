const features = [
  {
    title: "Adjustable Mist Arm",
    desc: "Direct the mist where you need it while keeping the clock compact and clean on your nightstand."
  },
  {
    title: "Warm Amber Display",
    desc: "The soft amber display gives MistWake a premium bedside feel without harsh blue-white light."
  },
  {
    title: "Internal Reservoir",
    desc: "The compact internal water reservoir keeps the product realistic, minimal, and close to the original design."
  },
  {
    title: "Simple Top Controls",
    desc: "Minimal controls help users set the alarm quickly without turning the product into a complicated gadget."
  }
];

let waitlistSubmitted = false;

function scrollToSignup() {
  document.getElementById("signup").scrollIntoView({ behavior: "smooth" });
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function showFeature(index) {
  const title = document.getElementById("feature-title");
  const desc = document.getElementById("feature-desc");
  const cards = document.querySelectorAll(".feature-card");

  title.textContent = features[index].title;
  desc.textContent = features[index].desc;

  cards.forEach(card => card.classList.remove("active"));
  cards[index].classList.add("active");
}

function handleWaitlistSubmit() {
  const message = document.getElementById("form-message");
  const submitButton = document.querySelector(".waitlist-inline-form button");

  waitlistSubmitted = true;
  message.textContent = "Submitting your email...";

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

  message.textContent = "You're on the MistWake waitlist. Check your email for future launch updates.";

  if (form) {
    form.reset();
  }

  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = "Join the Waitlist";
  }

  waitlistSubmitted = false;
}

function setPrototypeProgress(value) {
  const fill = document.getElementById("progress-fill");
  const label = document.getElementById("progress-value");

  if (!fill || !label) return;

  fill.style.width = value + "%";
  label.textContent = value + "%";
}
