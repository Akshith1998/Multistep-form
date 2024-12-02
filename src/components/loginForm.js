import { useState } from "react";
import { forms } from "../forms";

export const LoginForm = ({
  formData,
  formIndex,
  setFormIndex,
  currFormIdx,
}) => {
  const [currFormData, setCurrFormData] = useState(formData);
  if (formIndex !== currFormIdx) return;

  const handleOnChange = (e) => {
    const copyFormData = currFormData.map((item) => {
      if (item.id === e.target.id) {
        return {
          ...item,
          value: e.target.value,
          isError: e.target.value ? false : true,
        };
      } else return item;
    });
    setCurrFormData(copyFormData);
  };

  const validateFormItems = () => {
    const copyFormData = currFormData.map((item) => {
      if (!item.value) {
        return { ...item, isError: true };
      } else return item;
    });
    setCurrFormData(copyFormData);
    return copyFormData.every((item) => !item.isError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validated = validateFormItems();
    if (validated) {
      let obj = {};
      currFormData.forEach((item) => {
        obj[item.id] = item.value;
      });
      localStorage.setItem(currFormIdx, JSON.stringify(obj));
      if (forms.length - 1 === formIndex) {
        let obj = {};
        Array(currFormIdx + 1)
          .fill(-1)
          .forEach((_, i) => {
            let data = JSON.parse(localStorage.getItem(i));
            obj = { ...obj, ...data };
          });
      } else {
        setFormIndex((prev) => prev + 1);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {currFormData.map((item) => {
        return (
          <div key={item.id}>
            <label>{item.label}</label>
            <input
              value={item.value}
              id={item.id}
              type={item.type}
              onChange={handleOnChange}
            />
            {item.isError && <div>{item.errorMessage}</div>}
          </div>
        );
      })}
      <button>{forms.length - 1 === formIndex ? "Submit" : "Next"}</button>
    </form>
  );
};
