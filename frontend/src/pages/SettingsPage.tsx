import React, { useState } from 'react';
import { 
  User, Building2, Mail, Lock, Bell, Zap, 
  Save, CheckCircle, Trash2, Link as LinkIcon,
  Sliders, Globe, Phone, MessageSquare 
} from 'lucide-react';
import { useAuthStore } from '../contexts/AuthContext';

export const SettingsPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    companyName: user?.companyName || '',
    email: user?.email || '',
    industry: '',
    website: '',
    phoneNumber: '',
  });

  const [agentSettings, setAgentSettings] = useState({
    agentName: 'Lummy AI Agent',
    tone: 'professional',
    formality: 'balanced',
    responseSpeed: 'fast',
    learningMode: true,
    autoEscalate: true,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    escalationAlerts: true,
    dailySummary: true,
    weeklyReport: true,
  });

  const [integrations] = useState([
    { id: 'slack', name: 'Slack', icon: '💬', connected: false, description: 'Connect your Slack workspace' },
    { id: 'email', name: 'Email', icon: '📧', connected: true, description: 'Gmail integration active' },
    { id: 'zendesk', name: 'Zendesk', icon: '🎫', connected: false, description: 'Sync with Zendesk tickets' },
    { id: 'intercom', name: 'Intercom', icon: '💬', connected: false, description: 'Connect Intercom messenger' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '📱', connected: false, description: 'WhatsApp Business API' },
  ]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <User size={18} /> },
    { id: 'agent', name: 'AI Agent', icon: <Zap size={18} /> },
    { id: 'integrations', name: 'Integrations', icon: <LinkIcon size={18} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and AI agent configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-all relative ${
              activeTab === tab.id
                ? 'text-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.name}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Building2 size={20} />
              Company Information
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={profileData.companyName}
                  onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Industry
                </label>
                <select
                  value={profileData.industry}
                  onChange={(e) => setProfileData({ ...profileData, industry: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                >
                  <option value="">Select industry</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">SaaS</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phoneNumber}
                  onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={profileData.website}
                  onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                  placeholder="https://yourcompany.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Lock size={20} />
              Security
            </h3>
            
            <button className="bg-primary/20 border border-primary/30 text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/30 transition-all">
              Change Password
            </button>
          </div>

          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-[#0047FF] to-[#0066FF] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center gap-2"
          >
            {saved ? <CheckCircle size={20} /> : <Save size={20} />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      )}

      {/* AI Agent Tab */}
      {activeTab === 'agent' && (
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Sliders size={20} />
              Agent Configuration
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={agentSettings.agentName}
                  onChange={(e) => setAgentSettings({ ...agentSettings, agentName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tone
                  </label>
                  <select
                    value={agentSettings.tone}
                    onChange={(e) => setAgentSettings({ ...agentSettings, tone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="casual">Casual</option>
                    <option value="enthusiastic">Enthusiastic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Formality Level
                  </label>
                  <select
                    value={agentSettings.formality}
                    onChange={(e) => setAgentSettings({ ...agentSettings, formality: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="formal">Formal</option>
                    <option value="balanced">Balanced</option>
                    <option value="casual">Casual</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Response Speed
                </label>
                <select
                  value={agentSettings.responseSpeed}
                  onChange={(e) => setAgentSettings({ ...agentSettings, responseSpeed: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                >
                  <option value="instant">Instant (&lt; 1 second)</option>
                  <option value="fast">Fast (1-2 seconds)</option>
                  <option value="thoughtful">Thoughtful (3-5 seconds)</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                  <div>
                    <div className="font-medium text-white">Learning Mode</div>
                    <div className="text-sm text-gray-400">Continuously learn from conversations</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={agentSettings.learningMode}
                    onChange={(e) => setAgentSettings({ ...agentSettings, learningMode: e.target.checked })}
                    className="w-5 h-5"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                  <div>
                    <div className="font-medium text-white">Auto-Escalate</div>
                    <div className="text-sm text-gray-400">Automatically escalate complex issues to humans</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={agentSettings.autoEscalate}
                    onChange={(e) => setAgentSettings({ ...agentSettings, autoEscalate: e.target.checked })}
                    className="w-5 h-5"
                  />
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-[#0047FF] to-[#0066FF] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center gap-2"
          >
            {saved ? <CheckCircle size={20} /> : <Save size={20} />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              Connect Your Tools
            </h3>
            
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{integration.icon}</div>
                    <div>
                      <div className="font-semibold text-white">{integration.name}</div>
                      <div className="text-sm text-gray-400">{integration.description}</div>
                    </div>
                  </div>
                  
                  {integration.connected ? (
                    <div className="flex items-center gap-3">
                      <span className="text-green-400 text-sm font-medium flex items-center gap-2">
                        <CheckCircle size={16} />
                        Connected
                      </span>
                      <button className="text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ) : (
                    <button className="bg-primary/20 border border-primary/30 text-primary px-6 py-2 rounded-lg font-semibold hover:bg-primary/30 transition-all">
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              Notification Preferences
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                <div>
                  <div className="font-medium text-white">Email Notifications</div>
                  <div className="text-sm text-gray-400">Receive updates via email</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.emailNotifications}
                  onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                  className="w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                <div>
                  <div className="font-medium text-white">Escalation Alerts</div>
                  <div className="text-sm text-gray-400">Get notified when conversations are escalated</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.escalationAlerts}
                  onChange={(e) => setNotifications({ ...notifications, escalationAlerts: e.target.checked })}
                  className="w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                <div>
                  <div className="font-medium text-white">Daily Summary</div>
                  <div className="text-sm text-gray-400">Daily report of AI agent performance</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.dailySummary}
                  onChange={(e) => setNotifications({ ...notifications, dailySummary: e.target.checked })}
                  className="w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                <div>
                  <div className="font-medium text-white">Weekly Report</div>
                  <div className="text-sm text-gray-400">Comprehensive weekly analytics</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.weeklyReport}
                  onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                  className="w-5 h-5"
                />
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-[#0047FF] to-[#0066FF] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center gap-2"
          >
            {saved ? <CheckCircle size={20} /> : <Save size={20} />}
            {saved ? 'Saved!' : 'Save Preferences'}
          </button>
        </div>
      )}
    </div>
  );
};
