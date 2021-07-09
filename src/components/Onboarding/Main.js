import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { toast } from 'react-toastify';

import axios from '../../config/axios.config';
import { API_ENDPOINTS } from '../../constants/api';
import { useUser } from '../../redux';
import icons from '../../utils/getIcons';

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
    title: 'College Year',
    type: 'number',
    field: 'grad_year',
    format: 'input',
    placeholder: 'Enter your year',
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
    option: ['1', '2', '3', '4', '5'],
  },
  {
    title: 'How much will you rate your Web Development skills?',
    type: 'radio',
    field: 'webd_skill',
    format: 'scale',
    option: ['1', '2', '3', '4', '5'],
  },
  {
    title: 'Are you sure you want to proceed with these above filled details?',
    format: 'message',
  },
];

export const Main = ({
  isDiscordJoin,
  isDiscordConnect,
  progressPercent,
  setisFormSubmit,
  setisDiscordConnect,
  setisDiscordJoin,
  setprogressPercent,
}) => {
  const user = useUser();
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

  const handleFormInput = (event) => {
    setformData({
      ...formData,
      [formQuestions[formStep].field]: event.target.value,
    });
  };

  const handleFormData = async (event) => {
    event.preventDefault();
    if (
      Object.keys(formData).filter((field) => formData[field] === '').length !==
      0
    ) {
      toast.warning('Please Complete Form Before Submitting');
      return;
    }
    try {
      const response = await axios.put(`${API_ENDPOINTS.ONBOARDING}`, {
        data: {
          attributes: { ...formData, is_form_filled: true },
          type: 'users',
        },
      });
      if (response.data) {
        toast.success('Details Submitted');
      }
      setisFormSubmit(true);
    } catch (err) {
      toast.error(err.message);
    }
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
    setprogressPercent(11 * count);
  };

  return (
    <div className="shadow profile-card pb-4 pl-0 flex-fill my-5 mx-2 mx-md-5 d-flex flex-column justify-content-start left-content onboarding-main">
      <div
        className="main-title p-3 pt-4"
        style={{ backgroundColor: '#9a7dc9', color: 'white' }}
      >
        Complete these steps to Join the course :
      </div>
      <div className="message" style={{ borderTop: 'none' }}>
        Join our Discord Server
        <a
          href="https://discord.gg/E8YcJpGJKB"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setisDiscordJoin(true)}
        >
          <button
            className={`ml-2 form-button ${
              isDiscordJoin ? 'bg-green' : 'bg-blue'
            }`}
            style={{
              animation: `${
                !isDiscordJoin && 'scaleAnimation 1s linear infinite'
              }`,
            }}
          >
            {isDiscordJoin ? 'Joined' : 'Join'}
          </button>
        </a>
      </div>
      <div className={`message ${isDiscordJoin ? '' : 'color-grey'}`}>
        Connect to Discord
        <a
          href={API_ENDPOINTS.DISCORD_LOGIN_REDIRECT}
          target="_blank"
          rel="noopener noreferrer"
          onClick={async () => {
            setisDiscordConnect(user.discord_active);
            // setisDiscordConnect(true);
          }}
        >
          <button
            className={`ml-2 form-button ${
              isDiscordJoin ? 'bg-blue' : 'bg-grey'
            } ${isDiscordConnect ? 'bg-green' : ''}`}
            style={{
              animation: `${
                !isDiscordConnect &&
                isDiscordJoin &&
                'scaleAnimation 1s linear infinite'
              }`,
            }}
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
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleFormQuestion('down');
                }
              }}
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
              {formQuestions[formStep].option.map((optionTitle, index) => {
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
                      id={index}
                      value={optionTitle}
                      onChange={handleFormInput}
                      checked={
                        formData[formQuestions[formStep].field] === optionTitle
                      }
                    />
                    <label className="form-check-label" htmlFor={index}>
                      {optionTitle}
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
                      checked={
                        formData[formQuestions[formStep].field] === optionTitle
                      }
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
                className="form-button bg-blue ml-2"
                onClick={() => setisDiscordJoin(true)}
                type="submit"
              >
                Yes Sure!
              </button>
            </div>
          ) : (
            <div className="d-flex">
              {formStep !== 0 ? (
                <img
                  src={icons.up_button}
                  alt="Up Button"
                  style={{
                    marginRight: '10px',
                    transform: 'rotate(-90deg)',
                    cursor: 'pointer',
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
                  cursor: 'pointer',
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
