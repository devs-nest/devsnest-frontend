import React from 'react';
import Carousel from 'react-multi-carousel';
import Footer from '../components/Footer';

import linkedin_icon from '../assets/images/linkedin.svg';
import achieve from '../assets/images/achieve.png';
import whatsapp_logo from '../assets/images/icon-whatsapp.png';
import discord_logo from '../assets/images/icon-discord.png';
import Group_15 from '../assets/images/Group_15.svg';
import Group_2479 from '../assets/images/Group_2479.svg';
import Group_2672 from '../assets/images/Group_2672.svg';
import unique0 from '../assets/images/unique0.svg';
import unique1 from '../assets/images/unique1.svg';
import unique2 from '../assets/images/unique2.svg';
import unique3 from '../assets/images/unique3.svg';
import unique4 from '../assets/images/unique4.svg';
import unique5 from '../assets/images/unique5.svg';
import curr0 from '../assets/images/curr0.svg';
import curr1 from '../assets/images/curr1.svg';
import curr2 from '../assets/images/curr2.svg';
import curr3 from '../assets/images/curr3.svg';
import abhishek from '../assets/images/abhishek.jpg';
import priya from '../assets/images/priya.png';
import vashu from '../assets/images/vashu_f.png';
import hero2 from '../assets/images/hero2.jpg';

import {
  prerequisite_data,
  who_can_join_data,
  mentorsData,
  webinarData,
  discord_server_data,
  responsiveMultipleItem,
  responsiveSingleItem,
} from '../constants';

function Landing() {
  return (
    <div className="landing-v2" id="top-header">
      <section className="hero rowx dark">
        <div className="hero__left-side colx">
          <img src={hero2} alt="hero" />
        </div>
        <div className="hero__right-side colx">
          <div className="content">
            <h1 className="hero__heading">
              Education which makes you financially{' '}
              <span className="color-purple ">independent.</span>
            </h1>
            <div className="descpx hero__descp">
              A mentorship program designed to help you get your dream job. It
              evolves as per your needs to mould you into a kickass developer.
            </div>
          </div>
        </div>
      </section>

      <section className="our-vision" id="our-vision">
        <div className="headingx our-vision__heading">
          Our <span> VISION </span>
        </div>

        <div className="our-vision__container rowx">
          <div className="our-vision__container__left">
            <img src={Group_15} alt="Our vision" />
          </div>

          <div className="our-vision__container__right">
            We aim to create a complete ecosystem where we will guide and teach
            students to become a proficient developer in 6 months from scratch.
            <br /> <br />
            Most students are unable to acquire the correct skillset and be
            job-ready for interviews just because they don't find the correct
            guidance and atmosphere to learn. Devsnest aims to revolutionize the
            education industry by aiding this process.
          </div>
        </div>
      </section>

      <section className="container rowx">
        <div className="container__left">
          <div className="prerequisites" id="prerequisites">
            <div className="headingx prerequisites__heading">
              PRE<span>REQUISITES </span>
            </div>

            <ul className="prerequisites__list">
              {prerequisite_data.map((item) => {
                const { name, descp } = item;
                return (
                  <li className="prerequisites__list__item">
                    <div>
                      {name}
                      <div className="prerequisites__list__item__descp">
                        {descp ? descp : ''}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="who_can_join" id="who_can_join">
            <div className="headingx who_can_join__heading">
              Who all can <span>JOIN </span>
            </div>

            <ul className="who_can_join__list">
              {who_can_join_data.map((item) => {
                const { name } = item;
                return (
                  <li className="who_can_join__list__item">
                    <div> {name} </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="container__right">
          <img src={Group_2479} alt="Who all can Join" />
        </div>
      </section>

      <section className="unique" id="unique">
        <div className="headingx unique__heading">What makes us unique</div>

        <div className="unique__container">
          <div className="rowx">
            <div className="unique__unit colx">
              <div className="unique__left-side">
                <img src={unique0} alt="" />
              </div>
              <div className="unique__right-side">
                <div className="unique__right-side__heading">
                  Live Classes Everyday
                </div>
                <div className="unique__right-side__descp">
                  It’s COVID, we know you can't even meet your next door
                  neighbours. But we do bring a fun class-like experience
                  virtually.
                </div>
              </div>
            </div>

            <div className="unique__unit colx">
              <div className="unique__left-side">
                <img src={unique1} alt="Live classes Everyday" />
              </div>
              <div className="unique__right-side">
                <div className="unique__right-side__heading">
                  Personalized Guidance
                </div>
                <div className="unique__right-side__descp">
                  Everyone is different and so are your talents and problems. We
                  nurture you through personalized attention into the best you.
                </div>
              </div>
            </div>
          </div>

          <div className="rowx">
            <div className="unique__unit colx">
              <div className="unique__left-side">
                <img src={unique2} alt="Personalized Guidance" />
              </div>
              <div className="unique__right-side">
                <div className="unique__right-side__heading">
                  Project Driven Curriculum
                </div>
                <div className="unique__right-side__descp">
                  Reading the whole Cormen is a nightmare, only Sheldon can
                  handle so much of theory. Our intensive hands on 10+ projects,
                  makes it exciting.
                </div>
              </div>
            </div>

            <div className="unique__unit colx">
              <div className="unique__left-side">
                <img src={unique3} alt="Guest Tech Talk" />
              </div>
              <div className="unique__right-side">
                <div className="unique__right-side__heading">
                  Guest Tech Talk
                </div>
                <div className="unique__right-side__descp">
                  Our “Cool Tech Talks” by industry experts on trending
                  technologies keep you upgraded to the latest version.
                </div>
              </div>
            </div>
          </div>

          <div className="rowx">
            <div className="unique__unit colx">
              <div className="unique__left-side">
                <img src={unique4} alt="Peer Learning" />
              </div>
              <div className="unique__right-side">
                <div className="unique__right-side__heading">Peer Learning</div>
                <div className="unique__right-side__descp">
                  Discussions and debates are the best way to learn, We
                  encourage group collaboration and pair programming.
                </div>
              </div>
            </div>

            <div className="unique__unit colx">
              <div className="unique__left-side">
                <img src={unique5} alt="Mock Interviews By Industry" />
              </div>
              <div className="unique__right-side">
                <div className="unique__right-side__heading">
                  Mock Interviews By Industry
                </div>
                <div className="unique__right-side__descp">
                  We end your stage fear of interviews, by having mock "live
                  like" interviews by mentors from FAANG type companies.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="curriculum" className="curriculum">
        <div className="headingx curriculum__heading">Curriculum</div>

        <div className="curriculum__container">
          <div className="curriculum__unit">
            <div className="curriculum__left-side">
              <div className="curriculum__icon">
                <img src={curr0} alt="Curriculum" />
              </div>
            </div>

            <div className="curriculum__right-side">
              <div className="curriculum__purple">Week 1-10</div>
              <div className="curriculum__orange">
                Basic Programming and DSA
              </div>
              <div className="curriculum__descp">
                <ul>
                  <li>Learning python and Logical Thinking.</li>
                  <li>
                    Deep dive into Algorithms and Data Structures (150+
                    questions)
                  </li>
                  <li>Basics of Web using HTML, CSS, JS and GIT.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="curriculum__unit">
            <div className="curriculum__left-side">
              <div className="curriculum__icon">
                <img src={curr1} alt="Curriculum" />
              </div>
            </div>

            <div className="curriculum__right-side">
              <div className="curriculum__purple">Week 11-17</div>
              <div className="curriculum__orange">WebDev - Backend</div>
              <div className="curriculum__descp">
                <ul>
                  <li>Understanding Rest using NodeJS and Express.</li>
                  <li>Building 3+ projects using Node, Mysql and Docker.</li>
                  <li>
                    Building and Deploying a full fledged industry grade backend
                    Web app.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="curriculum__unit">
            <div className="curriculum__left-side">
              <div className="curriculum__icon">
                <img src={curr2} alt="Curriculum" />
              </div>
            </div>

            <div className="curriculum__right-side">
              <div className="curriculum__purple">Week 18-24</div>
              <div className="curriculum__orange">WebDev - Frontend</div>
              <div className="curriculum__descp">
                <ul>
                  <li>Understanding fundamental concepts of JavaScript.</li>
                  <li>
                    Building 3+ projects using React, Redux, JS and Docker.
                  </li>
                  <li>
                    Building and Deploying a full fledged Industry grade
                    frontend Web app.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="curriculum__unit">
            <div className="curriculum__left-side">
              <div className="curriculum__icon">
                <img src={curr3} alt="Curriculum" />
              </div>
            </div>

            <div className="curriculum__right-side">
              <div className="curriculum__purple">Week 25-32</div>
              <div className="curriculum__orange">Interview Prep</div>
              <div className="curriculum__descp">
                <ul>
                  <li>System Design and CS Fundamentals</li>
                  <li>
                    Career Counselling sessions and polishing your Resume and
                    Cover Letter
                  </li>
                  <li>Interview preparation by Industry experts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="mentors">
        <div className="headingx mentors__heading">Meet your mentors</div>

        <Carousel
          responsive={responsiveSingleItem}
          showDots={true}
          infinite={true}
        >
          {mentorsData.map((mentor) => {
            const { name, company, descp, img, linkedin } = mentor;
            return (
              <section className="mentors">
                <div className="mentors__container">
                  <div className="mentors__left-side">
                    <img
                      className="mentors__image"
                      src={img}
                      alt={`${name}'s pic`}
                    />
                  </div>
                  <div className="mentors__right-side">
                    <div className="mentors__name">{name}</div>
                    <div className="mentors__company">{company}</div>
                    <div className="mentors__descp">{descp}</div>
                    <div className="mentors__linkedin">
                      <a
                        href={linkedin}
                        target="__blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="linkedin"
                          src={linkedin_icon}
                          alt="linkedin"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </Carousel>
      </div>

      <section className="plan" id="plan">
        <div className="headingx plan__heading">Be a part of this journey</div>

        <div className="plan__container">
          <div className="plan__left-side">
            <div className="plan__left-side__heading">₹0 Fee</div>
            <div className="plan__left-side__heading">
              Be ready to spend 4-5 hrs daily.
            </div>
            <div className="plan__left-side__heading">
              Learn and code together with your peers
            </div>
          </div>
          <div className="plan__right-side">
            <img src={achieve} alt="Be a part of journey" />
          </div>
        </div>
      </section>

      <section id="community" className="community">
        <div className="community__top">
          <div className="headingx community__top__left-side">
            Join this course on Discord
          </div>

          <div className="community__top__right-side">
            <img src={discord_logo} alt="discord" />
          </div>
        </div>

        <div className="community__main rowx">
          <div className="community__main__left-side">
            <ul className="community__main__left-side__points mb-0">
              {discord_server_data.map((item) => {
                const { name } = item;
                return (
                  <li className="community__main__left-side__points__list__item">
                    {name}
                  </li>
                );
              })}
            </ul>

            <a
              href="https://discord.gg/E8YcJpGJKB"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="community__main__left-side__btn btnx btnx-primary">
                JOIN NOW
              </button>
            </a>

            <div className="community__main__left-side__whatsapp mt-3">
              <div className="community__main__left-side__whatsapp__left">
                <div className="community__main__left-side__whatsapp__left__txt1">
                  Get Notified on Whatsapp
                </div>

                <div className="community__main__left-side__whatsapp__left__txt2">
                  No spam only admins send messages
                </div>
              </div>

              <div className="community__main__left-side__whatsapp__right">
                <a
                  href="https://chat.whatsapp.com/HiydVcSC5TSLuiJWvX9GYi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={whatsapp_logo} alt="whatsapp" />
                </a>
              </div>
            </div>
          </div>

          <div className="community__main__right-side">
            <img src={Group_2672} alt="Team building" />
          </div>
        </div>

        <div className="community__join-us">
          <div className="community__join-us__desc descpx">
            <div className="community__join-us__desc__txt1">
              Join us as a mentor
            </div>
            <div className="community__join-us__desc__txt2">
              Your 20-hour contribution in a quarter will help 20-25 students
              kick start their career in software development
            </div>
          </div>

          <a
            href="https://forms.gle/gtqDfDk3oaXfK3V26"
            target="_blank"
            rel="noopener noreferrer"
            className="plan__register"
          >
            <button className="community__join-us__register-button btnx btnx-primary">
              Join us
            </button>
          </a>
        </div>

        <div className="community__carousel-div">
          <div className="community__carousel-div__heading">
            Our previous webinars :
          </div>

          <Carousel
            responsive={responsiveMultipleItem}
            className="community__carousel-div__carousel"
          >
            {webinarData.map((item) => {
              const { name, title, descp, img } = item;
              return (
                <div className="community__carousel-div__webinar">
                  <div className="community__carousel-div__webinar__top"> </div>

                  <div className="community__carousel-div__webinar__body">
                    <div className="community__carousel-div__webinar__body__name">
                      {name}
                    </div>
                    <div className="community__carousel-div__webinar__body__title">
                      {title}
                    </div>
                    <div className="community__carousel-div__webinar__body__descp">
                      {descp}
                    </div>
                  </div>

                  <div className="community__carousel-div__webinar__img">
                    <img src={img} alt={name} />
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </section>

      <Carousel responsive={responsiveSingleItem}>
        <section className="stories">
          <div className="stories__container">
            <div className="stories__left-side">
              <img src={abhishek} alt="Abhishek's pic" />
            </div>

            <div className="stories__right-side">
              <div className="descpx stories__descp">
                <p>
                  The curriculum here is very exhaustive helping me be a better
                  developer. The Mock Interviews feedbacks from Industry experts
                  and continous guidance have helped me become better at giving
                  interviews.
                </p>
                <p>
                  The best thing which I felt about this program was the 1:1
                  mentorship sessions from Vedansh Sir and Sai maam. It has been
                  only 3 months since I have joined this program and I already
                  have 2 offers of 8LPA each. I will be joining one of them next
                  week
                </p>
              </div>
              <div className="stories__cta">Abhishek Rai</div>
            </div>
          </div>
        </section>

        <section className="stories">
          <div className="stories__container">
            <div className="stories__left-side">
              <img src={priya} alt="Priya's pic" />
            </div>

            <div className="stories__right-side">
              <div className="descpx stories__descp">
                <p>
                  The mentors here don't teach you solutions, they teach you how
                  to think towards it. The self-assessment chart on the website
                  and weekly targets along with guest lectures on weekends from
                  industry experts keep me motivated.
                </p>
                <p>
                  I was an average student but here I realized I m capable of
                  far better things. My productivity grew multiple folds from
                  day 1 itself. Joining this is one of the best decisions of my
                  life. Thank you Devsnest!
                </p>
              </div>
              <div className="stories__cta">Priya Mishra</div>
            </div>
          </div>
        </section>

        <section className="stories">
          <div className="stories__container">
            <div className="stories__left-side">
              <img src={vashu} alt="Vanshu'd pic" />
            </div>

            <div className="stories__right-side">
              <div className="stories__descp">
                <p>
                  Devsnest is by all measures the best investment I have made in
                  my last 4 years. Within past few months, I'm surprised to see
                  the positive changes not only in my web dev and CS skills but
                  within myself as an individual as well.
                </p>
                <p>
                  Truly, I owe it all to Devnest's program and I would
                  wholeheartedly recommend it to anybody considering it,
                  especially those with a desire to improve and strengthen their
                  capabilities, as a fully fledge software engineer, everyday.
                </p>
              </div>
              <div className="stories__cta">Vashudev Dhamma</div>
            </div>
          </div>
        </section>
      </Carousel>

      <Footer />
    </div>
  );
}

export default Landing;
