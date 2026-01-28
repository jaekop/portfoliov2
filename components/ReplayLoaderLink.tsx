"use client";

export default function ReplayLoaderLink() {
  return (
    <button
      type="button"
      className="footer-replay focus-ring text-sm"
      onClick={() => {
        localStorage.removeItem("loaderSeen");
        window.location.href = "/";
      }}
    >
      Replay loader
    </button>
  );
}
