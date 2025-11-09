"use client"
import Script from "next/script"

export default function ChatWidget() {
  const crispId = process.env.NEXT_PUBLIC_CRISP_ID
  if (!crispId) return null

  return (
    <Script id="crisp-chat" strategy="afterInteractive">
      {`
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "${crispId}";
        (function(){
          var d = document;
          var s = d.createElement("script");
          s.src = "https://client.crisp.chat/l.js";
          s.async = 1;
          d.getElementsByTagName("head")[0].appendChild(s);
        })();
      `}
    </Script>
  )
}