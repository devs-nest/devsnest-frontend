import React from 'react';
import { toast } from 'react-toastify';

import icons from '../../utils/getIcons';

const MoralSelector = ({
  saveQuestion,
  setState,
  state,
  canEdit,
  range,
  type,
}) => {
  return (
    <div className="weekly-moral-select mt-2 flex-wrap">
      {new Array(range).fill().map((_, idx) => {
        const iconNeed =
          idx < state[type] ? icons.moral_selected : icons.moral_not_selected;
        return (
          <div key={idx} className="moral-status-icon">
            <img
              src={iconNeed}
              alt="moral-icon"
              onClick={() => {
                if (!canEdit) {
                  toast.warn(`you can't edit`);
                  return;
                }
                if (type === 'moral_status') {
                  saveQuestion({ ...state, moral_status: idx + 1 });
                  setState({ ...state, moral_status: idx + 1 });
                } else if (type === 'batch_leader_rating') {
                  saveQuestion({ ...state, batch_leader_rating: idx + 1 });
                  setState({ ...state, batch_leader_rating: idx + 1 });
                } else if (type === 'group_activity_rating') {
                  saveQuestion({
                    ...state,
                    group_activity_rating: idx + 1,
                  });
                  setState({
                    ...state,
                    group_activity_rating: idx + 1,
                  });
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MoralSelector;
