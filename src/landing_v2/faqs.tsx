import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import Nav from './nav';
import './landing.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';

const faqsData = [
  {
    question: `How do I apply for this course?`,
    answer: `You can simply join this discord link and follow the guidelines provided on the welcome channel.`,
  },
  {
    question: `What is the duration of the course?`,
    answer: `The ideal duration of the course is 6 months, some students will be able to get a job sooner and some might need some more revision classes`,
  },
  {
    question: `What are the fees of the course?`,
    answer: `0, This course is completely free for everyone, although we recommend that you donate after initial months to help us cover the operational costs`,
  },
  {
    question: `Who are the mentors?`,
    answer: `Mentors are Developers from top tech companies like Google, Facebook, Amazon  who will be assisting students on a weekly basis in batches of 20.`,
  },
  {
    question: `What are the prerequisites to join this course?`,
    answer: `Students applying should have a basic understanding of english and maths, and they should go through a week long python course to check if coding is for them.

    Most importantly what we need from students is motivation to learn.
    `,
  },
  {
    question: `Does Devsnest guarantee me a job?`,
    answer: `No, Although we focus on teaching on demand industry skills and making you noticeable by recruiters by getting you referrals and showcasing your project on our website but clearing interviews is the sole responsibility of students.`,
  },
  {
    question: `I am not currently looking for a tech job, is the course for me?`,
    answer: `Devsnest also provides students with various internships and freelancing opportunities.
    Multiple mentors in the community will guide students to start collaborating on open source projects after the course.
    `,
  },
  {
    question: `What is the effort required from a student?`,
    answer: `Effort required is close to min 4-5 hours in a day in which you have to attend classes, do sessions with peers and do tasks and assignments. 

    Peer learning and collaboration are a core part of devsnest and you are required to give 2-3 hours in a week helping other students.
    `,
  },
  {
    question: `The class hours don’t work for me, what do i do?`,
    answer: `We will record all the classes, but group meetings are mandatory for each student.You have to make sure that you can attend other mandatory meetings and do the assignments on time`,
  },
  {
    question: `Does college, school or course matter to be a part of the course?`,
    answer: `There are no boundations in terms of the degree you are   pursuing. This is open for everyone who is willing to put in the required effort.`,
  },
  {
    question: `Does the course involve interview preparation as well?`,
    answer: `Yes, In our last month we would be focusing on improving your resume and cover letter as well as getting you mock interviews and help you become job ready.`,
  },
  {
    question: `Whom to contact in case of any doubt related to course?`,
    answer: `You can email us at admin@devsnest.in or you can contact a mod on discord `,
  },
  {
    question: `I work full time but I would like to join the course, what are the options?`,
    answer: `You are free to join the course even if you are employed full time. We will provide you with the recorded lectures but it will be mandatory for you to complete the given assignments and actively participate in group meetings.`,
  },
];

function Faq() {
  return (
    <div className="landing-v2">
      <Nav faqs={true} />
      <section className="faq" id="read">
        <div className="headingx faq__heading">ISA FAQs</div>
        <div className="faq__container">
          <Accordion>
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
