import '../assets/css/onboarding.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../constants/api';
import { login } from '../redux';
import icons from '../utils/getIcons';

const formQuestions = [
  {
    title: 'Discord Username',
    type: 'text',
    field: 'discord_username',
    format: 'input',
  },
  {
    title: 'Discord Id',
    type: 'number',
    field: 'discord_id',
    format: 'input',
  },
  {
    title: 'Name',
    type: 'text',
    field: 'name',
    format: 'input',
  },
  {
    title: 'College',
    type: 'text',
    field: 'college',
    format: 'input',
  },
  {
    title: 'College Year (Stream)',
    type: 'text',
    field: 'college_year',
    format: 'input',
  },
  {
    title: 'Your Work ex',
    type: 'radio',
    field: 'work_exp',
    format: 'option',
    option: ['More than 6 months', 'Less than 6 months', 'No work ex'],
  },
  {
    title: 'Where did you learn about devsnest',
    type: 'radio',
    field: 'known_from',
    format: 'option',
    option: ['Friend', 'Linkedin', 'College peer', 'Other'],
  },
  {
    title: 'How much will you rate your DSA?',
    type: 'radio',
    field: 'dsa_skill',
    format: 'scale',
  },
  {
    title: 'How much will you rate your Web Development skills?',
    type: 'radio',
    field: 'webd_skill',
    format: 'scale',
  },
  {
    title: 'Are you sure you want to proceed with these above filled details?',
    format: 'message',
  },
];

export default function Onboarding() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isApplying, setisApplying] = useState(false);

  const [isDiscordJoin, setisDiscordJoin] = useState(false);
  const [isDiscordConnect, setisDiscordConnect] = useState(false);
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

  const [formStep, setformStep] = useState(0);

  const [formData, setformData] = useState({
    discord_username: '',
    discord_id: '',
    name: '',
    college: '',
    college_year: '',
    work_exp: '',
    known_from: '',
    dsa_skill: '',
    webd_skill: '',
  });

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

  const handleFormQuestion = (buttonType) => {
    if (buttonType === 'down') {
      if (formStep + 1 < formQuestions.length) setformStep(formStep + 1);
    } else {
      if (formStep - 1 >= 0) {
        setformStep(formStep - 1);
      }
    }
  };

  const handleFormInput = (event) => {
    setformData({
      ...formData,
      [formQuestions[formStep].field]: event.target.value,
    });
  };

  const handleFormData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_ENDPOINTS.ONBOARDING}`, {
        data: { attributes: formData, type: 'onboards' },
      });
      if (response.data) {
        toast.success('Details Submitted');
      }
      setisFormSubmit(true);
    } catch (err) {
      toast.warning(err.message);
    }
  };

  return (
    <>
      {!isApplying ? (
        <div className="onboarding">
          <div className="onboarding__container row flex-row-reverse">
            <div className="col-md-12" style={{ height: '100%' }}>
              <div className="onboarding__table pb-3">
                <div className="content">
                  <div className="main-title">Devsnest's 6 months course</div>
                  {content.map((data, index) => {
                    return (
                      <span key={index}>
                        <div
                          key={data.title}
                          className="title my-3"
                          onClick={() => showDescription(index)}
                        >
                          {data.title}
                        </div>
                        <div
                          className={`description ${
                            data.isOpen ? 'open' : 'close'
                          }`}
                          key={data.description}
                        >
                          {data.description}
                        </div>
                      </span>
                    );
                  })}
                </div>
                <div className="content">
                  <div className="box" />
                  <div className="button-container">
                    <button className="button-style nope bg-white">Nope</button>
                    <button
                      className="button-style apply"
                      onClick={() => setisApplying(true)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : !isFormSubmit ? (
        <div className="background">
          <div className="inner-card">
            <div className="shadow profile-card py-4 px-4 flex-fill m-5 d-flex flex-column justify-content-start left-content">
              <div className="main-title my-4">Devsnest's 6 months course</div>
              {content.map((data, index) => {
                return (
                  <span key={index}>
                    <div key={data.title} className="title">
                      {data.title}
                    </div>
                    <div
                      className={`description ${
                        data.isOpen ? 'open' : 'close'
                      }`}
                      key={data.description}
                    >
                      {data.description}
                    </div>
                  </span>
                );
              })}
              <button className="applying-button blue-border-button">
                Applying
              </button>
            </div>
            <div className="shadow profile-card py-4 pl-0 flex-fill m-5 d-flex flex-column justify-content-start left-content">
              <div className="main-title p-3">
                Complete these steps to Join the course :
              </div>
              <div className="message">
                Join our Discord Server
                <button
                  className={`form-button ${
                    isDiscordJoin ? 'bg-green' : 'bg-blue'
                  }`}
                  onClick={() => setisDiscordJoin(true)}
                >
                  {isDiscordJoin ? 'Joined' : 'Join'}
                </button>
              </div>
              <div
                className={`message border-down-grey ${
                  isDiscordJoin ? '' : 'color-grey'
                }`}
              >
                Connect to Discord
                <button
                  className={`form-button ${
                    isDiscordJoin ? 'bg-blue' : 'bg-grey'
                  } ${isDiscordConnect ? 'bg-green' : ''}`}
                  onClick={() => {
                    // window.location = API_ENDPOINTS.DISCORD_LOGIN_REDIRECT;
                    setisDiscordConnect(true);
                  }}
                  // onClick={() => setisDiscordConnect(true)}
                  disabled={!isDiscordJoin}
                >
                  {isDiscordConnect ? 'Connected' : 'Connect'}
                </button>
              </div>
              <div
                className={`message ${
                  isDiscordJoin && isDiscordConnect ? '' : 'color-grey'
                }`}
              >
                {formStep === formQuestions.length - 1
                  ? ''
                  : 'Fill your details'}
              </div>
              {/* {JSON.stringify(formData)} */}
              <form onSubmit={handleFormData}>
                {formQuestions[formStep].format === 'input' ? (
                  <div className="form-content">
                    <label
                      className={`pl-4 ${
                        isDiscordJoin && isDiscordConnect ? '' : 'color-grey'
                      }`}
                      style={{ fontSize: '20px' }}
                      htmlFor={formStep}
                    >
                      {formQuestions[formStep].title}
                    </label>
                    <input
                      key={formStep}
                      className="input-field"
                      type={formQuestions[formStep].type}
                      value={formData[formQuestions[formStep].field]}
                      onChange={handleFormInput}
                      min="0"
                      disabled={!(isDiscordJoin && isDiscordConnect)}
                    />
                  </div>
                ) : formQuestions[formStep].format === 'scale' ? (
                  <div className="form-content">
                    <label className="pl-4" style={{ fontSize: '20px' }}>
                      {formQuestions[formStep].title}
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '38px',
                        marginLeft: '40px',
                        marginTop: '20px',
                      }}
                    >
                      {[...Array(5)].map((icon, index) => {
                        return (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              marginLeft: '50px',
                            }}
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name={formQuestions[formStep].field}
                              id={index + 's'}
                              value={index + 1}
                              onChange={handleFormInput}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={index + 's'}
                            >
                              {index + 1}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : formQuestions[formStep].format === 'option' ? (
                  <div className="form-content">
                    <label className="pl-4" style={{ fontSize: '20px' }}>
                      {formQuestions[formStep].title}
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '58px',
                        marginLeft: '50px',
                      }}
                    >
                      {formQuestions[formStep].option.map(
                        (optionTitle, index) => {
                          return (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                margin: '7px 0px',
                              }}
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name={formQuestions[formStep].field}
                                id={index}
                                value={optionTitle}
                                onChange={handleFormInput}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={index}
                              >
                                {optionTitle}
                              </label>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className="pl-4"
                    style={{ fontSize: '20px', width: '600px' }}
                  >
                    Are you sure you want to proceed with these above filled
                    details?
                  </div>
                )}
                <div className="form-navigate-button">
                  {formStep === formQuestions.length - 1 ? (
                    <>
                      <button
                        className="form-button bg-blue"
                        onClick={() => setisDiscordJoin(true)}
                        type="submit"
                      >
                        Yes Sure!
                      </button>
                      <button
                        className="form-button blue-border-button bg-white"
                        onClick={() => handleFormQuestion('up')}
                      >
                        Go back
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src={
                          isDiscordJoin && isDiscordConnect
                            ? icons.down_button
                            : icons.grey_down_button
                        }
                        alt="Down Button"
                        style={{ marginRight: '10px' }}
                        onClick={() =>
                          isDiscordConnect && isDiscordJoin
                            ? handleFormQuestion('down')
                            : ''
                        }
                      />
                      {formStep !== 0 ? (
                        <img
                          src={icons.up_button}
                          alt="Up Button"
                          style={{ marginRight: '10px' }}
                          onClick={() => handleFormQuestion('up')}
                        />
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
              </form>
            </div>
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
