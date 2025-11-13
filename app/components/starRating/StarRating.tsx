import styles from "./starRating.module.css";

export default function StarRating({
  rating,
  max = 5,
}: {
  rating: number;
  max?: number;
}) {
  // 小数は四捨五入して整数の星数を表示
  const filled = Math.round(rating ?? 0);
  const empty = Math.max(0, max - filled);

  const starStyle: React.CSSProperties = {
    fontSize: "1.1rem",
    lineHeight: 1,
    marginRight: 6,
  };

  return (
    <div
      role="img"
      aria-label={`評価 ${rating} / ${max}`}
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      <span style={{ display: "inline-flex", alignItems: "center" }}>
        {Array.from({ length: filled }).map((_, i) => (
          <span key={"f" + i} className={styles.rating} style={starStyle} >
            ★
          </span>
        ))}

        {Array.from({ length: empty }).map((_, i) => (
          <span key={"e" + i} className={styles.star} style={starStyle}>
            ☆
          </span>
        ))}
      </span>

      <span
        style={{
          marginLeft: 8,
          fontSize: "0.9rem",
          color: "#374151",
          whiteSpace: "nowrap",
        }}
      >
        {filled} / {max}
      </span>
    </div>
  );
}
