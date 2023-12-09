import DeviceCard from "./DeviceCard";
import "../styles/DeviceCardContainer.css"
import { Device } from "../data/devices";
import { useEffect, useState } from "react";
import { listDevices } from "../api/fetcher";

export default function DeviceCardContainer() {
    const [devices, setDevices] = useState([] as JSX.Element[])
    
    useEffect(() => {
        listDevices().then(r => {
            setDevices(r.map(e => <DeviceCard device={e} />))
        })
    }, [])

    return (
        <div className="device-card-container">
            <h1 className="device-card-container-title">Devices</h1>
            {devices}
            {/* <DeviceCard device={sampleDevices[0]} />
            <DeviceCard device={sampleDevices[1]} />
            <DeviceCard device={sampleDevices[2]} />
            <DeviceCard device={sampleDevices[3]} />
            <DeviceCard device={sampleDevices[4]} />
            <DeviceCard device={sampleDevices[5]} /> */}
        </div>
    )
}