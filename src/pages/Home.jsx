import { useState, useContext, useEffect } from "react";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";
import UserBar from "../components/UserBar";
import EmotionStats from "../components/EmotionStats";
import { DiaryStateContext } from "../App";
import { fetchDiaries, fetchMonthlyStats } from "../api/diaryApi.js";
import "./Home.css";

const Home = () => {
  const { dataVersion } = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("latest");
  const [pageResult, setPageResult] = useState({ content: [], totalPages: 1 });
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchDiaries({
      year: pivotDate.getFullYear(),
      month: pivotDate.getMonth() + 1,
      page,
      size: 10,
      sort,
    })
      .then(setPageResult)
      .catch(console.error);
  }, [pivotDate, page, sort, dataVersion]);

  useEffect(() => {
    fetchMonthlyStats(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
      .then(setStats)
      .catch(console.error);
  }, [pivotDate, dataVersion]);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    setPage(0);
  };

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    setPage(0);
  };

  return (
    <div>
      <UserBar />
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1} 월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <EmotionStats stats={stats} />
      <DiaryList
        data={pageResult.content}
        sort={sort}
        onSortChange={(v) => {
          setSort(v);
          setPage(0);
        }}
      />
      {pageResult.totalPages > 1 && (
        <div className="Pagination">
          <Button
            text={"< 이전"}
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          />
          <span className="page_info">
            {page + 1} / {pageResult.totalPages}
          </span>
          <Button
            text={"다음 >"}
            onClick={() => setPage(page + 1)}
            disabled={page >= pageResult.totalPages - 1}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
