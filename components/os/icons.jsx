"use client";

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
  terminal: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Window frame */}
      <rect x="2" y="3" width="28" height="26" fill="#c0c0c0" />
      <rect x="2" y="3" width="28" height="1" fill="#ffffff" />
      <rect x="2" y="3" width="1" height="26" fill="#ffffff" />
      <rect x="29" y="3" width="1" height="26" fill="#808080" />
      <rect x="2" y="28" width="28" height="1" fill="#808080" />
      {/* Title bar */}
      <rect x="3" y="4" width="26" height="7" fill="#000080" />
      <rect x="3" y="4" width="26" height="1" fill="#1a1ab0" />
      {/* Close button */}
      <rect x="26" y="5" width="4" height="5" fill="#c0c0c0" />
      <rect x="26" y="5" width="4" height="1" fill="#ffffff" />
      <rect x="26" y="5" width="1" height="5" fill="#ffffff" />
      <rect x="29" y="5" width="1" height="5" fill="#808080" />
      <rect x="26" y="9" width="4" height="1" fill="#808080" />
      <rect x="27" y="7" width="2" height="1" fill="#404040" />
      {/* Terminal screen */}
      <rect x="3" y="12" width="26" height="15" fill="#000000" />
      {/* Prompt */}
      <rect x="5" y="14" width="2" height="1" fill="#c0c0c0" />
      <rect x="8" y="14" width="6" height="1" fill="#00cc00" />
      {/* Text line 2 */}
      <rect x="5" y="16" width="8" height="1" fill="#00cc00" />
      <rect x="14" y="16" width="5" height="1" fill="#c0c0c0" />
      {/* Text line 3 */}
      <rect x="5" y="18" width="10" height="1" fill="#c0c0c0" />
      {/* Cursor */}
      <rect x="5" y="20" width="2" height="5" fill="#c0c0c0" />
    </svg>
  ),
  trashEmpty: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Handle */}
      <rect x="13" y="4" width="6" height="3" fill="#c0c0c0" />
      <rect x="13" y="4" width="6" height="1" fill="#ffffff" />
      <rect x="13" y="4" width="1" height="3" fill="#ffffff" />
      <rect x="18" y="4" width="1" height="3" fill="#808080" />
      <rect x="13" y="6" width="6" height="1" fill="#808080" />
      {/* Lid */}
      <rect x="7" y="7" width="18" height="3" fill="#c0c0c0" />
      <rect x="7" y="7" width="18" height="1" fill="#ffffff" />
      <rect x="7" y="7" width="1" height="3" fill="#ffffff" />
      <rect x="24" y="7" width="1" height="3" fill="#808080" />
      <rect x="7" y="9" width="18" height="1" fill="#808080" />
      {/* Can body */}
      <rect x="8" y="10" width="16" height="17" fill="#d4d0c8" />
      <rect x="8" y="10" width="1" height="17" fill="#ffffff" />
      <rect x="23" y="10" width="1" height="17" fill="#808080" />
      <rect x="8" y="26" width="16" height="1" fill="#808080" />
      {/* Ribs */}
      <rect x="11" y="12" width="1" height="13" fill="#a8a8a8" />
      <rect x="14" y="12" width="1" height="13" fill="#a8a8a8" />
      <rect x="17" y="12" width="1" height="13" fill="#a8a8a8" />
      <rect x="20" y="12" width="1" height="13" fill="#a8a8a8" />
      {/* Base */}
      <rect x="9" y="27" width="14" height="2" fill="#c0c0c0" />
      <rect x="9" y="27" width="14" height="1" fill="#a0a0a0" />
      <rect x="9" y="28" width="1" height="1" fill="#a0a0a0" />
      <rect x="22" y="28" width="1" height="1" fill="#808080" />
    </svg>
  ),
  trashFull: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Paper sticking out */}
      <rect x="10" y="3" width="5" height="8" fill="#ffffff" />
      <rect x="10" y="3" width="5" height="1" fill="#c0c0c0" />
      <rect x="10" y="3" width="1" height="8" fill="#c0c0c0" />
      <rect x="14" y="3" width="1" height="8" fill="#808080" />
      <rect x="11" y="5" width="3" height="1" fill="#808080" />
      <rect x="11" y="7" width="3" height="1" fill="#808080" />
      {/* Another paper */}
      <rect x="17" y="4" width="4" height="7" fill="#ffffff" />
      <rect x="17" y="4" width="4" height="1" fill="#c0c0c0" />
      <rect x="17" y="4" width="1" height="7" fill="#c0c0c0" />
      <rect x="20" y="4" width="1" height="7" fill="#808080" />
      {/* Lid (pushed up) */}
      <rect x="6" y="10" width="20" height="3" fill="#c0c0c0" />
      <rect x="6" y="10" width="20" height="1" fill="#ffffff" />
      <rect x="6" y="10" width="1" height="3" fill="#ffffff" />
      <rect x="25" y="10" width="1" height="3" fill="#808080" />
      <rect x="6" y="12" width="20" height="1" fill="#808080" />
      {/* Can body */}
      <rect x="8" y="13" width="16" height="14" fill="#d4d0c8" />
      <rect x="8" y="13" width="1" height="14" fill="#ffffff" />
      <rect x="23" y="13" width="1" height="14" fill="#808080" />
      <rect x="8" y="26" width="16" height="1" fill="#808080" />
      {/* Ribs */}
      <rect x="11" y="15" width="1" height="10" fill="#a8a8a8" />
      <rect x="14" y="15" width="1" height="10" fill="#a8a8a8" />
      <rect x="17" y="15" width="1" height="10" fill="#a8a8a8" />
      <rect x="20" y="15" width="1" height="10" fill="#a8a8a8" />
      {/* Base */}
      <rect x="9" y="27" width="14" height="2" fill="#c0c0c0" />
      <rect x="9" y="27" width="14" height="1" fill="#a0a0a0" />
    </svg>
  ),
  trash: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Handle */}
      <rect x="13" y="4" width="6" height="3" fill="#c0c0c0" />
      <rect x="13" y="4" width="6" height="1" fill="#ffffff" />
      <rect x="13" y="4" width="1" height="3" fill="#ffffff" />
      <rect x="18" y="4" width="1" height="3" fill="#808080" />
      <rect x="13" y="6" width="6" height="1" fill="#808080" />
      {/* Lid */}
      <rect x="7" y="7" width="18" height="3" fill="#c0c0c0" />
      <rect x="7" y="7" width="18" height="1" fill="#ffffff" />
      <rect x="7" y="7" width="1" height="3" fill="#ffffff" />
      <rect x="24" y="7" width="1" height="3" fill="#808080" />
      <rect x="7" y="9" width="18" height="1" fill="#808080" />
      {/* Can body */}
      <rect x="8" y="10" width="16" height="17" fill="#d4d0c8" />
      <rect x="8" y="10" width="1" height="17" fill="#ffffff" />
      <rect x="23" y="10" width="1" height="17" fill="#808080" />
      <rect x="8" y="26" width="16" height="1" fill="#808080" />
      {/* Ribs */}
      <rect x="11" y="12" width="1" height="13" fill="#a8a8a8" />
      <rect x="14" y="12" width="1" height="13" fill="#a8a8a8" />
      <rect x="17" y="12" width="1" height="13" fill="#a8a8a8" />
      <rect x="20" y="12" width="1" height="13" fill="#a8a8a8" />
      {/* Base */}
      <rect x="9" y="27" width="14" height="2" fill="#c0c0c0" />
      <rect x="9" y="27" width="14" height="1" fill="#a0a0a0" />
      <rect x="9" y="28" width="1" height="1" fill="#a0a0a0" />
      <rect x="22" y="28" width="1" height="1" fill="#808080" />
    </svg>
  ),
  contact: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Card body */}
      <rect x="3" y="5" width="26" height="22" fill="#ffffff" />
      <rect x="3" y="5" width="26" height="1" fill="#ffffff" />
      <rect x="3" y="5" width="1" height="22" fill="#ffffff" />
      <rect x="28" y="5" width="1" height="22" fill="#808080" />
      <rect x="3" y="26" width="26" height="1" fill="#808080" />
      <rect x="3" y="5" width="26" height="22" stroke="#404040" strokeWidth="1" fill="none" />
      {/* Blue left strip */}
      <rect x="3" y="5" width="6" height="22" fill="#000080" />
      <rect x="3" y="5" width="1" height="22" fill="#0000a0" />
      {/* Strip dividers */}
      <rect x="4" y="9" width="4" height="1" fill="#0000c0" />
      <rect x="4" y="13" width="4" height="1" fill="#0000c0" />
      <rect x="4" y="17" width="4" height="1" fill="#0000c0" />
      <rect x="4" y="21" width="4" height="1" fill="#0000c0" />
      {/* Person head */}
      <rect x="11" y="8" width="5" height="5" fill="#ffc080" />
      <rect x="11" y="8" width="5" height="1" fill="#ffd0a0" />
      <rect x="11" y="8" width="1" height="5" fill="#ffd0a0" />
      {/* Hair */}
      <rect x="11" y="7" width="5" height="2" fill="#604020" />
      {/* Person body/shoulders */}
      <rect x="10" y="13" width="7" height="4" fill="#000080" />
      <rect x="10" y="13" width="7" height="1" fill="#0000a0" />
      {/* Info text lines */}
      <rect x="19" y="9" width="8" height="2" fill="#000080" />
      <rect x="19" y="13" width="8" height="1" fill="#808080" />
      <rect x="19" y="15" width="6" height="1" fill="#808080" />
      <rect x="11" y="19" width="16" height="1" fill="#808080" />
      <rect x="11" y="21" width="14" height="1" fill="#808080" />
      <rect x="11" y="23" width="12" height="1" fill="#808080" />
    </svg>
  ),
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
  skills: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Right page */}
      <rect x="16" y="5" width="13" height="22" fill="#fffef0" />
      <rect x="16" y="5" width="13" height="1" fill="#ffffff" />
      <rect x="28" y="5" width="1" height="22" fill="#808080" />
      <rect x="16" y="26" width="13" height="1" fill="#808080" />
      {/* Left page */}
      <rect x="3" y="5" width="13" height="22" fill="#fffef0" />
      <rect x="3" y="5" width="13" height="1" fill="#ffffff" />
      <rect x="3" y="5" width="1" height="22" fill="#ffffff" />
      <rect x="3" y="26" width="13" height="1" fill="#808080" />
      {/* Spine */}
      <rect x="15" y="4" width="2" height="25" fill="#000080" />
      <rect x="15" y="4" width="1" height="25" fill="#0000a0" />
      {/* Binding lines */}
      <rect x="15" y="8" width="2" height="1" fill="#404040" />
      <rect x="15" y="12" width="2" height="1" fill="#404040" />
      <rect x="15" y="16" width="2" height="1" fill="#404040" />
      <rect x="15" y="20" width="2" height="1" fill="#404040" />
      {/* Left page lines */}
      <rect x="5" y="9" width="8" height="1" fill="#808080" />
      <rect x="5" y="12" width="9" height="1" fill="#808080" />
      <rect x="5" y="15" width="7" height="1" fill="#808080" />
      <rect x="5" y="18" width="8" height="1" fill="#808080" />
      <rect x="5" y="21" width="6" height="1" fill="#808080" />
      {/* Right page checkmarks */}
      <rect x="18" y="9" width="2" height="1" fill="#008000" />
      <rect x="20" y="10" width="2" height="1" fill="#008000" />
      <rect x="23" y="8" width="5" height="1" fill="#404040" />
      <rect x="18" y="13" width="2" height="1" fill="#008000" />
      <rect x="20" y="14" width="2" height="1" fill="#008000" />
      <rect x="23" y="12" width="4" height="1" fill="#404040" />
      <rect x="18" y="17" width="2" height="1" fill="#008000" />
      <rect x="20" y="18" width="2" height="1" fill="#008000" />
      <rect x="23" y="16" width="5" height="1" fill="#404040" />
      <rect x="18" y="21" width="2" height="1" fill="#c08000" />
      <rect x="20" y="22" width="2" height="1" fill="#c08000" />
      <rect x="23" y="20" width="3" height="1" fill="#404040" />
    </svg>
  ),
  experience: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Handle left post */}
      <rect x="10" y="9" width="2" height="5" fill="#5a4000" />
      <rect x="10" y="9" width="1" height="5" fill="#8b6914" />
      {/* Handle top bar */}
      <rect x="10" y="9" width="12" height="2" fill="#5a4000" />
      <rect x="10" y="9" width="12" height="1" fill="#8b6914" />
      {/* Handle right post */}
      <rect x="20" y="9" width="2" height="5" fill="#5a4000" />
      <rect x="21" y="9" width="1" height="5" fill="#3a2800" />
      {/* Handle base attachments */}
      <rect x="9" y="12" width="4" height="3" fill="#8b6914" />
      <rect x="9" y="12" width="4" height="1" fill="#c08020" />
      <rect x="19" y="12" width="4" height="3" fill="#8b6914" />
      <rect x="22" y="12" width="1" height="3" fill="#5a4000" />
      {/* Briefcase body */}
      <rect x="3" y="14" width="26" height="15" fill="#8b6914" />
      <rect x="3" y="14" width="26" height="1" fill="#c08020" />
      <rect x="3" y="14" width="1" height="15" fill="#c08020" />
      <rect x="28" y="14" width="1" height="15" fill="#5a4000" />
      <rect x="3" y="28" width="26" height="1" fill="#5a4000" />
      {/* Body inner fill */}
      <rect x="4" y="15" width="24" height="13" fill="#a07820" />
      {/* Center latch band */}
      <rect x="3" y="20" width="26" height="3" fill="#8b6914" />
      <rect x="3" y="20" width="26" height="1" fill="#c08020" />
      <rect x="3" y="22" width="26" height="1" fill="#5a4000" />
      {/* Latch/clasp */}
      <rect x="13" y="18" width="6" height="7" fill="#c8c820" />
      <rect x="13" y="18" width="6" height="1" fill="#ffff40" />
      <rect x="13" y="18" width="1" height="7" fill="#ffff40" />
      <rect x="18" y="18" width="1" height="7" fill="#808000" />
      <rect x="13" y="24" width="6" height="1" fill="#808000" />
      {/* Latch keyhole */}
      <rect x="15" y="20" width="2" height="3" fill="#5a4000" />
    </svg>
  ),
  about: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Window frame */}
      <rect x="3" y="4" width="26" height="24" fill="#c0c0c0" />
      <rect x="3" y="4" width="26" height="1" fill="#ffffff" />
      <rect x="3" y="4" width="1" height="24" fill="#ffffff" />
      <rect x="28" y="4" width="1" height="24" fill="#808080" />
      <rect x="3" y="27" width="26" height="1" fill="#808080" />
      {/* Title bar */}
      <rect x="4" y="5" width="24" height="7" fill="#000080" />
      {/* Window buttons */}
      <rect x="24" y="6" width="4" height="5" fill="#c0c0c0" />
      <rect x="24" y="6" width="4" height="1" fill="#ffffff" />
      <rect x="24" y="6" width="1" height="5" fill="#ffffff" />
      <rect x="27" y="6" width="1" height="5" fill="#808080" />
      <rect x="24" y="10" width="4" height="1" fill="#808080" />
      <rect x="25" y="8" width="2" height="1" fill="#000080" />
      {/* Person head */}
      <rect x="8" y="14" width="6" height="6" fill="#ffc080" />
      <rect x="8" y="14" width="1" height="6" fill="#ffd0a0" />
      <rect x="9" y="13" width="4" height="2" fill="#604020" />
      <rect x="13" y="14" width="1" height="6" fill="#e0a060" />
      {/* Person shoulders */}
      <rect x="6" y="20" width="10" height="6" fill="#000080" />
      <rect x="7" y="20" width="8" height="1" fill="#0000a0" />
      {/* Info text */}
      <rect x="17" y="14" width="10" height="2" fill="#000080" />
      <rect x="17" y="17" width="9" height="1" fill="#808080" />
      <rect x="17" y="19" width="8" height="1" fill="#808080" />
      <rect x="17" y="21" width="10" height="1" fill="#808080" />
      <rect x="17" y="23" width="7" height="1" fill="#808080" />
    </svg>
  ),
  projects: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Folder tab */}
      <rect x="2" y="9" width="9" height="3" fill="#c8a000" />
      <rect x="2" y="9" width="9" height="1" fill="#ffd84a" />
      <rect x="2" y="9" width="1" height="3" fill="#ffd84a" />
      <rect x="10" y="9" width="1" height="3" fill="#806000" />
      {/* Folder body */}
      <rect x="2" y="12" width="20" height="16" fill="#c8a000" />
      <rect x="2" y="12" width="20" height="1" fill="#ffd84a" />
      <rect x="2" y="12" width="1" height="16" fill="#ffd84a" />
      <rect x="21" y="12" width="1" height="16" fill="#806000" />
      <rect x="2" y="27" width="20" height="1" fill="#806000" />
      {/* Folder inner */}
      <rect x="4" y="14" width="16" height="12" fill="#ffd84a" />
      <rect x="4" y="14" width="1" height="12" fill="#fff2a8" />
      <rect x="4" y="14" width="16" height="1" fill="#fff2a8" />
      {/* Star shape */}
      <rect x="23" y="7" width="3" height="11" fill="#ffd800" />
      <rect x="20" y="10" width="9" height="3" fill="#ffd800" />
      <rect x="21" y="8" width="1" height="1" fill="#ffd800" />
      <rect x="25" y="8" width="1" height="1" fill="#ffd800" />
      <rect x="20" y="13" width="1" height="1" fill="#ffd800" />
      <rect x="26" y="13" width="1" height="1" fill="#ffd800" />
      <rect x="23" y="7" width="1" height="1" fill="#ffe060" />
      <rect x="21" y="8" width="1" height="1" fill="#c08000" />
      <rect x="25" y="8" width="1" height="1" fill="#c08000" />
    </svg>
  ),
  videos: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* TV body */}
      <rect x="2" y="6" width="22" height="17" fill="#c0c0c0" />
      <rect x="2" y="6" width="22" height="1" fill="#ffffff" />
      <rect x="2" y="6" width="1" height="17" fill="#ffffff" />
      <rect x="23" y="6" width="1" height="17" fill="#808080" />
      <rect x="2" y="22" width="22" height="1" fill="#808080" />
      {/* Screen */}
      <rect x="4" y="8" width="16" height="12" fill="#000040" />
      <rect x="4" y="8" width="16" height="1" fill="#000080" />
      {/* Play button */}
      <rect x="9" y="11" width="2" height="6" fill="#ffffff" />
      <rect x="11" y="12" width="2" height="4" fill="#ffffff" />
      <rect x="13" y="13" width="2" height="2" fill="#ffffff" />
      <rect x="15" y="13" width="1" height="2" fill="#ffffff" />
      {/* Camera/VHS part */}
      <rect x="24" y="10" width="7" height="6" fill="#808080" />
      <rect x="24" y="10" width="7" height="1" fill="#a0a0a0" />
      <rect x="24" y="10" width="1" height="6" fill="#a0a0a0" />
      <rect x="30" y="10" width="1" height="6" fill="#606060" />
      <rect x="24" y="15" width="7" height="1" fill="#606060" />
      <rect x="25" y="8" width="2" height="3" fill="#808080" />
      <rect x="25" y="8" width="2" height="1" fill="#a0a0a0" />
      {/* Antennas */}
      <rect x="7" y="3" width="1" height="4" fill="#808080" />
      <rect x="17" y="3" width="1" height="4" fill="#808080" />
      {/* Stand */}
      <rect x="9" y="23" width="6" height="2" fill="#a0a0a0" />
      <rect x="7" y="25" width="10" height="2" fill="#c0c0c0" />
      <rect x="7" y="25" width="10" height="1" fill="#ffffff" />
    </svg>
  ),
  welcome: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Window */}
      <rect x="3" y="4" width="26" height="24" fill="#c0c0c0" />
      <rect x="3" y="4" width="26" height="1" fill="#ffffff" />
      <rect x="3" y="4" width="1" height="24" fill="#ffffff" />
      <rect x="28" y="4" width="1" height="24" fill="#808080" />
      <rect x="3" y="27" width="26" height="1" fill="#808080" />
      {/* Title bar */}
      <rect x="4" y="5" width="24" height="6" fill="#000080" />
      {/* Windows 4-color flag */}
      <rect x="6" y="13" width="8" height="6" fill="#ff0000" />
      <rect x="15" y="13" width="8" height="6" fill="#00a000" />
      <rect x="6" y="20" width="8" height="5" fill="#0000cc" />
      <rect x="15" y="20" width="8" height="5" fill="#ffd800" />
      {/* Flag divider cross */}
      <rect x="13" y="13" width="3" height="12" fill="#c0c0c0" />
      <rect x="6" y="19" width="17" height="2" fill="#c0c0c0" />
      {/* Highlight on flag */}
      <rect x="6" y="13" width="8" height="1" fill="#ff4040" />
      <rect x="15" y="13" width="8" height="1" fill="#40c040" />
    </svg>
  ),
  settings: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Control panel frame */}
      <rect x="3" y="4" width="26" height="24" fill="#c0c0c0" />
      <rect x="3" y="4" width="26" height="1" fill="#ffffff" />
      <rect x="3" y="4" width="1" height="24" fill="#ffffff" />
      <rect x="28" y="4" width="1" height="24" fill="#808080" />
      <rect x="3" y="27" width="26" height="1" fill="#808080" />
      {/* Title bar */}
      <rect x="4" y="5" width="24" height="6" fill="#000080" />
      {/* Inner panel */}
      <rect x="5" y="12" width="22" height="14" fill="#efefef" />
      <rect x="5" y="12" width="22" height="1" fill="#808080" />
      <rect x="5" y="12" width="1" height="14" fill="#808080" />
      <rect x="26" y="12" width="1" height="14" fill="#ffffff" />
      <rect x="5" y="25" width="22" height="1" fill="#ffffff" />
      {/* Slider track 1 */}
      <rect x="7" y="15" width="16" height="2" fill="#808080" />
      <rect x="7" y="15" width="16" height="1" fill="#606060" />
      {/* Slider knob 1 */}
      <rect x="15" y="14" width="4" height="4" fill="#c0c0c0" />
      <rect x="15" y="14" width="4" height="1" fill="#ffffff" />
      <rect x="15" y="14" width="1" height="4" fill="#ffffff" />
      <rect x="18" y="14" width="1" height="4" fill="#808080" />
      <rect x="15" y="17" width="4" height="1" fill="#808080" />
      {/* Slider track 2 */}
      <rect x="7" y="21" width="16" height="2" fill="#808080" />
      <rect x="7" y="21" width="16" height="1" fill="#606060" />
      {/* Slider knob 2 */}
      <rect x="10" y="20" width="4" height="4" fill="#c0c0c0" />
      <rect x="10" y="20" width="4" height="1" fill="#ffffff" />
      <rect x="10" y="20" width="1" height="4" fill="#ffffff" />
      <rect x="13" y="20" width="1" height="4" fill="#808080" />
      <rect x="10" y="23" width="4" height="1" fill="#808080" />
      {/* Color swatches */}
      <rect x="24" y="14" width="3" height="3" fill="#ff0000" />
      <rect x="24" y="18" width="3" height="3" fill="#0000ff" />
      <rect x="24" y="22" width="3" height="3" fill="#00a000" />
    </svg>
  ),
  resume: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Page borders */}
      <rect x="6" y="2" width="10" height="1" fill="#404040" />
      <rect x="6" y="2" width="1" height="20" fill="#404040" />
      <rect x="6" y="22" width="16" height="1" fill="#404040" />
      <rect x="21" y="9" width="1" height="13" fill="#404040" />
      <rect x="16" y="8" width="6" height="1" fill="#404040" />
      {/* Page fill */}
      <rect x="7" y="3" width="9" height="19" fill="#ffffff" />
      <rect x="16" y="9" width="5" height="13" fill="#ffffff" />
      {/* Dog-ear */}
      <rect x="16" y="2" width="6" height="7" fill="#d4d0c8" />
      <rect x="16" y="2" width="1" height="7" fill="#808080" />
      <rect x="17" y="3" width="4" height="1" fill="#b0b0b0" />
      <rect x="18" y="4" width="3" height="1" fill="#b0b0b0" />
      <rect x="19" y="5" width="2" height="1" fill="#b0b0b0" />
      <rect x="20" y="6" width="1" height="1" fill="#b0b0b0" />
      {/* Name header */}
      <rect x="9" y="5" width="10" height="2" fill="#000080" />
      {/* Content lines */}
      <rect x="9" y="10" width="2" height="1" fill="#606060" />
      <rect x="12" y="10" width="7" height="1" fill="#808080" />
      <rect x="9" y="12" width="11" height="1" fill="#a0a0a0" />
      <rect x="9" y="14" width="10" height="1" fill="#a0a0a0" />
      <rect x="9" y="16" width="11" height="1" fill="#a0a0a0" />
      <rect x="9" y="18" width="8" height="1" fill="#a0a0a0" />
      {/* PDF badge */}
      <rect x="6" y="23" width="16" height="7" fill="#c00000" />
      <rect x="6" y="23" width="16" height="1" fill="#e00000" />
      <rect x="6" y="23" width="1" height="7" fill="#e00000" />
      <rect x="21" y="23" width="1" height="7" fill="#900000" />
      <rect x="6" y="29" width="16" height="1" fill="#900000" />
      {/* PDF letters */}
      <rect x="8" y="25" width="2" height="3" fill="#ffffff" />
      <rect x="8" y="25" width="3" height="1" fill="#ffffff" />
      <rect x="8" y="27" width="3" height="1" fill="#ffffff" />
      <rect x="12" y="25" width="1" height="4" fill="#ffffff" />
      <rect x="12" y="25" width="3" height="1" fill="#ffffff" />
      <rect x="12" y="27" width="3" height="1" fill="#ffffff" />
      <rect x="12" y="28" width="3" height="1" fill="#ffffff" />
      <rect x="16" y="25" width="1" height="3" fill="#ffffff" />
      <rect x="16" y="25" width="3" height="1" fill="#ffffff" />
      <rect x="16" y="27" width="2" height="1" fill="#ffffff" />
    </svg>
  ),
  location: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Map background */}
      <rect x="3" y="6" width="26" height="22" fill="#c8dff0" />
      <rect x="3" y="6" width="26" height="1" fill="#e0f0ff" />
      <rect x="3" y="6" width="1" height="22" fill="#e0f0ff" />
      <rect x="28" y="6" width="1" height="22" fill="#a0b8cc" />
      <rect x="3" y="27" width="26" height="1" fill="#a0b8cc" />
      <rect x="3" y="6" width="26" height="22" stroke="#404040" strokeWidth="1" fill="none" />
      {/* Land mass */}
      <rect x="5" y="8" width="12" height="6" fill="#c8e8b0" />
      <rect x="8" y="14" width="8" height="5" fill="#c8e8b0" />
      <rect x="6" y="14" width="4" height="3" fill="#c8e8b0" />
      <rect x="14" y="10" width="10" height="8" fill="#c8e8b0" />
      <rect x="16" y="18" width="8" height="4" fill="#c8e8b0" />
      {/* Map pin body */}
      <rect x="15" y="10" width="4" height="4" fill="#c00000" />
      <rect x="15" y="10" width="4" height="1" fill="#ff2020" />
      <rect x="15" y="10" width="1" height="4" fill="#ff2020" />
      <rect x="18" y="10" width="1" height="4" fill="#900000" />
      <rect x="15" y="13" width="4" height="1" fill="#900000" />
      {/* Pin hole */}
      <rect x="16" y="11" width="2" height="2" fill="#ffffff" />
      {/* Pin tip */}
      <rect x="16" y="14" width="2" height="3" fill="#c00000" />
      <rect x="16" y="17" width="2" height="1" fill="#900000" />
      {/* Grid lines */}
      <rect x="4" y="16" width="24" height="1" fill="#a0b8d0" />
      <rect x="16" y="7" width="1" height="20" fill="#a0b8d0" />
    </svg>
  ),
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
  minesweeper: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Window frame */}
      <rect x="1" y="2" width="30" height="28" fill="#c0c0c0" />
      <rect x="1" y="2" width="30" height="1" fill="#ffffff" />
      <rect x="1" y="2" width="1" height="28" fill="#ffffff" />
      <rect x="30" y="2" width="1" height="28" fill="#808080" />
      <rect x="1" y="29" width="30" height="1" fill="#808080" />
      {/* Title bar */}
      <rect x="2" y="3" width="28" height="5" fill="#000080" />
      {/* Game grid background */}
      <rect x="3" y="9" width="26" height="19" fill="#808080" />
      {/* Cell 1,1 raised */}
      <rect x="4" y="10" width="5" height="5" fill="#c0c0c0" />
      <rect x="4" y="10" width="5" height="1" fill="#ffffff" />
      <rect x="4" y="10" width="1" height="5" fill="#ffffff" />
      <rect x="8" y="10" width="1" height="5" fill="#808080" />
      <rect x="4" y="14" width="5" height="1" fill="#808080" />
      {/* Cell 1,2 revealed number */}
      <rect x="10" y="10" width="5" height="5" fill="#d4d0c8" />
      <rect x="10" y="10" width="5" height="1" fill="#808080" />
      <rect x="10" y="10" width="1" height="5" fill="#808080" />
      <rect x="12" y="11" width="1" height="3" fill="#0000ff" />
      {/* Cell 1,3 raised */}
      <rect x="16" y="10" width="5" height="5" fill="#c0c0c0" />
      <rect x="16" y="10" width="5" height="1" fill="#ffffff" />
      <rect x="16" y="10" width="1" height="5" fill="#ffffff" />
      <rect x="20" y="10" width="1" height="5" fill="#808080" />
      <rect x="16" y="14" width="5" height="1" fill="#808080" />
      {/* Cell 1,4 number 2 */}
      <rect x="22" y="10" width="5" height="5" fill="#d4d0c8" />
      <rect x="22" y="10" width="5" height="1" fill="#808080" />
      <rect x="22" y="10" width="1" height="5" fill="#808080" />
      <rect x="24" y="11" width="1" height="3" fill="#008000" />
      <rect x="25" y="11" width="1" height="3" fill="#008000" />
      {/* Row 2, Cell 1 */}
      <rect x="4" y="16" width="5" height="5" fill="#d4d0c8" />
      <rect x="4" y="16" width="5" height="1" fill="#808080" />
      <rect x="4" y="16" width="1" height="5" fill="#808080" />
      {/* MINE cell */}
      <rect x="10" y="16" width="5" height="5" fill="#ff0000" />
      <rect x="10" y="16" width="5" height="1" fill="#ff4040" />
      <rect x="10" y="16" width="1" height="5" fill="#ff4040" />
      <rect x="11" y="18" width="3" height="1" fill="#000000" />
      <rect x="12" y="17" width="1" height="3" fill="#000000" />
      <rect x="11" y="17" width="1" height="1" fill="#000000" />
      <rect x="13" y="17" width="1" height="1" fill="#000000" />
      <rect x="11" y="19" width="1" height="1" fill="#000000" />
      <rect x="13" y="19" width="1" height="1" fill="#000000" />
      {/* Row 2 cells */}
      <rect x="16" y="16" width="5" height="5" fill="#c0c0c0" />
      <rect x="16" y="16" width="5" height="1" fill="#ffffff" />
      <rect x="16" y="16" width="1" height="5" fill="#ffffff" />
      <rect x="20" y="16" width="1" height="5" fill="#808080" />
      <rect x="16" y="20" width="5" height="1" fill="#808080" />
      <rect x="22" y="16" width="5" height="5" fill="#c0c0c0" />
      <rect x="22" y="16" width="5" height="1" fill="#ffffff" />
      <rect x="22" y="16" width="1" height="5" fill="#ffffff" />
      <rect x="26" y="16" width="1" height="5" fill="#808080" />
      <rect x="22" y="20" width="5" height="1" fill="#808080" />
      {/* Row 3 cells */}
      <rect x="4" y="22" width="5" height="5" fill="#c0c0c0" />
      <rect x="4" y="22" width="5" height="1" fill="#ffffff" />
      <rect x="4" y="22" width="1" height="5" fill="#ffffff" />
      <rect x="8" y="22" width="1" height="5" fill="#808080" />
      <rect x="4" y="26" width="5" height="1" fill="#808080" />
      {/* Flag cell */}
      <rect x="10" y="22" width="5" height="5" fill="#c0c0c0" />
      <rect x="10" y="22" width="5" height="1" fill="#ffffff" />
      <rect x="10" y="22" width="1" height="5" fill="#ffffff" />
      <rect x="14" y="22" width="1" height="5" fill="#808080" />
      <rect x="10" y="26" width="5" height="1" fill="#808080" />
      <rect x="12" y="23" width="1" height="3" fill="#808080" />
      <rect x="12" y="23" width="2" height="2" fill="#ff0000" />
      <rect x="12" y="26" width="2" height="1" fill="#808080" />
      {/* Row 3 more */}
      <rect x="16" y="22" width="5" height="5" fill="#c0c0c0" />
      <rect x="16" y="22" width="5" height="1" fill="#ffffff" />
      <rect x="16" y="22" width="1" height="5" fill="#ffffff" />
      <rect x="20" y="22" width="1" height="5" fill="#808080" />
      <rect x="16" y="26" width="5" height="1" fill="#808080" />
      <rect x="22" y="22" width="5" height="5" fill="#d4d0c8" />
      <rect x="22" y="22" width="5" height="1" fill="#808080" />
      <rect x="22" y="22" width="1" height="5" fill="#808080" />
    </svg>
  ),
  help: (
    <svg width="32" height="32" viewBox="0 0 32 32" shapeRendering="crispEdges">
      {/* Book body */}
      <rect x="4" y="3" width="22" height="26" fill="#ffd800" />
      <rect x="4" y="3" width="22" height="1" fill="#ffe860" />
      <rect x="4" y="3" width="1" height="26" fill="#ffe860" />
      <rect x="25" y="3" width="1" height="26" fill="#c0a000" />
      <rect x="4" y="28" width="22" height="1" fill="#c0a000" />
      {/* Spine */}
      <rect x="4" y="3" width="5" height="26" fill="#c0a000" />
      <rect x="4" y="3" width="1" height="26" fill="#d0b000" />
      <rect x="8" y="3" width="1" height="26" fill="#a08000" />
      {/* Binding lines */}
      <rect x="5" y="7" width="3" height="1" fill="#a08000" />
      <rect x="5" y="11" width="3" height="1" fill="#a08000" />
      <rect x="5" y="15" width="3" height="1" fill="#a08000" />
      <rect x="5" y="19" width="3" height="1" fill="#a08000" />
      <rect x="5" y="23" width="3" height="1" fill="#a08000" />
      {/* Question mark top arc */}
      <rect x="14" y="8" width="6" height="2" fill="#000080" />
      <rect x="18" y="10" width="2" height="3" fill="#000080" />
      {/* Question mark curve */}
      <rect x="14" y="13" width="4" height="2" fill="#000080" />
      {/* Question mark stem */}
      <rect x="14" y="16" width="2" height="4" fill="#000080" />
      {/* Question mark dot */}
      <rect x="14" y="22" width="2" height="3" fill="#000080" />
    </svg>
  ),
};
