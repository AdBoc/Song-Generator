export const validator = (fields) => {
  let errors = {};

  if (fields.hasOwnProperty('notEmpty')) {
    errors.notEmpty = "Field is required";
  }

  if (fields.hasOwnProperty('email')) {
    if (!fields.email) {
      errors.email = "Email is required";
    }
    else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      errors.email = "Email address is invalid";
    }
  }

  if (fields.hasOwnProperty('password')) {
    if (!fields.password) {
      errors.password = "Password is required";
    } else if (fields.password.length < 10) {
      errors.password = "Password needs to have more than 8 characters";
    }
  }

  if (fields.hasOwnProperty('confirmPassword')) {
    if (fields.passwordConfirm !== fields.password) {
      errors.passwordConfirm = "Passwords need to be same";
    }
  }

  if (Object.keys(errors).length === 0)
    return false
  return errors;
}