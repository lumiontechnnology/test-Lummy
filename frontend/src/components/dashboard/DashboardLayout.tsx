import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, MessageSquare, BarChart3, Settings } from 'lucide-react';
import { useAuthStore } from '../../contexts/AuthContext';

export const DashboardLayout: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#0047FF] to-[#0066FF] bg-clip-text text-transparent">
            Lummy
          </h1>
          <p className="text-sm text-gray-400 mt-1">{user?.companyName}</p>
        </div>

        <nav className="space-y-2 flex-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <BarChart3 size={20} />
            <span>Overview</span>
          </Link>
          
          <Link
            to="/dashboard/conversations"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <MessageSquare size={20} />
            <span>Conversations</span>
          </Link>
          
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors mt-auto"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

