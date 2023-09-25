import "./Result.css";
import PropTypes from "prop-types";

function Result(props) {
  const { years, months, days, isError, showDashes } = props;

  return (
    <div className="ResultBox">
      <strong>
        {showDashes ? <span>--</span> : ""}
        <span>{isError ? "--" : years} </span> years
      </strong>
      <strong>
        {showDashes ? <span>--</span> : ""}
        <span>{isError ? "--" : months}</span> months
      </strong>
      <strong>
        {showDashes ? <span>--</span> : ""}
        <span>{isError ? "--" : days}</span> days
      </strong>
    </div>
  );
}
Result.propTypes = {
  years: PropTypes.number,
  months: PropTypes.number,
  days: PropTypes.number,
  isError: PropTypes.bool,
  showDashes: PropTypes.bool,
};
export default Result;
