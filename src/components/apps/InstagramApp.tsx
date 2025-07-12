import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import {
  ArrowLeft,
  Search,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Camera,
  Plus,
  Home,
  User,
} from 'lucide-react';
import image1 from '../../../public/6136306495936119394.jpg';
import image2 from '../../../public/6309900406796436987.jpg';
import image3 from '../../../public/6309900406796436988.jpg';
// Helper for avatar images, fallback to initials if no url
const Avatar = ({ avatar, username, size = 8, src }: { avatar: string; username: string; size?: number; src?: string }) => (
  <div
    className={`w-${size} h-${size} bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300`}
    style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}
  >
    {src ? (
      <img src={src} alt={username} className="w-full h-full object-cover" />
    ) : (
      <span className="text-sm font-medium text-gray-700">{avatar}</span>
    )}
  </div>
);

const InstagramApp: React.FC = () => {
  const { setCurrentApp } = useApp();
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState([
  {
    id: 1,
    username: 'Amal_Ragh',
    avatar: 'A',
    location: 'India',
    time: '2h',
    image: image1,
    caption: '❤️',
    likes: 240,
    comments: 4,
    isLiked: false,
    avatarUrl: image1,
  },
  {
    id: 2,
    username: 'Amal_Ragh',
    avatar: 'A',
    location: 'India',
    time: '4h',
    image: image2,
    caption: '🖤',
    likes: 240,
    comments: 4,
    isLiked: true,
    avatarUrl: image1,
  },
  {
    id: 3,
    username: 'Amal_Ragh',
    avatar: 'A',
    location: 'India',
    time: '1d',
    image: image3,
    caption: '🤍',
    likes: 240,
    comments: 4,
    isLiked: false,
    avatarUrl:image1
  },
]
  );

  // Sample stories with avatar urls for realism
  const stories = [
    { id: 1, username: 'Your Story', avatar: '+', isOwn: true, avatarUrl: '' },
   
  ];

  const handleBack = () => setCurrentApp(null);

  const handlePostClick = (post: any) => setSelectedPost(post);

  const handleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );

    // Update selectedPost likes state as well
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev: any) => ({
        ...prev,
        isLiked: !prev.isLiked,
        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      }));
    }
  };

  // Filtering for search
  const filteredPosts = posts.filter(
    post =>
      post.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.caption.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Post Details Page ---
  if (selectedPost) {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSelectedPost(null)} className="p-1">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <Avatar
                avatar={selectedPost.avatar}
                username={selectedPost.username}
                size={8}
                src={selectedPost.avatarUrl}
              />
              <div>
                <h3 className="font-medium text-sm">{selectedPost.username}</h3>
                <p className="text-xs text-gray-500">{selectedPost.location}</p>
              </div>
            </div>
          </div>
          <MoreHorizontal className="w-6 h-6 text-gray-600" />
        </div>

        {/* Post Image */}
        <div className="flex-1 bg-black flex items-center justify-center relative">
          <img
            src={selectedPost.image}
            alt="Post"
            className="max-w-full max-h-full object-contain"
            style={{ aspectRatio: '1/1', width: '100%', height: 'auto', background: 'black' }}
            onError={e => {
              e.currentTarget.src =
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzE0NC43NzIgMTAwIDEwMCAxNDQuNzcyIDEwMCAyMDBTMTQ0Ljc3MiAzMDAgMjAwIDMwMFMyOTkuOTk5IDI1NS4yMjggMjk5Ljk5OSAyMDBTMjU1LjIyNyAxMDAgMjAwIDEwMFpNMjAwIDI1MEMxNzIuMzg2IDI1MCA1MCAyMjcuNjE0IDE1MCAyMDBTMTcyLjM4NiAxNTAgMjAwIDE1MFMyNTAgMTcyLjM4NiAyNTAgMjAwUzIyNy42MTQgMjUwIDIwMCAyNTBaIiBmaWxsPSIjOUI5QjlCIi8+Cjwvc3ZnPgo=';
            }}
          />
        </div>

        {/* Post Actions */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <button onClick={() => handleLike(selectedPost.id)}>
                <Heart
                  className={`w-7 h-7 transition-colors duration-150 ${selectedPost.isLiked ? 'text-red-500 fill-current' : 'text-gray-700'}`}
                  fill={selectedPost.isLiked ? 'currentColor' : 'none'}
                />
              </button>
              <MessageCircle className="w-7 h-7 text-gray-700" />
              <Share className="w-7 h-7 text-gray-700" />
            </div>
          </div>
          <p className="font-medium text-sm mb-2">{selectedPost.likes.toLocaleString()} likes</p>
          <p className="text-sm leading-relaxed">
            <span className="font-medium">{selectedPost.username}</span> {selectedPost.caption}
          </p>
          <p className="text-gray-500 text-sm mt-2">View all {selectedPost.comments} comments</p>
          <p className="text-gray-500 text-xs mt-1">{selectedPost.time}</p>
        </div>
      </div>
    );
  }

  // --- Main Feed ---
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <button onClick={handleBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold font-serif tracking-tight">Instagram</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Camera className="w-6 h-6 text-gray-700 cursor-pointer" />
          <button onClick={() => setSearchTerm(searchTerm ? '' : 'search')}>
            <Search className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchTerm && (
        <div className="p-4 bg-gray-50 border-b sticky top-14 z-10">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm === 'search' ? '' : searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Stories */}
      <div className="p-3 border-b bg-white sticky top-[4.5rem] z-10">
        <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
          {stories.map(story => (
            <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
              <div
                className={`rounded-full p-1 flex items-center justify-center relative
                  ${story.isOwn
                    ? 'bg-white border-2 border-gray-300'
                    : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 border-2 border-transparent'}
                `}
                style={{
                  width: 64,
                  height: 64,
                  padding: 2,
                  borderWidth: 2,
                  borderStyle: 'solid',
                  borderColor: story.isOwn ? '#D1D5DB' : 'transparent',
                }}
              >
                {story.isOwn ? (
                  <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                    <Plus className="w-6 h-6 text-gray-600" />
                  </div>
                ) : (
                  <Avatar avatar={story.avatar} username={story.username} size={16} src={story.avatarUrl} />
                )}
                {!story.isOwn && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-gray-100"></span>
                )}
              </div>
              <span className="text-xs text-gray-700 truncate w-16 text-center">{story.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto bg-neutral-50">
        {filteredPosts.map(post => (
          <div key={post.id} className="border-b bg-white">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Avatar avatar={post.avatar} username={post.username} size={8} src={post.avatarUrl} />
                <div>
                  <h3 className="font-medium text-sm">{post.username}</h3>
                  <p className="text-xs text-gray-500">{post.location}</p>
                </div>
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </div>
            {/* Post Image */}
            <div
              className="relative aspect-square bg-black cursor-pointer overflow-hidden"
              onClick={() => handlePostClick(post)}
              style={{ background: '#000' }}
            >
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                onError={e => {
                  e.currentTarget.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzE0NC43NzIgMTAwIDEwMCAxNDQuNzcyIDEwMCAyMDBTMTQ0Ljc3MiAzMDAgMjAwIDMwMFMyOTkuOTk5IDI1NS4yMjggMjk5Ljk5OSAyMDBTMjU1LjIyNyAxMDAgMjAwIDEwMFpNMjAwIDI1MEMxNzIuMzg2IDI1MCA1MCAyMjcuNjE0IDE1MCAyMDBTMTcyLjM4NiAxNTAgMjAwIDE1MFMyNTAgMTcyLjM4NiAyNTAgMjAwUzIyNy42MTQgMjUwIDIwMCAyNTBaIiBmaWxsPSIjOUI5QjlCIi8+Cjwvc3ZnPgo=';
                }}
              />
            </div>
            {/* Post Actions */}
            <div className="p-4">
              <div className="flex items-center space-x-4 mb-1">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleLike(post.id);
                  }}
                >
                  <Heart
                    className={`w-7 h-7 transition-colors duration-150 ${post.isLiked ? 'text-red-500 fill-current' : 'text-gray-700'}`}
                    fill={post.isLiked ? 'currentColor' : 'none'}
                  />
                </button>
                <MessageCircle className="w-7 h-7 text-gray-700" />
                <Share className="w-7 h-7 text-gray-700" />
              </div>
              <p className="font-medium text-sm mb-1">{post.likes.toLocaleString()} likes</p>
              <p className="text-sm leading-relaxed">
                <span className="font-medium">{post.username}</span> {post.caption}
              </p>
              <p className="text-gray-500 text-sm mt-2">View all {post.comments} comments</p>
              <p className="text-gray-400 text-xs mt-1">{post.time}</p>
            </div>
          </div>
        ))}
        {filteredPosts.length === 0 && searchTerm && searchTerm !== 'search' && (
          <div className="p-8 text-center text-gray-500">
            <p>No posts found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
      {/* Bottom Navigation */}
      <div className="border-t bg-white p-2 sticky bottom-0 z-30">
        <div className="flex justify-around">
          <button
            className={`p-3 ${activeTab === 'home' ? 'text-black' : 'text-gray-400'}`}
            onClick={() => setActiveTab('home')}
            aria-label="Home"
          >
            <Home className="w-6 h-6" />
          </button>
          <button
            className={`p-3 ${activeTab === 'search' ? 'text-black' : 'text-gray-400'}`}
            onClick={() => setActiveTab('search')}
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>
          <button
            className={`p-3 ${activeTab === 'add' ? 'text-black' : 'text-gray-400'}`}
            onClick={() => setActiveTab('add')}
            aria-label="Add"
          >
            <Plus className="w-6 h-6" />
          </button>
          <button
            className={`p-3 ${activeTab === 'profile' ? 'text-black' : 'text-gray-400'}`}
            onClick={() => setActiveTab('profile')}
            aria-label="Profile"
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstagramApp;