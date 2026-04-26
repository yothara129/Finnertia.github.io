/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PiggyBank, 
  TrendingUp, 
  BarChart3, 
  Target, 
  Calculator, 
  CreditCard,
  Menu,
  X
} from 'lucide-react';
import { SIPCalculator } from './components/SIPCalculator';
import { LumpsumCalculator } from './components/LumpsumCalculator';
import { StepUpSIPCalculator } from './components/StepUpSIPCalculator';
import { GoalCalculator } from './components/GoalCalculator';
import { FDCalculator } from './components/FDCalculator';
import { EMICalculator } from './components/EMICalculator';

type CalculatorType = 'sip' | 'lumpsum' | 'step-up' | 'goal' | 'fd' | 'emi';

export default function App() {
  const [activeTab, setActiveTab] = useState<CalculatorType>('sip');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'sip', name: 'SIP', icon: PiggyBank },
    { id: 'lumpsum', name: 'Lumpsum', icon: BarChart3 },
    { id: 'step-up', name: 'Step-up SIP', icon: TrendingUp },
    { id: 'goal', name: 'Goal Planner', icon: Target },
    { id: 'fd', name: 'FD', icon: Calculator },
    { id: 'emi', name: 'EMI', icon: CreditCard },
  ];

  const renderCalculator = () => {
    switch (activeTab) {
      case 'sip': return <SIPCalculator />;
      case 'lumpsum': return <LumpsumCalculator />;
      case 'step-up': return <StepUpSIPCalculator />;
      case 'goal': return <GoalCalculator />;
      case 'fd': return <FDCalculator />;
      case 'emi': return <EMICalculator />;
      default: return <SIPCalculator />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white border-bottom border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-xl">
                A
              </div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">
                AKM
              </h1>
            </div>

            {/* Desktop Tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as CalculatorType)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === tab.id 
                        ? 'bg-emerald-50 text-emerald-700 font-bold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.name}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as CalculatorType);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium ${
                        activeTab === tab.id 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'text-slate-600'
                      }`}
                    >
                      <Icon size={20} />
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 text-center md:text-left">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {tabs.find(t => t.id === activeTab)?.name} Calculator
            </h2>
            <p className="text-slate-500 max-w-2xl">
              Calculate and visualize your financial growth with accuracy. Tailored for Indian professionals.
            </p>
          </motion.div>
        </div>

        <section className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {renderCalculator()}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-800 pb-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-900 font-black text-xl">
                  A
                </div>
                <h3 className="text-xl font-bold tracking-tight">AKM</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering Indian professionals with precise financial tools for wealth creation and debt management.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-xs text-slate-500">Calculators</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => setActiveTab('sip')}>Mutual Fund SIP</li>
                <li className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => setActiveTab('lumpsum')}>Lumpsum Investment</li>
                <li className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => setActiveTab('emi')}>Home & Personal Loans</li>
                <li className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => setActiveTab('fd')}>Fixed Deposits</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-xs text-slate-500">Affiliates</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://groww.in" target="_blank" className="hover:text-emerald-400">Groww</a></li>
                <li><a href="https://zerodha.com" target="_blank" className="hover:text-emerald-400">Zerodha</a></li>
                <li><a href="https://kuvera.in" target="_blank" className="hover:text-emerald-400">Kuvera</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
            <p>© 2026 AKM Labs. Built for Indian Professionals.</p>
            <div className="flex gap-8">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
