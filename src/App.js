import { useState } from "react";
import { LoginForm } from "./components/loginForm";
import { forms } from "./forms";
import "./styles.css";

export default function App() {
  const [formIndex, setFormIndex] = useState(0);

  return (
    <div className="App">
      {forms.map((formData, currFormIdx) => {
        return (
          <LoginForm
            key={currFormIdx}
            formData={formData}
            formIndex={formIndex}
            setFormIndex={setFormIndex}
            currFormIdx={currFormIdx}
          />
        );
      })}
    </div>
  );
}
