import React from 'react';
import { useHistory } from 'react-router-dom';

export const Welcome = ({ content, showDescription, setisApplying }) => {
  const history = useHistory();
  const handleNope = () => {
    history.push('/');
  };
  return (
    <div className="onboarding">
      <div className="onboarding__container row flex-row-reverse">
        <div className="col-md-12" style={{ height: '100%' }}>
          <div className="onboarding__table pb-3 d-flex flex-column flex-md-row">
            <div className="content justify-content-center justify-content-md-start w-100 w-md-50">
              <div className="main-title">Devsnest&apos;s 6 months course</div>
              <ul>
                {content.map((data, index) => {
                  return (
                    <li key={index}>
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
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="content justify-content-center justify-content-md-start w-100 w-md-50 ml-md-5">
              <div className="box d-none d-md-flex" />
              <div className="button-container">
                <button
                  className="button-style nope bg-white"
                  onClick={() => handleNope()}
                >
                  Nope
                </button>
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
  );
};
