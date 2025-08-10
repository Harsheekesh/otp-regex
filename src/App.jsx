import OTP from "./components/OTP";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <h1>OTP Input with Regex Validation</h1>
      <p>
        This project is a smart and responsive OTP (One-Time Password) input component built with React. 
        It uses regular expressions (regex) to validate numeric input, handles keyboard navigation and backspace efficiently, 
        and supports auto-focus shifting between inputs. It also allows full OTP pasting with intelligent digit placement.
      </p>
      <OTP otpLength={6} />
    </div>
  );
}
