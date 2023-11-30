import DeviceCard from "./DeviceCard";
import "../styles/Security.css"
import { Device, sampleDevices } from "../data/devices";

function fillMode(device: Device) {
    let element = document.querySelector(`#${device.id}`)

}

export default function Security() {
    return (
        <div className="security-container">
            <h1 className="security-container-title">Security</h1>
            <div className="security-container-menu">
                <h3 className="security-container-menu-item">비밀번호 변경</h3>
                <div className="security-container-menu-contents security-container-password-content"></div>
                <h3 className="security-container-menu-item">로그인 기록 보기</h3>
                <div className="security-container-menu-contents security-container-login_history-content"></div>
            </div>
        </div>
    )
}