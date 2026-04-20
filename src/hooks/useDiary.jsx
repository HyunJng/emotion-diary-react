import { useContext, useEffect, useState } from "react";
import { DiaryStateContext, DiaryDispatchContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const { data } = useContext(DiaryStateContext);
  const [targetDiary, setTargetDiary] = useState();
  const nav = useNavigate();

  useEffect(() => {
    let target = data.find((item) => Number(item.id) === Number(id));
    if (!target) {
      window.alert("존재하지 않는 일기입니다");
      nav("/", { replace: true });
      return;
    }

    setTargetDiary(target);
  }, [id]);
  return targetDiary;
};

export default useDiary;
