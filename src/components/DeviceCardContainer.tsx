import DeviceCard from "./DeviceCard";
import "../styles/DeviceCardContainer.css"
import { Device, sampleDevices } from "../data/devices";

export default function DeviceCardContainer() {
    return (
        <div className="device-card-container">
            <h1 className="device-card-container-title">Devices</h1>
            <DeviceCard device={sampleDevices[0]} />
            <DeviceCard device={sampleDevices[1]} />
            <DeviceCard device={sampleDevices[2]} />
            <DeviceCard device={sampleDevices[3]} />
            <DeviceCard device={sampleDevices[4]} />
            <DeviceCard device={sampleDevices[5]} />
        </div>
    )
}