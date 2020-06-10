import React from 'react'

const UserForm = ({handleFields, handleSubmit, handleChange, toggleChange, userData, fields, error}) => {

    const { login, email, newPassword, confirmNewPassword } = fields;

    return (
        <form className="user__form" onSubmit={handleSubmit}>
            <div className="user__form--field" onClick={handleChange('toggleUsername')}>Login: {userData.login}</div>
            {
                toggleChange.toggleUsername &&
                <input
                    className="user__form--inputField"
                    name="login"
                    type="text" placeholder="user"
                    value={login} minLength="9"
                    onChange={handleFields}
                />
            }

            <div className="user__form--field" onClick={handleChange('toggleEmail')}>Email: {userData.email}</div>
            {
                toggleChange.toggleEmail &&
                <input
                    className="user__form--inputField"
                    name="email"
                    type="text" placeholder="email"
                    value={email}
                    onChange={handleFields}
                />
            }

            <div className="user__form--field" onClick={handleChange('togglePassword')}>Password</div>
            {
                toggleChange.togglePassword &&
                <>
                    <input
                        className="user__form--inputField"
                        name="newPassword"
                        type="password"
                        placeholder="newPassword"
                        minLength="9"
                        value={newPassword}
                        onChange={handleFields}
                    />
                    <input
                        className="user__form--inputField"
                        name="confirmNewPassword"
                        type="password"
                        placeholder="confirm new password"
                        minLength="9"
                        value={confirmNewPassword}
                        onChange={handleFields}
                    />
                </>
            }
            {error && <p>{error}</p>}
            <input className="user__form--submit" type="submit" value="submit" />
        </form>
    )
}

export default UserForm;