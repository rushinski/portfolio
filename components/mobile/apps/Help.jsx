"use client";

const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';

const SECTION = { fontSize: 10, fontWeight: 700, background: "#000080", color: "#fff", padding: "2px 8px", marginBottom: 4 };
const PANEL = { background: "#f0f0ea", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", padding: "10px 12px", marginBottom: 12 };

const FAQ = [
  { q: "How do I open an app?", a: "Tap any icon on the home screen to open it as a full-panel overlay." },
  { q: "How do I close an app?", a: "Tap the [✕] button in the top-right of the app's title bar, or swipe down on the panel." },
  { q: "How do I see a context menu?", a: "Press and hold any icon for about half a second. A Win95-style right-click menu will appear." },
  { q: "What does the context menu do?", a: '"Open" launches the app. "Info" shows a short description. "Cancel" dismisses the menu.' },
  { q: "How do I go back to the home screen?", a: 'Tap the "Home" button in the bottom navigation bar, or close the current app.' },
  { q: "Is this the full portfolio?", a: "Yes! Every app on the home screen contains real portfolio content — projects, skills, experience, and more." },
  { q: "Can I view the desktop version?", a: "The full Win95 desktop OS is available when you visit on a device wider than 768px." },
  { q: "Who built this?", a: "Jacob Rushinski — Backend / Full-Stack Developer. Check the About or Contact apps for more." },
];

export default function HelpMobile() {
  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>

      {/* About section */}
      <div style={SECTION}>About JacobOS Mobile</div>
      <div style={PANEL}>
        <div style={{ fontSize: 11, color: "#333", lineHeight: 1.7 }}>
          JacobOS is an interactive portfolio presented as a retro Windows 95–style operating system. The mobile version adapts the desktop OS into a touchscreen-friendly Springboard layout.
        </div>
      </div>

      {/* Navigation guide */}
      <div style={SECTION}>Navigation</div>
      <div style={PANEL}>
        {[
          ["Home Screen", "Grid of app icons. Scroll down to see all apps."],
          ["Status Bar", "Top bar — shows signal, carrier label, battery, and live time."],
          ["Bottom Nav", "Home button returns to the home screen. Shows the currently open app."],
          ["App Panel", "Slides up from the bottom. Has a Win95-style title bar with a close button."],
        ].map(([title, desc]) => (
          <div key={title} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid #d4d0c8" }}>
            <div style={{ fontWeight: 700, fontSize: 11, color: "#000080" }}>{title}</div>
            <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={SECTION}>FAQ</div>
      <div style={PANEL}>
        {FAQ.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #d4d0c8" }}>
            <div style={{ fontWeight: 700, fontSize: 11, color: "#000080", marginBottom: 3 }}>Q: {q}</div>
            <div style={{ fontSize: 11, color: "#444", lineHeight: 1.6 }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
