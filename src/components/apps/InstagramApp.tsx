import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ArrowLeft, Search, Heart, MessageCircle, Share, MoreHorizontal, Camera, Plus, Home, User } from 'lucide-react';

const InstagramApp: React.FC = () => {
  const { setCurrentApp } = useApp();
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'adventurer_jane',
      avatar: 'J',
      location: 'Santorini, Greece',
      time: '2h',
      image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Sunset views in Santorini never get old 🌅 #sunset #travel #greece',
      likes: 1234,
      comments: 56,
      isLiked: false
    },
    {
      id: 2,
      username: 'foodie_mike',
      avatar: 'M',
      location: 'New York, NY',
      time: '4h',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Best pizza in NYC! 🍕 Who wants the recipe?',
      likes: 892,
      comments: 23,
      isLiked: true
    },
    {
      id: 3,
      username: 'nature_lover',
      avatar: 'N',
      location: 'Yosemite National Park',
      time: '1d',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Morning hike in Yosemite 🏔️ Nature is the best therapy',
      likes: 2567,
      comments: 189,
      isLiked: false
    },
    {
      id: 4,
      username: 'city_explorer',
      avatar: 'C',
      location: 'Tokyo, Japan',
      time: '2d',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Neon lights and city nights ✨ Tokyo never sleeps',
      likes: 1876,
      comments: 94,
      isLiked: true
    }
  ]);

  const stories = [
    { id: 1, username: 'Your Story', avatar: '+', isOwn: true },
    { id: 2, username: 'john_doe', avatar: 'J', isOwn: false },
    { id: 3, username: 'sarah_w', avatar: 'S', isOwn: false },
    { id: 4, username: 'mike_c', avatar: 'M', isOwn: false },
    { id: 5, username: 'travel_bug', avatar: 'T', isOwn: false },
  ];

  const handleBack = () => {
    setCurrentApp(null);
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
  };

  const handleLike = (postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1 
            }
          : post
      )
    );
    
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev: any) => ({
        ...prev,
        isLiked: !prev.isLiked,
        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
      }));
    }
  };

  const filteredPosts = posts.filter(post =>
    post.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.caption.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPost) {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSelectedPost(null)} className="p-1">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">{selectedPost.avatar}</span>
              </div>
              <div>
                <h3 className="font-medium text-sm">{selectedPost.username}</h3>
                <p className="text-xs text-gray-500">{selectedPost.location}</p>
              </div>
            </div>
          </div>
          <MoreHorizontal className="w-6 h-6 text-gray-600" />
        </div>

        {/* Post Image */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <img
            src={selectedPost.image}
            alt="Post"
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzE0NC43NzIgMTAwIDEwMCAxNDQuNzcyIDEwMCAyMDBTMTQ0Ljc3MiAzMDAgMjAwIDMwMFMyOTkuOTk5IDI1NS4yMjggMjk5Ljk5OSAyMDBTMjU1LjIyNyAxMDAgMjAwIDEwMFpNMjAwIDI1MEMxNzIuMzg2IDI1MCA1MCAyMjcuNjE0IDE1MCAyMDBTMTcyLjM4NiAxNTAgMjAwIDE1MFMyNTAgMTcyLjM4NiAyNTAgMjAwUzIyNy42MTQgMjUwIDIwMCAyNTBaIiBmaWxsPSIjOUI5QjlCIi8+Cjwvc3ZnPgo=';
            }}
          />
        </div>

        {/* Post Actions */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <button onClick={() => handleLike(selectedPost.id)}>
                <Heart className={`w-7 h-7 ${selectedPost.isLiked ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
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

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={handleBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Instagram</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Camera className="w-6 h-6 text-gray-700" />
          <button onClick={() => setSearchTerm(searchTerm ? '' : 'search')}>
            <Search className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchTerm && (
        <div className="p-4 bg-gray-50 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Instagram"
              value={searchTerm === 'search' ? '' : searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Stories */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-4 overflow-x-auto">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                story.isOwn 
                  ? 'bg-gray-200 border-2 border-dashed border-gray-400' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 p-0.5'
              }`}>
                {story.isOwn ? (
                  <Plus className="w-6 h-6 text-gray-600" />
                ) : (
                  <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">{story.avatar}</span>
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-600 truncate w-16 text-center">
                {story.username}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        {filteredPosts.map((post) => (
          <div key={post.id} className="border-b">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{post.avatar}</span>
                </div>
                <div>
                  <h3 className="font-medium text-sm">{post.username}</h3>
                  <p className="text-xs text-gray-500">{post.location}</p>
                </div>
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </div>

            {/* Post Image */}
            <div 
              className="aspect-square bg-gray-100 cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzE0NC43NzIgMTAwIDEwMCAxNDQuNzcyIDEwMCAyMDBTMTQ0Ljc3MiAzMDAgMjAwIDMwMFMyOTkuOTk5IDI1NS4yMjggMjk5Ljk5OSAyMDBTMjU1LjIyNyAxMDAgMjAwIDEwMFpNMjAwIDI1MEMxNzIuMzg2IDI1MCA1MCAyMjcuNjE0IDE1MCAyMDBTMTcyLjM4NiAxNTAgMjAwIDE1MFMyNTAgMTcyLjM4NiAyNTAgMjAwUzIyNy42MTQgMjUwIDIwMCAyNTBaIiBmaWxsPSIjOUI5QjlCIi8+Cjwvc3ZnPgo=';
                }}
              />
            </div>

            {/* Post Actions */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleLike(post.id);
                  }}>
                    <Heart className={`w-7 h-7 ${post.isLiked ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                  </button>
                  <MessageCircle className="w-7 h-7 text-gray-700" />
                  <Share className="w-7 h-7 text-gray-700" />
                </div>
              </div>
              <p className="font-medium text-sm mb-2">{post.likes.toLocaleString()} likes</p>
              <p className="text-sm leading-relaxed">
                <span className="font-medium">{post.username}</span> {post.caption}
              </p>
              <p className="text-gray-500 text-sm mt-2">View all {post.comments} comments</p>
              <p className="text-gray-500 text-xs mt-1">{post.time}</p>
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
      <div className="border-t bg-white p-2">
        <div className="flex justify-around">
          <button 
            className={`p-3 ${activeTab === 'home' ? 'text-black' : 'text-gray-400'}`}
            onClick={() => setActiveTab('home')}
          >
            <Home className="w-6 h-6" />
          </button>
          <button 
            className={`p-3 ${activeTab === 'search' ? 'text-black' : 'text-gray-400'}`}
            onClick={() => setActiveTab('search')}
          >
            <Search className="w-6 h-6" />
          </button>
          <button 
            className={`p-3 ${activeTab === 'add' ? 'text-black' : 'text-gray-400'}`}
            onClick={() => setActiveTab('add')}
          >
            <Plus className="w-6 h-6" />
          </button>
          <button 
            className={`p-3 ${activeTab === 'profile' ? 'text-black' : 'text-gray-400'}`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstagramApp;