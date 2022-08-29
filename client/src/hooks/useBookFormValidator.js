import { useState, useEffect } from "react";

const useBookFormValidator = (formData) => {
  const [errors, setErrors] = useState({
    title: {
      isInvalid: false,
      message: "",
    },
    author: {
      isInvalid: false,
      message: "",
    },
    genre: {
      isInvalid: false,
      message: "",
    },
    cover: {
      isInvalid: false,
      message: "",
    },
    introduction: {
      isInvalid: false,
      message: "",
    },
    summary: {
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
  }, [formData.title, formData.summary]);
  const validateForm = () => {
    let isValid = true;
    const { title, author, introduction, genre, summary } = formData;

    if (!title) {
      newErrors.title.message = "The title field is required";
      newErrors.title.isInvalid = true;
      isValid = false;
    }

    if (!author) {
      newErrors.author.message = "The author field is required";
      newErrors.author.isInvalid = true;
      isValid = false;
    }

    if (!introduction) {
      newErrors.introduction.message = "The introduction field is required";
      newErrors.introduction.isInvalid = true;
      isValid = false;
    }

    if (!genre) {
      newErrors.genre.message = "The genre field is required";
      newErrors.genre.isInvalid = true;
      isValid = false;
    }
    if (!summary) {
      newErrors.summary.message = "The summary field is required";
      newErrors.summary.isInvalid = true;
      isValid = false;
    }
    setErrors(newErrors);

    return {
      isValid,
    };
  };
  const updateErrors = (fieldName, fieldValue) => {
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

export default useBookFormValidator;
