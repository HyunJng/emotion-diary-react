import { Navigate, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../utils/dateManager.js";
import Viewer from "../components/Viewer.jsx";
import useDiary from "../hooks/useDiary.jsx";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();
  const targetDiary = useDiary(params.id);
  if (!targetDiary) {
    return <div>데이터 로딩 중</div>;
  }

  return (
    <div>
      <Header
        title={`${getStringDate(targetDiary.createDate)} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          <Button
            onClick={() => nav(`/edit/${targetDiary.id}`)}
            text={"수정하기"}
          />
        }
      />
      <Viewer targetDiary={targetDiary} />
    </div>
  );
};

export default Diary;
