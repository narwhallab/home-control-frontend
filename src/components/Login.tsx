import "../styles/Login.css"

export default function Login() {
    return (
        <div className="login-container">
            <h1 className="login-container-title">Login</h1>
            <div className="login-container-menu">
                <form action="/login" method="post">
                    <input type="password" name="password" className="login-container-input" />
                </form>
            </div>
        </div>
    )
}