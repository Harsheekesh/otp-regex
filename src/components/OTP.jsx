import './OTP.css';
import { useState, useRef, useEffect } from "react";

export default function OTP({ otpLength = 6 }) {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const ref = useRef([]);

  function handleKeyDown(e, index) {
    const key = e.key;
    const copyOtpFields = [...otpFields];

    if (key === "ArrowLeft" && index > 0) {
      ref.current[index - 1].focus();
      return;
    }

    if (key === "ArrowRight" && index + 1 < otpFields.length) {
      ref.current[index + 1].focus();
      return;
    }

    if (key === "Backspace") {
      copyOtpFields[index] = "";
      setOtpFields(copyOtpFields);

      if (index > 0) ref.current[index - 1].focus();
      return;
    }

    if (key === "Enter") {
      const otp = otpFields.join("");
      if (otp.length === otpLength && /^\d+$/.test(otp)) {
        alert(`OTP Submitted: ${otp}`);
        resetOTP();
      } else {
        alert("Please enter a complete and valid OTP.");
      }
      return;
    }

    if (!/^\d$/.test(key)) return;

    copyOtpFields[index] = key;
    setOtpFields(copyOtpFields);

    if (index + 1 < otpFields.length) {
      ref.current[index + 1].focus();
    } else {
      // Auto submit when last digit is entered
      const otp = copyOtpFields.join("");
      if (otp.length === otpLength && /^\d+$/.test(otp)) {
        setTimeout(() => {
          alert(`OTP Submitted: ${otp}`);
          resetOTP();
        }, 150); // Small delay to show last digit before reset
      }
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.match(/\d/g);

    if (!digits) return;

    const nextOtp = otpFields.slice();

    for (let i = 0; i < otpLength && digits.length; ++i) {
      nextOtp[i] = digits[i];
    }

    setOtpFields(nextOtp);
    const nextFocus = digits.length < otpLength ? digits.length : otpLength - 1;
    ref.current[nextFocus]?.focus();

    // Auto submit if all fields are filled via paste
    if (nextOtp.join("").length === otpLength) {
      setTimeout(() => {
        alert(`OTP Submitted: ${nextOtp.join("")}`);
        resetOTP();
      }, 150);
    }
  }

  function resetOTP() {
    const empty = new Array(otpLength).fill("");
    setOtpFields(empty);
    ref.current[0]?.focus();
  }

  useEffect(() => {
    ref.current[0]?.focus();
  }, []);

  return (
    <div className="container">
      {otpFields.map((value, index) => (
        <input
          key={index}
          ref={(input) => (ref.current[index] = input)}
          value={value}
          type="text"
          maxLength={1}
          className="otp-input"
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onChange={() => {}} // Needed to suppress React warning
        />
      ))}
    </div>
  );
}
