import '../../assets/css/group_todos.scss';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useUser } from '../../redux/slices/loginSlice';
import {
  getStreak,
  getWeeklyTodo,
  saveWeeklyTodo,
} from '../../services/weekly_todo';
import icons from '../../utils/getIcons';
import MoralSelector from './MoralSelecter';
import { StarRating } from './ScrumButtons';
import Streak from './Streak';
import Todo from './Todo';

const getDate = (inputDate) => {
  return `${inputDate.getDate()}-${
    inputDate.getMonth() + 1
  }-${inputDate.getFullYear()}`;
};

const getFirstLastDayOfWeek = (day) => {
  const first = new Date(
    day.setDate(day.getDate() - day.getDay() + (day.getDay() === 0 ? -6 : 1))
  );
  const last = new Date(day.setDate(day.getDate() - day.getDay() + 7));

  return { first, last };
};

const DEFAULT_STATE = {
  batch_leader_rating: 0,
  group_activity_rating: 0,
  moral_status: 0,
  extra_activity: '',
  comments: '',
  obstacles: '',
  todo_list: [],
  creation_week: getFirstLastDayOfWeek(new Date()).first,
  end_week: getFirstLastDayOfWeek(new Date()).last,
};

const WeeklyTodoGroups = ({ group, groupMembers, groupId }) => {
  const user = useUser();
  const isTeamOwner = group.owner_id === user.id;
  const isTeamCoOwner = group.co_owner_id === user.id;
  const canEdit = isTeamOwner || isTeamCoOwner;

  const [state, setState] = useState(DEFAULT_STATE);
  const [streak, setStreak] = useState([]);
  const [todoInputVisible, setTodoInputVisible] = useState(false);
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    const fetchWeeklyTodo = async () => {
      try {
        const response = await getWeeklyTodo(groupId);
        const streakResponse = await getStreak(groupId);
        setStreak(streakResponse);
        if (response.todo_id) {
          setState({
            ...response,
            batch_leader_rating: response.batch_leader_rating
              ? response.batch_leader_rating
              : 0,
            group_activity_rating: response.group_activity_rating
              ? response.group_activity_rating
              : 0,
            moral_status: response.moral_status ? response.moral_status : 0,
            extra_activity: response.extra_activity
              ? response.extra_activity
              : '',
            comments: response.comments ? response.comments : '',
            obstacles: response.obstacles ? response.obstacles : '',
          });
        } else {
          setState((s) => ({ ...s, ...response, group_id: groupId }));
        }
      } catch (e) {
        toast.error('An error occurred fetching weekly todo');
      }
    };
    fetchWeeklyTodo();
  }, [groupId, group, groupMembers, state.todo_id]);

  const saveQuestion = async (newState) => {
    if (!canEdit) {
      toast.warn(`you can't edit`);
      return;
    }
    try {
      const response = await saveWeeklyTodo(newState, canEdit);
      setState(response);
      toast.info('Data saved');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const addTodo = async (title) => {
    if (!canEdit) {
      toast.warn(`you can't add todo`);
      return;
    }
    if (!title) {
      toast.warn('Todo title required');
      return;
    }
    if (state.todo_list && state.todo_list.length >= 5) {
      toast.warn('you can add max 5 todos');
      return;
    }
    const newState = {
      ...state,
      todo_list: state.todo_list
        ? [...state.todo_list, { title, status: false }]
        : [{ title, status: false }],
    };
    try {
      const response = await saveWeeklyTodo(newState, canEdit);
      setState(response);
      setTodoInput('');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const onTodoMarked = async (key) => {
    if (!canEdit) {
      toast.warn(`you can't edit`);
      return;
    }
    const newTodoState = state.todo_list.map((todo, idx) => {
      if (idx === key) {
        return {
          ...todo,
          status: !todo.status,
        };
      }
      return todo;
    });
    const newState = {
      ...state,
      todo_list: newTodoState,
    };
    try {
      const response = await saveWeeklyTodo(newState, canEdit);
      setState(response);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="weekly-todo">
      {/* Header */}
      <div className="d-flex justify-content-between flex-wrap">
        <h3 className="h4 text-primary">Weekly Team To-do</h3>
        <div className="d-flex" style={{ height: '20px' }}>
          <img className="mx-1" src={icons.scrums_calender} alt="calender" />
          <div className="mx-1" style={{ color: '#9b9b9b', width: '210px' }}>
            {state &&
              `${getDate(new Date(state.creation_week))}  To  ${getDate(
                new Date(state.end_week)
              )}`}
          </div>
        </div>
      </div>
      {/* Main section */}
      <section className="d-flex w-100 h-100 weekly-todo-container">
        <div className="flex-column pr-4 weekly-todo-left">
          <Streak group_id={groupId} streak={streak} />
          <h3 className="h5 mt-3 mb-2 weekly-todo-heading">Goals :</h3>
          <div className="mb-3">
            <p className="weekly-todo-question mb-1">
              How has your team&#39;s morale been this week?
            </p>
            <MoralSelector
              value={state.moral_status}
              canEdit={canEdit}
              onChange={(rating) => {
                saveQuestion({ ...state, moral_status: rating });
                setState({ ...state, moral_status: rating });
              }}
              range={10}
              type="moral_status"
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="h5 weekly-todo-question">
              Add your this week&#39;s goals :
            </h3>
            <img
              style={{ cursor: 'pointer' }}
              className="m-0 p-0"
              src={icons.group_todo_add}
              alt="group_todo_add"
              height="45px"
              width="45px"
              data-tip={canEdit ? 'Add todo' : 'You cannot add todo'}
              onClick={() => {
                if (canEdit) {
                  setTodoInputVisible((prevState) => !prevState);
                }
              }}
            />
          </div>

          <div className="pt-1 todo-item-container">
            {todoInputVisible && (
              <div className="todo-input-container border mb-3">
                <input
                  type="text"
                  value={todoInput}
                  placeholder="Add a Todo"
                  onChange={(e) => setTodoInput(e.target.value)}
                />
                <img
                  src={icons.question_solve}
                  alt="todo-add"
                  height="25px"
                  width="25px"
                  onClick={() => addTodo(todoInput)}
                />
              </div>
            )}
            {state.todo_list &&
              state.todo_list.map((todo, idx) => (
                <Todo
                  key={idx}
                  title={todo.title}
                  status={todo.status}
                  index={idx}
                  onTodoUpdate={onTodoMarked}
                />
              ))}
          </div>
          <div className="mt-4 weekly-todo-right">
            <p className="weekly-todo-question mb-2">
              What obstacles did your team faced last week?
            </p>
            <div className="d-flex align-items-center">
              <input
                type="text"
                placeholder="specify here..."
                className="weekly-todo-input"
                value={state.obstacles ? state.obstacles : ''}
                disabled={!canEdit}
                onChange={(e) => {
                  setState({ ...state, obstacles: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className="h-100 ml-4" style={{ flexGrow: 1, color: '#707070' }}>
          <h3 className="h5 mt-3 mb-2 weekly-todo-heading">Feedback :</h3>
          <p className="weekly-todo-question mb-1">
            Rate your Batch Leader (1-5)
          </p>
          <StarRating
            onChange={(rating) => {
              if (canEdit) {
                saveQuestion({ ...state, batch_leader_rating: rating });
                setState({ ...state, batch_leader_rating: rating });
              } else {
                toast.warn("You can't edit");
              }
            }}
            value={state.batch_leader_rating}
            size={30}
            disabled={!canEdit}
          />
          <p className="weekly-todo-question mb-1 mt-4">
            Group Activity Rating (Last week)
          </p>
          <StarRating
            onChange={(rating) => {
              if (canEdit) {
                saveQuestion({
                  ...state,
                  group_activity_rating: rating,
                });
                setState({
                  ...state,
                  group_activity_rating: rating,
                });
              } else {
                toast.warn("You can't edit");
              }
            }}
            value={state.group_activity_rating}
            size={30}
            disabled={!canEdit}
          />
          <p className="weekly-todo-question mt-4">
            Extra activities that your group did last week ?
          </p>
          <input
            type="text"
            placeholder="specify here..."
            className="weekly-todo-input"
            disabled={!canEdit}
            value={state.extra_activity ? state.extra_activity : ''}
            onChange={(e) => {
              setState({ ...state, extra_activity: e.target.value });
            }}
          />
          <p className="weekly-todo-question mt-4">
            Do you have any comments for us :
          </p>
          {/* Text BOX */}
          <textarea
            style={{ backgroundColor: '#F2EFF7' }}
            className="form-control"
            rows="3"
            disabled={!canEdit}
            value={state.comments}
            onChange={(e) => setState({ ...state, comments: e.target.value })}
          ></textarea>
          {canEdit && (
            <button
              style={{ display: 'block', margin: '20px 0 0 auto' }}
              className="px-3 py-1 btn btn-primary"
              onClick={() => saveQuestion(state)}
            >
              Save
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default WeeklyTodoGroups;
