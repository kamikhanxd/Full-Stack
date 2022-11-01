import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from './Context/AppContext';
import { useGlobalAuthContext } from './Context/AuthContext';

import Task from './Task';

const Home = () => {
  const { list, handleSubmit, task, setTask, toggleTheme } = useGlobalContext();
  const { error, user, logoutUser } = useGlobalAuthContext();
  if (error) {
    <div className='container'>
      <h1 style={{ marginTop: '5rem', textAlign: 'center' }}>
        Something Wrong
      </h1>
      ;
    </div>;
  }
  return (
    <>
      <div className='container'>
        <div id='task-container'>
          <header className='flex'>
            <h1 className='mb-4 text-primary'>Todo App</h1>
            <i
              className='fas fa-moon mb-4 '
              id='mode'
              onClick={toggleTheme}
            ></i>
          </header>
          <div className='flex mb-2'>
            <p className='lead welcome-text'>( Hello, {user.username}! ) </p>
            <button
              className='btn btn-sm btn-secondary mb-3'
              onClick={() => logoutUser()}
            >
              Logout
            </button>
          </div>
          <form action='' id='form' className='d-flex' onSubmit={handleSubmit}>
            <input
              required
              type='text'
              className='form-control'
              style={{ flex: '6' }}
              placeholder='Add Task'
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
            <input
              type='submit'
              style={{ flex: '1' }}
              className='btn btn-primary'
              name='Add'
              id='submit'
            />
          </form>
          <div id='list-wrapper'>
            {list.map((task, index) => {
              return <Task {...task} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
