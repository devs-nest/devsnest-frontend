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

const WeeklyTodoGroups = ({ group, groupMembers, groupId }) => {
  const user = useUser();
  const isTeamOwner = group.owner_id === user.id;
  const isTeamCoOwner = group.co_owner_id === user.id;

  const [state, setState] = useState({});
  const [todoInputVisible, setTodoInputVisible] = useState(true);
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    const fetchWeeklyTodo = async () => {
      try {
        const response = await getWeeklyTodo(groupId, getDate());
        setState(response);
        setTodos(() => (response.todo_list ? response.todo_list : []));
      } catch (e) {
        toast.error('An error occurred fetching weekly todo');
      }
    };
    fetchWeeklyTodo();
  }, [groupId]);
  // myLog(group);
  // myLog(groupMembers);
  // myLog(groupId);

  const [todos, setTodos] = useState([
    {
      title: 'Finish THA and push to github',
      status: true,
    },
    {
      title: 'Finish THA and push to github',
      status: false,
    },
    {
      title: 'Finish THA and push to github',
      status: false,
    },
  ]);

  const [questions, setQuestions] = useState([
    {
      title: 'Who was the most active member in the last week?',
      answer: '',
    },
    {
      title: 'Who Helped You the most in the last week?',
      answer: '',
    },
    {
      title: 'Who Helped You the most in the last week?',
      answer: '',
    },
  ]);

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
          <h3 className="h5 mt-3 mb-1">Learning :</h3>
          <Question
            index={0}
            title="who was the most active member in you team, this week?"
            answer="me"
            onChange={onQuestionChange}
          />
          <Question
            index={1}
            title="Which team member helped the most in your team?"
            answer="me"
            onChange={onQuestionChange}
          />
          <h3 className="h5 mt-3 mb-1">Feedback :</h3>
          <Question
            index={1}
            title="What feedback would you want to give to Devsnest?"
            answer="me"
            onChange={onQuestionChange}
          />
          <img
            className="mt-2"
            src={icons.save}
            alt="save-icon"
            height="30px"
            width="30px"
          />
          {/* {JSON.stringify(state)}; */}
        </div>
        <div className="h-100 ml-4" style={{ flexGrow: 1, color: '#707070' }}>
          <h3 className="h5 mt-1 mb-1">Goals :</h3>
          <Question
            index={1}
            title="How has your team's morale been this week?"
            answer="me"
            onChange={onQuestionChange}
          />
          <Question
            index={1}
            title="What obstacles did your team face this week?"
            answer="me"
            onChange={onQuestionChange}
          />
          <h3 className="h5 mt-3 mb-1">Add your this week&#39;s goals :</h3>
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
