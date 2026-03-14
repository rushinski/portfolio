import Desktop from "@/components/os/Desktop";
import MobileView from "@/components/MobileView";
import { OSProvider } from "@/components/os/context/OSContext";
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
        <MobileView />
      </div>
    </main>
  );
}
