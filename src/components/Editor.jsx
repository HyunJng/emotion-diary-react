import "./Editor.css";
import { getStringDate } from "../utils/dateManager.js";
import EmotionItem from "./EmotionItem";
import Button from "../components/Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emotionList = [
  {
    emotionId: 1,
    emotionName: "완전 좋음",
  },
  {
    emotionId: 2,
    emotionName: "좋음",
  },
  {
    emotionId: 3,
    emotionName: "보통",
  },
  {
    emotionId: 4,
    emotionName: "별로",
  },
  {
    emotionId: 5,
    emotionName: "끔찍함",
  },
];

const Editor = ({ onSubmit }) => {
  const nav = useNavigate();
  const [input, setInput] = useState({
    createDate: new Date(),
    emotionId: 3,
    content: "",
  });

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == "createDate") {
      value = new Date(value);
    }
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          type="date"
          name="createDate"
          value={getStringDate(input.createDate)}
          onChange={onChangeInput}
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 일정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"취소하기"} />
        <Button
          onClick={() => onSubmit(input)}
          text={"작성완료"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Editor;
