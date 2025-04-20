import facebookLink from "../../assets/facebook.svg";
import githubLink from "../../assets/github.svg";

import "../Footer/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© 2025 Supersite, Powered by News API</p>
      <div className="footer__social">
        <nav className="footer__nav">
          <a href="/" className="footer__link">
            Home
          </a>
          <a
            href="https://tripleyen.com"
            target="_blank"
            rel="noopener noreferer"
            className="footer__link"
          ></a>
        </nav>
        <div className="footer__social-icons">
          <a href="https://github.com" target="_blank">
            <img
              className="footer__github-icon"
              alt="Github"
              src={githubLink}
            ></img>
          </a>
          <a href="https://facebook.com" target="_blank">
            <img
              className="footer__github-icon"
              alt="Faccebook"
              src={facebookLink}
            ></img>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
