import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import hero2 from '../assets/images/landing/hero2.jpg';
import { faqsData } from '../constants/mock_data';

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
              Please go through the <span className="color-purple ">FAQs.</span>
            </h1>
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
                <Card key={index}>
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
    </div>
  );
}

export default Faq;
