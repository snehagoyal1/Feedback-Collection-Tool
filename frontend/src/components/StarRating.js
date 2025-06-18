import { useState } from "react";
const StarRating = ({ setRating }) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hovered || selected) ? "active" : ""}`}
          onClick={() => {
            setSelected(star);
            setRating(star);
          }}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};
export default StarRating;