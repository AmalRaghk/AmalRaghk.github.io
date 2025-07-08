import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ArrowLeft, Search, Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp } from 'lucide-react';

const LinkedInApp: React.FC = () => {
  const { setCurrentApp } = useApp();
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'John Smith',
      title: 'Senior Software Engineer at Google',
      time: '2h',
      content: 'Excited to share that our team just launched a new AI-powered feature that will help millions of users worldwide. The journey from concept to deployment taught me so much about machine learning and scalable architecture. #AI #SoftwareEngineering #Google',
      likes: 234,
      comments: 18,
      shares: 5,
      isLiked: false,
      image: null
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      title: 'Product Manager at Microsoft',
      time: '4h',
      content: 'Just finished reading "The Design of Everyday Things" and I\'m amazed by how relevant it still is in today\'s digital world. User experience is everything! What books have shaped your approach to product design? #UX #ProductManagement #Books',
      likes: 156,
      comments: 23,
      shares: 8,
      isLiked: false,
      image: null
    },
    {
      id: 3,
      author: 'Mike Chen',
      title: 'Startup Founder',
      time: '1d',
      content: 'Celebrating our Series A funding round! 🎉 Thank you to all our investors and the amazing team that made this possible. Here\'s to building the future of fintech! The journey has been incredible and we\'re just getting started. #Startup #Funding #Fintech',
      likes: 567,
      comments: 89,
      shares: 34,
      isLiked: true,
      image: null
    }
  ]);

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
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPost) {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="bg-blue-600 text-white p-3 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSelectedPost(null)}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-medium">Post</h1>
          </div>
        </div>

        {/* Post Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {selectedPost.author.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{selectedPost.author}</h3>
              <p className="text-sm text-gray-600">{selectedPost.title}</p>
              <p className="text-sm text-gray-500">{selectedPost.time}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-800 leading-relaxed">{selectedPost.content}</p>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => handleLike(selectedPost.id)}
                className={`flex items-center space-x-2 ${selectedPost.isLiked ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600`}
              >
                <ThumbsUp className={`w-5 h-5 ${selectedPost.isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{selectedPost.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{selectedPost.comments}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Share className="w-5 h-5" />
                <span className="text-sm">{selectedPost.shares}</span>
              </button>
            </div>
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 flex items-center justify-between border-b">
        <div className="flex items-center space-x-3">
          <button onClick={handleBack}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-medium">LinkedIn</h1>
        </div>
        <Search className="w-5 h-5" />
      </div>

      {/* Search Bar */}
      <div className="p-3 bg-gray-50 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search LinkedIn"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 border-b cursor-pointer hover:bg-gray-50"
            onClick={() => handlePostClick(post)}
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{post.author}</h3>
                    <p className="text-sm text-gray-600">{post.title}</p>
                    <p className="text-sm text-gray-500">{post.time}</p>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="mt-3">
                  <p className="text-gray-800 leading-relaxed">{post.content}</p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.id);
                      }}
                      className={`flex items-center space-x-2 ${post.isLiked ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                      <Share className="w-4 h-4" />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredPosts.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No posts found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInApp;