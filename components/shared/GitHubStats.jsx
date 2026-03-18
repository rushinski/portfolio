"use client";

// Shared GitHub stats constants and components used by both desktop and mobile About apps.

import { TOP_SKILLS } from "@/components/shared/data";
import { SKILL_ICON_FILES } from "@/components/shared/skillIcon";

export const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
  Java: "#b07219",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  "Node.js": "#68a063",
};

export { TOP_SKILLS };

export const TOP_SKILL_ICONS = Object.fromEntries(
  TOP_SKILLS.map((name) => [name, `/skills/${SKILL_ICON_FILES[name]}`]).filter(([, src]) => src !== "/skills/undefined"),
);

export function DonutChart({ langs, size = 80 }) {
  if (!langs?.length) return null;
  const total = langs.reduce((sum, l) => sum + l.count, 0);
  if (!total) return null;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;
  const ir = r * 0.52;
  let angle = -Math.PI / 2;
  const fmt = (v) => v.toFixed(2);

  const paths = langs.map((l) => {
    const sweep = Math.min((l.count / total) * 2 * Math.PI, 2 * Math.PI * 0.9999);
    const s = angle;
    const e = angle + sweep;
    angle += (l.count / total) * 2 * Math.PI;
    const large = sweep > Math.PI ? 1 : 0;
    return {
      d: `M ${fmt(cx + r * Math.cos(s))} ${fmt(cy + r * Math.sin(s))} A ${r} ${r} 0 ${large} 1 ${fmt(cx + r * Math.cos(e))} ${fmt(cy + r * Math.sin(e))} L ${fmt(cx + ir * Math.cos(e))} ${fmt(cy + ir * Math.sin(e))} A ${ir} ${ir} 0 ${large} 0 ${fmt(cx + ir * Math.cos(s))} ${fmt(cy + ir * Math.sin(s))} Z`,
      color: LANG_COLORS[l.lang] || "#999",
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", flexShrink: 0 }}>
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.color} stroke="#f0f0ea" strokeWidth={1} />
      ))}
    </svg>
  );
}
