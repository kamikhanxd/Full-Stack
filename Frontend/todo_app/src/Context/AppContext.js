import React, { useState, useEffect, useContext } from 'react';
import { useGlobalAuthContext } from './AuthContext';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const { authTokens, user, logoutUser } = useGlobalAuthContext();
  const [list, setList] = useState([]);
  const [task, setTask] = useState({
    id: null,
    title: '',
    completed: false,
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchApi = async () => {
    setLoading(true);
    try {
      let response = await fetch('http://127.0.0.1:8000/api/tasks/', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': csrftoken,
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      });

      let data = await response.json();
      if (response.status === 200) {
        setList(data);
      } else if (response.statusText === 'Unauthorized') {
        logoutUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTask((task) => {
      return { ...task, title: task.title };
    });
    let url = 'http://127.0.0.1:8000/api/tasks/';
    let method = 'POST';
    if (editing) {
      url = `http://127.0.0.1:8000/api/tasks/${task.id}/`;
      method = 'PUT';
      setEditing(false);
    }
    fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
        Authorization: 'Bearer ' + String(authTokens.access),
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        fetchApi();
      })
      .catch((error) => console.log(error));
    setTask({ ...task, id: null, title: '', completed: false });
  };

  const editTask = (task) => {
    setEditing(true);
    setTask(task);
  };

  const deleteTask = (task) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
        Authorization: 'Bearer ' + String(authTokens.access),
      },
    }).then((response) => {
      fetchApi();
    });
  };
  const strikeTask = ({ completed, id, title }) => {
    completed = !completed;
    let url = `http://127.0.0.1:8000/api/tasks/${id}/`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
        Authorization: 'Bearer ' + String(authTokens.access),
      },
      body: JSON.stringify({ completed, title }),
    })
      .then((response) => {
        fetchApi();
      })
      .catch((error) => console.log(error));
  };
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');
  const getStorageTheme = () => {
    let theme = 'light-theme';
    if (localStorage.getItem('theme')) {
      theme = localStorage.getItem('theme');
    }
    return theme;
  };

  const [theme, setTheme] = useState(getStorageTheme());

  const toggleTheme = () => {
    if (theme === 'dark-theme') {
      setTheme('light-theme');
    } else {
      setTheme('dark-theme');
    }
  };

  useEffect(() => {
    document.body.className = theme;

    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <AppContext.Provider
      value={{
        list,
        loading,
        handleSubmit,
        task,
        setTask,
        deleteTask,
        editTask,
        strikeTask,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
