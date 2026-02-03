import React from 'react';

const PortfolioPage = () => {
  return (
    <div className="iframe-page">
      <iframe
        src="https://pkmyportfolio.vercel.app/"
        title="My Portfolio"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default PortfolioPage;
