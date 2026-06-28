# VIP counter automation

The landing page now polls the VIP counter every 15 seconds and animates upward when the count changes.

Default source:

```txt
assets/vip-reservations.json
```

Current shape:

```json
{"reserved":23,"total":200}
```

## What must update this file

The website is static, so the browser cannot safely write to `assets/vip-reservations.json` after a Gumroad sale. Do not expose a GitHub token in front-end JavaScript.

Use one of these server-side options:

1. Gumroad sale webhook → n8n/Zapier/Make → GitHub Contents API update of `assets/vip-reservations.json`.
2. Gumroad sale webhook → server/database counter endpoint → set `window.MISTWAKE_VIP_COUNTER_URL` or `data-counter-url` on `#vip-progress`.

## Recommended n8n flow

1. Trigger: Gumroad sale webhook for the MistWake VIP product.
2. Filter: product/permalink must match the MistWake VIP product and sale must not be refunded or test-only.
3. GitHub GET: read `assets/vip-reservations.json` from `mohamad-x/mistwake-landing` on `main`.
4. Code node: parse JSON and increment `reserved` by 1, capped at `total`.
5. GitHub PUT: write the updated JSON back with the current file SHA.
6. Optional: wait 5 seconds and GET the live file to confirm the count changed.

## Front-end behavior

`script.js` calls `fetchVipCounter()` on page load and every 15 seconds. If the source changes from `23` to `24`, the label animates to `24 of 200 VIP spots reserved` without a page refresh.

For a separate live endpoint, add one of these:

```html
<script>window.MISTWAKE_VIP_COUNTER_URL='https://your-endpoint.example/vip-counter';</script>
```

or:

```html
<div class="vip-progress" id="vip-progress" data-counter-url="https://your-endpoint.example/vip-counter">
```

The endpoint can return any of these shapes:

```json
{"reserved":24,"total":200}
```

```json
{"count":24,"capacity":200}
```

```json
{"vip_reserved":24,"vip_total":200}
```
