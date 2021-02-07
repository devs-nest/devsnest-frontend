import React from 'react';
import Carousel from 'react-multi-carousel';
import Nav from './nav';

import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './landing.scss';

import achieve from '../images/achieve.png';
import whatsapp_logo from '../images/WA-icon.png';
import discord_logo from '../images/Discord-icon.png';
import Group_15 from '../images/Group_15.svg';
import Group_2479 from '../images/Group_2479.svg';
import Group_2672 from '../images/Group_2672.svg';

import {
  prerequisite_data,
  who_can_join_data,
  mentorsData,
  webinarData,
  discord_server_data,
} from './landing_data';

import { responsiveMultipleItem, responsiveSingleItem } from './landing_utils';

function Landing() {
  return (
    <div className="landing-v2">
      <Nav />

      <section className="our-vision" id="our-vision">
        <div className="headingx our-vision__heading">
          Our <span> VISION </span>
        </div>

        <div className="our-vision__container rowx">
          <div className="our-vision__container__left">
            <img src={Group_15} />
          </div>

          <div className="our-vision__container__right">
            We aim to create a complete eco systems with a tech - culture where
            we will guide and teach students with a road map to become a
            proficient developer in 6 months from scratch. <br /> <br />
            Most students are unable to acquire the correct skillset and be job
            ready for interviews just because they don't find the correct
            guidance and atmosphere to learn. Devnest aims to revolutionise the
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
              {' '}
              Who all can <span>JOIN </span>{' '}
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
          {' '}
          <img src={Group_2479} />{' '}
        </div>
      </section>

      <section className="unique" id="unique">
        <div className="headingx unique__heading">What makes us unique</div>
        <div className="unique__container">
          <div className="rowx">
            <div className="unique__unit colx">
              <div className="unique__left-side">
                <img src="./unique0.svg" alt="" />
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
                <img src="./unique1.svg" alt="" />
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
                <img src="./unique2.svg" alt="" />
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
                <img src="./unique3.svg" alt="" />
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
                <img src="./unique4.svg" alt="" />
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
                <img src="./unique5.svg" alt="" />
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
                <img src="./curr0.svg" alt="curr" />
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
                <img src="./curr1.svg" alt="curr" />
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
                <img src="./curr2.svg" alt="curr" />
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
                <img src="./curr3.svg" alt="curr" />
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
                  <li>10 + Mock Interviews by Industry Experts</li>
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
                    <img className="mentors__image" src={img} />
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
                        <img className="linkedin" src="./linkedin.svg" />
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
            <div className="plan__left-side__heading">No Tution Fee</div>
            <div className="plan__left-side__heading">
              Pay ₹0 until you get a job of minimum 5 LPA
            </div>
            <div className="plan__left-side__heading">
              Pay only 15% of your salary for 2 years
            </div>
          </div>
          <div className="plan__right-side">
            <img src={achieve} />
          </div>
        </div>
        {/* <div className="plan__desc descpx">
          Interested? Registration for the 2nd batch closes on 15th November.
        </div>

        <a
          href="https://docs.google.com/forms/d/1FDUajSVjIgG-7hBBl5ekOpHxurVi-DvqQ1AcbwiJpuI/edit?ts=5f4a681a"
          target="_blank"
          rel="noopener noreferrer"
          className="plan__register"
        >
          <button className="plan__register-button btnx btnx-primary">
            Register Now
          </button>
        </a> */}
      </section>

      <section className="community">
        <div className="community__top">
          <div className="headingx community__top__left-side">
            Join us on DISCORD SERVER
          </div>

          <div className="community__top__right-side">
            <img src={discord_logo} />
          </div>
        </div>

        <div className="community__main rowx">
          <div className="community__main__left-side">
            <ul className="community__main__left-side__points">
              {discord_server_data.map((item) => {
                const { name } = item;
                return (
                  <li className="community__main__left-side__points__list__item">
                    {name}
                  </li>
                );
              })}
            </ul>

            <a href="http://bit.ly/devsnest_community" target="_blank">
              <button className="community__main__left-side__btn btnx btnx-primary">
                JOIN NOW
              </button>
            </a>

            <div className="community__main__left-side__whatsapp">
              <div className="community__main__left-side__whatsapp__left">
                <div className="community__main__left-side__whatsapp__left__txt1">
                  Get Notified on Whatsapp
                </div>

                <div className="community__main__left-side__whatsapp__left__txt2">
                  No spam only admins send messages
                </div>
              </div>

              <div className="community__main__left-side__whatsapp__right">
                <img src={whatsapp_logo} />
              </div>
            </div>
          </div>

          <div className="community__main__right-side">
            <img src={Group_2672} />
          </div>
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
                    <img src={img} />
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </section>

      {/*<section className="plan">*/}
      {/*  <div className="headingx plan__heading">*/}
      {/*    Join our program, Request invite.*/}
      {/*  </div>*/}

      {/*  <div className="plan__container">*/}
      {/*    <div className="plan__card-cta">*/}
      {/*      <a*/}
      {/*        href="https://docs.google.com/forms/d/1FDUajSVjIgG-7hBBl5ekOpHxurVi-DvqQ1AcbwiJpuI/edit?ts=5f4a681a"*/}
      {/*        target="_blank"*/}
      {/*        rel="noopener noreferrer"*/}
      {/*        className="btnx btnx-primary block plan__card-cta"*/}
      {/*      >*/}
      {/*        Request Invite*/}
      {/*      </a>*/}
      {/*    </div>*/}

      {/*    /!* <div className="plan__unit plan__active">*/}
      {/*      <div className="plan__card-heading">Postpaid</div>*/}
      {/*      <div className="plan__card-heading-main">*/}
      {/*        Pay only when you get a job of min 5LPA*/}
      {/*      </div>*/}
      {/*      <div className="plan__card-main-cost">*/}
      {/*        1,50,000 <span className="gst">+ GST</span>*/}
      {/*      </div>*/}
      {/*      <div className="plan__card-breakdown">BREAK DOWN</div>*/}
      {/*      <div className="plan__card-breakdown-container">*/}
      {/*        <div className="plan__card-breakdown-container__left-side">*/}
      {/*          <div className="plan__card-breakdown-cost">20,000</div>*/}
      {/*          <div className="plan__card-breakdown-for">Registration fee</div>*/}
      {/*        </div>*/}
      {/*        <div className="plan__card-breakdown-container__center">+</div>*/}
      {/*        <div className="plan__card-breakdown-container__right-side">*/}
      {/*          <div className="plan__card-breakdown-cost">1,30,000</div>*/}
      {/*          <div className="plan__card-breakdown-for">*/}
      {/*            Tuition Fee (ISA)*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="plan__card-tnc">*/}
      {/*        15% of your monthly salary capping upto 130000 if Job {' > '}*/}
      {/*        5lpa.*/}
      {/*      </div>*/}
      {/*      <div className="plan__card-cta">*/}
      {/*        <a*/}
      {/*          href="https://docs.google.com/forms/d/1FDUajSVjIgG-7hBBl5ekOpHxurVi-DvqQ1AcbwiJpuI/edit?ts=5f4a681a"*/}
      {/*          target="_blank"*/}
      {/*          rel="noopener noreferrer"*/}
      {/*          className="btnx btnx-primary block plan__card-cta"*/}
      {/*        >*/}
      {/*          Request Invite*/}
      {/*        </a>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="plan__unit">*/}
      {/*      <div className="plan__card-heading">Prepaid</div>*/}
      {/*      <div className="plan__card-heading-main">*/}
      {/*        Pay all upfront and nothing after placement*/}
      {/*      </div>*/}
      {/*      <div className="plan__card-main-cost">*/}
      {/*        80,000 <span className="gst">+ GST</span>*/}
      {/*      </div>*/}
      {/*      <div className="plan__card-breakdown">BREAK DOWN</div>*/}
      {/*      <div className="plan__card-breakdown-container">*/}
      {/*        <div className="plan__card-breakdown-container__left-side">*/}
      {/*          <div className="plan__card-breakdown-cost">20,000</div>*/}
      {/*          <div className="plan__card-breakdown-for">Registration fee</div>*/}
      {/*        </div>*/}
      {/*        <div className="plan__card-breakdown-container__center">+</div>*/}
      {/*        <div className="plan__card-breakdown-container__right-side">*/}
      {/*          <div className="plan__card-breakdown-cost">60,000</div>*/}
      {/*          <div className="plan__card-breakdown-for">Tuition Fee</div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="plan__card-tnc">Save on cost by paying upfront</div>*/}
      {/*      <div className="plan__card-cta">*/}
      {/*        <a*/}
      {/*          href="https://docs.google.com/forms/d/1FDUajSVjIgG-7hBBl5ekOpHxurVi-DvqQ1AcbwiJpuI/edit?ts=5f4a681a"*/}
      {/*          target="_blank"*/}
      {/*          rel="noopener noreferrer"*/}
      {/*          className="btnx btnx-primary-outine block plan__card-cta"*/}
      {/*        >*/}
      {/*          Request Invite*/}
      {/*        </a>*/}
      {/*      </div>*/}
      {/*    </div>*!/*/}
      {/*  </div>*/}
      {/*  /!* <div className="plan__bottom-info">*/}
      {/*    The absence of money should not deter you from applying, please reach*/}
      {/*    out to us if you think that’s the case.<br></br> To know more,*/}
      {/*    <a*/}
      {/*      href="https://calendly.com/saikc3/15min"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener noreferrer"*/}
      {/*      className="plan__know-more-link"*/}
      {/*    >*/}
      {/*      schedule a session with us.*/}
      {/*    </a>*/}
      {/*  </div> *!/*/}
      {/*</section>*/}
      {/*/!* <section className="cool">*/}
      {/*  <div className="cool__container">*/}
      {/*    <div className="cool__left-side">*/}
      {/*      <img src="./cool.svg" alt="cool" />*/}
      {/*    </div>*/}
      {/*    <div className="cool__right-side">*/}
      {/*      <div className="headingx cool__heading">Sounds Cool?</div>*/}
      {/*      <div className="descpx cool__descp">*/}
      {/*        get started with #desvsnest to experience the best version of*/}
      {/*        yourself.*/}
      {/*      </div>*/}
      {/*      <a*/}
      {/*        href="https://docs.google.com/forms/d/1FDUajSVjIgG-7hBBl5ekOpHxurVi-DvqQ1AcbwiJpuI/edit?ts=5f4a681a"*/}
      {/*        target="_blank"*/}
      {/*        className="btnx cool__cta"*/}
      {/*      >*/}
      {/*        Apply Now*/}
      {/*      </a>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section> *!/*/}

      <Carousel responsive={responsiveSingleItem}>
        <section className="stories">
          <div className="stories__container">
            <div className="stories__left-side">
              <img src="./abhishek.jpeg" />
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
              <img src="./priya.png" />
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
              <img src="./vashu_f.png" />
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

      <footer className="footer">
        <div className="footer__container">
          <div className="footer__left-side">
            <div className="footer__logo"></div>
            <div className="footer__descp">
              <div>
                We aim to make young India financially self-sustainable by
                providing equal opportunity for all.
              </div>

              <a
                href="https://drive.google.com/file/d/17TKzId-5qlRjKVLX30W1Brn_L70rcMN1/view"
                target="_blank"
                className="footer__privacy-policy"
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="footer__right-side">
            <div>
              {' '}
              Contact us{' '}
              <span className="footer__email">admin@devsnest.in</span>{' '}
            </div>
            <div className="footer__right-side__social">
              <a href="">
                {' '}
                <i
                  className="fa fa-linkedin-square"
                  aria-hidden="true"
                ></i>{' '}
              </a>
              <a href="">
                {' '}
                <i
                  className="fa fa-facebook-square"
                  aria-hidden="true"
                ></i>{' '}
              </a>
              <a href="">
                {' '}
                <i className="fa fa-instagram" aria-hidden="true"></i>{' '}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
