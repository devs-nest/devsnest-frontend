import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import default_user from '../../assets/images/default_user.png';
import {
  getScrums,
  saveCurrentUserScrum,
  saveScrum,
} from '../../services/scrum';
import UserImage from '../UserImage';

const DEFAULT_MEMBER_OBJECT = {
  data: '',
  attendance: false,
  saw_last_lecture: false,
  till_which_tha_you_are_done: '',
  what_cover_today: '',
  reason_for_backlog: '',
  rate_yesterday_class: 5,
};

export default function Scrums({ group, groupMembers }) {
  const user = useSelector((state) => state.loginState.user);
  const isTeamOwner = group.owner_id === user.id;
  const [members, setMembers] = useState([...groupMembers]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: refactor this mess
  const saveScrums = async (index) => {
    setIsSaving(true);
    try {
      if (isTeamOwner && typeof index === 'number') {
        const member = members[index];
        if (member.user_id === user.id) {
          await saveCurrentUserScrum(member);
        } else {
          await saveScrum(member);
        }
      } else if (isTeamOwner) {
        for (let member of members) {
          if (member.user_id === user.id) {
            await saveCurrentUserScrum(member);
          } else {
            await saveScrum(member);
          }
        }
      } else {
        const data = members.find((member) => member.user_id === user.id);
        const resp = await saveCurrentUserScrum(data);
        const newMembers = members.map((mem) =>
          mem.user_id === resp.data.user_id
            ? { ...mem, ...resp.data, id: resp.id }
            : mem
        );
        setMembers(newMembers);
      }
      loadScrums();
      toast('Saved successfully', { type: 'success' });
    } catch (e) {
      console.error(e);
      toast('An error occured while saving', { type: 'error' });
    }
    setIsSaving(false);
  };

  const loadScrums = async () => {
    setIsLoading(true);
    try {
      const scrums = await getScrums();
      const newMembers = members.map((mem) => {
        const data = scrums.data.find(
          (sc) => sc.attributes.user_id === mem.user_id
        );
        return data
          ? { ...mem, ...data.attributes, id: data.id }
          : { ...mem, ...DEFAULT_MEMBER_OBJECT };
      });
      setMembers(newMembers);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadScrums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMember = (member, data) => {
    let newMembers = members.map((mem) =>
      mem.user_id === member.user_id ? { ...mem, ...data } : mem
    );
    setMembers(newMembers);
  };

  return (
    <div className="group-activity group-activity-scrums custom-scrollbars">
      <div className="d-flex align-items-center mb-1">
        <h3 className="h4 text-primary mb-0">Scrums</h3>

        {isTeamOwner && (
          <button
            className="scrum-save-btn ml-auto"
            onClick={saveScrums}
            disabled={isSaving}
          >
            <i className="fa fa-floppy-o" aria-hidden="true" />
            <span className="ml-2">Save All</span>
          </button>
        )}
      </div>

      <div className="scrums-wrapper">
        <div className="px-3">
          {members.map((member, index) => {
            const isCurrentUser = member.user_id === user.id;
            const canEdit = isCurrentUser || isTeamOwner;
            const disableInputs = !canEdit || isLoading;

            return (
              <div className="row my-3" key={member.user_id}>
                <div className="col-4">
                  <div className="d-flex align-items-center mt-1 mb-2">
                    <UserImage
                      height="26"
                      width="26"
                      className="mr-3 rounded-pill"
                      src={member.user_details.avatar || default_user}
                      alt=""
                    />
                    <p className="m-0 text-muted text-truncate">
                      {member.user_details.username || 'Team member'}
                    </p>
                  </div>

                  <label
                    className="custom-switch"
                    htmlFor={`${member.user_id}-attendance`}
                  >
                    <input
                      id={`${member.user_id}-attendance`}
                      type="checkbox"
                      disabled={!isTeamOwner}
                      checked={member.attendance || false}
                      onChange={(e) =>
                        updateMember(member, { attendance: e.target.checked })
                      }
                      placeholder="Your answer..."
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="col-8">
                  <div className="scrum-questions-wrapper">
                    <div className="form-group row align-items-strech">
                      <label
                        className="col"
                        htmlFor="till_which_tha_you_are_done"
                      >
                        How many THAs have you done?
                      </label>
                      <input
                        id="till_which_tha_you_are_done"
                        className="col"
                        type="text"
                        disabled={disableInputs}
                        value={member.till_which_tha_you_are_done}
                        onChange={(e) =>
                          updateMember(member, {
                            till_which_tha_you_are_done: e.target.value,
                          })
                        }
                        placeholder="Your answer..."
                      />
                    </div>

                    <div className="form-group row align-items-strech">
                      <label className="col" htmlFor="reason_for_backlog">
                        Reason for backlog
                      </label>
                      <input
                        id="reason_for_backlog"
                        className="col"
                        type="text"
                        disabled={disableInputs}
                        value={member.reason_for_backlog}
                        onChange={(e) =>
                          updateMember(member, {
                            reason_for_backlog: e.target.value,
                          })
                        }
                        placeholder="Your answer..."
                      />
                    </div>

                    <div className="form-group row align-items-strech">
                      <label className="col" htmlFor="what_cover_today">
                        What did you cover today?
                      </label>
                      <input
                        id="what_cover_today"
                        className="col"
                        type="text"
                        disabled={disableInputs}
                        value={member.what_cover_today}
                        onChange={(e) =>
                          updateMember(member, {
                            what_cover_today: e.target.value,
                          })
                        }
                        placeholder="Your answer..."
                      />
                    </div>

                    <div className="form-group row align-items-strech">
                      <label className="col" htmlFor="rate_yesterday_class">
                        Rate yesterday's class
                      </label>
                      <input
                        id="rate_yesterday_class"
                        className="col"
                        type="number"
                        disabled={disableInputs}
                        value={member.rate_yesterday_class}
                        onChange={(e) =>
                          updateMember(member, {
                            rate_yesterday_class: e.target.valueAsNumber,
                          })
                        }
                        placeholder="Your answer..."
                      />
                    </div>

                    <div className="form-group row align-items-strech">
                      <label className="col">
                        Did you watch the last lecture?
                      </label>
                      <div className="d-flex align-items-center">
                        <label
                          className="custom-switch m-0"
                          htmlFor={`saw_last_lecture-${index}`}
                        >
                          <input
                            id={`saw_last_lecture-${index}`}
                            type="checkbox"
                            disabled={disableInputs}
                            checked={member.saw_last_lecture || false}
                            onChange={(e) =>
                              updateMember(member, {
                                saw_last_lecture: e.target.checked,
                              })
                            }
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>

                    <textarea
                      id={`${index}-other-feedback`}
                      className="scrum-input"
                      placeholder="Any other feedback..."
                      rows="5"
                      disabled={disableInputs}
                      value={member.data || ''}
                      onChange={(e) =>
                        updateMember(member, { data: e.target.value })
                      }
                    />
                  </div>

                  {canEdit && (
                    <div className="d-flex">
                      <button
                        className="scrum-save-btn ml-auto mt-1"
                        onClick={() => saveScrums(index)}
                        disabled={isSaving}
                      >
                        <i className="fa fa-floppy-o" aria-hidden="true" />
                        <span className="ml-2">Save</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
