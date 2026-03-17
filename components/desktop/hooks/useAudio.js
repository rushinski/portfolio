"use client";

import { useOSContext } from "../context/OSContext";

export function useAudio() {
  return useOSContext().audio;
}
