import React from "react";
import styles from "./ReadData.module.css"

// Picker
const ReadData = ({device, retrieveData}) => {
    let [data, setData] = React.useState("")
    React.useEffect(() => {
        const interval = setInterval(() => {
            retrieveData(device, (data) => {
                setData(data.data)
            })
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <>
        { data }
        </>
    )
}

// Range

export default ReadData