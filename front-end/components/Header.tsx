// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <section className="container mb-5" style={{ marginTop: '1rem' }}>
        <div className="row">
          <div className="col-2">
            <a href="https://projectasuras.github.io/" target="_blank" rel="noopener noreferrer" aria-label="ProjectAsuras Homepage">
              <img
                src="/assets/logo.png" // Adjusted path for static files in React
                alt="ProjectAsuras Logo"
                width="300px"
              />
            </a>
          </div>
          <div className="col-4"></div>
          <div
  className="col-6"
  style={{
    lineHeight: '110px',
    fontSize: '60px',  // Increase the font size
    textAlign: 'left',
    color: 'rgb(182 26 1)',  // Set text color to red
    fontWeight: 'bold', // Make the text bold
    fontFamily: 'Georgia, sans-serif'  // Add font family

  }}
>
  VULNASURA
</div>
        </div>
      </section>
    </header>
  );
};

export default Header;
