"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Github, Star, GitFork, Clock, Download, Copy, Eye, Code, FileText, Zap, Users } from "lucide-react";

interface RepoData {
  name: string;
  description?: string;
  licenseName?: string;
  readmeContent?: string;
  topics?: string[];
  stars?: number;
  forks?: number;
  lastCommitDate?: string;
  htmlUrl: string;
  homepage?: string;
  ownerLogin: string;
  ownerUrl: string;
  language?: string;
  size?: number;
  openIssues?: number;
  watchers?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function ProfessionalReadmeGenerator() {
  const [repoUrl, setRepoUrl] = useState("");
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<'markdown' | 'preview'>('preview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Animation for stats counters
  const [animatedStats, setAnimatedStats] = useState({
    stars: 0,
    forks: 0,
    watchers: 0
  });

  useEffect(() => {
    if (repoData) {
      const duration = 1000;
      const steps = 50;
      const interval = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setAnimatedStats({
          stars: Math.floor((repoData.stars || 0) * progress),
          forks: Math.floor((repoData.forks || 0) * progress),
          watchers: Math.floor((repoData.watchers || 0) * progress)
        });
        
        if (step >= steps) {
          clearInterval(timer);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [repoData]);

  function parseGithubUrl(url: string) {
    try {
      const u = new URL(url);
      if (u.hostname !== "github.com") return null;
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length < 2) return null;
      return { owner: parts[0], repo: parts[1] };
    } catch {
      return null;
    }
  }

  function extractSection(markdown: string, section: string) {
    const regex = new RegExp(`##+\\s*${section}[\\s\\S]*?(?=\\n##+\\s|$)`, "i");
    const match = markdown.match(regex);
    return match ? match[0].trim() : "";
  }

  function timeSince(dateString: string) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + " year" + (interval > 1 ? "s" : "") + " ago";
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + " month" + (interval > 1 ? "s" : "") + " ago";
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " day" + (interval > 1 ? "s" : "") + " ago";
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " minute" + (interval > 1 ? "s" : "") + " ago";
    return "just now";
  }

  function formatFileSize(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function getLanguageColor(language: string): string {
    const colors: Record<string, string> = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      Java: '#b07219',
      Go: '#00ADD8',
      Rust: '#dea584',
      C: '#555555',
      'C++': '#f34b7d',
      'C#': '#239120',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Swift: '#fa7343',
      Kotlin: '#A97BFF',
      Dart: '#00B4AB',
      HTML: '#e34c26',
      CSS: '#1572B6',
      Shell: '#89e051',
      Vue: '#4FC08D',
      React: '#61DAFB'
    };
    return colors[language] || '#6b7280';
  }

  function generateReadme(data: RepoData, langs: Record<string, number>) {
    if (!data) return "";

    const topLanguages = Object.entries(langs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const installation = extractSection(data.readmeContent || "", "Installation");
    const usage = extractSection(data.readmeContent || "", "Usage");
    const contributing = extractSection(data.readmeContent || "", "Contributing");

    const languageBadges = topLanguages
      .map(([lang]) => 
        `![${lang}](https://img.shields.io/badge/${encodeURIComponent(lang)}-${getLanguageColor(lang).slice(1)}?style=for-the-badge&logo=${lang.toLowerCase()}&logoColor=white)`
      )
      .join(' ');

    const gettingStarted = getGettingStartedSection(topLanguages.map(([lang]) => lang));

    return `<div align="center">
  
# ${data.name}

${data.description || "A cool project built with passion 🚀"}

${languageBadges}

[![Stars](https://img.shields.io/github/stars/${data.ownerLogin}/${data.name}?style=for-the-badge&logo=github)](${data.htmlUrl}/stargazers)
[![Forks](https://img.shields.io/github/forks/${data.ownerLogin}/${data.name}?style=for-the-badge&logo=github)](${data.htmlUrl}/network/members)
[![Issues](https://img.shields.io/github/issues/${data.ownerLogin}/${data.name}?style=for-the-badge&logo=github)](${data.htmlUrl}/issues)
[![License](https://img.shields.io/github/license/${data.ownerLogin}/${data.name}?style=for-the-badge)](${data.htmlUrl}/blob/main/LICENSE)

</div>

---

## 📋 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Installation](#️-installation)
- [💻 Usage](#-usage)
- [🏗️ Built With](#️-built-with)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact](#-contact)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🚀 Features

- ✨ Modern and intuitive user interface
- 🔥 High performance and scalability
- 🛡️ Secure and reliable
- 📱 Responsive design
- 🌐 Cross-platform compatibility

## 🛠️ Installation

${installation || gettingStarted}

## 💻 Usage

${usage || `\`\`\`bash
# Basic usage example
${data.name.toLowerCase()} --help
\`\`\`

For more detailed usage instructions, please refer to our [documentation](${data.homepage || data.htmlUrl}).`}

## 🏗️ Built With

${topLanguages.map(([lang, bytes]) => 
  `- **${lang}** - ${((bytes / Object.values(langs).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%`
).join('\n')}

## 🤝 Contributing

${contributing || `Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch \`git checkout -b feature/AmazingFeature\`
3. Commit your Changes \`git commit -m Add some AmazingFeature\`
4. Push to the Branch \`git push origin feature/AmazingFeature\`
5. Open a Pull Request`}

## 📄 License

This project is licensed under the ${data.licenseName || "MIT"} License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**${data.ownerLogin}** - [@${data.ownerLogin}](${data.ownerUrl})

Project Link: [${data.htmlUrl}](${data.htmlUrl})

${data.homepage ? `🌐 Website: [${data.homepage}](${data.homepage})` : ''}

## 🙏 Acknowledgments

- Thanks to all contributors who have helped this project grow
- Special thanks to the open source community
- Built with ❤️ and lots of ☕

---

<div align="center">
  
**[⬆ Back to Top](#${data.name.toLowerCase()})**

Made with ❤️ by [${data.ownerLogin}](${data.ownerUrl})

⭐ Star this repo if you find it useful!

</div>`;
  }

  function getGettingStartedSection(langs: string[]) {
    if (langs.includes("JavaScript") || langs.includes("TypeScript")) {
      return `### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start
\`\`\`bash
# Clone the repository
git clone ${repoData?.htmlUrl}.git

# Navigate to project directory
cd ${repoData?.name}

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.`;
    }
    if (langs.includes("Python")) {
      return `### Prerequisites
- Python 3.7+
- pip

### Quick Start
\`\`\`bash
# Clone the repository
git clone ${repoData?.htmlUrl}.git

# Navigate to project directory
cd ${repoData?.name}

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Run the application
python main.py
\`\`\``;
    }
    if (langs.includes("Go")) {
      return `### Prerequisites
- Go 1.19+

### Quick Start
\`\`\`bash
# Clone the repository
git clone ${repoData?.htmlUrl}.git

# Navigate to project directory
cd ${repoData?.name}

# Download dependencies
go mod download

# Build the application
go build

# Run the application
./${repoData?.name}
\`\`\``;
    }
    return `### Prerequisites
Please check the project documentation for specific requirements.

### Quick Start
\`\`\`bash
# Clone the repository
git clone ${repoData?.htmlUrl}.git

# Navigate to project directory
cd ${repoData?.name}

# Follow the installation instructions in the documentation
\`\`\``;
  }

  async function handleGenerate() {
    setError("");
    setRepoData(null);
    setLanguages({});
    const parsed = parseGithubUrl(repoUrl);
    if (!parsed) {
      setError("Please enter a valid GitHub repository URL.");
      return;
    }

    setLoading(true);
    try {
      const [repoRes, langsRes, readmeRes, commitsRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`),
        fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/languages`),
        fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/readme`, {
          headers: { Accept: "application/vnd.github.v3.raw" },
        }),
        fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/commits?per_page=1`),
      ]);

      if (!repoRes.ok) {
        if (repoRes.status === 404) {
          throw new Error("Repository not found. Please check the URL and try again.");
        }
        throw new Error("Failed to fetch repository data.");
      }

      const repoJson = await repoRes.json();
      const langsJson = langsRes.ok ? await langsRes.json() : {};
      setLanguages(langsJson);

      const readmeContent = readmeRes.ok ? await readmeRes.text() : "";
      const commitsJson = commitsRes.ok ? await commitsRes.json() : [];

      setRepoData({
        name: repoJson.name,
        description: repoJson.description,
        licenseName: repoJson.license?.spdx_id || repoJson.license?.name || "MIT",
        readmeContent,
        topics: repoJson.topics || [],
        stars: repoJson.stargazers_count,
        forks: repoJson.forks_count,
        lastCommitDate: commitsJson[0]?.commit?.author?.date || "",
        htmlUrl: repoJson.html_url,
        homepage: repoJson.homepage,
        ownerLogin: repoJson.owner.login,
        ownerUrl: repoJson.owner.html_url,
        language: repoJson.language,
        size: repoJson.size,
        openIssues: repoJson.open_issues_count,
        watchers: repoJson.watchers_count,
        createdAt: repoJson.created_at,
        updatedAt: repoJson.updated_at,
      });
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

const copyCodeToClipboard = async (code: string) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } else {
      // Fallback for browsers without Clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  } catch (err) {
    console.error('Failed to copy code: ', err);
    alert('Failed to copy code. Please copy manually.');
  }
};

const copyToClipboard = async () => {
  if (!repoData) return;
  try {
    const text = generateReadme(repoData, languages);
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      // Fallback for browsers without Clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    alert('Failed to copy README. Please copy manually.');
  }
};

  const downloadReadme = () => {
    if (!repoData) return;
    const content = generateReadme(repoData, languages);
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const backgroundPattern = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-50" style={backgroundPattern}></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                ReadmeAI
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-2">
              Professional README Generator for GitHub Repositories
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Transform your GitHub repositories with beautiful, comprehensive README files. 
              Just paste your repo URL and get a professional README in seconds.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-8">
          {/* Input Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      placeholder="https://github.com/username/repository"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                  </div>
                  <button
                    onClick={handleGenerate}
                    disabled={loading || !repoUrl.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Generate
                      </>
                    )}
                  </button>
                </div>
                
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                    <p className="text-red-300 text-center font-medium">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Repository Stats */}
          {repoData && (
            <div className="max-w-6xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Star className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{animatedStats.stars.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <GitFork className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{animatedStats.forks.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Forks</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Eye className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{animatedStats.watchers.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Watchers</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Code className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{repoData.language || 'Mixed'}</div>
                    <div className="text-gray-400 text-sm">Language</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Users className="w-6 h-6 text-pink-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{repoData.openIssues || 0}</div>
                    <div className="text-gray-400 text-sm">Issues</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Clock className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{formatFileSize((repoData.size || 0) * 1024)}</div>
                    <div className="text-gray-400 text-sm">Size</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {repoData && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
                {/* Toolbar */}
                <div className="border-b border-white/20 p-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex bg-white/10 rounded-lg p-1">
                      <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          activeTab === 'preview'
                            ? 'bg-purple-500 text-white shadow-lg'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        <Eye className="w-4 h-4 inline mr-2" />
                        Preview
                      </button>
                      <button
                        onClick={() => setActiveTab('markdown')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          activeTab === 'markdown'
                            ? 'bg-purple-500 text-white shadow-lg'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        <Code className="w-4 h-4 inline mr-2" />
                        Markdown
                      </button>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={downloadReadme}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {activeTab === 'markdown' ? (
                    <textarea
                      readOnly
                      className="w-full h-96 p-4 bg-gray-900 text-gray-100 font-mono text-sm rounded-xl border border-gray-600 resize-none focus:outline-none"
                      value={generateReadme(repoData, languages)}
                    />
                  ) : (
                    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                      <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-code:text-purple-300 prose-code:bg-gray-800 prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            img: ({ node, ...props }) => (
                              <img
                                {...props}
                                className="inline-block max-w-full h-auto rounded border border-gray-700"
                                style={{ filter: "brightness(1.1)" }}
                              />
                            ),
                            code: ({ node, inline, className, children, ...props }) => {
                              if (inline) {
                                return (
                                  <code className="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm border border-gray-700" {...props}>
                                    {children}
                                  </code>
                                );
                              }
                              const codeContent = String(children).replace(/\n$/, '');
                              return (
                                <div className="relative group">
                                  <button
                                    onClick={() => copyCodeToClipboard(codeContent)}
                                    className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                                    title="Copy code"
                                  >
                                    {copiedCode === codeContent ? (
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                      </svg>
                                    )}
                                  </button>
                                  <code className={`${className} block bg-gray-800 text-gray-300 p-4 rounded-lg border border-gray-700 overflow-x-auto pr-12`} {...props}>
                                    {children}
                                  </code>
                                </div>
                              );
                            },
                            pre: ({ node, children, ...props }) => (
                              <div className="relative group">
                                <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg border border-gray-700 overflow-x-auto" {...props}>
                                  {children}
                                </pre>
                              </div>
                            ),
                            h1: ({ node, ...props }) => (
                              <h1 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-700" {...props} />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2 className="text-2xl font-bold text-white mb-3 mt-8 pb-2 border-b border-gray-700" {...props} />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3 className="text-xl font-bold text-white mb-2 mt-6" {...props} />
                            ),
                            h4: ({ node, ...props }) => (
                              <h4 className="text-lg font-bold text-white mb-2 mt-4" {...props} />
                            ),
                            h5: ({ node, ...props }) => (
                              <h5 className="text-base font-bold text-white mb-2 mt-4" {...props} />
                            ),
                            h6: ({ node, ...props }) => (
                              <h6 className="text-sm font-bold text-white mb-2 mt-4" {...props} />
                            ),
                            p: ({ node, ...props }) => (
                              <p className="text-gray-300 mb-4 leading-relaxed" {...props} />
                            ),
                            a: ({ node, ...props }) => (
                              <a className="text-blue-400 hover:text-blue-300 hover:underline transition-colors" {...props} />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul className="text-gray-300 mb-4 pl-6 space-y-2" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol className="text-gray-300 mb-4 pl-6 space-y-2" {...props} />
                            ),
                            li: ({ node, ...props }) => (
                              <li className="text-gray-300" {...props} />
                            ),
                            blockquote: ({ node, ...props }) => (
                              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 bg-gray-800 p-4 rounded-r-lg" {...props} />
                            ),
                            table: ({ node, ...props }) => (
                              <div className="overflow-x-auto mb-4">
                                <table className="min-w-full border border-gray-700 rounded-lg" {...props} />
                              </div>
                            ),
                            thead: ({ node, ...props }) => (
                              <thead className="bg-gray-800" {...props} />
                            ),
                            tbody: ({ node, ...props }) => (
                              <tbody className="bg-gray-850" {...props} />
                            ),
                            tr: ({ node, ...props }) => (
                              <tr className="border-b border-gray-700" {...props} />
                            ),
                            th: ({ node, ...props }) => (
                              <th className="px-4 py-2 text-left text-white font-semibold border-r border-gray-700" {...props} />
                            ),
                            td: ({ node, ...props }) => (
                              <td className="px-4 py-2 text-gray-300 border-r border-gray-700" {...props} />
                            ),
                            hr: ({ node, ...props }) => (
                              <hr className="border-gray-700 my-8" {...props} />
                            )
                          }}
                        >
                          {generateReadme(repoData, languages)}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 text-center">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
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
  );
}