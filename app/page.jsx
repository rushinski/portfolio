import Desktop from "@/components/desktop/Desktop";
import MobileOS from "@/components/mobile/MobileOS";
import { OSProvider } from "@/components/desktop/context/OSContext";
import { getGitHubData } from "@/lib/github";

export default async function Home() {
  let initialGitHubData = null;

  try {
    initialGitHubData = await getGitHubData();
  } catch (error) {
    console.error("Failed to preload GitHub data:", error);
  }

  return (
    <main>
      {/* Desktop OS — hidden on mobile */}
      <div className="hidden md:block">
        <OSProvider>
          <Desktop initialGitHubData={initialGitHubData} />
        </OSProvider>
      </div>
      {/* Mobile OS — shown only on mobile */}
      <div className="block md:hidden">
        <MobileOS />
      </div>
    </main>
  );
}
