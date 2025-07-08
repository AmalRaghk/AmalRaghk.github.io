import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ArrowLeft, Search, Menu, Star, Reply, Forward, Trash2, Edit } from 'lucide-react';

const GmailApp: React.FC = () => {
  const { setCurrentApp } = useApp();
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [compose, setCompose] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    message: ''
  });

  const emails = [
    {
      id: 1,
      sender: 'John Doe',
      subject: 'Meeting Tomorrow',
      preview: 'Hi there, just wanted to confirm our meeting tomorrow at 2 PM...',
      time: '2:30 PM',
      read: false,
      starred: true,
      body: 'Hi there,\n\nJust wanted to confirm our meeting tomorrow at 2 PM. We can discuss the project details and next steps.\n\nBest regards,\nJohn'
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      subject: 'Project Update',
      preview: 'The latest project update is ready for your review...',
      time: '1:15 PM',
      read: true,
      starred: false,
      body: 'Hello,\n\nThe latest project update is ready for your review. Please find the attached documents and let me know if you have any questions.\n\nThanks,\nSarah'
    },
    {
      id: 3,
      sender: 'GitHub',
      subject: 'New pull request',
      preview: 'A new pull request has been submitted to your repository...',
      time: '12:45 PM',
      read: true,
      starred: false,
      body: 'A new pull request has been submitted to your repository "awesome-project".\n\nReview the changes and merge when ready.\n\nBest,\nGitHub Team'
    },
    {
      id: 4,
      sender: 'LinkedIn',
      subject: 'You have new connections',
      preview: '5 people want to connect with you on LinkedIn...',
      time: '11:30 AM',
      read: false,
      starred: true,
      body: 'Hello,\n\n5 people want to connect with you on LinkedIn. Check out their profiles and expand your network.\n\nBest,\nLinkedIn Team'
    }
  ];

  const filteredEmails = emails.filter(email =>
    email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBack = () => {
    setCurrentApp(null);
  };

  const handleEmailClick = (email: any) => {
    setSelectedEmail(email);
  };

  const handleComposeClick = () => {
    setCompose(true);
  };

  const handleSendEmail = () => {
    if (composeData.to && composeData.subject && composeData.message) {
      alert('Email sent successfully!');
      setCompose(false);
      setComposeData({ to: '', subject: '', message: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setComposeData(prev => ({ ...prev, [field]: value }));
  };

  if (compose) {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="bg-red-500 text-white p-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <button onClick={() => setCompose(false)} className="p-1">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-medium">Compose</h1>
          </div>
          <button 
            onClick={handleSendEmail}
            className="bg-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Send
          </button>
        </div>

        {/* Compose Form */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <input 
              type="email" 
              value={composeData.to}
              onChange={(e) => handleInputChange('to', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="recipient@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input 
              type="text" 
              value={composeData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter subject"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea 
              value={composeData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="w-full h-64 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Type your message here..."
            />
          </div>
        </div>
      </div>
    );
  }

  if (selectedEmail) {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="bg-red-500 text-white p-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSelectedEmail(null)} className="p-1">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-medium truncate flex-1">{selectedEmail.subject}</h1>
          </div>
          <Star className={`w-6 h-6 ${selectedEmail.starred ? 'text-yellow-300 fill-current' : 'text-white'}`} />
        </div>

        {/* Email Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{selectedEmail.subject}</h2>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {selectedEmail.sender.charAt(0)}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">{selectedEmail.sender}</span>
                  <p className="text-sm text-gray-500">to me</p>
                </div>
              </div>
              <span className="text-gray-500 text-sm">{selectedEmail.time}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="whitespace-pre-line text-gray-800 leading-relaxed">{selectedEmail.body}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 py-4 border-t">
            <button className="flex items-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Reply className="w-5 h-5" />
              <span>Reply</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <Forward className="w-5 h-5" />
              <span>Forward</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              <Trash2 className="w-5 h-5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-red-500 text-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center space-x-3">
          <button onClick={handleBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-medium">Gmail</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Search className="w-6 h-6" />
          <Menu className="w-6 h-6" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search mail"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
              !email.read ? 'bg-blue-50' : ''
            }`}
            onClick={() => handleEmailClick(email)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {email.sender.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm font-medium ${
                    !email.read ? 'text-gray-900' : 'text-gray-700'
                  }`}>
                    {email.sender}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{email.time}</span>
                    {email.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                  </div>
                </div>
                <p className={`text-sm truncate ${
                  !email.read ? 'text-gray-900 font-medium' : 'text-gray-600'
                }`}>
                  {email.subject}
                </p>
                <p className="text-xs text-gray-500 truncate mt-1">
                  {email.preview}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {filteredEmails.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No emails found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Compose Button */}
      <button
        onClick={handleComposeClick}
        className="absolute bottom-6 right-6 w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
      >
        <Edit className="w-6 h-6" />
      </button>
    </div>
  );
};

export default GmailApp;