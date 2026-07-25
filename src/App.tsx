import { useRef } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Statistics } from '@/components/Statistics';
import { WhyChoose } from '@/components/WhyChoose';
import { HowItWorks } from '@/components/HowItWorks';
import { About } from '@/components/About';
import { Footer } from '@/components/Footer';
import { ExamBuddyChat } from '@/components/ExamBuddyChat';
import { StudyPlanner } from '@/features/StudyPlanner';
import { QuizGenerator } from '@/features/QuizGenerator';
import { TopicExplainer } from '@/features/TopicExplainer';
import { NotesSummarizer } from '@/features/NotesSummarizer';
import { StudyCoach } from '@/features/StudyCoach';

function App() {
  const chatRef = useRef<{ open: () => void } | null>(null);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300">
        <Navbar onOpenChat={() => chatRef.current?.open()} />
        <main>
          <Hero />
          <Statistics />

          <section id="tools" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Everything you need to ace your exams
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                Five AI-powered tools, one focused workspace. Pick a tool below and let Exam Buddy AI do the heavy lifting.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <StudyPlanner />
              <QuizGenerator />
              <TopicExplainer />
              <NotesSummarizer />
              <StudyCoach />
            </div>
          </section>

          <WhyChoose />
          <HowItWorks />
          <About />
        </main>
        <Footer />
        <ExamBuddyChat ref={chatRef} />
      </div>
    </ThemeProvider>
  );
}

export default App;
