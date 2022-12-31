import React from "react"
import styles from "./Navbar.module.css"

const burgerClick = (burgerClass, sceneToggle) => {
    let burger = document.querySelector(`.${burgerClass}`)
    for (const child of burger.children) {
        child.classList.toggle(styles.active)
        sceneToggle()
    }
}

const burgerDefault = (burgerClass, action) => {
    let burger = document.querySelector(`.${burgerClass}`)
    for (const child of burger.children) {
        child.classList.remove(styles.active)
        action()
    }
}

const Navbar = ({sceneToggle, startScene}) => {
    return (
        <div className={styles.navbar} >
            <h1 className={styles.title} onClick={() => { burgerDefault(styles.burger, startScene) }}>HOME CONTROL</h1>
            <div className={styles.burger} onClick={() => burgerClick(styles.burger, sceneToggle)}>
              <span className={styles.line}></span>
              <span className={styles.line}></span>
              <span className={styles.line}></span>
            </div>
        </div>
    )
}

export default Navbar