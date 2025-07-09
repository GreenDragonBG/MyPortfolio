import React from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Projects from './components/Projects';
import Contact from './components/Contact';
// About will be imported when created

const AppBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e2b28 0%, #18332f 100%);
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => (
  <AppBackground>
    <Navbar />
    <Landing />
    <Projects />
    <Contact />
    {/* <About /> */}
  </AppBackground>
);

export default App; 