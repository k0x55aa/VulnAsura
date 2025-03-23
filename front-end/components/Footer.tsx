// app/components/Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-center text-black"
      style={{
        backgroundColor: "#fff",
        position: "fixed",
        width: "100%",
        left: 0,
        bottom: 0,
      }}
    >
      <div
        className="text-center p-3 text-white"
        style={{ backgroundColor: "rgb(182 26 1)" }}
      >
        <div>
          <section className="text-center mb-2" style={{ fontSize: "25px" }}>
            <a
              href="https://github.com/projectasuras"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-4"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://discord.com/invite/pS7t73XTDK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-4"
            >
              <i className="fa-brands fa-discord"></i>
            </a>
            <a
              href="https://medium.com/@projectasuras"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-4"
            >
              <i className="fa-brands fa-medium"></i>
            </a>
            <a
              href="https://dev.to/projectasuras"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-4"
            >
              <i className="fa-brands fa-dev"></i>
            </a>
            <a
              href="https://www.youtube.com/@projectasuras"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-4"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a
              href="https://twitter.com/projectasuras"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-4"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/project-asuras-2bb07333a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-4"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com/projectasuras/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-4"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://hub.docker.com/u/projectasuras"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-4"
            >
              <i className="fa-brands fa-docker"></i>
            </a>
            <a
              href="mailto:projectasuras@proton.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-4"
            >
              <i className="fa fa-envelope"></i>
            </a>
          </section>
        </div>
        <div>
          © {currentYear}{" "}
          <a
            className="text-white"
            target="_blank"
            href="https://projectasuras.github.io/"
            rel="noopener noreferrer"
          >
            ProjectAsuras
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
