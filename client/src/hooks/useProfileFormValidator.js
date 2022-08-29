import { useState, useEffect } from "react";

const useProfileFormValidator = (formData) => {
  const [errors, setErrors] = useState({
    firstName: {
      isInvalid: false,
      message: "",
    },
    lastName: {
      isInvalid: false,
      message: "",
    },
  });
  const newErrors = JSON.parse(JSON.stringify(errors));
  useEffect(() => {
    for (const [key, value] of Object.entries(formData)) {
      updateErrors(key, value);
    }
    setErrors(newErrors);
  }, [formData.firstName, formData.lastName]);
  const validateForm = () => {
    let isValid = true;
    const { firstName, lastName } = formData;

    if (!firstName) {
      newErrors.firstName.message = "The firstName field is required";
      newErrors.firstName.isInvalid = true;
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName.message = "The lastName field is required";
      newErrors.lastName.isInvalid = true;
      isValid = false;
    }

    setErrors(newErrors);

    return {
      isValid,
    };
  };
  const updateErrors = (fieldName, fieldValue) => {
    if (!errors?.[fieldName]) return;
    if (errors[fieldName].isInvalid && fieldValue !== "") {
      newErrors[fieldName].isInvalid = null;
      newErrors[fieldName].message = "";
      // setErrors({ ...errors, [fieldName]: { isInvalid: null, message: "" } });
    }
  };
  return {
    validateForm,
    errors,
  };
};

export default useProfileFormValidator;
