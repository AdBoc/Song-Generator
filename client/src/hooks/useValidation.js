import { useState, useEffect, useRef } from 'react';
import { validator } from '../_helpers/validator';

export const useValidation = (fields, submit) => {
  const [validationErrors, setValidationErrors] = useState({});
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      const variable = validator(fields);
      if (!!variable) {
        setValidationErrors(variable);
      } else {
        setValidationErrors(false);
      }
    } else {
      didMount.current = true;
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit])

  return {
    validationErrors
  };
}
