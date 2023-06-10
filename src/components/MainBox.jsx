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

const MainBoxes = ({devices, toggleControlPopup}) => {
    return (
        <>
            {
                Object.keys(devices).map((id, index) => 
                <MainBox 
                    img={devices[id].img}
                    title={devices[id].name}
                    desc={devices[id].desc}
                    key={index}
                    onClick={() => toggleControlPopup(devices[id])}  />
                )
            }
            {/* <MainBox img="/plus.jpg" title="ADD" desc="새로운 기기 추가하기" /> */}
        </>
    )
}

export { MainBox, MainBoxes };