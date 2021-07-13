import React from 'react';
import { toast } from 'react-toastify';

import icons from '../../utils/getIcons';

const MoralSelector = ({ value, onChange, canEdit, range, type }) => {
  return (
    <div className="weekly-moral-select mt-2 flex-wrap">
      {new Array(range).fill().map((_, idx) => {
        const iconNeed =
          idx < value ? icons.moral_selected : icons.moral_not_selected;
        const ratingValue = idx + 1;
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
                onChange(ratingValue);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MoralSelector;
