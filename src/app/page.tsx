import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const backgroundPattern = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  };

  return (
    <>
      <Head>
        <title>GitDocify</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-50" style={backgroundPattern}></div>
        
        <div className="relative z-10 grid grid-rows-[auto_1fr_auto] min-h-screen items-center justify-items-center p-6 sm:p-20 font-sans text-white">
          {/* Header */}
          <header className="row-start-1 w-full flex justify-between items-center max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Image src="/readme-icon.svg" alt="Logo" width={24} height={24} className="filter brightness-0 invert" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                GitDocify
              </h1>
            </div>
            <Link
              href="/builder"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 text-sm font-semibold shadow-lg"
            >
              Launch Builder →
            </Link>
          </header>

          {/* Main */}
          <main className="row-start-2 flex flex-col gap-8 items-center text-center px-4">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                  Generate Beautiful READMEs
                </span>
                <br className="hidden sm:block" />
                <span className="text-white">in Seconds</span>
              </h2>
              <p className="text-xl max-w-2xl text-gray-300 leading-relaxed">
                Automate clean, professional GitHub project READMEs with AI and
                templates. No more copy-pasting. Just paste your GitHub URL and watch the magic happen.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-400 text-sm">Generate professional READMEs in seconds, not hours</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
                <p className="text-gray-400 text-sm">Smart analysis of your repository structure and content</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Beautiful Design</h3>
                <p className="text-gray-400 text-sm">Modern templates with badges, stats, and formatting</p>
              </div>
            </div>

            <Link
              href="/builder"
              className="mt-8 inline-flex items-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full transition-all duration-200 transform hover:scale-105 shadow-2xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start Generating →
            </Link>
          </main>

          {/* Footer */}
          <footer className="row-start-3 w-full max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
              <p className="text-gray-400 mb-2">
                Made with ❤️ for the open source community
              </p>
              <p className="text-sm text-gray-500">
                Generate professional README files in seconds • Free forever
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
