import ved from '../../assets/images/mentor_ved.jpg';
import kshitiz from '../../assets/images/mentors/kshitiz.png';
import vaibhav from '../../assets/images/mentors/vaibhav_nutanix.jpeg';
import sai from '../../assets/images/mentor_sai.jpg';
import abhishek from '../../assets/images/mentors/Abhishek_eduflow.jpeg';
import naman from '../../assets/images/mentors/naman_hackerrank.jpg';
import kritarth from '../../assets/images/mentors/kritarth_facebook.jpg';
import akshay from '../../assets/images/mentors/akshay_atlassian.jpeg';
import sudhanshu from '../../assets/images/mentors/sudhanshu_hackerrank.jpg';
import rohit from '../../assets/images/mentors/rohit_hackerrank.jpeg';

const prerequisite_data = [
  {
    name: 'Basic Understanding of English and Maths',
    descp: null,
  },
  {
    name: 'Basic Understanding of Python Language',
    descp:
      'Don’t worry if you are new to coding, we are launching a 2 week Python Primer on 22nd Feb.',
  },
  {
    name:
      'Be a part of community, be ready to spend 2-3 hours a week with your peers, learning together',
    descp: null,
  },
  {
    name: 'Motivation to learn',
    descp: null,
  },
];

const who_can_join_data = [
  {
    name: 'If you looking to explore a career in coding(Complete beginner)',
  },
  {
    name: 'You are passionate about coding and building stuff',
  },
  {
    name:
      'You want to revise a few concepts and you love interacting with the community',
  },
];

const mentorsData = [
  {
    name: 'Vedansh Garg',
    company: 'Ex - HackerRank',

    img: `${ved}`,

    linkedin: 'https://www.linkedin.com/in/vedanshgarg/',
    descp: `Vedansh was a Senior Engineer at Hackerrank. In the last 5 years, he scaled the HackerRank community from 500k to 10M Developers.

      He was also part of Navgurukul a Non Profit where he has worked on curriculum, jobs pipeline, and mentoring 100+ underprivileged students on software engineering.`,
  },
  // {
  //   name: 'Naman Malhotra',
  //   company: 'Co-founded Alconomy',
  //   img: './mentor_nam_f.jpg',
  //   linkedin: 'https://www.linkedin.com/in/naman03malhotra/',
  //   descp: `Hi, I am Naman Malhotra. I still remember the first line of code I wrote when I was 13. Since then, I have worked with many startup founders across the continents.

  //   I co-founded two startups; one of them was in the Ed-Tech space, and the other was in blockchain fintech. In both of them, I lead the entire tech end to end and product to some extent.

  //   I strongly believe that if you have the right set of skills, your background, traditional education, etc hardly matters. Given that you are ready to work your ass off.`,
  // },
  {
    name: 'Kshitiz Miglani',
    company: 'Amazon',

    img: `${kshitiz}`,

    linkedin: 'https://www.linkedin.com/in/kshitizmiglani/',
    descp: `Kshitiz has worked as a developer in Amazon, PayTM and Samsung creating scalable solutions leading critical projects.

    He has also worked in multiple early start ups related to tech and education domain. Has been mentoring masses to become great engineers and leaders for India's growing silicon valley.`,
  },
  {
    name: 'Vaibhav Gupta',
    company: 'Nutanix',

    img: `${vaibhav}`,

    linkedin: 'https://www.linkedin.com/in/vaibhav-gupta-84a21883/',
    descp: `Vaibhav is an alumnus of BITS Pilani. He works in Nutanix as MTS 3. He has 4+ years of experience in designing scalable distributed systems. He has also worked as part of Oracle Cloud and Paypal.
    In the last 2 years, he has mentored many students on a 1:1 basis to get into companies like Samsung, Amazon, Flipkart, etc.`,
  },
  {
    name: 'Sai Ahladni Tripathy',
    company: 'Ex - Amazon',

    img: `${sai}`,

    linkedin: 'https://www.linkedin.com/in/ahladini/',
    descp: `Sai was a software developer at Amazon. She is an Alumni of BITS Pilani.

      She has previously worked as a placement co-ordinator at BITS and understands the recruitment market really well.

      Apart from this Sai enjoys playing with her paw-friend.`,
  },
];

const webinarData = [
  /* {
    name: 'Ankit Goyal',
    title: 'Google',
    descp: 'Graphs Minimum Spanning Trees and Interviewing at Google',
    img: './mentors/Ankit_goyal_google.jpeg',
  }, */

  {
    name: 'Rohit Aggarwal',
    title: 'Lead Engineer Hackerrank',
    descp: 'Building scalable backends and writing Microservices',

    img: `${rohit}`,
  },

  {
    name: 'Abhishek Gahlot',
    title: 'Entrepreneur, EM at EduFlow',
    descp: 'How browsers work, V8 engine and Networking in browsers',

    img: `${abhishek}`,
  },

  {
    name: 'Naman Malhotra',
    title: 'Software Engineer at HackerRank',
    descp: `Cracking Frontend Interviews and contributing to open source`,

    img: `${naman}`,
  },

  {
    name: 'Vaibhav Gupta',
    title: 'Nutanix Ex- Paypal',
    descp: `System Designing and Creating a Highly Scalable URL Shortening service`,

    img: `${vaibhav}`,
  },

  {
    name: 'Kritarth Anand',
    title: 'Ex-Facebook',
    descp: 'Importance of building a brand and having the right tribe',

    img: `${kritarth}`,
  },

  {
    name: 'Kumar Akshay',
    title: 'Atlassian',
    descp: 'Starting with Opensource, GSOC and Interning at top-tech companies',

    img: `${akshay}`,
  },

  {
    name: ' Sudhanshu Yadav',
    title: 'Architect at HackerRank',
    descp: 'Projects Review, JS V8 Engine and Contributing to Brahmos',

    img: `${sudhanshu}`,
  },
];

const discord_server_data = [
  {
    name: 'Batch starting on 10th March.',
  },
  {
    name: 'Python primer starting on 22nd February.',
  },
  {
    name:
      'Collaborative community with members from Google, Facebook, Amazon and other top tech companies.',
  },
];

export {
  prerequisite_data,
  who_can_join_data,
  mentorsData,
  webinarData,
  discord_server_data,
};
