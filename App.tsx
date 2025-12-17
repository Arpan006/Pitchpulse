import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import FeedbackForm from './components/FeedbackForm';
import LiveResults from './components/LiveResults';
import Footer from './components/Footer';
import { LucideArrowUp } from 'lucide-react';
import { Submission } from './types';

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Load data from LocalStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('pitchPulseData');
    if (savedData) {
      try {
        setSubmissions(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save data to LocalStorage whenever submissions change
  useEffect(() => {
    localStorage.setItem('pitchPulseData', JSON.stringify(submissions));
  }, [submissions]);

  const handleSubmission = (newSubmission: Submission) => {
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const handleClearData = () => {
    setSubmissions([]);
    localStorage.removeItem('pitchPulseData');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 selection:bg-vit-blue selection:text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
         <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-vit-blue/5 rounded-full blur-3xl animate-float"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-vit-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <Hero />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="max-w-3xl mx-auto space-y-12">
          <FeedbackForm onSubmitFeedback={handleSubmission} />
          <LiveResults submissions={submissions} onClearData={handleClearData} />
        </div>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-vit-blue text-white rounded-full shadow-lg hover:bg-vit-lightBlue transition-all duration-300 z-50 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        aria-label="Scroll to top"
      >
        <LucideArrowUp size={24} />
      </button>
    </div>
  );
};

export default App;