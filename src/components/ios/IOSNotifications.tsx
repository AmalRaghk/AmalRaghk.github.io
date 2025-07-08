import React from 'react';
import { X, Mail, MessageSquare, Instagram, Github } from 'lucide-react';

interface IOSNotificationsProps {
  onClose: () => void;
}

const IOSNotifications: React.FC<IOSNotificationsProps> = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      app: 'Mail',
      icon: Mail,
      title: 'New Email',
      message: 'You have 3 new messages from John Doe',
      time: '2m ago',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      app: 'Messages',
      icon: MessageSquare,
      title: 'Sarah Wilson',
      message: 'Hey, are we still meeting today?',
      time: '5m ago',
      color: 'bg-green-500'
    },
    {
      id: 3,
      app: 'Instagram',
      icon: Instagram,
      title: 'Instagram',
      message: 'adventurer_jane liked your photo',
      time: '10m ago',
      color: 'bg-pink-500'
    },
    {
      id: 4,
      app: 'GitHub',
      icon: Github,
      title: 'GitHub',
      message: 'New pull request in awesome-project',
      time: '15m ago',
      color: 'bg-gray-800'
    }
  ];

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start z-30 animate-slide-down">
      <div className="w-full bg-gray-800 rounded-b-3xl p-6 transform transition-transform duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-lg font-semibold">Notifications</h2>
          <button onClick={onClose} className="text-white p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-gray-700 rounded-2xl p-4 flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-xl ${notification.color} flex items-center justify-center flex-shrink-0`}>
                <notification.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-white font-medium text-sm">{notification.app}</h3>
                  <span className="text-gray-400 text-xs flex-shrink-0">{notification.time}</span>
                </div>
                <p className="text-white text-sm font-medium mb-1">{notification.title}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IOSNotifications;