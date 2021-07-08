import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { toast } from 'react-toastify';
import icons from '../../utils/getIcons';
import axios from '../../config/axios.config';
import { API_ENDPOINTS } from '../../constants/api';

const formQuestions = [
  {
    title: 'Discord Username',
    type: 'text',
    field: 'discord_username',
    format: 'input',
    placeholder: 'Enter your username',
  },
  {
    title: 'Discord Id',
    type: 'number',
    field: 'discord_id',
    format: 'input',
    placeholder: 'Enter your discord id',
  },
  {
    title: 'Name',
    type: 'text',
    field: 'name',
    format: 'input',
    placeholder: 'Enter your name',
  },
  {
    title: 'College',
    type: 'text',
    field: 'college_name',
    format: 'input',
    placeholder: 'Enter your college',
  },
  {
    title: 'College Year (Stream)',
    type: 'text',
    field: 'grad_year',
    format: 'input',
    placeholder: 'Enter your year and stream',
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

export const Main = ({
  isDiscordConnect,
  setisFormSubmit,
  setisDiscordConnect,
}) => {
  const [isDiscordJoin, setisDiscordJoin] = useState(false);
  const [formStep, setformStep] = useState(0);
  const [formData, setformData] = useState({
    discord_username: '',
    discord_id: '',
    name: '',
    college_name: '',
    grad_year: '',
    work_exp: '',
    known_from: '',
    dsa_skill: '',
    webd_skill: '',
  });
  const [progressPercent, setprogressPercent] = useState(0);

  const handleFormInput = (event) => {
    setformData({
      ...formData,
      [formQuestions[formStep].field]: event.target.value,
    });
  };

  const handleFormData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${API_ENDPOINTS.ONBOARDING}`, {
        data: { attributes: formData, type: 'users' },
      });
      if (response.data) {
        toast.success('Details Submitted');
      }
    } catch (err) {
      toast.warning(err.message);
    }
    setisFormSubmit(true);
  };

  const handleFormQuestion = (buttonType) => {
    if (buttonType === 'down') {
      if (formStep + 1 < formQuestions.length) setformStep(formStep + 1);
    } else {
      if (formStep - 1 >= 0) {
        setformStep(formStep - 1);
      }
    }

    let count = 9;
    Object.keys(formData).forEach((field) => {
      if (formData[field] === '') {
        count--;
      }
    });
    console.log(count);
    setprogressPercent(11 * count);
  };

  return (
    <div className="shadow profile-card py-4 pl-0 flex-fill m-5 d-flex flex-column justify-content-start left-content onboarding-main">
      <div className="main-title p-3">
        Complete these steps to Join the course :
      </div>
      <div className="message">
        Join our Discord Server
        <a
          href="https://discord.gg/E8YcJpGJKB"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className={`form-button ${isDiscordJoin ? 'bg-green' : 'bg-blue'}`}
            onClick={() => setisDiscordJoin(true)}
          >
            {isDiscordJoin ? 'Joined' : 'Join'}
          </button>
        </a>
      </div>
      <div
        className={`message border-down-grey ${
          isDiscordJoin ? '' : 'color-grey'
        }`}
      >
        Connect to Discord
        <a
          href={API_ENDPOINTS.DISCORD_LOGIN_REDIRECT}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className={`form-button ${isDiscordJoin ? 'bg-blue' : 'bg-grey'} ${
              isDiscordConnect ? 'bg-green' : ''
            }`}
            onClick={async () => {
              // window.location = API_ENDPOINTS.DISCORD_LOGIN_REDIRECT;
              const response = await axios.get(API_ENDPOINTS.CURRENT_USER);
              // setisDiscordConnect(response.data.data.attributes.activity.discord_active);
              setisDiscordConnect(true);
            }}
            // onClick={() => setisDiscordConnect(true)}
            disabled={!isDiscordJoin}
          >
            {isDiscordConnect ? 'Connected' : 'Connect'}
          </button>
        </a>
      </div>
      <div
        className={`message ${
          isDiscordJoin && isDiscordConnect ? '' : 'color-grey'
        }`}
      >
        {formStep === formQuestions.length - 1 ? '' : 'Fill your details'}
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
              placeholder={formQuestions[formStep].placeholder}
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
                    key={index}
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
                    <label className="form-check-label" htmlFor={index + 's'}>
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
                // height: '58px',
                marginLeft: '50px',
              }}
            >
              {formQuestions[formStep].option.map((optionTitle, index) => {
                return (
                  <div
                    key={index}
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
                    <label className="form-check-label" htmlFor={index}>
                      {optionTitle}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="pl-4" style={{ fontSize: '20px' }}>
            Are you sure you want to proceed with these above filled details?
          </div>
        )}
        <div className="form-navigate-button align-items-center">
          {formStep !== formQuestions.length - 1 && (
            <ProgressBar
              now={progressPercent > 95 ? 100 : progressPercent}
              label={`${progressPercent > 95 ? 100 : progressPercent}%`}
              className="onboarding-progress-bar"
            />
          )}
          {formStep === formQuestions.length - 1 ? (
            <div className="d-flex">
              <button
                className="form-button blue-border-button bg-white"
                onClick={() => handleFormQuestion('up')}
              >
                Go back
              </button>
              <button
                className="form-button bg-blue"
                onClick={() => setisDiscordJoin(true)}
                type="submit"
              >
                Yes Sure!
              </button>
            </div>
          ) : (
            <div>
              {formStep !== 0 ? (
                <img
                  src={icons.up_button}
                  alt="Up Button"
                  style={{
                    marginRight: '10px',
                    transform: 'rotate(-90deg)',
                    zIndex: '5',
                  }}
                  onClick={() => handleFormQuestion('up')}
                />
              ) : (
                <></>
              )}
              <img
                src={
                  isDiscordJoin && isDiscordConnect
                    ? icons.down_button
                    : icons.grey_down_button
                }
                alt="Down Button"
                style={{
                  marginRight: '10px',
                  transform: 'rotate(-90deg)',
                  zIndex: '5',
                }}
                onClick={() =>
                  isDiscordConnect && isDiscordJoin
                    ? handleFormQuestion('down')
                    : ''
                }
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
