import React from "react";
import styles from "./Range.module.css"

// Picker
const Picker = ({options, setValue}) => {
    return (
        <>
            <button className={styles.range_btn} onClick={() => setValue(options.name, options.range_min.toString())}>{options.range_min}</button>
            <button className={styles.range_btn} onClick={() => setValue(options.name, options.range_max.toString())}>{options.range_max}</button>
        </>
    )
}

// Range

export default Picker