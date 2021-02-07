import React, { useState, Fragment } from 'react';
import classNames from 'classnames';
import { NavHashLink } from 'react-router-hash-link';
import NavBar from './navbar';
function Nav(props) {
  const { faqs } = props;
  const [showNav, setShowNav] = useState(false);

  const headLine = faqs ? (
    <h1 className="hero__heading">
      Please go through the <span className="color-purple ">FAQs.</span>
    </h1>
  ) : (
    <h1 className="hero__heading">
      Education which makes you financially{' '}
      <span className="color-purple ">independent.</span>
    </h1>
  );

  const subHeading =
    'A mentorship program designed to help you get your dream job. It evolves as per your needs to mould you into a kickass developer.';
  return (
    <Fragment>
      <section className="hero rowx dark">
        <NavBar />
        <div className="hero__left-side colx">
          <img src="./hero2.jpg" alt="hero" />
        </div>
        <div className="hero__right-side colx">
          <div className="content">
            {headLine}
            <div className="descpx hero__descp">{subHeading}</div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Nav;
