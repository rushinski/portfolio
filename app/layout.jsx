import "./globals.css";

export const metadata = {
  title: "Jacob Rushinski - Developer",
  description: "Backend / Full-Stack Developer. Building production-grade systems from Lancaster, PA.",
  keywords: ["Jacob Rushinski", "Full Stack Developer", "Backend Developer", "Next.js", "TypeScript", "Supabase"],
  openGraph: {
    title: "Jacob Rushinski - Developer",
    description: "Backend / Full-Stack Developer based in Lancaster, PA.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
