import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left-side">
          <div className="footer__logo"></div>
          <div className="footer__descp">
            <div className="mb-2">
              We aim to make young India financially self-sustainable by
              providing equal opportunity for all.
            </div>

            <a
              href="https://drive.google.com/file/d/17TKzId-5qlRjKVLX30W1Brn_L70rcMN1/view"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__privacy-policy"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="footer__right-side">
          <div>
            Contact us:{' '}
            <a
              href="mailto: admin@devsnest.in"
              target="__blank"
              className="footer__email text-dark text-decoration-none"
            >
              support@devsnest.in
            </a>
          </div>
          <div className="footer__right-side__social mt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://in.linkedin.com/company/devsnest"
            >
              <i className="fa fa-linkedin-square" aria-hidden="true"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/devsnest/"
            >
              <i className="fa fa-facebook-square" aria-hidden="true"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/devsnest.in/"
            >
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
