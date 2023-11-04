import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (data && data.focus && data.focus.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? data.focus.length - 1 : prevIndex - 1
        );
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [data, activeIndex]);

  if (!data || !data.focus || data.focus.length === 0) {
    return null;
  }

  const handleDotClick = (event) => {
    const index = parseInt(event.target.value);
    setActiveIndex(index);
  };

  const reversedFocus = [...data.focus].reverse(); // Inverser l'ordre des éléments

  return (
    <div className="SlideCardList">
      {reversedFocus.map((event, idx) => (
        <div key={`${event.title}-${idx}`}>
          <div
            className={`SlideCard SlideCard--${
              activeIndex === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {reversedFocus.map((_, radioIdx) => (
                <input
                  key={`dot-${radioIdx}`}
                  type="checkbox"
                  name="dots"
                  value={radioIdx}
                  className={activeIndex === radioIdx ? "test" : ""}
                  checked={activeIndex === radioIdx}
                  onChange={handleDotClick}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
