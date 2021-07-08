import '../assets/css/onboarding.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

import { Info } from '../components/Onboarding/Info';
import { Main } from '../components/Onboarding/Main';
import { Welcome } from '../components/Onboarding/Welcome';
import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../constants/api';
import { login } from '../redux';
import { useUser } from '../redux';

export default function Onboarding() {
  const user = useUser();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isApplying, setisApplying] = useState(false);
  const [isDiscordJoin, setisDiscordJoin] = useState(false);
  const [progressPercent, setprogressPercent] = useState(0);

  const [isDiscordConnect, setisDiscordConnect] = useState(user.discord_active);
  const [isFormSubmit, setisFormSubmit] = useState(false);

  useEffect(() => {
    const load = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (code) {
        setisDiscordConnect(false);
        try {
          await axios.post(API_ENDPOINTS.CONNECT_DISCORD, {
            code,
          });
          const userResp = await axios.get(API_ENDPOINTS.CURRENT_USER);
          dispatch(login(userResp.data.data.attributes));
          setisDiscordConnect(true);
          toast.success('Successfully connected');
        } catch (e) {
          // can break anywhere lmao
          const message = e?.response?.data?.data?.attributes?.error?.message;
          toast.error(message || 'Could not connect');
        }
      }
    };

    load();
  }, [dispatch, location]);

  const [content, setcontent] = useState([
    {
      title: 'Live Classes',
      description:
        "It's COVID, we know you can't even meet your next door neighbours. But we do bring a fun class-like experience virtually.",
      isOpen: false,
    },
    {
      title: 'Personalized Guidance',
      description:
        'Everyone is different and so are your talents and problems. We nuture you through personalized attention into the best you.',
      isOpen: false,
    },
    {
      title: 'Project Driven Curriculum',
      description:
        'Reading the whole Cormen is a nightmare, only Sheldon can handle so much of theory. Our intensive hands on 10+ projects, makes it exciting.',
      isOpen: false,
    },
    {
      title: 'Guest Talks',
      description:
        'Our "Cool Tech Talks" by industry experts on trending technologies keep you upgraded to the latest version.',
      isOpen: false,
    },
    {
      title: 'Peer Learning',
      description:
        'Discussions and debates are the best way to learn, We encourage group collaboration and pair programming.',
      isOpen: false,
    },
    {
      title: 'Mock Interviews By Industry Experts',
      description:
        'We end your stage fear of interviews, by having mock "live like" interviews by mentors from FAANG type companies.',
      isOpen: false,
    },
  ]);

  const showDescription = (index) => {
    const duplicateContent = [...content];
    duplicateContent.forEach((data, position) => {
      if (position !== index) {
        data.isOpen = false;
      }
    });
    duplicateContent[index].isOpen = !duplicateContent[index].isOpen;
    setcontent(duplicateContent);
  };

  return (
    <>
      {!isApplying ? (
        <Welcome
          content={content}
          showDescription={showDescription}
          setisApplying={setisApplying}
        />
      ) : !isFormSubmit ? (
        <div className="background">
          <div className="inner-card">
            <Info
              content={content}
              percentage={
                isDiscordJoin
                  ? isDiscordConnect
                    ? isFormSubmit
                      ? 100
                      : 66
                    : 33
                  : 0
              }
              progressPercent={progressPercent}
            />
            <Main
              isDiscordJoin={isDiscordJoin}
              isDiscordConnect={isDiscordConnect}
              progressPercent={progressPercent}
              setisFormSubmit={setisFormSubmit}
              setisDiscordConnect={setisDiscordConnect}
              setisDiscordJoin={setisDiscordJoin}
              setprogressPercent={setprogressPercent}
            />
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: '#F2EFF7' }} className="py-5">
          <div className="confirm-message container">
            You will be assigned a team soon
          </div>
        </div>
      )}
    </>
  );
}
