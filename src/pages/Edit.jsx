import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Editor from "../components/Editor.jsx";
import Header from "../components/Header.jsx";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext, DiaryDispatchContext } from "../App.jsx";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const { data } = useContext(DiaryStateContext);
  const [targetDiary, setTargetDiary] = useState();

  useEffect(() => {
    let target = data.find((item) => Number(item.id) === Number(params.id));
    if (!target) {
      window.alert("존재하지 않는 일기입니다");
      nav("/", { replace: true });
      return;
    }

    setTargetDiary(target);
  }, [params.id]);

  const onClickUpdate = (input) => {
    onUpdate(params.id, input.emotionId, input.createDate, input.content);
    nav("/", { replace: true });
  };
  const onClickDelete = () => {
    onDelete(params.id);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"뒤로 가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"삭제하기"} onClick={onClickDelete} type={"NEGATIVE"} />
        }
      />
      <Editor onSubmit={onClickUpdate} data={targetDiary} />
    </div>
  );
};

export default Edit;
