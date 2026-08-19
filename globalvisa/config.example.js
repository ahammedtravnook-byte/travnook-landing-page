/* ──────────────────────────────────────────────────────────────────────
   Travnook — Global Visa landing page
   TEMPLATE. Copy this file to config.js and fill in the real value.
   config.js is git-ignored so the webhook never lands in the repo.

   TN_CFG.o = base64 of the Bitrix REST inbound webhook base URL,
              including the trailing slash. For example:
              btoa('https://crm.example.com/rest/1234/abcdefg/')

   NOTE: anything in this file is still visible to visitors in the
   browser. Only a server-side proxy truly hides the webhook.
   ────────────────────────────────────────────────────────────────────── */
window.TN_CFG = {
  o: 'PUT_BASE64_WEBHOOK_HERE'
};
