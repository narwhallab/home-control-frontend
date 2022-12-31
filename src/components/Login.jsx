import React from "react";
import styles from "./Login.module.css";
import { host } from "../globals"
 
const Login = ({}) => {
    return (
        <form action={`${host}/login`} method="post" className={styles.container}>
            <input placeholder="password" name="password" type="password" className={styles.password} />
            <button className={styles.button} type="submit">로그인</button>
        </form>
    )
}

export default Login