import React from 'react'

const RegisteField = ({ handleFields, fields, validationErrors, placeholder, name, type }) => {

    return (
        <>
            <p>{placeholder}</p>
            <input
                className={validationErrors[name] ? "register__registerForm--field register__registerForm--error" : "register__registerForm--field"}
                type={type}
                placeholder={placeholder}
                value={fields[name]}
                name={name}
                onChange={handleFields}
            />
            {validationErrors[name] && <p className="login__loginForm--validationError">{validationErrors[name]}</p>}
        </>
    )
}

export default RegisteField;
