import React from "react";
import styles from "./Popup.module.css"

const Popup = ({count, title, children = <span>Nothing To Add...</span>, exit = () => {}}) => {
    return (
        <div className={styles.popup}>
            <section className={styles.header}>
                <h1 className={styles.header_title}>{title}</h1>
                <div className={styles.burger} onClick={exit}>
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                </div>
            </section>
            {count == 0 ? <span>Nothing To Add...</span> : children}
        </div>
    )
}

export default Popup;