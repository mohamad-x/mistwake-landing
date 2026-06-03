(function addMistWakeSocialLinks() {
  function addStyles() {
    if (document.getElementById('mistwake-social-styles')) return;
    const style = document.createElement('style');
    style.id = 'mistwake-social-styles';
    style.textContent = `
      .social-links {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
      }

      .social-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 9px 12px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.11);
        color: rgba(247, 241, 232, 0.86);
        font-size: 0.9rem;
        font-weight: 800;
        transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
      }

      .social-link:hover {
        transform: translateY(-1px);
        border-color: rgba(255, 184, 77, 0.35);
        color: var(--amber);
      }

      .social-logo {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        border-radius: 999px;
        border: 1px solid currentColor;
        font-size: 0.72rem;
        font-weight: 900;
        line-height: 1;
      }

      @media (max-width: 700px) {
        .social-links {
          width: 100%;
          order: 2;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function init() {
    const footer = document.querySelector('footer');
    if (!footer || footer.querySelector('.social-links')) return;

    addStyles();

    const links = [
      ['Instagram', 'https://www.instagram.com/mistwakealarm/', 'IG'],
      ['Facebook', 'https://www.facebook.com/profile.php?id=61590274124276', 'f'],
      ['TikTok', 'https://www.tiktok.com/@kim.kom2', '♪']
    ];

    const wrapper = document.createElement('div');
    wrapper.className = 'social-links';
    wrapper.setAttribute('aria-label', 'MistWake social media links');
    wrapper.innerHTML = links.map(function(link) {
      return '<a class="social-link" href="' + link[1] + '" target="_blank" rel="noopener" aria-label="MistWake on ' + link[0] + '"><span class="social-logo">' + link[2] + '</span><span>' + link[0] + '</span></a>';
    }).join('');

    const backToTop = footer.querySelector('a[href="#top"]');
    if (backToTop) footer.insertBefore(wrapper, backToTop);
    else footer.appendChild(wrapper);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
