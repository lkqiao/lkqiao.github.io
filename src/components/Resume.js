import React from 'react';

const Resume = () => {
  return (
    <div className="resume">
      <h2>Resume</h2>
      <p>Here is a brief overview of my qualifications:</p>
      <ul>
        <li>Bachelor's Degree in Computer Science</li>
        <li>3+ years of experience in web development</li>
        <li>Proficient in JavaScript, React, and Node.js</li>
        <li>Strong problem-solving skills and attention to detail</li>
      </ul>
      <a href="/assets/pdfs/resume.pdf" target="_blank" rel="noopener noreferrer">
        Download my Resume
      </a>
    </div>
  );
};

export default Resume;