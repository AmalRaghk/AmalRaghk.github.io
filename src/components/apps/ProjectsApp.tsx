import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ArrowLeft, Search, Star, GitFork, Code, Eye, FileText } from 'lucide-react';
import {
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss3, SiCplusplus, SiPhp, SiC
} from 'react-icons/si';

const languageStyles: { [key: string]: { color: string; Logo: React.FC<{ className?: string }> } } = {
  JavaScript: { color: '#f1e05a', Logo: SiJavascript },
  TypeScript: { color: '#3178c6', Logo: SiTypescript },
  Python: { color: '#3572A5', Logo: SiPython },
  HTML: { color: '#e34c26', Logo: SiHtml5 },
  CSS: { color: '#563d7c', Logo: SiCss3 },
  'C++': { color: '#f34b7d', Logo: SiCplusplus },
  PHP: { color: '#4F5D95', Logo: SiPhp },
  C: { color: '#555555', Logo: SiC },
};

const getLanguageStyle = (language: string | null) => {
  if (language && languageStyles[language]) {
    return languageStyles[language];
  }
  return { color: '#6e7681', Logo: Code };
};

interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updated: string;
  updatedDate: Date; // Add actual date for sorting
  isPrivate: boolean;
}

const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return `Updated ${Math.floor(interval)} years ago`;
  interval = seconds / 2592000;
  if (interval > 1) return `Updated ${Math.floor(interval)} months ago`;
  interval = seconds / 86400;
  if (interval > 1) return `Updated ${Math.floor(interval)} days ago`;
  interval = seconds / 3600;
  if (interval > 1) return `Updated ${Math.floor(interval)} hours ago`;
  interval = seconds / 60;
  if (interval > 1) return `Updated ${Math.floor(interval)} minutes ago`;
  return `Updated ${Math.floor(seconds)} seconds ago`;
};

const ProjectsApp: React.FC = () => {
  const { setCurrentApp } = useApp();
  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 6;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/amalraghk/repos');
        if (!response.ok) throw new Error('Failed to fetch repositories.');
        const data = await response.json();
        const formattedRepos: Repo[] = data.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updated: formatRelativeTime(repo.pushed_at),
          updatedDate: new Date(repo.pushed_at), // Store actual date for sorting
          isPrivate: repo.private,
        }));
        // Sort by actual date (newest first)
        const sortedRepos = formattedRepos.sort((a, b) => b.updatedDate.getTime() - a.updatedDate.getTime());
        setRepositories(sortedRepos);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);

  const handleBack = () => setCurrentApp(null);
  const handleRepoClick = (repo: Repo) => setSelectedRepo(repo);

  if (selectedRepo) {
    const { Logo } = getLanguageStyle(selectedRepo.language);
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="bg-gray-900 text-white p-3 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSelectedRepo(null)}><ArrowLeft className="w-5 h-5" /></button>
            <h1 className="text-lg font-medium">{selectedRepo.name}</h1>
          </div>
        </div>
        <div className="p-3 bg-gray-50 border-b">
          <p className="text-gray-600 mb-2">{selectedRepo.description || 'No description available.'}</p>
          <div className="flex items-center space-x-4 text-sm flex-wrap">
            {selectedRepo.language && (
              <div className="flex items-center space-x-1.5">
                <Logo className="w-4 h-4" />
                <span>{selectedRepo.language}</span>
              </div>
            )}
            <div className="flex items-center space-x-1"><Star className="w-4 h-4" /><span>{selectedRepo.stars}</span></div>
            <div className="flex items-center space-x-1"><GitFork className="w-4 h-4" /><span>{selectedRepo.forks}</span></div>
            <div className="flex items-center space-x-1"><Eye className="w-4 h-4" /><span>Watching</span></div>
          </div>
        </div>
        <div className="flex border-b bg-white">
          <button className="px-4 py-2 text-sm font-medium border-b-2 border-orange-500 text-gray-900"><Code className="w-4 h-4 inline mr-2" />Code</button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {['src/', 'public/', 'package.json', 'README.md', '.gitignore'].map((file) => (
            <div key={file} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{file}</span>
              <span className="text-xs text-gray-500 ml-auto">{selectedRepo.updated}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-gray-900 text-white p-3 flex items-center justify-between border-b">
        <div className="flex items-center space-x-3">
          <button onClick={handleBack}><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-lg font-medium">My Projects</h1>
        </div>
        <Search className="w-5 h-5" />
      </div>
      <div className="p-3 bg-gray-50 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Find a repository..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {loading && <div className="p-8 text-center text-gray-500">Loading repositories...</div>}
        {error && <div className="p-8 text-center text-red-500">Error: {error}</div>}
        {!loading && currentRepos.map((repo) => {
          const { color } = getLanguageStyle(repo.language);
          return (
            <div key={repo.id} className="p-3 border-b cursor-pointer hover:bg-gray-50" onClick={() => handleRepoClick(repo)}>
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-blue-600">{repo.name}</h3>
                    {repo.isPrivate && <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">Private</span>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{repo.description || 'No description.'}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 flex-wrap">
                    {repo.language && (
                      <div className="flex items-center space-x-1.5">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1"><Star className="w-3 h-3" /><span>{repo.stars}</span></div>
                    <div className="flex items-center space-x-1"><GitFork className="w-3 h-3" /><span>{repo.forks}</span></div>
                    <span>{repo.updated}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {!loading && filteredRepos.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No repositories found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="p-4 flex justify-center space-x-2 border-t bg-gray-50">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 text-sm rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white border text-gray-700'}`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsApp;