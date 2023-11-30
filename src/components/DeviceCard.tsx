import { Device } from '../data/devices'
import lightbulb from '../images/lightbulb.png'
import "../styles/DeviceCard.css"

export default function DeviceCard({device, fillMode}: {device: Device, fillMode: (device: Device) => void}) {
    return (
        <div className="device-card" id={device.id}>
            <img className='device-card-image' src={device.img} alt="lightbulb" />
            <h1 className='device-card-title'>{device.name}</h1>
            <span className='device-card-type'>{device.dev_type}</span>
            <span className='device-card-description'>{device.desc}</span>
            <div className="device-card-button" onClick={e => {e.currentTarget.parentElement?.classList.toggle("device-card-active"); fillMode(device)}}>관리</div>
        </div>
    )
}