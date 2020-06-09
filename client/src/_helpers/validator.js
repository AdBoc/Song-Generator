export const validator = (fields) => {
  let errors = {};

  if (fields.hasOwnProperty('notEmpty')) {
    if (errors.notEmpty === '')
      errors.notEmpty = "Field is required";
  }

  if (fields.hasOwnProperty('login')) {
    if (!fields.login) {
      errors.login = "Field is required";
    } else if (fields.login.length < 9) {
      errors.login = "Login needs to have more than 8 characters";
    }
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
    } else if (fields.password.length < 9) {
      errors.password = "Password needs to have more than 8 characters";
    }
  }

  if (fields.hasOwnProperty('confirmPassword')) {
    if (fields.confirmPassword !== fields.password) {
      errors.passwordConfirm = "Passwords are not matching";
    }
  }

  if (Object.keys(errors).length === 0)
    return false
  return errors;
}