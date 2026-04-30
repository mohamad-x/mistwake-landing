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
  message.textContent = "Submitting...";
  message.classList.remove("success-message");

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

  message.textContent = "You're on the MistWake waitlist.";
  message.classList.add("success-message");

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

function applyWaitlistFormStyles() {
  const message = document.getElementById("form-message");

  if (message) {
    message.textContent = "";
  }

  const style = document.createElement("style");
  style.textContent = `
    .waitlist-inline-form {
      width: min(100%, 560px);
      margin: 30px auto 0;
      display: flex;
      gap: 12px;
      padding: 8px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.14);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 18px 48px rgba(0, 0, 0, 0.25);
    }

    .waitlist-inline-form input {
      flex: 1;
      min-width: 0;
      border: 0;
      outline: none;
      background: transparent;
      color: var(--text);
      padding: 0 18px;
      font-size: 1rem;
      font-weight: 600;
    }

    .waitlist-inline-form input::placeholder {
      color: rgba(246, 241, 232, 0.58);
    }

    .waitlist-inline-form input:focus {
      border: 0;
    }

    .waitlist-inline-form button {
      border: 0;
      border-radius: 999px;
      padding: 14px 24px;
      background: linear-gradient(135deg, var(--amber), var(--amber-dark));
      color: #1c1308;
      font-weight: 900;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 12px 30px rgba(255, 184, 77, 0.22);
      transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
    }

    .waitlist-inline-form button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 16px 38px rgba(255, 184, 77, 0.32);
    }

    .waitlist-inline-form button:disabled {
      cursor: not-allowed;
      opacity: 0.72;
    }

    #form-message {
      min-height: 24px;
      margin-top: 16px;
      color: var(--mist);
      font-weight: 800;
    }

    #form-message.success-message {
      color: var(--amber);
    }

    @media (max-width: 700px) {
      .waitlist-inline-form {
        flex-direction: column;
        border-radius: 24px;
        padding: 12px;
      }

      .waitlist-inline-form input {
        width: 100%;
        min-height: 50px;
        padding: 0 14px;
        text-align: center;
      }

      .waitlist-inline-form button {
        width: 100%;
      }
    }
  `;

  document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", applyWaitlistFormStyles);
