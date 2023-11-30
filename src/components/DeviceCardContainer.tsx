import DeviceCard from "./DeviceCard";
import "../styles/DeviceCardContainer.css"
import { Device, sampleDevices } from "../data/devices";

function fillMode(device: Device) {
    let element = document.querySelector(`#${device.id}`)

}

export default function DeviceCardContainer() {
    return (
        <div className="device-card-container">
            <h1 className="device-card-container-title">Devices</h1>
            <DeviceCard device={sampleDevices[0]} fillMode={fillMode} />
            <DeviceCard device={sampleDevices[0]} fillMode={fillMode} />
            <DeviceCard device={sampleDevices[0]} fillMode={fillMode} />
            <DeviceCard device={sampleDevices[0]} fillMode={fillMode} />
            <DeviceCard device={sampleDevices[0]} fillMode={fillMode} />
            <DeviceCard device={sampleDevices[0]} fillMode={fillMode} />
        </div>
    )
}