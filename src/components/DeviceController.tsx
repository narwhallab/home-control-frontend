import "../styles/DeviceController.css"
import { ControlOptions } from '../data/copts'
import { controlDevice } from "../api/fetcher"
import { Device } from "../data/devices"

export default function DeviceController({copts, device}: {copts: ControlOptions, device: Device}) {
    switch (copts.type) {
        case "picker":
            return picker(copts, device)
        case "range":
            return range(copts, device)
        case "input":
            return input(copts, device)
        case "read":
            return read(copts, device)
    }
    return null
}

function picker(copts: ControlOptions, device: Device) {
    let buttonsArray = copts.values.map(controlAction => {
        return <button className="control_button" onClick={() => {
            controlDevice(device, { [copts.name] : controlAction })
        }}>{ controlAction }</button>
    });
    
    return <div className="control_container">
        <h1 className="control_title">{ copts.name }</h1>
        <div className="control_section">{ buttonsArray }</div>
    </div>
}

function range(copts: ControlOptions, device: Device) {
    return <div></div>
}

function input(copts: ControlOptions, device: Device) {
    return <div></div>
}

function read(copts: ControlOptions, device: Device) {
    return <div></div>
}