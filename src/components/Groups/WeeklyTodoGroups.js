import '../../assets/css/group_todos.scss';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import icons from '../../utils/getIcons';
import myLog from '../../utils/myLog';
import Question from './Question';
import Streak from './Streak';
import Todo from './Todo';

const WeeklyTodoGroups = ({ group, groupMembers, groupId }) => {
  const [todoInputVisible, setTodoInputVisible] = useState(true);
  const [todoInput, setTodoInput] = useState('');
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

  const addTodo = (title) => {
    if (!title) {
      toast.warn('Todo title required');
      return;
    }
    setTodos([...todos, { title, status: false }]);
    setTodoInput('');
  };

  const onTodoMarked = (key) => {
    setTodos((todos) =>
      todos.map((todo, idx) => {
        if (idx === key) {
          return {
            ...todo,
            status: !todo.status,
          };
        }
        return todo;
      })
    );
  };

  return (
    <div className="weekly-todo">
      {/* Header */}
      <div className="d-flex justify-content-between flex-wrap">
        <h3 className="h4 text-primary">Weekly Team To-do</h3>
        <div className="d-flex" style={{ height: '20px' }}>
          <img className="mx-1" src={icons.scrums_calender} alt="calender" />
          <div className="mx-1" style={{ color: '#9b9b9b', width: '210px' }}>
            21-06-2021 to 28-06-2021
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
          <Streak />
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
            {todos.map((todo, idx) => (
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
