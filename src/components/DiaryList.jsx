import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";

const DiaryList = ({ data, sort, onSortChange }) => {
  const nav = useNavigate();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"새로운 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>
      <div className="list_wrap">
        {data.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
