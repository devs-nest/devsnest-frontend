import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Navbar from '../../components/Navbar';
import { faqsData } from './landing_data';
import './landing.scss';

function Faq() {
  return (
    <div className="landing-v2">
      <Navbar faqs={true} />
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
    </div>
  );
}

export default Faq;
