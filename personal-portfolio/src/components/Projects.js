import React from 'react';

const Projects = () => {
  const projectList = [
    {
      title: 'Project One',
      description: 'A brief description of Project One, highlighting its features and technologies used.',
      link: 'https://github.com/username/project-one',
      demo: 'https://project-one-demo.com'
    },
    {
      title: 'Project Two',
      description: 'A brief description of Project Two, highlighting its features and technologies used.',
      link: 'https://github.com/username/project-two',
      demo: 'https://project-two-demo.com'
    },
    {
      title: 'Project Three',
      description: 'A brief description of Project Three, highlighting its features and technologies used.',
      link: 'https://github.com/username/project-three',
      demo: 'https://project-three-demo.com'
    }
  ];

  return (
    <div className="projects">
      <h2>My Projects</h2>
      <ul>
        {projectList.map((project, index) => (
          <li key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">View Code</a>
            <br />
            <a href={project.demo} target="_blank" rel="noopener noreferrer">Live Demo</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;