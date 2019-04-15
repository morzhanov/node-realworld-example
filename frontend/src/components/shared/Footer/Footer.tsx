import * as React from 'react';
import { Link } from 'react-router-dom';

// TODO: add elements from material ui
const Footer = () => (
  <footer className="footer">
    <div className="container footer__container">
      <div className="footer__left">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-use">Terms of Use</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>
      <div className="footer__right copyright">Copyright © Atruchecks 2019</div>
    </div>
  </footer>
);

export default Footer;
