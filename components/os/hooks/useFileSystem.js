"use client";

import { useOSContext } from "../context/OSContext";

export function useFileSystem() {
  return useOSContext().fileSystem;
}
