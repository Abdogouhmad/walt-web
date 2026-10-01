/**
 * Every user-visible string on the site.
 *
 * Kept out of the components so the page can be translated later by swapping
 * this module for `content/site.<locale>.ts` — the components only ever read
 * from here, never from inline literals. Layout uses logical CSS properties
 * (`ms-*`, `ps-*`, `text-start`) so an RTL locale only needs direction-aware
 * text, not a rewritten grid.
 *
 * Claims rule: nothing here may describe a feature the app does not have. The
 * app is the source of truth — `~/Desktop/walt`, its README, and CHANGELOG.md.
 */

export const site = {
  name: "Walt",
  tagline: "Private expense tracker for Android",
  url: "https://waltapp.vercel.app",
  repository: "https://github.com/Abdogouhmad/walt",
  authorProfile: "https://github.com/Abdogouhmad",
  xProfile: "https://x.com/a3bdor7man",
  email: "gouhmad@hotmail.com",
  license: "MIT",
  copyrightYear: 2026,
} as const;

export const nav = [
  { label: "Features", href: "#features" },
  { label: "What's new", href: "#whats-new" },
  { label: "Themes", href: "#themes" },
  { label: "Privacy", href: "#privacy" },
] as const;

export const hero = {
  badge: "New · Material 3 Expressive",
  headline: ["Your money.", "Your phone.", "Nobody else."],
  subline:
    "Walt is the expense tracker that never leaves your device. Track spending, set budgets and read your month — offline, with no account and nothing to sign in to. Now rebuilt on Material 3 Expressive.",
  primaryCta: "Download the APK",
  secondaryCta: "See what's new",
  trust: ["Open source (MIT)", "No ads", "No account", "Works offline"],
} as const;

export const features = {
  eyebrow: "Features",
  title: "Everything you need. Nothing you don't.",
  lede: "Walt does the small number of things an expense tracker is actually for, and does them on your phone alone.",
  items: [
    {
      icon: "fingerprint",
      title: "Fingerprint or face unlock",
      body: "Turn on the app lock and Walt asks your device for a biometric before it shows a single number. Falls back to your screen lock.",
    },
    {
      icon: "lock",
      title: "100% local & private",
      body: "Everything lives in a database on your phone. No account, no cloud, no sync service, nothing to sign up for.",
    },
    {
      icon: "chart",
      title: "Reports & PDF export",
      body: "Week, month or year. A spending trend, a category breakdown, and a formatted PDF you can share from the phone.",
    },
    {
      icon: "target",
      title: "Budgets with alerts",
      body: "Set a limit per category. Walt notifies you at 80% and again at 100% — once per threshold, per period.",
    },
    {
      icon: "palette",
      title: "9 colour themes + dark & AMOLED",
      body: "Nine built-in palettes, System / Light / Dark, and a pure-black AMOLED mode. Plus any custom colour you like.",
    },
    {
      icon: "wallet",
      title: "Local profile & multi-currency",
      body: "A name, a photo, and the currencies you actually use — all stored on the device, none of it fetched.",
    },
  ],
} as const;

export const whatsNew = {
  eyebrow: "What's new",
  title: "A completely new look. Built on Material 3 Expressive.",
  lede: "Walt 0.7 rebuilt every screen around one design system. Here is what actually changed — no marketing gloss, just the list from the release.",
  /**
   * `id` is the stable handle the layout keys off. It is deliberately not the
   * `icon`: the grid used to look spans up by icon name, and any tile whose icon
   * had no entry silently fell back to one column while still being asked to hold
   * a portrait screenshot.
   *
   * `span` is in sixths of the `lg` grid, and the rows are built to sum to 6.
   */
  tiles: [
    {
      id: "nav",
      icon: "nav",
      span: 3,
      title: "Floating blur navigation",
      body: "The bottom bar detaches from the screen edge into a frosted pill. The selected destination expands into a labelled pill and the whole bar slides out of the way while you scroll.",
      demo: "floating-nav",
    },
    {
      id: "home",
      icon: "home",
      span: 3,
      title: "Expressive home",
      body: "One big balance, income and expense as two tonal pills, and a week recap where the day you tap grows into a tall pill with its own total.",
      capture: "home",
    },
    {
      id: "reports",
      icon: "chart",
      span: 2,
      title: "Reports, reimagined",
      body: "A Week / Month / Year switcher, a bar chart you can tap through, and a category donut with the total in the middle.",
      capture: "reports",
    },
    {
      id: "budgets",
      icon: "target",
      span: 2,
      title: "Smarter budgets",
      body: "Thick rounded progress per category, and local notifications at 80% and at 100% so you find out before you overspend, not after.",
      capture: "budgets",
    },
    {
      id: "themes",
      icon: "palette",
      span: 2,
      title: "Your colours",
      body: "Nine palettes, and Material You is gone — the app now always uses the palette you pick, so it looks the same on every device.",
      capture: "themes",
      href: "#themes",
      cta: "Try them below",
    },
    {
      id: "type",
      icon: "type",
      span: 3,
      title: "Better typography",
      body: "Roboto Flex, bundled with the app instead of downloaded at runtime. Bigger amounts with tabular figures, calmer body text, one consistent spacing rhythm.",
    },
    {
      id: "update",
      icon: "update",
      span: 3,
      title: "Gentle updates",
      body: "No forced updates. Walt quietly checks for a new version and tells you about it; an old build keeps working indefinitely and you decide when to move.",
      note: "An old build keeps working indefinitely and keeps being offered the new one.",
    },
  ],
  changelog: {
    title: "Latest release",
    cta: "Full changelog on GitHub",
  },
} as const;

export const themes = {
  eyebrow: "Themes",
  title: "Make it yours",
  lede: "Nine palettes, generated from a single seed colour each — the same generator Material uses. Pick one and watch the mockup change.",
  paletteLabel: "Colour palette",
  brightnessLabel: "Brightness",
  note: "Your choice is remembered on this device only, in local storage. No cookies, no server.",
} as const;

export const reports = {
  eyebrow: "Reports",
  title: "Visualize. Analyze. Export.",
  lede: "Pick a period, read the trend, then open the category breakdown — or export it as a PDF from the share sheet.",
  cards: [
    { icon: "spark", title: "Advice that stays on the phone", body: "Budget status and spend trends summarised on device. Nothing is sent anywhere to produce them." },
    { icon: "file", title: "Share a PDF", body: "A formatted report, generated on the phone and handed to Android's share sheet." },
  ],
} as const;

export const privacy = {
  eyebrow: "Privacy",
  title: "Privacy isn't a feature. It's the architecture.",
  lede: "There is no server behind Walt. There is no account, no analytics SDK, no ad network, and no crash reporter — so there is nowhere for your spending to go even if someone wanted to send it.",
  columns: [
    {
      icon: "phone",
      title: "Data stays on device",
      body: "Transactions, budgets, categories, your profile and your settings are written to a local database on your phone. Uninstalling Walt deletes them.",
    },
    {
      icon: "user-off",
      title: "No account, no cloud",
      body: "There is no sign-up, no email, no password, no sync. A second phone starts empty, because there is nothing to sync from.",
    },
    {
      icon: "shield",
      title: "No trackers",
      body: "Walt bundles no analytics or advertising SDK. This website sets no cookies, runs no trackers and loads no third-party scripts. Source is MIT-licensed — read it.",
    },
  ],
  collects: {
    title: "What Walt collects: nothing.",
    body: "Not your transactions, not your balance, not your device identifier, not your location, not your contacts. The app makes two network requests, and you can see exactly what each one sends: an update check, and an exchange rate if you convert currency.",
    linkLabel: "Read the privacy policy",
    sourceLabel: "Read the source",
  },
} as const;

export const screenshots = {
  eyebrow: "Screenshots",
  title: "The whole app, in your hand.",
  lede: "Every screen below is a real capture from the current release, unretouched. Scroll sideways — or use the arrow keys once the rail has focus.",
} as const;

export const faq = {
  eyebrow: "FAQ",
  title: "Questions worth asking",
  items: [
    {
      q: "Is it free?",
      a: "Yes. Walt is free and open source under the MIT licence. There are no ads, no in-app purchases and no subscription. The code is on GitHub if you would rather build it yourself.",
    },
    {
      q: "Does it need an internet connection?",
      a: "No. Adding transactions, budgets, reports and exports all work offline. Two things do reach the network, both optional: a quiet check for a newer version, and — only if you convert between currencies — a public exchange rate. Neither carries your financial data, and blocking Walt's network access costs you nothing but the two.",
    },
    {
      q: "Where is my data stored?",
      a: "On your phone, in a local SQLite database with a small key-value store for settings. It is never uploaded. Clearing Walt's storage or uninstalling it removes your data permanently, so export anything you want to keep.",
    },
    {
      q: "Can I export my data?",
      a: "You can export a formatted PDF report for any period through Android's share sheet, which covers your totals, trend and category breakdown. Walt does not include a full cloud backup — the local database is the only copy.",
    },
    {
      q: "Why do I have to install an APK?",
      a: "Because Walt is not listed on the Play Store today, so the releases are published as signed APKs on GitHub. Every release is built and signed in CI, and a SHA-256 checksum is published next to it. Installing means allowing your browser to install apps from that source, which Android asks you to confirm.",
    },
    {
      q: "Do I have to update when a new version comes out?",
      a: "No. Forced updates were removed. Walt checks quietly in the background, shows the release notes, and lets you decide. An old build keeps working indefinitely.",
    },
    {
      q: "Does it support Arabic or right-to-left languages?",
      a: "Not yet — Walt ships in English only. The app is built with direction-aware layout primitives, so translations are a translation job rather than a redesign.",
    },
  ],
} as const;

export const download = {
  eyebrow: "Download",
  title: "Get Walt",
  lede: "One signed APK, published by the app's own release pipeline. Pick the build that matches your device.",
  installTitle: "Installing takes three taps",
  steps: [
    "Download the APK from the button above.",
    "Open it from your downloads — Android asks whether you allow installs from this source.",
    "Allow it, tap Install, done. Walt never asks for anything else up front.",
  ],
  permissionsTitle: "And if it asks for permissions…",
  permissions: [
    "Notifications — only so budget alerts can tell you at 80% and 100%. Asked the first time you create a budget.",
    "Biometrics — only if you turn the app lock on in Settings.",
    "Photos — only if you pick a profile picture.",
    "Install packages — only when you choose to update Walt from inside the app.",
  ],
  playNote: "Not on the Play Store yet. The APK below is signed with a release key and its checksum is published on the release page.",
  unknownDevice: "Not sure which one?",
} as const;

export const footer = {
  blurb: "A privacy-first expense tracker that keeps your money on your phone.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "What's new", href: "#whats-new" },
        { label: "Themes", href: "#themes" },
        { label: "Download", href: "#download" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms of use", href: "/terms" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Code",
      links: [
        { label: "Source on GitHub", href: "https://github.com/Abdogouhmad/walt" },
        { label: "Releases", href: "https://github.com/Abdogouhmad/walt/releases" },
        { label: "Report an issue", href: "https://github.com/Abdogouhmad/walt/issues" },
      ],
    },
  ],
  tagline: "Built with privacy in mind.",
} as const;

export const legal = {
  updated: "1 October 2026",
  privacy: {
    title: "Privacy policy",
    lede: "The short version: Walt does not collect anything, because it has nowhere to send it. This page is the long version, and every claim in it can be checked against the source code.",
  },
  terms: {
    title: "Terms of use",
    lede: "Walt is free software provided as-is. Here is what that means in practice, and what is expected of you.",
  },
  contact: {
    title: "Contact",
    lede: "Bug reports, privacy questions, feature requests — all welcome.",
  },
} as const;
/**
 * Legal clause shapes.
 *
 * Declared rather than inferred: `as const` on the content below would give each
 * clause its own literal type, and the pages would then have to narrow a union
 * to find the optional `list` on the one clause that has one. One shared type
 * makes `clause.list` simply optional.
 */
export type LegalClause = {
  heading: string;
  body: string[];
  list?: string[];
};

export type LegalSection = {
  clauses: LegalClause[];
};

export const privacyPolicy: LegalSection & {
  contact: { heading: string; body: string[] };
} = {
  clauses: [
    {
      heading: "The short version",
      body: [
        "Walt collects nothing. Not your transactions, not your balance, not your categories, not your device identifier, not your location, not your contacts, and no account, because there is no server to hold one.",
        "It does make two outbound requests, both described in full below: a check for a newer release, and — only if you convert between currencies — a public exchange rate. Neither sends your financial data anywhere, and neither is required for the app to work.",
        "This app is open source under the MIT licence. Every claim on this page can be checked by reading the code or by auditing the network traffic with a tool like Charles Proxy or mitmproxy. If you find something that contradicts this page, that is a bug — please report it.",
      ],
    },
    {
      heading: "What is stored, and where",
      body: [
        "Transactions, budgets, categories, currency settings and your optional local profile are written to a SQLite database on your device, with a small key-value store beside it for preferences such as your chosen palette and brightness mode.",
        "That database is the only copy. There is no cloud backup, no sync between devices, and no export-to-cloud feature. Uninstalling Walt, or clearing its storage from Android's settings, deletes your data permanently and irrecoverably.",
      ],
    },
    {
      heading: "The two network requests, in full",
      body: [
        "Walt is offline-first, not offline-only. Two things ever touch the network, and both are listed here rather than buried.",
        "An update check. Shortly after launch, the app fetches a public JSON file from this project's GitHub repository to see whether a newer version exists, and to show you the release notes if so. The request carries no identifier, no transaction data and no personal information, and it fails silently when you are offline.",
        "An exchange rate, only if you convert currency. If you pick a second currency in Settings, Walt asks a public currency-rate API for that pair so it can convert your existing amounts. The request contains the two currency codes and nothing else — no amount, no balance, no transaction. Choosing a single currency never triggers it.",
        "Neither request is required for the app to work. Blocking Walt's network access in Android's settings leaves tracking, budgets, reports and exports fully functional; you simply stop being told about new versions and lose currency conversion.",
      ],
    },
    {
      heading: "Permissions, and why each one is requested",
      body: [
        "Android permissions are declared in the manifest, but Walt asks for them in context — at the moment the feature that needs them is used, not on first launch. None of them is required to install or open the app.",
        "This is the full list, including the two that are declared for the update mechanism rather than for a user-facing feature.",
      ],
      list: [
        "Notifications — used only for budget alerts, so you hear about a category at 80% and again at 100%. Asked the first time you create a budget.",
        "Biometric recognition — used only if you turn on the app lock in Settings, to confirm it is you before a number is shown. If your device has no biometric hardware, Walt falls back to your device screen lock (PIN, pattern or password).",
        "Photos and media — used only if you choose a profile picture. The picture is copied into the app's private storage and never uploaded.",
        "Install packages — used only when you choose to update Walt from inside the app, and only for a signed build whose published checksum has been verified.",
        "Vibration — used for tactile feedback when you interact with the interface. It carries no data.",
        "Boot completed, wake lock and foreground service — declared so budget alerts scheduled for a future time still fire after a restart, including while the app is closed. These keep a scheduled alarm alive; they do not read anything.",
        "Write to storage — declared for Android versions older than 10, so the exported PDF can be handed to the share sheet. On current Android the report is written to the app's own directory instead.",
      ],
    },
    {
      heading: "What this website does",
      body: [
        "This site is a static marketing page. It sets no cookies, runs no analytics, embeds no trackers, loads no third-party scripts, and no fonts or images from a CDN. If you change the colour theme or preview a palette, that choice is written to your browser's local storage and never transmitted.",
        "The site's hosting provider necessarily sees the requests it serves, in the ordinary way any web server does. That is outside our control and is worth knowing when reading any website's privacy policy, including this one.",
      ],
    },
    {
      heading: "Biometric data",
      body: [
        "Walt never receives, stores or transmits biometric data. Biometric matching happens inside Android's own biometric subsystem, and Walt is only told whether the check succeeded or failed. Walt cannot read your fingerprint or face, and cannot ask Android to hand it over.",
      ],
    },
    {
      heading: "Children",
      body: [
        "Walt is a general-audience finance utility. It collects no personal data from anyone, including children, and because it collects nothing there is nothing for a parent to consent to or delete.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "If a future version of Walt ever adds a feature that changes what is stored or transmitted — cloud backup, say, or a sharing service — this policy will be updated before that version is released, and the changelog will say so explicitly. A privacy policy that changes silently is not a policy.",
      ],
    },
  ],
  contact: {
    heading: "Questions, or something that looks wrong",
    body: [
      "Privacy questions, audits, and anything you believe this page gets wrong are welcome. Email is the most reliable way to reach the maintainer; the issue tracker is better for reproducible bugs.",
    ],
  },
};

export const termsOfUse: LegalSection = {
  clauses: [
    {
      heading: "The licence",
      body: [
        "Walt is free software released under the MIT licence. You may use, study, copy, modify, merge, publish, distribute, sublicense and sell copies of it, including for commercial purposes, provided that the copyright notice and the licence text are included. The full licence text is in the repository and in the app's About screen.",
      ],
    },
    {
      heading: "No warranty",
      body: [
        "Walt is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement.",
        "You are responsible for the accuracy of the figures you enter and for any decision you make based on them. Walt does arithmetic; it does not give financial advice. If it is wrong, that is a bug worth reporting — but the liability for what you do with its output is yours.",
      ],
    },
    {
      heading: "Your data, your risk",
      body: [
        "All data is stored locally on your device and is not backed up by Walt. If you lose the device, uninstall the app, or clear its storage, your transactions are gone. Export a PDF of anything you want to keep before you do.",
        "You are responsible for the security of your own device, including its screen lock. Walt's app lock is a convenience layer on top of that, not a replacement for it.",
      ],
    },
    {
      heading: "Installing the APK",
      body: [
        "Walt is distributed as a signed APK rather than through an app store. Every release is built and signed in continuous integration, and a SHA-256 checksum is published alongside the file. Verify the checksum if you want to confirm the file has not been altered in transit.",
        "Installing an APK requires you to allow your browser to install packages from that source. Android asks you to confirm this, and the permission is scoped to that one source. You can revoke it at any time in Android's settings.",
      ],
    },
    {
      heading: "No liability",
      body: [
        "In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.",
      ],
    },
    {
      heading: "Third-party components",
      body: [
        "Walt is built with open-source packages, each under its own licence; those licences are bundled with the source. Google Play services may be present as a transitive dependency of Android libraries, and Google may collect data under Google's own terms if and when you use Google services on the device. Walt itself sends nothing to them.",
      ],
    },
  ],
};

export const contactPage = {
  reasons: [
    {
      heading: "Found a bug?",
      body: "Open an issue on the tracker and include your phone model, your Android version, the Walt version from Settings → About, and the steps that reproduce it. A screen recording is worth a thousand words.",
      action: { label: "Open an issue", href: "https://github.com/Abdogouhmad/walt/issues" },
    },
    {
      heading: "Something in the privacy policy looks wrong?",
      body: "Email the maintainer rather than filing a public issue. If it is a real leak of data, that detail should not be public until it is fixed.",
      action: { label: `Email ${site.email}`, href: `mailto:${site.email}` },
    },
    {
      heading: "Feature request or question?",
      body: "Issues and discussions are both open. Describe the problem you are trying to solve rather than the solution you have in mind — it usually leads somewhere better.",
      action: { label: "Start a discussion", href: "https://github.com/Abdogouhmad/walt/discussions" },
    },
    {
      heading: "Translating Walt",
      body: "Translations are welcome. The app uses direction-aware layout primitives, so most of the work is text; if you hit a screen that does not mirror correctly, that is a real bug and worth an issue.",
      action: { label: "Localization issues", href: "https://github.com/Abdogouhmad/walt/issues" },
    },
  ],
  channels: [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Source & issues", value: "github.com/Abdogouhmad/walt", href: site.repository },
    { label: "X", value: "@a3bdor7man", href: site.xProfile },
  ],
} as const;
