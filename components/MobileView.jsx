"use client";

const LINKS = [
  { label: "GitHub", href: "https://github.com/jacobrushinski", emoji: "💻" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jacobrushinski", emoji: "🔗" },
  { label: "Contact", href: "mailto:jacob.rushinski@gmail.com", emoji: "✉️" },
];

const SKILLS = ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "Supabase", "Docker", "AWS"];

const BTN_STYLE = {
  display: "block",
  width: "100%",
  padding: "10px 16px",
  marginBottom: 8,
  background: "#c0c0c0",
  border: "none",
  borderTop: "2px solid #ffffff",
  borderLeft: "2px solid #ffffff",
  borderRight: "2px solid #404040",
  borderBottom: "2px solid #404040",
  fontFamily: "'Courier New', monospace",
  fontSize: 14,
  fontWeight: 700,
  color: "#000080",
  textAlign: "left",
  textDecoration: "none",
  cursor: "pointer",
  boxSizing: "border-box",
};

const PANEL_STYLE = {
  background: "#c0c0c0",
  borderTop: "2px solid #ffffff",
  borderLeft: "2px solid #ffffff",
  borderRight: "2px solid #404040",
  borderBottom: "2px solid #404040",
  padding: "10px 14px",
  marginBottom: 12,
};

const SECTION_HEADER = {
  fontFamily: "'Courier New', monospace",
  fontSize: 11,
  fontWeight: 700,
  color: "#ffffff",
  background: "#000080",
  padding: "2px 6px",
  marginBottom: 8,
  letterSpacing: 1,
  textTransform: "uppercase",
};

export default function MobileView() {
  return (
    <div style={{
      minHeight: "100dvh",
      background: "#008080",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "20px 16px 40px",
      boxSizing: "border-box",
      fontFamily: "'Courier New', monospace",
    }}>

      {/* Title bar */}
      <div style={{
        width: "100%",
        maxWidth: 460,
        background: "#000080",
        borderTop: "2px solid #ffffff",
        borderLeft: "2px solid #ffffff",
        borderRight: "2px solid #404040",
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 0,
      }}>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ width: 12, height: 12, background: "#c0c0c0", border: "1px solid #808080" }} />
          <div style={{ width: 12, height: 12, background: "#c0c0c0", border: "1px solid #808080" }} />
          <div style={{ width: 12, height: 12, background: "#c0c0c0", border: "1px solid #808080" }} />
        </div>
        <span style={{ color: "#ffffff", fontSize: 12, fontWeight: 700, flex: 1, textAlign: "center" }}>
          Jacob Rushinski — Portfolio
        </span>
      </div>

      {/* Main window */}
      <div style={{
        width: "100%",
        maxWidth: 460,
        background: "#c0c0c0",
        borderLeft: "2px solid #ffffff",
        borderRight: "2px solid #404040",
        borderBottom: "2px solid #404040",
        padding: "16px 14px",
        boxSizing: "border-box",
      }}>

        {/* About section */}
        <div style={PANEL_STYLE}>
          <div style={SECTION_HEADER}>About</div>
          <div style={{ fontSize: 13, color: "#000", lineHeight: 1.6 }}>
            <strong style={{ fontSize: 15, color: "#000080" }}>Jacob Rushinski</strong>
            <br />
            Backend &amp; Full-Stack Developer
          </div>
          <div style={{ fontSize: 11, color: "#333", marginTop: 8, lineHeight: 1.6 }}>
            Building production-grade systems from Lancaster, PA. Student at Thaddeus Stevens College of Technology.
            Currently at Giant Food Stores. Weekends in Philadelphia — planning to move there.
          </div>
        </div>

        {/* Skills */}
        <div style={PANEL_STYLE}>
          <div style={SECTION_HEADER}>Skills</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {SKILLS.map((skill) => (
              <span key={skill} style={{
                background: "#d4d0c8",
                border: "1px solid #808080",
                padding: "2px 8px",
                fontSize: 11,
                fontFamily: "'Courier New', monospace",
                color: "#000080",
                fontWeight: 700,
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={PANEL_STYLE}>
          <div style={SECTION_HEADER}>Links</div>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={BTN_STYLE}
            >
              {link.emoji} {link.label}
            </a>
          ))}
        </div>

        {/* Desktop note */}
        <div style={{
          fontSize: 10,
          color: "#555",
          textAlign: "center",
          fontFamily: "'Courier New', monospace",
          marginTop: 4,
        }}>
          For the full interactive Win95 experience, visit on desktop.
        </div>

      </div>
    </div>
  );
}
