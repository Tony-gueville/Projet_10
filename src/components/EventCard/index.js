import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";
import { useData } from "../../contexts/DataContext";
import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => {
  // ***
  const { data } = useData();
  console.log(data?.events?.[data.events.length - 1]?.cover);

  const defaultImageSrc = data?.events?.[data.events.length - 1]?.cover || "";
  const defaultImageAlt =
    data?.events?.[data.events.length - 1]?.description || "";
  const defaultTitle = data?.events?.[data.events.length - 1]?.title || "";

  return (
    // ***
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img
          data-testid="card-image-testid"
          src={imageSrc || defaultImageSrc}
          alt={imageAlt || defaultImageAlt}
        />
        {/* <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} /> */}
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title || defaultTitle}</div>
        {/* <div className="EventCard__title">{title}</div> */}
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  title: PropTypes.string,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};
// EventCard.defaultProps = {
//   imageAlt: "image",
//   small: false,
// }
export default EventCard;
