import "./Inputs.css";
import ArrowIcon from "../assets/icon-arrow.svg";
import Result from "./Result";
import { DateTime } from "luxon";
import { useState } from "react";

function Inputs() {
  const [age, setAge] = useState({
    years: "",
    months: "",
    days: "",
  });
  const [isError, setIsError] = useState({
    status: false,
    day: "",
    month: "",
    year: "",
  });
  const [showDashes, setShowDashes] = useState(true);
  const [intTime, setIntTime] = useState({
    years: undefined,
    months: undefined,
    days: undefined,
  });

  const handleClick = () => {
    setShowDashes(false);
    try {
      if (Number(age.years) > DateTime.now().year) {
        throw "too big";
      }

      const diff = DateTime.now().diff(
        DateTime.local(+age.years, +age.months, +age.days),
        ["years", "months", "days"]
      );

      setIntTime({
        years: diff.values.years,
        months: diff.values.months,
        days: Math.floor(diff.values.days),
      });

      setIsError((prev) => ({ ...prev }));
    } catch (error) {
      if (age.days === "") {
        setIsError((prev) => ({
          ...prev,
          status: true,
          day: "This field is required",
        }));
      }
      if (age.months === "") {
        setIsError((prev) => ({
          ...prev,
          status: true,
          month: "This field is required",
        }));
      }
      if (age.years === "") {
        setIsError((prev) => ({
          ...prev,
          status: true,
          year: "This field is required",
        }));
      }
      if (age.months > 12) {
        setIsError((prev) => ({
          ...prev,
          status: true,
          month: "must be a valid month",
        }));
      }
      if (Number(age.years) > DateTime.now().year) {
        setIsError((prev) => ({
          ...prev,
          status: true,
          year: "must be in the past",
        }));
      }
      if (!DateTime.local(+age.years, +age.months, +age.days).isValid) {
        setIsError((prev) => ({
          ...prev,
          status: true,
          day: "must be a valid date",
        }));
      }
      if (age.days > 31) {
        setIsError((prev) => ({
          ...prev,
          status: true,
          day: "must be a valid day",
        }));
      }
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setAge((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };
  return (
    <>
      <div className="InputsBox">
        <div className="InputsBox-Form">
          <label htmlFor="day" className={isError.status ? "error" : ""}>
            day
            <input
              className={isError.status ? "error" : ""}
              type="text"
              name="days"
              id="day"
              placeholder="dd"
              value={age.days}
              onChange={handleChange}
              onMouseOut={(e) =>
                setAge((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value.padStart(2, "0"),
                }))
              }
            />
            <p className="InputBox-Form-ParaError">{isError.day}</p>
          </label>
          <label htmlFor="month" className={isError.status ? "error" : ""}>
            month
            <input
              className={isError.status ? "error" : ""}
              type="text"
              name="months"
              id="month"
              placeholder="mm"
              value={age.months}
              onChange={handleChange}
              onMouseOut={(e) =>
                setAge((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value.padStart(2, "0"),
                }))
              }
            />
            <p className="InputBox-Form-ParaError">{isError.month}</p>
          </label>

          <label htmlFor="year" className={isError.status ? "error" : ""}>
            year
            <input
              className={isError.status ? "error" : ""}
              type="text"
              name="years"
              id="year"
              placeholder="yy"
              value={age.years}
              onChange={handleChange}
            />
            <p className="InputBox-Form-ParaError">{isError.year}</p>
          </label>
        </div>
        <div className="InputsBox-Container">
          <div className="InputsBox-Container-Line"></div>
          <button className="InputsBox-Container-Btn" onClick={handleClick}>
            <img src={ArrowIcon} alt="" />
          </button>
        </div>
      </div>
      <Result
        years={intTime.years}
        months={intTime.months}
        days={intTime.days}
        isError={isError.status}
        showDashes={showDashes}
      />
    </>
  );
}
export default Inputs;
