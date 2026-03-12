"use client";

export default function LocationApp() {
  const now = new Date();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";
  const dateText = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const timeText = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, height: "100%" }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>Jacobs Time</div>
      <div style={{ fontSize: 12, color: "#555" }}>Current system date and time.</div>
      <div style={{ border: "2px inset #c0c0c0", background: "#f6f8ff", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 12, color: "#333" }}><strong>Date:</strong> {dateText}</div>
        <div style={{ fontSize: 12, color: "#333" }}><strong>Time:</strong> {timeText}</div>
        <div style={{ fontSize: 12, color: "#333" }}><strong>Timezone:</strong> {timezone}</div>
      </div>
    </div>
  );
}
