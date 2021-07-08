import React from 'react';
import { toast } from 'react-toastify';

import icons from '../../utils/getIcons';

const MoralSelector = ({ saveQuestion, setQuestions, questions, canEdit }) => {
  return (
    <div className="weekly-moral-select mt-2 flex-wrap">
      {new Array(10).fill().map((_, idx) => {
        const iconNeed =
          idx < questions.moral_status
            ? icons.moral_selected
            : icons.moral_not_selected;
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
                saveQuestion({ ...questions, moral_status: idx + 1 });
                setQuestions({ ...questions, moral_status: idx + 1 });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MoralSelector;
