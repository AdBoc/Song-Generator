import React from 'react';

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} noValidate>
            <p style={{ marginTop: '1rem' }}>Email</p>
            <input
                className={props.validationErrors.email ? "login__loginForm--field login__loginForm--error" : "login__loginForm--field"}
                type="text"
                placeholder="email"
                name="email"
                value={props.fields.email}
                onChange={props.handleFields} />
            {props.validationErrors.email && <p className="login__loginForm--validationError">{props.validationErrors.email}</p>}
            <p>Password</p>
            <input
                className={props.validationErrors.password ? "login__loginForm--field login__loginForm--error" : "login__loginForm--field"}
                type="password"
                placeholder="password"
                name="password"
                value={props.fields.password}
                onChange={props.handleFields} />
            {props.validationErrors.password && <p className="login__loginForm--validationError">{props.validationErrors.password}</p>}

            <input className="login__loginForm--submit" type="submit" value="submit" />
        </form>
    )
}

export default LoginForm;