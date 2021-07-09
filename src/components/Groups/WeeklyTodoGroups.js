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
import Streak from './Streak';
import Todo from './Todo';

const getDate = () => {
  const today = new Date();
  return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
};

const DEFAULT_QUESTION_VALUE = {
  batch_leader_rating: 0,
  group_activity_rating: 0,
  moral_status: 0,
  extra_activity: '',
  comments: '',
  obstacles: '',
};

const WeeklyTodoGroups = ({ group, groupMembers, groupId }) => {
  const user = useUser();
  const isTeamOwner = group.owner_id === user.id;
  const isTeamCoOwner = group.co_owner_id === user.id;
  const canEdit = isTeamOwner || isTeamCoOwner;

  const [state, setState] = useState({});
  const [streak, setStreak] = useState([]);
  const [todoInputVisible, setTodoInputVisible] = useState(false);
  const [todoInput, setTodoInput] = useState('');
  const [questions, setQuestions] = useState(DEFAULT_QUESTION_VALUE);

  useEffect(() => {
    const fetchWeeklyTodo = async () => {
      try {
        const response = await getWeeklyTodo(groupId, getDate());
        const streakResponse = await getStreak(groupId);
        setState(response);
        setStreak(streakResponse);
        setQuestions({
          moral_status: response.moral_status ? response.moral_status : 0,
          batch_leader_rating: response.batch_leader_rating,
          group_activity_rating: response.group_activity_rating,
          extra_activity: response.extra_activity,
          obstacles: response.obstacles,
          comments: response.comments,
        });
      } catch (e) {
        toast.error('An error occurred fetching weekly todo');
      }
    };
    fetchWeeklyTodo();
  }, [groupId]);

  const saveQuestion = async (questionsState) => {
    if (!canEdit) {
      toast.warn(`you can't edit`);
      return;
    }
    try {
      await saveWeeklyTodo({ ...state, ...questionsState }, canEdit);
      setState({ ...state, ...questionsState });
      setQuestions(questionsState);
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
      await saveWeeklyTodo(newState, canEdit);
      setState(newState);
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
      await saveWeeklyTodo(newState, canEdit);
      setState(newState);
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
            {state && `${state.creation_week}  To  ${state.end_week}`}
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
              setQuestions={setQuestions}
              saveQuestion={saveQuestion}
              questions={questions}
              canEdit={canEdit}
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
              onClick={() => setTodoInputVisible((prevState) => !prevState)}
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
                value={questions.obstacles}
                onChange={(e) => {
                  setQuestions({ ...questions, obstacles: e.target.value });
                }}
              />
              {canEdit && (
                <img
                  style={{ cursor: 'pointer' }}
                  className="ml-3"
                  src={icons.save}
                  alt="save"
                  height="19px"
                  width="19px"
                  onClick={() => saveQuestion(questions)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="h-100 ml-4" style={{ flexGrow: 1, color: '#707070' }}>
          <h3 className="h5 mt-3 mb-2 weekly-todo-heading">Feedback :</h3>
          <p className="weekly-todo-question mb-1">
            Rate your Batch Leader (1-5)
          </p>
          <MoralSelector
            setQuestions={setQuestions}
            saveQuestion={saveQuestion}
            questions={questions}
            canEdit={canEdit}
            range={5}
            type="batch_leader_rating"
          />
          <p className="weekly-todo-question mb-1 mt-4">
            Group Activity Rating (Last week)
          </p>
          <MoralSelector
            setQuestions={setQuestions}
            saveQuestion={saveQuestion}
            questions={questions}
            canEdit={canEdit}
            range={5}
            type="group_activity_rating"
          />
          <p className="weekly-todo-question mt-4">
            Extra activities that your group did last week ?
          </p>
          <div className="d-flex align-items-center">
            <input
              type="text"
              placeholder="specify here..."
              className="weekly-todo-input"
              value={questions.extra_activity}
              onChange={(e) => {
                setQuestions({ ...questions, extra_activity: e.target.value });
              }}
            />
            {/* {canEdit && (
              <img
                style={{ cursor: 'pointer' }}
                className="ml-3"
                src={icons.save}
                alt="save"
                height="19px"
                width="19px"
                onClick={() => saveQuestion(questions)}
              />
            )} */}
          </div>
          <p className="weekly-todo-question mt-4">
            Do you have any comments for us :
          </p>
          {/* Text BOX */}
          <div className="d-flex align-items-center">
            <textarea
              style={{ backgroundColor: '#F2EFF7' }}
              className="form-control"
              rows="3"
              value={questions.comments}
              onChange={(e) =>
                setQuestions({ ...questions, comments: e.target.value })
              }
            ></textarea>
            {/* {canEdit && (
              <img
                style={{ cursor: 'pointer' }}
                className="ml-3"
                src={icons.save}
                alt="save"
                height="19px"
                width="19px"
                onClick={() => saveQuestion(questions)}
              />
            )} */}
          </div>
          <button
            style={{ display: 'block', margin: '20px 0 0 auto' }}
            className="px-3 py-1 btn btn-primary"
            onClick={() => saveQuestion(questions)}
          >
            Save
          </button>
        </div>
      </section>
    </div>
  );
};

export default WeeklyTodoGroups;
