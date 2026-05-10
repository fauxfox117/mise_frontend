import { useState } from "react";

function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  }

  const isFormValid = (requiredFields = []) => {
    return requiredFields.every(
      (field) => values[field] && values[field].trim() !== "",
    );
  };

  const resetForm = () => {
    setValues(defaultValues);
  };

  return { values, setValues, handleChange, isFormValid, resetForm };
}

export default useForm;
