"use client";

import { useState } from "react";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) {
    return (
      <main className="prototype-shell">
        <iframe
          src="./ewey-reference.html?v=thousands-copy"
          title="EWEy interactive prototype"
          allow="fullscreen"
        />
      </main>
    );
  }

  return (
    <main className="gate">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (password.toLowerCase() === "angel") {
            setUnlocked(true);
            setError(false);
          } else {
            setError(true);
            setPassword("");
          }
        }}
      >
        <div className="logo">EWE<span>y</span></div>
        <p className="eyebrow">Private preview</p>
        <h1>Step inside.</h1>
        <p className="sub">Enter the password to experience EWEy.</p>
        <div className="gate-row">
          <input
            autoFocus
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
              setError(false);
            }}
            aria-invalid={error}
          />
          <button>Enter →</button>
        </div>
        {error && <p className="error" role="alert">Try that password again.</p>}
      </form>
    </main>
  );
}
