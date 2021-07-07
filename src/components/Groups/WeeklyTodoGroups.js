import '../../assets/css/group_todos.scss';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useUser } from '../../redux/slices/loginSlice';
import { getWeeklyTodo, saveWeeklyTodo } from '../../services/weekly_todo';
import icons from '../../utils/getIcons';
import myLog from '../../utils/myLog';
import Question from './Question';
import Streak from './Streak';
import Todo from './Todo';

const getDate = () => {
  const today = new Date();
  return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
};

const DEFAULT_QUESTION_VALUE = {
  most_active: '',
  most_helpful: '',
  moral_status: 0,
  obstacles: '',
  feedback: '',
};

const WeeklyTodoGroups = ({ group, groupMembers, groupId }) => {
  const user = useUser();
  const isTeamOwner = group.owner_id === user.id;
  const isTeamCoOwner = group.co_owner_id === user.id;

  const [state, setState] = useState({});
  const [todoInputVisible, setTodoInputVisible] = useState(true);
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [questions, setQuestions] = useState(DEFAULT_QUESTION_VALUE);

  useEffect(() => {
    const fetchWeeklyTodo = async () => {
      try {
        const response = await getWeeklyTodo(groupId, getDate());
        setState(response);
        setTodos(() => (response.todo_list ? response.todo_list : []));
        setQuestions({
          moral_status: response.moral_status ? response.moral_status : 0,
          most_active: response.most_active,
          most_helpful: response.most_helpful,
          obstacles: response.obstacles,
          feedback: response.feedback,
        });
      } catch (e) {
        toast.error('An error occurred fetching weekly todo');
      }
    };
    fetchWeeklyTodo();
  }, [groupId]);
  // myLog(group);
  // myLog(groupMembers);
  // myLog(groupId);

  const onQuestionChange = (key, answer) => {
    setQuestions(
      questions.map((q, idx) => {
        if (idx === key)
          return {
            ...q,
            answer: answer,
          };

        return q;
      })
    );
  };

  const saveQuestion = (questionsState) => {
    return 'will do it later';
  };

  const addTodo = async (title) => {
    if (!title) {
      toast.warn('Todo title required');
      return;
    }
    if (todos.length >= 5) {
      toast.warn('you can add max 5 todos');
      return;
    }
    const newState = {
      ...state,
      todo_list: [...state.todo_list, { title, status: false }],
    };
    try {
      const response = await saveWeeklyTodo(newState);
      setState(newState);
      setTodoInput('');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const onTodoMarked = async (key) => {
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
      await saveWeeklyTodo(newState);
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
        <div
          className="flex-column pr-4  weekly-todo-left"
          style={{
            borderRight: '1.5px solid #BBBBBB',
            height: '90%',
            color: '#707070',
          }}
        >
          <Streak group_id={groupId} />
          <div className="border-bottom">
            <h3 className="h5 mt-3 mb-1 weekly-todo-heading">Learning :</h3>
            <p className="weekly-todo-question mb-1">
              who was the most active member in you team, this week?
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <select
                name="dropdown"
                className="weekly-todo-dropdown border mb-4 mt-2"
                value={questions.most_active}
                onChange={(e) => {
                  setQuestions({ ...questions, most_active: e.target.value });
                }}
              >
                {groupMembers.map(({ user_details }, idx) => {
                  return (
                    user_details.username && (
                      <option key={idx} value={user_details.username}>
                        {user_details.username}
                      </option>
                    )
                  );
                })}
              </select>
              <img
                className="ml-3"
                src={icons.save}
                alt="save"
                height="19px"
                width="19px"
              />
            </div>
            <p className="weekly-todo-question mb-0">
              Which team member helped the most in your team?
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <select
                name="dropdown"
                className="weekly-todo-dropdown border mb-4 mt-2"
                value={questions.most_helpful}
                onChange={(e) => {
                  setQuestions({ ...questions, most_helpful: e.target.value });
                }}
              >
                {groupMembers.map(({ user_details }, idx) => {
                  return (
                    user_details.username && (
                      <option key={idx} value={user_details.username}>
                        {user_details.username}
                      </option>
                    )
                  );
                })}
              </select>
              <img
                className="ml-3"
                src={icons.save}
                alt="save"
                height="19px"
                width="19px"
              />
            </div>
          </div>
          <h3 className="h5 mt-3 mb-1 weekly-todo-heading">Feedback :</h3>
          <p className="weekly-todo-question">
            What feedback would you want to give to Devsnest?
          </p>
          {/* Text BOX */}
          <div className="d-flex align-items-center">
            <textarea
              className="form-control"
              rows="2"
              onChange={(e) =>
                setQuestions({ ...questions, feedback: e.target.value })
              }
            ></textarea>
            <img
              className="ml-3"
              src={icons.save}
              alt="save"
              height="19px"
              width="19px"
            />
          </div>
          {/* {JSON.stringify(state)}; */}
        </div>
        <div className="h-100 ml-4" style={{ flexGrow: 1, color: '#707070' }}>
          <h3 className="h5 mt-1 mb-3 weekly-todo-heading">Goals :</h3>
          <div>
            <p className="weekly-todo-question mb-1">
              How has your team&#39;s morale been this week?
            </p>
            <div className="weekly-moral-select mb-4 mt-2">
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
                        setQuestions({ ...questions, moral_status: idx + 1 });
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <p className="weekly-todo-question mb-2">
              What obstacles did your team face this week?
            </p>
            <div className="d-flex align-items-center border-bottom pb-3">
              <input
                type="text"
                className="weekly-todo-input"
                value={questions.obstacles}
                onChange={(e) => {
                  setQuestions({ ...questions, obstacles: e.target.value });
                }}
              />
              <img
                className="ml-3"
                src={icons.save}
                alt="save"
                height="19px"
                width="19px"
              />
            </div>
          </div>
          <h3 className="h5 mt-3 mb-2 weekly-todo-question">
            Add your this week&#39;s goals :
          </h3>
          <div className="pr-4 pt-1 todo-item-container">
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
            {todoInputVisible && (
              <div className="todo-input-container border">
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

            <img
              style={{ cursor: 'pointer' }}
              className="m-0"
              src={icons.group_todo_add}
              alt="group_todo_add"
              height="50px"
              width="50px"
              onClick={() => setTodoInputVisible((prevState) => !prevState)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeeklyTodoGroups;
