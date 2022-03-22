import Script from 'next/script';
import React from 'react';

export const GTAG_ID = 'G-92GW2B57SC';

interface GTagEventProps {
  action: Gtag.EventNames | string;
  category: string;
  label: string;
  value: number;
}

const gtag = {
  pageview: (url: string) => {
    window.gtag('config', GTAG_ID, {
      page_path: url,
    });
  },
  // https://developers.google.com/analytics/devguides/collection/gtagjs/events
  event: ({ action, category, label, value }: GTagEventProps) => {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  },
};

export default gtag;

// https://nextjs.org/docs/messages/next-script-for-ga
export function GTagScript() {
  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GTAG_ID}');
        `}
      </Script>
      {/* Global site tag (gtag.js) - Google Analytics */}
    </>
  );
}
