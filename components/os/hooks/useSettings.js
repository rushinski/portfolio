"use client";

import { useOSContext } from "../context/OSContext";

export function useSettings() {
  return useOSContext().settings;
}
