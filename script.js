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
    submitButton.textContent = "Join the VIP List";
  }

  waitlistSubmitted = false;
}

(function addProductDemoVideoSection() {
  const PRODUCT_DEMO_VIDEO = [
    "AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAUcbW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAE4gAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAABEd0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAE4gAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAWgAAADwAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAABOIAAAIAAABAAAAAAO/bWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAAoAAAAyABVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAADam1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAypzdGJsAAAAsnN0c2QAAAAAAAAAAQAAAKJhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAWgA8ABIAAAASAAAAAAAAAABFUxhdmM2MS4xOS4xMDEgbGlieDI2NAAAAAAAAAAAAAAAGP//AAAAOGF2Y0MBZAAW/+EAGmdkABascgRBcf5eEAAAAwAQAAADAUDxYthGAQAHaOhDgSSyLP34+AAAAAAUYnRydAAAAAAAABpJAAAAAAAAABhzdHRzAAAAAAAAAAEAAAAyAAAEAAAAABRzdHNzAAAAAAAAAAEAAAABAAABOGN0dHMAAAAAAAAAJQAAAAIAAAgAAAAAAQAAGAAAAAABAAAIAAAAAAEAAAAAAAAAAgAABAAAAAABAAAcAAAAAAEAAAwAAAAAAgAAAAAAAAACAAAE",
    "AAAAAAEAABwAAAAAAQAADAAAAAACAAAAAAAAAAIAAAQAAAAAAQAAHAAAAAABAAAMAAAAAAIAAAAAAAAAAgAABAAAAAABAAAgAAAAAAEAAAwAAAAAAgAAAAAAAAADAAAEAAAAAAEAAAgAAAAAAQAAFAAAAAABAAAIAAAAAAEAAAAAAAAAAQAABAAAAAABAAAcAAAAAAEAAAwAAAAAAgAAAAAAAAACAAAEAAAAAAEAABQAAAAAAQAACAAAAAABAAAAAAAAAAEAAAQAAAAAAQAACAAAAAABAAAMAAAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAAyAAAAAQAAANxzdHN6AAAAAAAAAAAAAAAyAAAENwAAAC8AAACzAAAAJQAAADAAAAANAAAAJAAAANIAAAAwAAAAIAAAAB0AAAAXAAAAIAAAANcAAABBAAAAHAAAABQAAAAQAAAAGgAAALAAAAA8AAAAFQAAABgAAAAVAAAAFwAAAcIAAAAjAAAAGAAAABAAAAASAAAAGAAAACMAAABbAAAA0QAAAC4AAAAhAAAAEgAAAMkAAAA8AAAAIAAAABAAAAAZAAAAGgAAAIUAAAAyAAAAEwAAABYAAAA3AAAAKAAAABQAAAAUc3RjbwAAAAAAAAABAAAFTAAAAGF1ZHRhAAAAWW1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALGlsc3QAAAAkqXRvbwAAABxkYXRhAAAAAQAAAABMYXZmNjEuNy4xMDAAAAAIZnJlZQAAEHZtZGF0AAACsAYF//+s3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE2NCByMzEwOCAzMWUxOWY5IC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAyMyAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlv",
    "bnM6IGNhYmFjPTEgcmVmPTE2IGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMzMgbWU9dW1oIHN1Ym1lPTEwIHBzeT0xIHBzeV9yZD0xLjAwOjAuMDAgbWl4ZWRfcmVmPTEgbWVfcmFuZ2U9MjQgY2hyb21hX21lPTEgdHJlbGxpcz0yIDh4OGRjdD0xIGNxbT0wIGRlYWR6b25lPTIxLDExIGZhc3RfcHNraXA9MSBjaHJvbWFfcXBfb2Zmc2V0PS0yIHRocmVhZHM9NyBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTggYl9weXJhbWlkPTIgYl9hZGFwdD0yIGJfYmlhcz0wIGRpcmVjdD0zIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MiBrZXlpbnQ9MjUwIGtleWludF9taW49MTAgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD02MCByYz1jcmYgbWJ0cmVlPTEgY3JmPTQ0LjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IGlwX3JhdGlvPTEuNDAgYXE9MToxLjAwAIAAAAF/ZYiBAAv/Fnw//BLO4dLzUoc7AAADAT320/EiIoYkwELsRHNUuSqEUV/TeCB9jsctYI1uqaUEhyEwVOqAnpo1V30wwzcGM/Yo8KqmY2LomTz3KYJH3izgLdObB/CaP2llS1c9hsK5p3ugB9jn5Ru9lNnPUYucs/S0A+YNGdW9MruX7fYQ5HNHGmauKqqyRn0XdP4lXFNsMlNIKuRVK5iEvFCFeOM916hxUDuaNx9rExQ9YY2Y8U+mCuMfEOdSSPNBGp+A4GGF",
    "lacn8fMTQ4b7aXvB0x34h+j6xBndbnlNUEFNAkXSAA1f3h9OBItepsKpAawPjOE6tv7Z1wBUR0oG2PxwzRlfAi21vzLcSfxCCXvBjwh8VxhZ2s0UnOTnnRCWqLmzGOhqWJOweG8Cg9huNtr5iVwOAhqYd5F6+uAAfB6B6C820p2eL7NUJWQMT5vbCAxWwIdrdNI7NjyVmYi2ZMsod4qHfkQHTdPPanMergUlIt2IYaQhjdUReU4P1zEAAAArQZoILYj/FGhMlFO6rlekiVj3kAi06jVJdu1cuRnujH3IlAbtYVEC0jLUOgAAAK9BmhDJPAgQIGQ5YCOPBBHAI6AjhIEb/ybku/Q16jshMxHoUPv9fGOl3BsaW5rio4RrgPoNqtjnYLAaaqD1YIncuXmaUEgLSl7XkIiK2AQhf0NCmoXJpWMF8HKk/FwjYORRJLuhISXAZtWL0OtYZJDwzmPK61P40JXe6WpgFomJ+8n2tov7t4vs3FquA3x67zsJqr8YifbO5k5SvYvOovgewDcDdQWZWjigsYdtYnclAAAAIUGeGGVEb26sXce3rFOJ22Jhf0L3aHECbiCLjBykeJX2/AAAACwBniBFIi//dDEc/kI133d3TMN4FEwVQgBB5BdZGj1PJ5zOL35FnLXy67FYgQAAAAkBniCNyL8ABv0AAAAgAZ4grci/S3FhXD4dSqgsFP9/SNYZWwsfaO6CgbptU28AAADOQZohibUCBAgLWQ+AiqAimAEb/5m6jyX8sTSttcZyu8TEvUQMr79jaITEidEDcHHYxkQKWNQLJErBiRM5MxIojegG94ELRW3+8Egm9kxIo3c6vRkbeu6UF8vH0o5WpLiHHlJjclUqMsxp61ua64K8DZ6qYElePsIT8vayN3T65BeauoEEEOHQac8jgnHY4ppJL4VX87RyqFoQ7fwll7nECOTMnsxuoAARpO4xBATYA9zAWDtX3usucxvyKN1rUYka1X95nh5Juxnv",
    "ADeaYeEAAAAsQZ4pJJEb/5c0MbWLcoioOaoVFp18lbdsjyAMki0Ge9KpOXSrCvgBSowpeYAAAAAcAZ4w5IiL/0sb73y4mNFx6GVCPJVj7gk83BSrwAAAABkBnjEEiIv/Sxvve2eqywwt5GXc6S1uiQSlAAAAEwGeMUyyL/9FAfWVCJBfk3pT/4QAAAAcAZ4xbLIn/5cVQWaQ/Tle31hC1FdOcG5QtlzHGwAAANNBmjJIjUCBAgLa1kLgioImAARvhBua/JaP0W2Ee+po9CVJSudaxHo5GydE39Io70uz01UdyoDHkxmMXzyWx4G82Ns9TDX8oNupvDkGSm5j7KsgdLrjIuWBtQL6VrV+9pqKQsegBKcD+DpZ9VwG4HgwYEr5nIBrTwQs4cL5ri+EF9vD4dR7McVL4e4h/VCSnUYhpb4d5QNi3/YYn7FBAK17TDSsP+aiw6X2eUG6/18SlFNseaZun5zPx9hlqKrq9CArapb4sZZcwGmSymKaMAytFZ7FAAAAPUGeOezRH//9mzsw6ApY92Tmbm8W/ee0z7WPP7PXDEZD+EBXmfBG5wWNBQv4VSw1SAjolzK9TvhxLg9ycIEAAAAYAZ5BrMiJ/6SBmQaOuHaO9R0OHUIkpsxBAAAAEAGeQczIif8MsnYFRMkkLiQAAAAMAZ5CDPIn/wB36U2YAAAAFgGeQizyJ//6M2g25mOwbGy8Xn+iW4MAAACsQZpDCK1AgQIC2trWQ2BCoEJgAAQj/6TXG/BZNiV79VeQ6ImyjmPyFsHw+JQuTrDrNytzQ9Dxwh+kTX6laQ1235A2Ki5S8KWDIsN+bsBnU2x5enfBO2cI40wV44UnIOJny0RPj67IXU41SRgDsaIAo1B924ONiqG8n2kcn/6AXvWqGi75a3Tini0IophvQbpkAbg1OoAoV6kmIAkGcvJvOfhivmztxfe5Fm6poAAAADhBnkqsREf//LOy5O9H70so0WOPJIT8gUqE5KZgi/hn",
    "OvUgxPn2S0qPsl2AdIIkvy/suIeyk/j+KAAAABEBnlJsQiJ/84HZPOQ04mAHpQAAABQBnlKMQiJ/LzLGGNttTfLsJbQrYAAAABEBnlLMTIn/AZrcpDCfSR8BLwAAABMBnlLsTIn/ERXbOZwSqGqcFhkxAAABvkGaU+i9QIC2tra1kymAAAR/C4GN4j65P/gikBrOJSZgbyKUJVB6Mg+2D0+DC4fAOD3pE3NtDWhjd+D1Nv9MrHsWOqbIMxDT0fOBMxogIop1qd9o3BkFtv/PLavX/teWx5/T7H8LDkHTZjHqtzXzzvwV0YHMDgGqqaIjl0+j1ZRyy2xafGx8LbQ3541XpTbqBxR+uRc94w4BhSF+AfAUi6UCgLbLK3ptvRr/ZILkPm+JJPWLVaxCJnkq1P1dAG2bqv9A2dzu0i+tRKrgvBiCpJOdRc24QgNYOEaEg6h2QGYV1piLoT/DpluRCCA5rz0uFbQrvjvJRnRLYttzOVpNORoWY9rE1Jk1v8Nd3OYuiNEqwUDpo8xhsK1CwB8P9znhzYwsNVt/ABwNHlAlzmDTdA5IQ0lDOf9nsOK9hqbpESD6LWlB+KBkN+tJntL8GcjrYaVqKt72JwJwVlLOTNz6PfJWjohgtgx3wQ3oU/fR96a9vQoUvgqYJFily1/0Vbcvfflu+w4jmeR4Nijl8NwsM6G18dwh1JmxHQM3yunh0lIVeFG7q1Z1pPERd00TAik6syYqbfQTu84AX7huOka8AAAAH0GeW2xUR//8scIAxVp6E0Z9Xo3dTXE0IDS67yCegJ8AAAAUAZ5jLFIif/OE1ubP9soApZG/x0AAAAAMAZ5jTFIifwwQAOOBAAAADgGeY4xcif9IQd4AQ/6ZAAAAFAGeY6xcif9RVvCNAOyzGBAQXQIQAAAAHwGeY8xcif/6NbxPl60oeJJ8FOyDWYKVe9JALFSTJgQAAABXQZpkCN1AgLa2tra1kymAAABG/wMiIX9qiUALv/Oa",
    "/2ZUL2/IGFVpeVGXsj46Yf+f/cBMcszWz6XrFt7okxZrTHI9QQJjom5PgxGHMxcku1fcRbD+tjppAAAAzUGabIj/AgQIFLa2tra1kEHgP4kBJAlASAIYD+QAAAMAEX+3y4XIfG4vtwRjlUwMgZwX4AIw0Y/y+f1gSv1dwcof2ML18gEC+TqrD4wGMD2FaBdycKFs/+xJGix9t7AcGXUL1CG3Fs+rcsng41+t9zH2NksGGMeEY6kTKoIR0wirAcxW0x2WacN6j/zNkAPhcTxzNFkPQoPFhKr0fh/5H4H+hXdosrl3frBUsESc+vgrUv+CPJpbWHhAqfd93slhHKQ8tZRVi5+plQxRzyMAAAAqQZ50TGxF//3mRtxJXzmYFS2SdcfwhyCZ3CYqVZTcFbOcW2SAS7WZ5SBhAAAAHQGefCxqIn9QQemKibxaQJAavp7mU1W86lWtg/hgAAAADgGefGx0if8IJVEDsgk5AAAAxUGafUagQIEBapbW1tbWiGPB8IgIoKgIDB8YAAADAAjfz5Zr1cdh/4Co9Zwa1VSggC0TDejzDf1d20ox9z7jc+5wdykDlMUbAb3J40vvoLjBKEVagDd26LXOVwnONexJ22pEJdDcxOpYyN79kp15RUEOvhLRLmWTlZod5pWgBb2uPiPA79//chxSsGeY8G2JHAGWfZsRLjIUQGR+Vs7nrtYdtpgpTwOB4bZOP2Pvga9mcG2hXhL7oE8TLTI/VR2+FlQ3ki4lAAAAOEGehOx8oIIfi//+PEctPiBJVDj2ZZQRrue1Kn3f48xoJsUJGKChALv2WnOVhDjSc3yDFy8Q6X5BAAAAHAGejKxqIn/zgOHLsdP3OiY+f7lOFD+Zcl+QHoEAAAAMAZ6MzGoif/OAAMqAAAAAFQGejQx0if/6MQlCXLh/5pJBBiMkbAAAABYBno0sdIn/+jEJQly5K+OQAJ2u2yQdAAAAgUGajcagQIEBbWqW1tbWyCMB/JAf0AAA",
    "AwAif/SZBb/dd4rpdfwS2kg5pEj66QlzdAl0LXT+lUrk8ariTeTEjddNZBC2G7MsXNlkpju4p/4CGFqyR7U1+ckMdQH2rE+YuQ7PN6P4XmlAqdBdpZkeAWA0AKWpy+MBUaDwh09WbylseAAAAC5BnpWMfKHoIYv/8p7rts3GmViZm2JMB03PttP95wWd5cQECKkSe8UObz6kvNOAAAAADwGenWxqIn/zs5Q6BRQA/wAAABIBnp2sdIn/cw7TqvTrA/59AW0AAAAzQZqd5qBAW1tapbW1tSZTAAADAAIv/1e81v2QZNige/a5rMpaJ1i3yXD42dnjlZtW7D3RAAAAJEGapieBApbW1qltbWyZTAAAAwAUPQQxP1cIk1bavHigTQ56QAAAABABnq4MdIn/TK8sBBvyZBbQ"
  ].join("");

  function injectStyles() {
    if (document.getElementById("product-demo-video-styles")) return;

    const style = document.createElement("style");
    style.id = "product-demo-video-styles";
    style.textContent = `
      .product-video-section {
        padding-top: 28px;
        background: radial-gradient(circle at top left, rgba(120, 213, 255, 0.08), transparent 34%);
      }

      .product-video-card {
        width: min(100%, 1120px);
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 26px;
        align-items: center;
        padding: 24px;
        border-radius: 28px;
        border: 1px solid rgba(120, 213, 255, 0.22);
        background:
          linear-gradient(135deg, rgba(120, 213, 255, 0.1), rgba(255, 184, 77, 0.06)),
          var(--panel);
        box-shadow: var(--shadow);
      }

      .product-video-media {
        position: relative;
        overflow: hidden;
        border-radius: 24px;
        border: 1px solid var(--border);
        background: rgba(0, 0, 0, 0.28);
      }

      .product-demo-video {
        display: block;
        width: 100%;
        aspect-ratio: 3 / 2;
        object-fit: cover;
        background: #05070b;
      }

      .video-overlay-badge {
        position: absolute;
        left: 16px;
        bottom: 16px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        border-radius: 999px;
        background: rgba(8, 11, 16, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.16);
        color: var(--text);
        font-size: 0.9rem;
        font-weight: 900;
        backdrop-filter: blur(12px);
      }

      .product-video-copy {
        padding: 16px;
      }

      .product-video-copy h2 {
        font-size: clamp(2rem, 4vw, 3.4rem);
        line-height: 1;
        letter-spacing: -1.5px;
        margin-bottom: 14px;
      }

      .product-video-copy p {
        color: var(--muted);
        max-width: 620px;
      }

      .video-proof-points {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 20px 0 22px;
      }

      .video-proof-points span {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 9px 13px;
        background: rgba(255, 255, 255, 0.075);
        border: 1px solid rgba(255, 255, 255, 0.11);
        color: rgba(247, 241, 232, 0.86);
        font-size: 0.88rem;
        font-weight: 800;
      }

      @media (max-width: 1050px) {
        .product-video-card {
          grid-template-columns: 1fr;
        }

        .product-video-copy {
          text-align: center;
        }

        .product-video-copy p {
          margin-left: auto;
          margin-right: auto;
        }

        .video-proof-points {
          justify-content: center;
        }
      }

      @media (max-width: 700px) {
        .product-video-section {
          padding-top: 20px;
        }

        .product-video-card {
          padding: 16px;
          border-radius: 20px;
          gap: 18px;
        }

        .product-video-media {
          border-radius: 18px;
        }

        .video-overlay-badge {
          left: 10px;
          right: 10px;
          bottom: 10px;
          justify-content: center;
          font-size: 0.8rem;
        }

        .product-video-copy {
          padding: 4px 2px 2px;
        }

        .video-proof-points span {
          width: 100%;
          justify-content: center;
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

  function injectDemoSection() {
    const heroSection = document.querySelector(".hero-section");
    if (!heroSection || document.getElementById("demo")) return;

    injectStyles();
    addDemoNavLink();

    const section = document.createElement("section");
    section.className = "section product-video-section";
    section.id = "demo";
    section.setAttribute("aria-label", "MistWake product video demo");
    section.innerHTML = `
      <div class="product-video-card">
        <div class="product-video-media">
          <video class="product-demo-video" autoplay muted loop playsinline preload="metadata" poster="assets/mistwake-hero-image.png?v=1" aria-label="Short MistWake product preview video">
            <source src="data:video/mp4;base64,${PRODUCT_DEMO_VIDEO}" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div class="video-overlay-badge"><span class="pulse-dot"></span>Watch the mist cue in action</div>
        </div>
        <div class="product-video-copy">
          <p class="eyebrow">See it in action</p>
          <h2>See the physical wake-up cue in 5 seconds.</h2>
          <p>A quick visual preview makes the product instantly understandable on mobile: the bedside alarm, touchscreen-style interface, and mist cue working together.</p>
          <div class="video-proof-points" aria-label="MistWake video highlights">
            <span>Sound + fine mist</span>
            <span>Muted autoplay</span>
            <span>Built for heavy sleepers</span>
          </div>
          <a class="primary-btn reserve-link section-mobile-cta" href="https://buy.stripe.com/aFa7sLcA3aXC3IIfQidIA00" target="_blank" rel="noopener">Reserve for $1</a>
        </div>
      </div>
    `;

    heroSection.insertAdjacentElement("afterend", section);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectDemoSection);
  } else {
    injectDemoSection();
  }
})();
