/**
 * Single source of truth for all portfolio content data.
 * Both desktop (os/) and mobile apps import from here.
 *
 * To update any content — bio, skills, experience, projects, locations — edit
 * components/os/data.js. This file re-exports everything from there.
 */
export {
  PERSONAL,
  SKILLS,
  SKILL_PROFICIENCY,
  EXPERIENCE,
  PROJECTS,
  LOCATIONS,
  VIDEO_LIBRARY,
  VIDEO_LIBRARY_BY_ID,
} from "@/components/os/data";
