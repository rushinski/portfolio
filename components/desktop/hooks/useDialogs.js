"use client";

import { useOSContext } from "../context/OSContext";

export function useDialogs() {
  return useOSContext().dialogs;
}
