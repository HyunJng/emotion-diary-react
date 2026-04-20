import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useReducer, useRef, createContext } from "react";

import Diary from "./pages/Diary";
import New from "./pages/New";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";

import Button from "./components/Button";
import Header from "./components/Header";

const mockData = [
  {
    id: 1,
    createDate: new Date("2026-04-20").getTime(),
    emotionId: 1,
    content: "1번 일기",
  },
  {
    id: 2,
    createDate: new Date("2026-04-19").getTime(),
    emotionId: 2,
    content: "2번 일기",
  },
  {
    id: 3,
    createDate: new Date("2026-03-19").getTime(),
    emotionId: 3,
    content: "3번 일기",
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((data) =>
        String(data.id) == String(action.data.id)
          ? {
              ...data,
              emotionId: action.data.emotionId,
              content: action.data.content,
            }
          : data,
      );
    case "DELETE":
      return state.filter((item) => Number(item.id) !== Number(action.id));
    default:
      return state;
  }
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (emotionId, createDate, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        emotionId: emotionId,
        content: content,
        createDate: createDate.getTime(),
      },
    });
  };

  const onUpdate = (id, emotionId, createDate, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: id,
        emotionId: emotionId,
        content: content,
        createDate: createDate,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id: id,
    });
  };

  return (
    <div>
      <DiaryStateContext.Provider value={{ data }}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
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
    </div>
  );
}

export default App;
