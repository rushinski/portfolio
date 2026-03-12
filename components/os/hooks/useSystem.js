"use client";

import { useOSContext } from "../context/OSContext";

export function useSystem() {
  return useOSContext().system;
}
