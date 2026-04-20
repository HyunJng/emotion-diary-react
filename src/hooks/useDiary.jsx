import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import { fetchDiary } from "../api/diaryApi.js";

const useDiary = (id) => {
  const { data } = useContext(DiaryStateContext);
  const [targetDiary, setTargetDiary] = useState();
  const nav = useNavigate();

  useEffect(() => {
    // CRUD 직후 캐시에서 먼저 탐색
    const cached = data.find((item) => Number(item.id) === Number(id));
    if (cached) {
      setTargetDiary(cached);
      return;
    }
    // 캐시에 없으면(페이지 새로고침 등) API에서 단건 조회
    fetchDiary(id)
      .then(setTargetDiary)
      .catch(() => {
        window.alert("존재하지 않는 일기입니다");
        nav("/", { replace: true });
      });
  }, [id]);

  return targetDiary;
};

export default useDiary;
