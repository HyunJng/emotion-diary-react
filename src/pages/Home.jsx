import { useState, useContext } from "react";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";
import { DiaryStateContext } from "../App";

const getMonthlyData = (pivotDate, data) => {
  const beginDate = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0,
  ).getTime();
  const lastDate = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    0,
    0,
    0,
  ).getTime();

  return data.filter(
    (item) => beginDate <= item.createDate && item.createDate <= lastDate,
  );
};

const Home = () => {
  const [pivotDate, setPivotDate] = useState(new Date());
  const { data } = useContext(DiaryStateContext);

  const onIncreateMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreateMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  const monthlyData = getMonthlyData(pivotDate, data);
  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1} 월`}
        leftChild={<Button text={"<"} onClick={onDecreateMonth} />}
        rightChild={<Button text={">"} onClick={onIncreateMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
