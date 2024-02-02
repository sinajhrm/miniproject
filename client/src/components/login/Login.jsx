// eslint-disable-next-line no-unused-vars
import React from "react";
import './Login.css'

export default function Login() {


    return (<>
        <form id="userForm">
            <input type="text" name="username" id="username" />
            <input type="password" name="password" id="password" />
            <button type="submit" name="action" value={'login'}>
                Login
            </button>
            <button type="submit" name="action" value={'signup'}>
            Sign Up
            </button>
        </form>
    </>)
}