import "../styles/TopNav.css"

const burgerClick = (callback: () => void) => {
    let burger = document.querySelector(".navbar-burger")!!
    for (const child of burger.children) {
        child.classList.toggle("navbar-burger-line-active")
        callback()
    }
}

const burgerDefault = (callback: () => void) => {
    let burger = document.querySelector(".navbar-burger")!!
    for (const child of burger.children) {
        child.classList.remove("navbar-burger-line-active")
        callback()
    }
}

export default function TopNav({toggleHome, toggleMenu}: {toggleHome: () => void, toggleMenu: () => void}) {
    return (
        <div className="navbar">
            <h1 className="navbar-title" onClick={() => burgerDefault(toggleHome)}>HOME CONTROL</h1>
            <div className="navbar-menu">
                <span className="navbar-menu-help">사용법</span>
                <span className="navbar-menu-login">로그인</span>
            </div>
            <div className="navbar-burger" onClick={() => burgerClick(toggleMenu)}>
              <span className="navbar-burger-line"></span>
              <span className="navbar-burger-line"></span>
              <span className="navbar-burger-line"></span>
            </div>
        </div>
    )
}