import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, TrendingUp, Zap, Brain, Target, Lock } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-[#0047FF] to-[#0066FF] bg-clip-text text-transparent">
            Lummy
          </div>
          <div className="flex gap-6 items-center">
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-[#0047FF] to-[#0066FF] px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-sm text-primary font-semibold uppercase tracking-wide">
              Self-Learning AI Agent
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            AI that learns your voice.<br />
            <span className="bg-gradient-to-r from-[#0047FF] to-[#0066FF] bg-clip-text text-transparent">
              Not the other way around.
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            The intelligent customer service and sales agent that adapts to your business—automatically.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-[#0047FF] to-[#0066FF] px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              Start Free Trial
            </Link>
            <button className="border border-white/20 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/5 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl font-bold bg-gradient-to-r from-[#0047FF] to-[#0066FF] bg-clip-text text-transparent mb-2">
              90%
            </div>
            <div className="text-gray-400">Resolution Rate</div>
          </div>
          <div>
            <div className="text-5xl font-bold bg-gradient-to-r from-[#0047FF] to-[#0066FF] bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-400">Always Available</div>
          </div>
          <div>
            <div className="text-5xl font-bold bg-gradient-to-r from-[#0047FF] to-[#0066FF] bg-clip-text text-transparent mb-2">
              2 Weeks
            </div>
            <div className="text-gray-400">To Full Deployment</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm text-primary font-semibold uppercase tracking-wide">
              One Engine, Infinite Possibilities
            </span>
            <h2 className="text-5xl font-bold mt-4 mb-4">Built to learn. Designed to scale.</h2>
            <p className="text-xl text-gray-400">No complex dashboards. No manual training. Just pure intelligence.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain />}
              title="Self-Learning AI"
              description="Observes your conversations and automatically adapts to your unique business voice, tone, and communication style."
            />
            <FeatureCard
              icon={<MessageSquare />}
              title="Customer Service & Sales"
              description="One AI agent handles everything—from support inquiries to closing deals. Seamlessly switches context based on conversation flow."
            />
            <FeatureCard
              icon={<Zap />}
              title="Zero Configuration"
              description="Plug in your communication channels and let Lummy learn. No complicated setup, no training manuals, no headaches."
            />
            <FeatureCard
              icon={<Target />}
              title="Brand Voice Matching"
              description="Automatically detects and mirrors your brand's personality—whether professional, friendly, witty, or anything in between."
            />
            <FeatureCard
              icon={<TrendingUp />}
              title="Gets Smarter Daily"
              description="Every conversation makes Lummy better. Learns from successes, adapts to feedback, and continuously improves performance."
            />
            <FeatureCard
              icon={<Lock />}
              title="Simple Oversight"
              description="Review conversations when you want. Give feedback when needed. But no complex dashboard required to keep things running."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-[#0047FF]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to let AI learn your business?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Join companies using Lummy to transform customer engagement
          </p>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-[#0047FF] to-[#0066FF] px-10 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; 2026 Lummy, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
    <div className="w-14 h-14 bg-gradient-to-br from-[#0047FF]/20 to-[#0066FF]/20 rounded-xl flex items-center justify-center text-primary mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);
