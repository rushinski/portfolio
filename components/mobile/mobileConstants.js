"use client";

import { Icons } from "@/components/os/icons";

export const MOBILE_APPS = [
  { id: "about",       label: "About",         icon: Icons.about,       desc: "Learn about Jacob — background, education, and interests." },
  { id: "skills",      label: "Skills",        icon: Icons.skills,      desc: "Technologies, languages, and tools Jacob works with." },
  { id: "experience",  label: "Experience",    icon: Icons.experience,  desc: "Work history and professional roles." },
  { id: "projects",    label: "Projects",      icon: Icons.projects,    desc: "Shipped and in-progress software projects." },
  { id: "contact",     label: "Contact",       icon: Icons.contact,     desc: "Email, GitHub, LinkedIn, and phone number." },
  { id: "resume",      label: "Resume.pdf",    icon: Icons.resume,      desc: "Download or view Jacob's full resume PDF." },
  { id: "location",    label: "Where's Jacob", icon: Icons.location,    desc: "Current location — Harrisburg, Lancaster, Philly." },
  { id: "videos",      label: "Videos",        icon: Icons.videos,      desc: "Project demo videos and walkthroughs." },
  { id: "help",        label: "Help",          icon: Icons.help,        desc: "How to use JacobOS mobile and navigate the portfolio." },
  { id: "settings",    label: "Settings",      icon: Icons.settings,    desc: "OS preferences and display settings." },
  { id: "minesweeper", label: "Minesweeper",   icon: Icons.minesweeper, desc: "Classic Win95 Minesweeper. Tap to reveal, hold to flag." },
];

export const MOBILE_APP_MAP = Object.fromEntries(MOBILE_APPS.map((a) => [a.id, a]));

export const APP_TITLES = {
  about:       "About Jacob",
  skills:      "Skills",
  experience:  "Experience",
  projects:    "Projects",
  contact:     "Contact",
  resume:      "Resume.pdf",
  location:    "Where's Jacob",
  videos:      "Videos",
  help:        "JacobOS Help",
  settings:    "Settings",
  minesweeper: "Minesweeper",
};
