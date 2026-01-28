import Script from "next/script";

export default function ThemeInit() {
  const script = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    if (theme === 'light') document.documentElement.classList.remove('dark');
  } catch (e) {}
})();`;

  return <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: script }} />;
}
