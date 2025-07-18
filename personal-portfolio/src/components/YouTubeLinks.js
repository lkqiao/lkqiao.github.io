import React from 'react';

const YouTubeLinks = () => {
  const links = [
    {
      title: 'Piano Performance 1',
      url: 'https://www.youtube.com/watch?v=example1',
    },
    {
      title: 'Piano Performance 2',
      url: 'https://www.youtube.com/watch?v=example2',
    },
    {
      title: 'Piano Performance 3',
      url: 'https://www.youtube.com/watch?v=example3',
    },
  ];

  return (
    <div className="youtube-links">
      <h2>YouTube Recordings</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeLinks;