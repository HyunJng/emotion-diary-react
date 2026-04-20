import "./Viewer.css";
import { getEmotionImage } from "../utils/get-emotion-image.js";
import { emotionList } from "../utils/constants.js";
const Viewer = ({ targetDiary }) => {
  const emotionItem = emotionList.find(
    (item) => Number(item.emotionId) == Number(targetDiary.emotionId),
  );

  return (
    <div className="Viewer">
      <div className="img_section">
        <h4>오늘의 일정</h4>
        <div
          className={`emotion_img_wrapper emotion_img_wrapper_${targetDiary.emotionId}`}
        >
          <img src={getEmotionImage(emotionItem.emotionId)} />
          <div>{emotionItem.emotionName}</div>
        </div>
      </div>
      <div className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{targetDiary.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
