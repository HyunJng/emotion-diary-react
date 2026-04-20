import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useReducer, createContext, useEffect } from "react";

import Diary from "./pages/Diary";
import New from "./pages/New";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";

import {
  fetchDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
} from "./api/diaryApi.js";

// 인증 구현 전까지 임시로 고정. 추후 로그인 흐름으로 교체 필요
const CURRENT_USER_ID = 1;

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

  useEffect(() => {
    fetchDiaries(CURRENT_USER_ID)
      .then((diaries) => dispatch({ type: "INIT", data: diaries }))
      .catch(console.error);
  }, []);

  const onCreate = async (emotionId, createDate, content) => {
    try {
      const created = await createDiary(CURRENT_USER_ID, {
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
      <UserContext.Provider value={{ userId: CURRENT_USER_ID }}>
        <DiaryStateContext.Provider value={{ data }}>
          <DiaryDispatchContext.Provider
            value={{ onCreate, onUpdate, onDelete }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
