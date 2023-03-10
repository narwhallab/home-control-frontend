import React from "react";
import styles from "./MainBox.module.css";

const MainBox = ({img, title, desc, onClick}) => {
    return (
        <div className={styles.main_box} onClick={onClick}>
            <img src={img} className={styles.main_image} />
            <h1 className={styles.main_title}>{title}</h1>
            <p className={styles.main_desc}>{desc}</p>
        </div>
    )
}

export default MainBox;