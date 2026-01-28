"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      setStatus("success");
      setMessage(data.message || "Message sent!");
      event.currentTarget.reset();
    } else {
      setStatus("error");
      setMessage(data.message || "Something went wrong.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <header className="mb-8 space-y-2">
        <h1 className="handwritten-title text-3xl">Contact</h1>
        <p className="text-sm text-ink/70">
          Leave a note, a question, or a collaboration idea.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-graphite/30 bg-paper p-6"
        >
          <label className="flex flex-col gap-2 text-sm">
            Name
            <input
              name="name"
              required
              className="focus-ring rounded-md border border-graphite/40 bg-paper px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Email
            <input
              name="email"
              type="email"
              required
              className="focus-ring rounded-md border border-graphite/40 bg-paper px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Message
            <textarea
              name="message"
              rows={5}
              required
              className="focus-ring rounded-md border border-graphite/40 bg-paper px-3 py-2"
            />
          </label>
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send message"}
          </Button>
          {message && (
            <p
              className={`text-sm ${
                status === "error" ? "text-red-600" : "text-ink/70"
              }`}
            >
              {message}
            </p>
          )}
        </form>
        <aside className="space-y-4 rounded-xl border border-graphite/30 bg-paper p-6">
          <h2 className="font-display text-lg">Elsewhere</h2>
          <div className="space-y-2 text-sm">
            <a href="mailto:hello@example.com" className="focus-ring block">
              hello@example.com
            </a>
            <a href="https://github.com" className="focus-ring block">
              GitHub
            </a>
            <a href="https://linkedin.com" className="focus-ring block">
              LinkedIn
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
