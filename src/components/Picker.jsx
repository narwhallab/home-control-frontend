import React from "react";
import styles from "./Picker.module.css"

// Picker
const Picker = ({options, setValue}) => {
    return (
        <>
        { options.values.map(value => <button className={styles.picker_btn} onClick={() => setValue(options.name, value)}>{value}</button>) }
        </>
    )
}

// Range

export default Picker