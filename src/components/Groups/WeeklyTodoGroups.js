import '../../assets/css/group_todos.scss';

import React, { useState } from 'react';

import icons from '../../utils/getIcons';
import myLog from '../../utils/myLog';
import Question from './Question';
import Streak from './Streak';
import Todo from './Todo';

const questions = [
  {
    title: 'Who was the most active member in the last week?',
    answer: 'John Doe',
  },
  {
    title: 'Who Helped You the most in the last week?',
    answer: 'John Doe',
  },
  {
    title: 'Who Helped You the most in the last week?',
    answer: 'John Doe',
  },
];

const todos = [
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
];

const lastWeekTodo = [
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
];

const WeeklyTodoGroups = ({ group, groupMembers, groupId }) => {
  // myLog(group);
  // myLog(groupMembers);
  // myLog(groupId);

  const [todoInputVisible, setTodoInputVisible] = useState(true);
  const [todoInput, setTodoInput] = useState('');

  return (
    <div
      style={{
        backgroundColor: '#fff',
        boxShadow: '0 0 20px #0003',
        height: '100%',
        borderRadius: '20px',
        maxWidth: '1000px',
        padding: '30px',
        width: '100%',
      }}
    >
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
      <section className="d-flex w-100 h-100">
        <div
          className="flex-column pr-4"
          style={{
            borderRight: '1.5px solid #BBBBBB',
            width: '45%',
            height: '90%',
            color: '#707070',
          }}
        >
          <Streak />
          <h3 className="h4 my-3">Questions :</h3>
          <div
            className="d-flex flex-column pr-3 mb-1 p-1 todo-questions-container"
            style={{ maxHeight: '220px', overflowY: 'auto' }}
          >
            {questions.map(({ title, answer }, idx) => {
              return <Question key={idx} title={title} answer={answer} />;
            })}
          </div>
          <img
            className="mt-2"
            src={icons.save}
            alt="save-icon"
            height="30px"
            width="30px"
          />
        </div>
        <div className="h-100 ml-4" style={{ flexGrow: 1, color: '#707070' }}>
          <h3 className="h4 mb-3">This Week&#39;s tasks:</h3>
          <div className="pr-4 pt-1 todo-item-container">
            {todos.map((todo, idx) => (
              <Todo key={idx} title={todo.title} status={todo.status} />
            ))}
            {todoInputVisible && (
              <div className="todo-input-container border">
                <input
                  type="text"
                  value={todoInput}
                  placeholder="Add a Todo"
                  onChange={(e) => setTodoInput(e.value)}
                />
                <img
                  src={icons.question_solve}
                  alt="todo-add"
                  height="25px"
                  width="25px"
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
            <h3 style={{ color: '#707070' }} className="h4 my-3">
              Last Week&#39;s tasks:
            </h3>
            {lastWeekTodo.map((todo, idx) => (
              <Todo key={idx} title={todo.title} status={todo.status} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeeklyTodoGroups;
