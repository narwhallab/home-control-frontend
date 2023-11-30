import "../styles/Home.css"
import logo from "../images/logo.jpg"

export default function Home() {
    return (
        <div className="home-container">
            <h1 className="home-container-title">환영합니다!</h1>
            <h3 className="home-container-subtitle">Your Home in Your Phone</h3>
            <div className="home-container-menu">
                <div className="home-container-menu-item" onClick={() => window.location.href = "/devices"}><i className="fa-solid fa-lightbulb"></i> 장치</div>
                <div className="home-container-menu-item"><i className="fa-solid fa-chart-line"></i> 통계</div>
                <div className="home-container-menu-item" onClick={() => window.location.href = "/security"}><i className="fa-solid fa-shield-halved"></i> 보안</div>
            </div>
        </div>
    )
}