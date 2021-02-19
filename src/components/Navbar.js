import React from 'react';
import NavBar from '../pages/home/navbar';
import hero2 from '../assets/images/hero2.jpg';

function Nav(props) {
  const { faqs } = props;

  return (
    <>
      <section className="hero rowx dark">
        <NavBar />
        <div className="hero__left-side colx">
          <img src={hero2} alt="hero" />
        </div>
        <div className="hero__right-side colx">
          <div className="content">
            {faqs ? (
              <h1 className="hero__heading">
                Please go through the{' '}
                <span className="color-purple ">FAQs.</span>
              </h1>
            ) : (
              <h1 className="hero__heading">
                Education which makes you financially{' '}
                <span className="color-purple ">independent.</span>
              </h1>
            )}
            <div className="descpx hero__descp">
              A mentorship program designed to help you get your dream job. It
              evolves as per your needs to mould you into a kickass developer.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Nav;
