import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ArrowLeft, Search, Star, GitFork, Code, Eye, FileText } from 'lucide-react';

const GitHubApp: React.FC = () => {
  const { setCurrentApp } = useApp();
  const [selectedRepo, setSelectedRepo] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const repositories = [
    {
      id: 1,
      name: 'awesome-project',
      description: 'A really awesome project built with React and TypeScript',
      language: 'TypeScript',
      stars: 1234,
      forks: 56,
      updated: '2 hours ago',
      isPrivate: false
    },
    {
      id: 2,
      name: 'web-components',
      description: 'Collection of reusable web components',
      language: 'JavaScript',
      stars: 892,
      forks: 34,
      updated: '1 day ago',
      isPrivate: false
    },
    {
      id: 3,
      name: 'mobile-app',
      description: 'Cross-platform mobile application',
      language: 'React Native',
      stars: 567,
      forks: 23,
      updated: '3 days ago',
      isPrivate: true
    }
  ];

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBack = () => {
    setCurrentApp(null);
  };

  const handleRepoClick = (repo: any) => {
    setSelectedRepo(repo);
  };

  if (selectedRepo) {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="bg-gray-900 text-white p-3 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSelectedRepo(null)}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-medium">{selectedRepo.name}</h1>
          </div>
        </div>

        {/* Repository Stats */}
        <div className="p-3 bg-gray-50 border-b">
          <p className="text-gray-600 mb-2">{selectedRepo.description}</p>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>{selectedRepo.language}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{selectedRepo.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="w-4 h-4" />
              <span>{selectedRepo.forks}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>Watching</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b bg-white">
          <button className="px-4 py-2 text-sm font-medium border-b-2 border-blue-500 text-blue-600">
            <Code className="w-4 h-4 inline mr-2" />
            Code
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            Issues
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            Pull requests
          </button>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <div className="space-y-1">
              {['src/', 'public/', 'package.json', 'README.md', '.gitignore', 'tsconfig.json'].map((file) => (
                <div key={file} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{file}</span>
                  <span className="text-xs text-gray-500 ml-auto">Updated {selectedRepo.updated}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white p-3 flex items-center justify-between border-b">
        <div className="flex items-center space-x-3">
          <button onClick={handleBack}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-medium">GitHub</h1>
        </div>
        <Search className="w-5 h-5" />
      </div>

      {/* Search Bar */}
      <div className="p-3 bg-gray-50 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Repository List */}
      <div className="flex-1 overflow-y-auto">
        {filteredRepos.map((repo) => (
          <div
            key={repo.id}
            className="p-3 border-b cursor-pointer hover:bg-gray-50"
            onClick={() => handleRepoClick(repo)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-blue-600">{repo.name}</h3>
                  {repo.isPrivate && (
                    <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">Private</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{repo.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="w-3 h-3" />
                    <span>{repo.forks}</span>
                  </div>
                  <span>Updated {repo.updated}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredRepos.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No repositories found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubApp;