import "./DiaryItem.css";
import { getEmotionImage } from "../utils/get-emotion-image.js";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

const DiaryItem = ({ id, createDate, content, emotionId }) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      <div
        className={`img_section img_section_${emotionId}`}
        onClick={() => {
          nav(`./diary/${id}`);
        }}
      >
        <img src={getEmotionImage(emotionId)} />
      </div>
      <div className="info_section">
        <div className="created_date">
          {new Date(createDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button
          onClick={() => {
            nav(`./edit/${id}`);
          }}
          text={"수정하기"}
        />
      </div>
    </div>
  );
};

export default DiaryItem;
