"use client";

import { useOSContext } from "../context/OSContext";

export function useWindowManager() {
  return useOSContext().windowManager;
}
