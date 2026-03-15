"use client";

// Image-based app icon — drop PNG files in /public/icons/{id}.png
const imgIcon = (id) => (
  <img
    src={`/icons/${id}.png`}
    width="32"
    height="32"
    alt=""
    style={{ display: "block" }}
  />
);

export const Icons = {
  computer: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Monitor body */}
      <rect x="2" y="4" width="20" height="15" fill="#c0c0c0" />
      <rect x="2" y="4" width="20" height="1" fill="#ffffff" />
      <rect x="2" y="4" width="1" height="15" fill="#ffffff" />
      <rect x="21" y="4" width="1" height="15" fill="#808080" />
      <rect x="2" y="18" width="20" height="1" fill="#808080" />
      {/* Screen */}
      <rect x="4" y="6" width="16" height="11" fill="#000080" />
      <rect x="4" y="6" width="16" height="1" fill="#0000c0" />
      <rect x="5" y="9" width="12" height="1" fill="#6699ff" />
      <rect x="5" y="11" width="10" height="1" fill="#6699ff" />
      <rect x="5" y="13" width="8" height="1" fill="#6699ff" />
      {/* Neck */}
      <rect x="10" y="19" width="4" height="2" fill="#a0a0a0" />
      <rect x="10" y="19" width="1" height="2" fill="#c0c0c0" />
      {/* Base */}
      <rect x="7" y="21" width="10" height="2" fill="#c0c0c0" />
      <rect x="7" y="21" width="10" height="1" fill="#ffffff" />
      <rect x="7" y="22" width="1" height="1" fill="#ffffff" />
      <rect x="16" y="22" width="1" height="1" fill="#808080" />
      <rect x="7" y="23" width="10" height="1" fill="#808080" />
      {/* Tower */}
      <rect x="23" y="6" width="8" height="18" fill="#c0c0c0" />
      <rect x="23" y="6" width="8" height="1" fill="#ffffff" />
      <rect x="23" y="6" width="1" height="18" fill="#ffffff" />
      <rect x="30" y="6" width="1" height="18" fill="#808080" />
      <rect x="23" y="23" width="8" height="1" fill="#808080" />
      {/* Drive bays */}
      <rect x="24" y="8" width="6" height="3" fill="#a8a8a8" />
      <rect x="24" y="8" width="6" height="1" fill="#808080" />
      <rect x="25" y="12" width="4" height="2" fill="#808080" />
      <rect x="26" y="13" width="2" height="1" fill="#404040" />
      {/* Power LED */}
      <rect x="25" y="20" width="1" height="1" fill="#00cc00" />
      <rect x="27" y="20" width="1" height="1" fill="#ffcc00" />
    </svg>
  ),
  folder: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Tab */}
      <rect x="2" y="9" width="9" height="3" fill="#c8a000" />
      <rect x="2" y="9" width="9" height="1" fill="#ffd84a" />
      <rect x="2" y="9" width="1" height="3" fill="#ffd84a" />
      <rect x="10" y="9" width="1" height="3" fill="#806000" />
      {/* Body */}
      <rect x="2" y="12" width="28" height="16" fill="#c8a000" />
      <rect x="2" y="12" width="28" height="1" fill="#ffd84a" />
      <rect x="2" y="12" width="1" height="16" fill="#ffd84a" />
      <rect x="29" y="12" width="1" height="16" fill="#806000" />
      <rect x="2" y="27" width="28" height="1" fill="#806000" />
      {/* Inner highlight */}
      <rect x="4" y="14" width="24" height="11" fill="#ffd84a" />
      <rect x="4" y="14" width="1" height="11" fill="#fff2a8" />
      <rect x="4" y="14" width="24" height="1" fill="#fff2a8" />
      {/* Shadow on content */}
      <rect x="5" y="20" width="22" height="5" fill="#f0c400" />
    </svg>
  ),
  fileExplorer: imgIcon("fileExplorer"),
  file: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Page body */}
      <rect x="6" y="2" width="14" height="28" fill="#ffffff" />
      <rect x="6" y="2" width="1" height="21" fill="#ffffff" />
      <rect x="6" y="2" width="10" height="1" fill="#404040" />
      <rect x="6" y="2" width="1" height="28" fill="#404040" />
      <rect x="6" y="29" width="20" height="1" fill="#404040" />
      <rect x="25" y="9" width="1" height="20" fill="#404040" />
      <rect x="16" y="8" width="10" height="1" fill="#404040" />
      {/* Dog-ear fold */}
      <rect x="16" y="2" width="9" height="7" fill="#d4d0c8" />
      <rect x="16" y="2" width="1" height="7" fill="#808080" />
      <rect x="17" y="3" width="4" height="1" fill="#a0a0a0" />
      <rect x="18" y="4" width="3" height="1" fill="#a0a0a0" />
      <rect x="19" y="5" width="2" height="1" fill="#a0a0a0" />
      <rect x="20" y="6" width="1" height="1" fill="#a0a0a0" />
      {/* Text lines */}
      <rect x="9" y="12" width="10" height="1" fill="#000080" />
      <rect x="9" y="15" width="13" height="1" fill="#808080" />
      <rect x="9" y="17" width="11" height="1" fill="#808080" />
      <rect x="9" y="19" width="12" height="1" fill="#808080" />
      <rect x="9" y="21" width="9" height="1" fill="#808080" />
      <rect x="9" y="24" width="13" height="1" fill="#808080" />
    </svg>
  ),
  drive: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Floppy body */}
      <rect x="4" y="3" width="24" height="26" fill="#1a1a8c" />
      <rect x="4" y="3" width="24" height="1" fill="#4040b0" />
      <rect x="4" y="3" width="1" height="26" fill="#4040b0" />
      <rect x="27" y="3" width="1" height="26" fill="#000040" />
      <rect x="4" y="28" width="24" height="1" fill="#000040" />
      {/* Label area */}
      <rect x="6" y="5" width="17" height="10" fill="#d8d8e8" />
      <rect x="6" y="5" width="17" height="1" fill="#ffffff" />
      <rect x="6" y="5" width="1" height="10" fill="#ffffff" />
      <rect x="22" y="5" width="1" height="10" fill="#a0a0b0" />
      <rect x="6" y="14" width="17" height="1" fill="#a0a0b0" />
      {/* Label lines */}
      <rect x="8" y="7" width="12" height="1" fill="#000080" />
      <rect x="8" y="9" width="10" height="1" fill="#808080" />
      <rect x="8" y="11" width="11" height="1" fill="#808080" />
      {/* Write protect notch */}
      <rect x="24" y="4" width="3" height="4" fill="#4040a0" />
      <rect x="25" y="5" width="1" height="2" fill="#000020" />
      {/* Metal shutter */}
      <rect x="6" y="18" width="20" height="9" fill="#808080" />
      <rect x="6" y="18" width="20" height="1" fill="#a0a0a0" />
      <rect x="6" y="18" width="1" height="9" fill="#a0a0a0" />
      <rect x="25" y="18" width="1" height="9" fill="#606060" />
      <rect x="6" y="26" width="20" height="1" fill="#606060" />
      {/* Shutter slot */}
      <rect x="10" y="20" width="12" height="5" fill="#606060" />
      <rect x="10" y="20" width="12" height="1" fill="#404040" />
      <rect x="10" y="20" width="1" height="5" fill="#404040" />
    </svg>
  ),
  terminal: imgIcon("terminal"),
  trash: imgIcon("trash"),
  contact: imgIcon("contact"),
  github: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Monitor */}
      <rect x="2" y="4" width="24" height="18" fill="#c0c0c0" />
      <rect x="2" y="4" width="24" height="1" fill="#ffffff" />
      <rect x="2" y="4" width="1" height="18" fill="#ffffff" />
      <rect x="25" y="4" width="1" height="18" fill="#808080" />
      <rect x="2" y="21" width="24" height="1" fill="#808080" />
      {/* Title bar */}
      <rect x="3" y="5" width="22" height="5" fill="#000080" />
      {/* Close button */}
      <rect x="22" y="6" width="3" height="3" fill="#c0c0c0" />
      <rect x="22" y="6" width="3" height="1" fill="#ffffff" />
      <rect x="22" y="6" width="1" height="3" fill="#ffffff" />
      <rect x="24" y="6" width="1" height="3" fill="#808080" />
      <rect x="22" y="8" width="3" height="1" fill="#808080" />
      {/* Code area */}
      <rect x="4" y="11" width="20" height="9" fill="#1e1e1e" />
      {/* < bracket */}
      <rect x="6" y="13" width="2" height="1" fill="#569cd6" />
      <rect x="5" y="14" width="1" height="1" fill="#569cd6" />
      <rect x="6" y="15" width="2" height="1" fill="#569cd6" />
      {/* / */}
      <rect x="9" y="13" width="1" height="3" fill="#c0c0c0" />
      {/* > bracket */}
      <rect x="11" y="13" width="2" height="1" fill="#569cd6" />
      <rect x="13" y="14" width="1" height="1" fill="#569cd6" />
      <rect x="11" y="15" width="2" height="1" fill="#569cd6" />
      {/* Second code line */}
      <rect x="6" y="17" width="14" height="1" fill="#4ec94c" />
      {/* Stand */}
      <rect x="11" y="22" width="4" height="2" fill="#a0a0a0" />
      <rect x="8" y="24" width="10" height="2" fill="#c0c0c0" />
      <rect x="8" y="24" width="10" height="1" fill="#ffffff" />
      {/* Octocat badge */}
      <rect x="27" y="6" width="4" height="4" fill="#1a1a1a" />
      <rect x="28" y="6" width="2" height="1" fill="#333333" />
      <rect x="27" y="8" width="1" height="1" fill="#ffffff" />
      <rect x="29" y="8" width="1" height="1" fill="#ffffff" />
      <rect x="27" y="10" width="4" height="4" fill="#1a1a1a" />
      <rect x="26" y="11" width="1" height="2" fill="#1a1a1a" />
      <rect x="31" y="11" width="1" height="2" fill="#1a1a1a" />
    </svg>
  ),
  skills: imgIcon("skills"),
  experience: imgIcon("experience"),
  about: imgIcon("about"),
  projects: imgIcon("projects"),
  videos: imgIcon("videos"),
  welcome: imgIcon("welcome"),
  settings: imgIcon("settings"),
  resume: imgIcon("resume"),
  location: imgIcon("location"),
  calculator: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Body */}
      <rect x="4" y="2" width="24" height="28" fill="#c0c0c0" />
      <rect x="4" y="2" width="24" height="1" fill="#ffffff" />
      <rect x="4" y="2" width="1" height="28" fill="#ffffff" />
      <rect x="27" y="2" width="1" height="28" fill="#808080" />
      <rect x="4" y="29" width="24" height="1" fill="#808080" />
      {/* Display */}
      <rect x="6" y="4" width="20" height="7" fill="#6aaa80" />
      <rect x="6" y="4" width="20" height="1" fill="#808080" />
      <rect x="6" y="4" width="1" height="7" fill="#808080" />
      <rect x="25" y="4" width="1" height="7" fill="#4a8a60" />
      <rect x="6" y="10" width="20" height="1" fill="#4a8a60" />
      {/* Display number */}
      <rect x="18" y="6" width="6" height="3" fill="#5a9a70" />
      <rect x="19" y="6" width="4" height="1" fill="#78ba90" />
      {/* Row 1 buttons */}
      <rect x="6" y="13" width="4" height="3" fill="#b8b8b4" />
      <rect x="6" y="13" width="4" height="1" fill="#d0d0cc" />
      <rect x="6" y="13" width="1" height="3" fill="#d0d0cc" />
      <rect x="9" y="13" width="1" height="3" fill="#808080" />
      <rect x="6" y="15" width="4" height="1" fill="#808080" />
      <rect x="11" y="13" width="4" height="3" fill="#b8b8b4" />
      <rect x="11" y="13" width="4" height="1" fill="#d0d0cc" />
      <rect x="11" y="13" width="1" height="3" fill="#d0d0cc" />
      <rect x="14" y="13" width="1" height="3" fill="#808080" />
      <rect x="11" y="15" width="4" height="1" fill="#808080" />
      <rect x="16" y="13" width="4" height="3" fill="#b8b8b4" />
      <rect x="16" y="13" width="4" height="1" fill="#d0d0cc" />
      <rect x="16" y="13" width="1" height="3" fill="#d0d0cc" />
      <rect x="19" y="13" width="1" height="3" fill="#808080" />
      <rect x="16" y="15" width="4" height="1" fill="#808080" />
      <rect x="21" y="13" width="5" height="3" fill="#c07878" />
      <rect x="21" y="13" width="5" height="1" fill="#e09898" />
      <rect x="21" y="13" width="1" height="3" fill="#e09898" />
      <rect x="25" y="13" width="1" height="3" fill="#905858" />
      <rect x="21" y="15" width="5" height="1" fill="#905858" />
      {/* Row 2 buttons */}
      <rect x="6" y="17" width="4" height="3" fill="#b8b8b4" />
      <rect x="6" y="17" width="4" height="1" fill="#d0d0cc" />
      <rect x="6" y="17" width="1" height="3" fill="#d0d0cc" />
      <rect x="9" y="17" width="1" height="3" fill="#808080" />
      <rect x="6" y="19" width="4" height="1" fill="#808080" />
      <rect x="11" y="17" width="4" height="3" fill="#b8b8b4" />
      <rect x="11" y="17" width="4" height="1" fill="#d0d0cc" />
      <rect x="11" y="17" width="1" height="3" fill="#d0d0cc" />
      <rect x="14" y="17" width="1" height="3" fill="#808080" />
      <rect x="11" y="19" width="4" height="1" fill="#808080" />
      <rect x="16" y="17" width="4" height="3" fill="#b8b8b4" />
      <rect x="16" y="17" width="4" height="1" fill="#d0d0cc" />
      <rect x="16" y="17" width="1" height="3" fill="#d0d0cc" />
      <rect x="19" y="17" width="1" height="3" fill="#808080" />
      <rect x="16" y="19" width="4" height="1" fill="#808080" />
      <rect x="21" y="17" width="5" height="3" fill="#7878c0" />
      <rect x="21" y="17" width="5" height="1" fill="#9898e0" />
      <rect x="21" y="17" width="1" height="3" fill="#9898e0" />
      <rect x="25" y="17" width="1" height="3" fill="#5858a0" />
      <rect x="21" y="19" width="5" height="1" fill="#5858a0" />
      {/* Row 3 buttons */}
      <rect x="6" y="21" width="4" height="3" fill="#b8b8b4" />
      <rect x="6" y="21" width="4" height="1" fill="#d0d0cc" />
      <rect x="6" y="21" width="1" height="3" fill="#d0d0cc" />
      <rect x="9" y="21" width="1" height="3" fill="#808080" />
      <rect x="6" y="23" width="4" height="1" fill="#808080" />
      <rect x="11" y="21" width="4" height="3" fill="#b8b8b4" />
      <rect x="11" y="21" width="4" height="1" fill="#d0d0cc" />
      <rect x="11" y="21" width="1" height="3" fill="#d0d0cc" />
      <rect x="14" y="21" width="1" height="3" fill="#808080" />
      <rect x="11" y="23" width="4" height="1" fill="#808080" />
      <rect x="16" y="21" width="4" height="3" fill="#b8b8b4" />
      <rect x="16" y="21" width="4" height="1" fill="#d0d0cc" />
      <rect x="16" y="21" width="1" height="3" fill="#d0d0cc" />
      <rect x="19" y="21" width="1" height="3" fill="#808080" />
      <rect x="16" y="23" width="4" height="1" fill="#808080" />
      <rect x="21" y="21" width="5" height="3" fill="#7878c0" />
      <rect x="21" y="21" width="5" height="1" fill="#9898e0" />
      <rect x="21" y="21" width="1" height="3" fill="#9898e0" />
      <rect x="25" y="21" width="1" height="3" fill="#5858a0" />
      <rect x="21" y="23" width="5" height="1" fill="#5858a0" />
      {/* Row 4 buttons */}
      <rect x="6" y="25" width="4" height="3" fill="#b8b8b4" />
      <rect x="6" y="25" width="4" height="1" fill="#d0d0cc" />
      <rect x="6" y="25" width="1" height="3" fill="#d0d0cc" />
      <rect x="9" y="25" width="1" height="3" fill="#808080" />
      <rect x="6" y="27" width="4" height="1" fill="#808080" />
      <rect x="11" y="25" width="4" height="3" fill="#b8b8b4" />
      <rect x="11" y="25" width="4" height="1" fill="#d0d0cc" />
      <rect x="11" y="25" width="1" height="3" fill="#d0d0cc" />
      <rect x="14" y="25" width="1" height="3" fill="#808080" />
      <rect x="11" y="27" width="4" height="1" fill="#808080" />
      <rect x="16" y="25" width="4" height="3" fill="#7878c0" />
      <rect x="16" y="25" width="4" height="1" fill="#9898e0" />
      <rect x="16" y="25" width="1" height="3" fill="#9898e0" />
      <rect x="19" y="25" width="1" height="3" fill="#5858a0" />
      <rect x="16" y="27" width="4" height="1" fill="#5858a0" />
      <rect x="21" y="25" width="5" height="3" fill="#7878c0" />
      <rect x="21" y="25" width="5" height="1" fill="#9898e0" />
      <rect x="21" y="25" width="1" height="3" fill="#9898e0" />
      <rect x="25" y="25" width="1" height="3" fill="#5858a0" />
      <rect x="21" y="27" width="5" height="1" fill="#5858a0" />
    </svg>
  ),
  minesweeper: imgIcon("minesweeper"),
  help: imgIcon("help"),
};
