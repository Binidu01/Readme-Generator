import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen items-center justify-items-center p-6 sm:p-20 font-sans bg-[#0c0c0c] text-white">
      {/* Header */}
      <header className="row-start-1 w-full flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/readme-icon.svg" alt="Logo" width={32} height={32} />
          <h1 className="text-xl font-bold">GitDocify</h1>
        </div>
        <Link
          href="/builder"
          className="bg-white text-black px-4 py-2 rounded-full hover:opacity-90 transition text-sm"
        >
          Launch Builder →
        </Link>
      </header>

      {/* Main */}
      <main className="row-start-2 flex flex-col gap-6 items-center text-center px-4">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Generate Beautiful READMEs <br className="hidden sm:block" /> in Seconds
        </h2>
        <p className="text-lg max-w-xl text-gray-300">
          Automate clean, professional GitHub project READMEs with AI and templates.
          No more copy-pasting. Just answer a few prompts.
        </p>

        <Link
          href="/builder"
          className="mt-4 inline-flex items-center px-6 py-3 text-sm sm:text-base font-medium bg-white text-black rounded-full hover:opacity-90 transition"
        >
          Start Generating →
        </Link>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm py-8 text-gray-400">
      </footer>
    </div>
  );
}