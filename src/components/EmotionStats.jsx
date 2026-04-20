import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { emotionList } from "../utils/constants.js";
import { getEmotionImage } from "../utils/get-emotion-image.js";
import "./EmotionStats.css";

const EMOTION_COLORS = {
  1: "#64c964",
  2: "#9dd97c",
  3: "#c8c8c8",
  4: "#ffb347",
  5: "#fd565f",
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="stats_tooltip">
      {payload[0].name} {payload[0].value}개
    </div>
  );
};

const EmotionStats = ({ stats }) => {
  const chartData = emotionList
    .map((e) => ({
      emotionId: e.emotionId,
      name: e.emotionName,
      value: stats[e.emotionId] ?? 0,
    }))
    .filter((d) => d.value > 0);

  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="EmotionStats">
      <h4>이번 달 감정 통계</h4>
      {total === 0 ? (
        <p className="empty_msg">이번 달 일기가 아직 없어요</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={88}
                dataKey="value"
                paddingAngle={3}
                startAngle={90}
                endAngle={-270}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.emotionId}
                    fill={EMOTION_COLORS[entry.emotionId]}
                  />
                ))}
                <Label
                  value={`총 ${total}개`}
                  position="center"
                  style={{
                    fontFamily: "NanumPenScript",
                    fontSize: "20px",
                    fill: "#555",
                  }}
                />
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend">
            {chartData.map((entry) => (
              <div key={entry.emotionId} className="legend_item">
                <img
                  src={getEmotionImage(entry.emotionId)}
                  alt={entry.name}
                  className="legend_img"
                />
                <span className="legend_name">{entry.name}</span>
                <span
                  className="legend_count"
                  style={{ color: EMOTION_COLORS[entry.emotionId] }}
                >
                  {entry.value}개
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EmotionStats;
