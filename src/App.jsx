import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useReducer, createContext, useEffect, useState } from "react";

import Diary from "./pages/Diary";
import New from "./pages/New";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

import { fetchDiaries, createDiary, updateDiary, deleteDiary } from "./api/diaryApi.js";
import { login as loginApi, register as registerApi } from "./api/authApi.js";

const getStoredUser = () => {
  try {
    const user = localStorage.getItem("auth_user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id)
          ? { ...item, ...action.data }
          : item,
      );
    case "DELETE":
      return state.filter((item) => Number(item.id) !== Number(action.id));
    default:
      return state;
  }
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();
export const UserContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [currentUser, setCurrentUser] = useState(getStoredUser);

  useEffect(() => {
    if (!currentUser) {
      dispatch({ type: "INIT", data: [] });
      return;
    }
    fetchDiaries(currentUser.id)
      .then((diaries) => dispatch({ type: "INIT", data: diaries }))
      .catch(console.error);
  }, [currentUser]);

  const storeAuth = (token, user) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const login = async (email, password) => {
    const { token, user } = await loginApi(email, password);
    storeAuth(token, user);
  };

  const register = async (email, password, nickname) => {
    const { token, user } = await registerApi(email, password, nickname);
    storeAuth(token, user);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setCurrentUser(null);
  };

  const onCreate = async (emotionId, createDate, content) => {
    try {
      const created = await createDiary(currentUser.id, {
        emotionId,
        content,
        createDate: Number(new Date(createDate)),
      });
      dispatch({ type: "CREATE", data: created });
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdate = async (id, emotionId, createDate, content) => {
    try {
      const updated = await updateDiary(id, {
        emotionId,
        content,
        createDate: Number(new Date(createDate)),
      });
      dispatch({ type: "UPDATE", data: { id, ...updated } });
    } catch (e) {
      console.error(e);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteDiary(id);
      dispatch({ type: "DELETE", id });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <UserContext.Provider value={{ currentUser, login, register, logout }}>
        <DiaryStateContext.Provider value={{ data }}>
          <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/new"
                element={
                  <PrivateRoute>
                    <New />
                  </PrivateRoute>
                }
              />
              <Route
                path="/diary/:id"
                element={
                  <PrivateRoute>
                    <Diary />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <PrivateRoute>
                    <Edit />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
