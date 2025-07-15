import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ArrowLeft, Search, Menu, Star, Reply, Forward, Trash2, Edit, ExternalLink } from 'lucide-react';

const ContactApp: React.FC = () => {
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
      sender: 'Draft',
      subject: 'Contact Instructions - How to Reach Amal',
      preview: 'Instructions for contacting Amal Raghk through this portfolio app...',
      time: 'Draft',
      read: false,
      starred: false,
      body: 'Hello!\n\nThank you for visiting my portfolio. This mail app is a demonstration of my React development skills.\n\nTo contact me, you have several options:\n\n📧 Email Client: Use the compose feature and click "Send" to open your default email client\n🌐 Gmail Web: Click "Gmail Web" to open Gmail in your browser\n📱 Copy Methods: Use the copy buttons to get my email address or full message\n\nDirect contact: amalraghk123@gmail.com\n\nIf your email client isn\'t configured, don\'t worry! The app provides multiple fallback options including:\n- Opening Gmail in your browser\n- Copying email address to clipboard\n- Copying the full message for manual sending\n\nI look forward to hearing from you!\n\nBest regards,\nAmal Raghk\n\nP.S. This is a demo email showing the app\'s functionality and contact methods. Feel free to explore other features of my portfolio!',
      isDraft: true
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
    setComposeData({
      to: 'amalraghk123@gmail.com',
      subject: 'Contact from Portfolio Visitor',
      message: 'Hello Amal,\n\nI visited your portfolio and would like to connect with you.\n\n'
    });
  };

  const handleSendEmail = () => {
    if (composeData.to && composeData.subject && composeData.message) {
      // Create mailto URL
      const mailtoUrl = `mailto:${composeData.to}?subject=${encodeURIComponent(composeData.subject)}&body=${encodeURIComponent(composeData.message)}`;
      
      try {
        // Try to open in user's default email client
        window.location.href = mailtoUrl;
        
        // Show success message and alternatives
        setTimeout(() => {
          if (confirm('Email client should have opened. If not, would you like to see alternative contact methods?')) {
            showAlternativeContact();
          }
        }, 1000);
        
        // Reset compose form
        setCompose(false);
        setComposeData({ to: '', subject: '', message: '' });
      } catch (error) {
        showAlternativeContact();
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const showAlternativeContact = () => {
    const message = `
Email client not configured? Here are alternative ways to contact:

📧 Email: amalraghk123@gmail.com
🌐 Gmail Web: https://mail.google.com/mail/?view=cm&to=amalraghk123@gmail.com
📱 Copy email address to clipboard

Your message:
Subject: ${composeData.subject}
Message: ${composeData.message}
    `;
    
    if (confirm(message + '\n\nWould you like to copy the email address to clipboard?')) {
      navigator.clipboard.writeText('amalraghk123@gmail.com').then(() => {
        alert('Email address copied to clipboard!');
      }).catch(() => {
        alert('Please manually copy: amalraghk123@gmail.com');
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setComposeData(prev => ({ ...prev, [field]: value }));
  };

  const quickContact = () => {
    setCompose(true);
    setComposeData({
      to: 'amalraghk123@gmail.com',
      subject: 'Quick Contact from Portfolio',
      message: 'Hello Amal,\n\nI found your portfolio impressive and would like to discuss potential opportunities.\n\nLooking forward to hearing from you!\n\nBest regards,'
    });
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
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleSendEmail}
              className="bg-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Send</span>
            </button>
            <button 
              onClick={() => {
                const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${composeData.to}&subject=${encodeURIComponent(composeData.subject)}&body=${encodeURIComponent(composeData.message)}`;
                window.open(gmailUrl, '_blank');
              }}
              className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>🌐</span>
              <span>Gmail Web</span>
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Clicking "Send" will try to open your default email client. 
            If you don't have one configured, alternative contact methods will be provided.
          </p>
        </div>

        {/* Alternative Contact Methods */}
        <div className="bg-gray-50 p-4 border-b">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Alternative Contact Methods:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">📧 Direct Email:</span>
              <button 
                onClick={() => navigator.clipboard.writeText('amalraghk123@gmail.com').then(() => alert('Email copied!'))}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                amalraghk123@gmail.com
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">🌐 Gmail Web:</span>
              <a 
                href={`https://mail.google.com/mail/?view=cm&to=amalraghk123@gmail.com&subject=${encodeURIComponent(composeData.subject)}&body=${encodeURIComponent(composeData.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Open in Gmail
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">📱 Copy Message:</span>
              <button 
                onClick={() => {
                  const fullMessage = `To: amalraghk123@gmail.com\nSubject: ${composeData.subject}\n\n${composeData.message}`;
                  navigator.clipboard.writeText(fullMessage).then(() => alert('Message copied to clipboard!'));
                }}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Copy Full Message
              </button>
            </div>
          </div>
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
          <div className="flex items-center space-x-2">
            {selectedEmail.isDraft && (
              <span className="text-xs bg-orange-500 px-2 py-1 rounded-full">DRAFT</span>
            )}
            <Star className={`w-6 h-6 ${selectedEmail.starred ? 'text-yellow-300 fill-current' : 'text-white'}`} />
          </div>
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
                  <p className="text-sm text-gray-500">{selectedEmail.isDraft ? 'Draft' : 'to me'}</p>
                </div>
              </div>
              <span className="text-gray-500 text-sm">{selectedEmail.time}</span>
            </div>
          </div>
          
          <div className={`rounded-lg p-4 mb-6 ${selectedEmail.isDraft ? 'bg-orange-50 border border-orange-200' : 'bg-gray-50'}`}>
            <p className="whitespace-pre-line text-gray-800 leading-relaxed">{selectedEmail.body}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 py-4 border-t">
            {selectedEmail.isDraft ? (
              <button 
                onClick={quickContact}
                className="flex items-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Edit className="w-5 h-5" />
                <span>Contact Amal</span>
              </button>
            ) : (
              <>
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
              </>
            )}
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
          <h1 className="text-lg font-medium">Mail</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Search className="w-6 h-6" />
          <Menu className="w-6 h-6" />
        </div>
      </div>

      {/* Quick Contact Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
        <div>
          <h3 className="font-medium">Want to get in touch?</h3>
          <p className="text-sm opacity-90">Send me a message directly</p>
        </div>
        <button
          onClick={quickContact}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Contact Me
        </button>
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
            } ${email.isDraft ? 'bg-orange-50 border-l-4 border-l-orange-400' : ''}`}
            onClick={() => handleEmailClick(email)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  email.isDraft ? 'bg-orange-200' : 'bg-gray-300'
                }`}>
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
                    {email.isDraft && <span className="ml-2 text-xs text-orange-600">(Draft)</span>}
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

export default ContactApp;