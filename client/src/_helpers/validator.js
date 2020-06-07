export default function validate(values) {
  let errors = {};

  if (!values.email) {
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
  } else if (values.password.length < 10) {
    errors.password = "Password needs to have more than 10 characters";
  }

  if (!values.textField) {
  } else if (values.textField.length < 25) {
    errors.textField = "Text field has more than 25"
  }

  return errors;
}