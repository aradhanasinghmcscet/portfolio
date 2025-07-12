import React, { useState, useEffect } from 'react';
import { ThemeProvider, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useDispatch } from 'react-redux';
import { incrementClick } from './store/clickCounterSlice';
import SEO
 from './components/SEO';
import AnalyticsWrapper from './components/AnalyticsWrapper';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ChessBoard from './components/Chessboard';
import TicTacToe from './components/TicTacToe';
import MemoryMatchGame from './components/MemoryMatchGame';
import Contact from './components/Contact';
import Analytics from './components/Analytics';
import theme from './theme/theme';

const ClickableWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent) => {
    dispatch(incrementClick());
  };

  return (
    <div onClick={handleClick} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = {
        home: document.getElementById('home'),
        skills: document.getElementById('skills'),
        experience: document.getElementById('experience'),
        projects: document.getElementById('projects'),
        chess: document.getElementById('chess'),
        tictactoe: document.getElementById('tictactoe'),
        memorymatch: document.getElementById('memorymatch'),
        contact: document.getElementById('contact'),
        analytics: document.getElementById('analytics')
      };

      const scrollPosition = window.pageYOffset;
      let currentSection = 'home';

      Object.entries(sections).forEach(([key, element]) => {
        if (element && element.getBoundingClientRect().top <= 100) {
          currentSection = key;
        }
      });

      setActiveSection(currentSection);
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SEO  title="Aradhana Portfolio"
            description="Full Stack Developer Portfolio - Aradhana Singh"
            keywords={['portfolio', 'developer', 'full stack', 'web development', 'react', 'typescript']}
            image="/profile-placeholder.svg"/>
          <AnalyticsWrapper id="analytics">
            <Box sx={{ width: '100%' }}>
              <ClickableWrapper>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Navbar activeSection={activeSection} isScrolled={isScrolled} />
                  <main>
                    <motion.div id="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <Home id="home" />
                    </motion.div>
                    <motion.div id="skills" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <Skills id="skills" />
                    </motion.div>
                    <motion.div id="experience" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <Experience id="experience" />
                    </motion.div>
                    <motion.div id="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <Projects id="projects" />
                    </motion.div>
                    <motion.div id="chess" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <ChessBoard id="chess" />
                    </motion.div>
                    <motion.div id="tictactoe" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <TicTacToe />
                    </motion.div>
                    <motion.div id="memorymatch" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <MemoryMatchGame />
                    </motion.div>
                    <motion.div id="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <Contact id="contact" />
                    </motion.div>
                    <motion.div id="analytics" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <Analytics id="analytics" />
                    </motion.div>
                  </main>
                </motion.div>
              </ClickableWrapper>
            </Box>
          </AnalyticsWrapper>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
