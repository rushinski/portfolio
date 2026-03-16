"use client";

const W95_FONT = '"MS Sans Serif", Tahoma, Geneva, sans-serif';

const SECTION = { fontSize: 10, fontWeight: 700, background: "#000080", color: "#fff", padding: "2px 8px", marginBottom: 4 };
const PANEL = { background: "#f0f0ea", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", padding: "10px 12px", marginBottom: 12 };

const FAQ = [
  { q: "How do I open an app?", a: "Tap any icon on the home screen to open it as a full-screen overlay." },
  { q: "How do I close an app?", a: 'Swipe up on the grip bar at the bottom of the screen, or tap the "Home" soft-key button in the bottom navigation.' },
  { q: "How do I rearrange icons?", a: "Long-press any icon for about half a second to enter shake mode. Drag icons to reorder them. Tap anywhere outside an icon to exit." },
  { q: "How do I delete an icon?", a: "Enter shake mode (long-press), then tap the Win95-style ✕ badge that appears on each icon." },
  { q: "What does the bottom navigation do?", a: 'The "Home" button returns you to the home screen. The center D-pad button is a shortcut back to the home screen from anywhere.' },
  { q: "Is this the full portfolio?", a: "Yes! Every app on the home screen contains real portfolio content — projects, skills, experience, and more." },
  { q: "Can I view the desktop version?", a: "The full Win95 desktop OS is available when you visit on a device wider than 768px (tablet or desktop)." },
  { q: "Who built this?", a: "Jacob Rushinski — Backend / Full-Stack Developer. Check the About or Contact apps for more." },
];

export default function HelpMobile() {
  return (
    <div style={{ padding: "12px 14px", background: "#f4f4f0", minHeight: "100%", fontFamily: W95_FONT }}>

      <div style={SECTION}>About JacobOS Mobile</div>
      <div style={PANEL}>
        <div style={{ fontSize: 11, color: "#333", lineHeight: 1.7 }}>
          JacobOS is an interactive portfolio presented as a retro Windows 95–style operating system. The mobile version adapts the desktop OS into a touchscreen-friendly phone layout.
        </div>
      </div>

      <div style={SECTION}>Navigation</div>
      <div style={PANEL}>
        {[
          ["Home Screen", "Grid of app icons. Tap an icon to launch that app."],
          ["Bottom Nav Bar", "Contains Home and Back soft-key buttons. The center button also returns to the home screen."],
          ["Closing Apps", "Swipe up on the grip bar at the bottom, or tap the Home button."],
          ["Shake Mode", "Long-press any icon to rearrange or delete apps from the home screen."],
        ].map(([title, desc]) => (
          <div key={title} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid #d4d0c8" }}>
            <div style={{ fontWeight: 700, fontSize: 11, color: "#000080" }}>{title}</div>
            <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{desc}</div>
          </div>
        ))}
      </div>

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
