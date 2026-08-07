"use client";

import { useEffect, useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useJoinModal } from "./JoinModalProvider";
import { MembershipCategory } from "@/lib/types";

const CATEGORY_LABELS: Record<MembershipCategory, string> = {
  "drop-in": "Drop-In",
  monthly: "Monthly",
  "fight-team": "Fight Team",
};

const initialForm = {
  name: "",
  email: "",
  phone: "",
  experience: "",
  message: "",
};

export default function JoinModal() {
  const { isOpen, category, closeModal } = useJoinModal();
  const [selectedCategory, setSelectedCategory] = useState<MembershipCategory>(category);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setSelectedCategory(category);
      setForm(initialForm);
      setStatus("idle");
      setError("");
    }
  }

  // Close on Escape for keyboard users.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeModal]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, category: selectedCategory }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 0.84, 0.44, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto border border-brass/40 bg-canvas-alt p-6 shadow-2xl sm:p-8"
          >
            <button
              onClick={closeModal}
              aria-label="Close dialog"
              className="absolute right-4 top-4 text-lg text-bone-dim transition-colors hover:text-bone"
            >
              ✕
            </button>

            {status === "success" ? (
              <div className="py-6 text-center">
                <p className="font-mono mb-3 text-xs text-brass-bright">Round Sent</p>
                <h3 className="font-display mb-4 text-3xl">You&apos;re on the list.</h3>
                <p className="mb-6 text-bone-dim">
                  Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. Someone from Iron Bell
                  will call or email you to confirm your {CATEGORY_LABELS[selectedCategory]} spot.
                </p>
                <button onClick={closeModal} className="btn-ghost">
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="font-mono mb-2 text-xs text-brass-bright">Round 05 — Join</p>
                <h3 id="join-modal-title" className="font-display mb-6 text-3xl">
                  Book your spot
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(CATEGORY_LABELS) as MembershipCategory[]).map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`font-mono border px-2 py-3 text-[11px] uppercase tracking-wide transition-colors ${
                          selectedCategory === cat
                            ? "border-brass bg-brass/10 text-bone"
                            : "border-hairline text-bone-dim hover:text-bone"
                        }`}
                      >
                        {CATEGORY_LABELS[cat]}
                      </button>
                    ))}
                  </div>

                  <input
                    required
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="input"
                  />

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="input"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="input"
                    />
                  </div>

                  {selectedCategory === "fight-team" && (
                    <textarea
                      placeholder="Prior boxing / amateur experience"
                      rows={2}
                      value={form.experience}
                      onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
                      className="input"
                    />
                  )}

                  <textarea
                    placeholder="Anything else we should know? (optional)"
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="input"
                  />

                  {error && <p className="text-sm text-corner-red">{error}</p>}

                  <button type="submit" disabled={status === "submitting"} className="btn-primary mt-2">
                    {status === "submitting" ? "Sending…" : "Submit"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
