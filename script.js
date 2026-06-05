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

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".reserve-link").forEach(function(link) {
    link.addEventListener("click", trackReservationClick);
  });

  document.querySelectorAll(".waitlist-form button").forEach(function(button) {
    button.dataset.originalText = button.textContent;
  });
});
