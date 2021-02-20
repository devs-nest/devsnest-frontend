import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Footer from '../components/Footer';
import { faqsData } from '../constants';
import hero2 from '../assets/images/hero2.jpg';

function Faq() {
  return (
    <div className="landing-v2">
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

      <section className="faq" id="read">
        <div className="headingx faq__heading"> FAQs</div>
        <div className="faq__container">
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="50">
                How do I apply for this course?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="50">
                <Card.Body>
                  {' '}
                  You can simply join this{' '}
                  <a
                    href="https://discord.gg/E8YcJpGJKB"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    discord link
                  </a>{' '}
                  and follow the guidelines provided on the welcome channel.{' '}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            {faqsData.map((faq, index) => {
              const { question, answer } = faq;

              return (
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                    {question}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={`${index}`}>
                    <Card.Body>{answer}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Faq;
