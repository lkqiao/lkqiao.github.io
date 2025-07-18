import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: 'Software Engineer',
      company: 'Tech Company',
      description: 'Developed and maintained web applications using React and Node.js.'
    },
    {
      title: 'Intern',
      company: 'Startup Inc.',
      description: 'Assisted in the development of a mobile application and conducted user testing.'
    },
    {
      title: 'Freelancer',
      company: 'Self-Employed',
      description: 'Worked on various projects including website development and graphic design.'
    }
  ];

  return (
    <div className="experience">
      <h2>Experience</h2>
      <ul>
        {experiences.map((exp, index) => (
          <li key={index}>
            <h3>{exp.title} at {exp.company}</h3>
            <p>{exp.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;