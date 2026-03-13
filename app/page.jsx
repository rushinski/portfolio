import Desktop from "@/components/os/Desktop";
import MobileView from "@/components/MobileView";
import { OSProvider } from "@/components/os/context/OSContext";

export default function Home() {
  return (
    <main>
      {/* Desktop OS — hidden on mobile */}
      <div className="hidden md:block">
        <OSProvider>
          <Desktop />
        </OSProvider>
      </div>
      {/* Mobile card view — shown only on mobile */}
      <div className="block md:hidden">
        <MobileView />
      </div>
    </main>
  );
}
