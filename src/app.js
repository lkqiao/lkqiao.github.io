// This file serves as the entry point for the JavaScript application. It initializes the application and renders the main components.

import React from 'react';
import ReactDOM from 'react-dom';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Piano from './components/Piano';
import YouTubeLinks from './components/YouTubeLinks';
import './styles/main.css';

const App = () => {
  return (
    <div>
      <header>
        <h1>Welcome to My Portfolio</h1>
      </header>
      <main>
        <AboutMe />
        <Experience />
        <Projects />
        <Resume />
        <Piano />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Luke Qiao. All rights reserved.</p>
      </footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));