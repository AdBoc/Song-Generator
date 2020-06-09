import { useState, useEffect } from 'react';
import { validator } from '../_helpers/validator';

export const useValidation = (fields) => {
  const [validationErrors, setValidationErrors] = useState({});

  // useEffect(() => {
  //   const variable = validator(fields);
  //   if (!!variable) {
  //     setValidationErrors(variable);
  //   } else {
  //     setValidationErrors(false);
  //   }

  //   return () => {
  //     console.log("cleanup");
  //   }
  // }, [fields])

  // const validate = () => {
  //   return validator(fields);
  // }

  const validate = () => {
    const variable = validator(fields);
    if (!!variable) {
      setValidationErrors(variable);
    } else {
      setValidationErrors(false);
    }
  }

  validate();

  return {
    validationErrors,
    validate
  };
}