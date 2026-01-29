import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, TrendingUp, Zap, Brain, Target, Lock, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Spotlight } from '../components/ui/spotlight';
import { SplineScene } from '../components/ui/spline';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
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

      {/* Hero Section with 3D */}
      <section className="pt-32 pb-20 px-6 relative">
        <Card className="max-w-7xl mx-auto bg-black/[0.96] border-white/10 overflow-hidden relative">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="#0047FF"
          />
          
          <div className="grid md:grid-cols-2 gap-8 min-h-[600px]">
            {/* Left content */}
            <div className="p-12 relative z-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-[#0047FF]/10 border border-[#0047FF]/20 rounded-full px-4 py-2 mb-6 w-fit">
                <Sparkles className="text-[#0047FF]" size={16} />
                <span className="text-sm text-[#0047FF] font-medium">Self-Learning AI Agent</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                AI that learns{' '}
                <span className="bg-gradient-to-r from-[#0047FF] to-[#0066FF] bg-clip-text text-transparent">
                  your voice.
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                The intelligent customer service and sales agent that adapts to your business—automatically. 
                No configuration needed.
              </p>
              
              <div className="flex gap-4">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-[#0047FF] to-[#0066FF] px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight size={20} />
                </Link>
                <button className="border border-white/20 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/5 transition-all">
                  Watch Demo
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-[#0047FF]">90%</div>
                  <div className="text-sm text-gray-400">Resolution Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0047FF]">24/7</div>
                  <div className="text-sm text-gray-400">Always On</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0047FF]">2 Weeks</div>
                  <div className="text-sm text-gray-400">To Deploy</div>
                </div>
              </div>
            </div>

            {/* Right content - 3D Scene */}
            <div className="relative flex items-center justify-center p-8">
              <div className="w-full h-full min-h-[500px] relative">
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#0047FF]/10 border border-[#0047FF]/20 rounded-full px-4 py-2 mb-4">
              <Zap className="text-[#0047FF]" size={16} />
              <span className="text-sm text-[#0047FF] font-medium">Powered by AI</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">Built to learn. Designed to scale.</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              No complex dashboards. No manual training. Just pure intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard3D
              icon={<Brain />}
              title="Self-Learning AI"
              description="Observes your conversations and automatically adapts to your unique business voice, tone, and communication style."
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard3D
              icon={<MessageSquare />}
              title="Customer Service & Sales"
              description="One AI agent handles everything—from support inquiries to closing deals. Seamlessly switches context."
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard3D
              icon={<Zap />}
              title="Zero Configuration"
              description="Plug in your communication channels and let Lummy learn. No complicated setup required."
              gradient="from-orange-500 to-red-500"
            />
            <FeatureCard3D
              icon={<Target />}
              title="Brand Voice Matching"
              description="Automatically detects and mirrors your brand's personality—professional, friendly, or anything in between."
              gradient="from-green-500 to-emerald-500"
            />
            <FeatureCard3D
              icon={<TrendingUp />}
              title="Gets Smarter Daily"
              description="Every conversation makes Lummy better. Learns from successes and continuously improves performance."
              gradient="from-indigo-500 to-blue-500"
            />
            <FeatureCard3D
              icon={<Lock />}
              title="Simple Oversight"
              description="Review conversations when you want. Give feedback when needed. No complex dashboard required."
              gradient="from-pink-500 to-rose-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0047FF]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Three steps to intelligent automation</h2>
            <p className="text-xl text-gray-400">From setup to scaling in under two weeks</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Connect"
              description="Link your email, chat, or phone system. Takes less than 5 minutes to get started."
            />
            <StepCard
              number="2"
              title="Lummy Learns"
              description="Our AI observes your conversations, studies patterns, and learns your unique business voice."
            />
            <StepCard
              number="3"
              title="It Takes Over"
              description="Lummy starts handling conversations automatically, getting smarter with every interaction."
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Trusted by forward-thinking companies</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-4xl font-bold text-[#0047FF] mb-2">156</div>
              <div className="text-gray-400">Conversations Handled</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-4xl font-bold text-[#0047FF] mb-2">4.8/5</div>
              <div className="text-gray-400">Customer Satisfaction</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-4xl font-bold text-[#0047FF] mb-2">91%</div>
              <div className="text-gray-400">Resolution Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <Card className="max-w-5xl mx-auto bg-gradient-to-br from-[#0047FF]/20 to-[#0066FF]/20 border-[#0047FF]/30 relative overflow-hidden">
          <Spotlight
            className="-top-40 right-0"
            fill="#0047FF"
          />
          
          <div className="relative z-10 text-center py-20 px-12">
            <h2 className="text-5xl font-bold mb-6">Ready to let AI learn your business?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join companies using Lummy to transform customer engagement
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0047FF] to-[#0066FF] px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              Start Your Free Trial
              <ArrowRight size={24} />
            </Link>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                Cancel anytime
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-[#0047FF] to-[#0066FF] bg-clip-text text-transparent mb-4">
                Lummy
              </div>
              <p className="text-gray-400 text-sm">
                AI that learns your voice, not the other way around.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="hover:text-white cursor-pointer transition-colors">Features</div>
                <div className="hover:text-white cursor-pointer transition-colors">Pricing</div>
                <div className="hover:text-white cursor-pointer transition-colors">Integrations</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="hover:text-white cursor-pointer transition-colors">About</div>
                <div className="hover:text-white cursor-pointer transition-colors">Blog</div>
                <div className="hover:text-white cursor-pointer transition-colors">Careers</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="hover:text-white cursor-pointer transition-colors">Privacy</div>
                <div className="hover:text-white cursor-pointer transition-colors">Terms</div>
                <div className="hover:text-white cursor-pointer transition-colors">Security</div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm pt-8 border-t border-white/5">
            © 2026 Lummy, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard3D: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  gradient: string;
}> = ({ icon, title, description, gradient }) => (
  <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
    
    <div className="relative z-10">
      <div className={`w-14 h-14 bg-gradient-to-br ${gradient} bg-opacity-20 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

const StepCard: React.FC<{ number: string; title: string; description: string }> = ({
  number,
  title,
  description,
}) => (
  <div className="relative">
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
      <div className="w-16 h-16 bg-gradient-to-r from-[#0047FF] to-[#0066FF] rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
        {number}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-center">{title}</h3>
      <p className="text-gray-400 text-center leading-relaxed">{description}</p>
    </div>
  </div>
);