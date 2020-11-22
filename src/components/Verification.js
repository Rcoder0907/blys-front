import axios from "axios";
import React, { useState, useRef } from "react";
import "./Verification.css";
import { useHistory } from "react-router-dom";
import Config from "../config";

function Verification() {
  const [digit1, setDigit1] = useState();
  const [digit2, setDigit2] = useState();
  const [digit3, setDigit3] = useState();
  const [digit4, setDigit4] = useState();
  const [digit5, setDigit5] = useState();
  const [digit6, setDigit6] = useState();

  let digit1Input = useRef(null);
  let digit2Input = useRef(null);
  let digit3Input = useRef(null);
  let digit4Input = useRef(null);
  let digit5Input = useRef(null);
  let digit6Input = useRef(null);

  const [errorMessage, setErrorMessage] = useState(null);
  let history = useHistory();

  const submitCode = async () => {
    digit1Input.current.focus();
    const code = [digit1, digit2, digit3, digit4, digit5, digit6]
      .filter((d) => d !== null)
      .join("");

    try {
      await axios.post(`${Config.url}/verify`, { code });

      history.push("/success");
    } catch (error) {
      setErrorMessage("Verification Error");
    }
  };

  const updateValue = (event, setDigit, focusElm) => {
    const patern = /^[0-9\b]+$/;

    const value = event.target.value;

    if (value && patern.test(value)) {
      setDigit(event.target.value);
      event.target.classList.remove("error");
      focusElm.current.focus();
      focusElm.current.select();
    } else {
      // Error input

      focusElm.current.select();
      event.target.classList.add("error");

      setDigit(null);
    }
  };

  const handlePaste = (event) => {
    event.clipboardData.items[0].getAsString((codes) => {
      const digits = codes.split("").slice(0, 6);

      setDigit1(digits[0]);
      setDigit2(digits[1]);
      setDigit3(digits[2]);
      setDigit4(digits[3]);
      setDigit5(digits[4]);
      setDigit6(digits[5]);
      digit6Input.current.focus();
    });
  };

  return (
    <div className="verification">
      {errorMessage && <div className="errorSms">{errorMessage}</div>}
      <h1>Verification code:</h1>
      <input
        defaultValue={digit1}
        onChange={(event) => updateValue(event, setDigit1, digit2Input)}
        onPaste={handlePaste}
        pattern="\d"
        maxLength="1"
        ref={digit1Input}
        type="text"
        className={"input-box"}
      />
      <input
        value={digit2}
        onChange={(event) => updateValue(event, setDigit2, digit3Input)}
        pattern="\d"
        maxLength="1"
        ref={digit2Input}
        className={"input-box"}
      />
      <input
        value={digit3}
        onChange={(event) => updateValue(event, setDigit3, digit4Input)}
        pattern="\d"
        maxLength="1"
        ref={digit3Input}
        className={"input-box"}
      />
      <input
        value={digit4}
        onChange={(event) => updateValue(event, setDigit4, digit5Input)}
        pattern="\d"
        maxLength="1"
        ref={digit4Input}
        className={"input-box"}
      />
      <input
        value={digit5}
        onChange={(event) => updateValue(event, setDigit5, digit6Input)}
        pattern="\d"
        maxLength="1"
        ref={digit5Input}
        className={"input-box"}
      />
      <input
        value={digit6}
        onChange={(event) => updateValue(event, setDigit6, digit6Input)}
        pattern="\d"
        maxLength="1"
        ref={digit6Input}
        className={"input-box"}
      />

      <br />
      <button className="submit-button" onClick={submitCode}>
        Submit
      </button>
    </div>
  );
}

export default Verification;
