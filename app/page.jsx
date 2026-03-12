import Desktop from "@/components/os/Desktop";
import { OSProvider } from "@/components/os/context/OSContext";

export default function Home() {
  return (
    <main>
      <OSProvider>
        <Desktop />
      </OSProvider>
    </main>
  );
}
