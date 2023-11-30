import "../styles/DeviceController.css"
import { ControlOptions } from '../data/copts'

export default function DeviceController({copts}: {copts: ControlOptions}) {
    switch (copts.opt_type) {
        case "picker":
            return picker(copts)
        case "range":
            return range(copts)
        case "input":
            return input(copts)
        case "read":
            return read(copts)
    }
    return null
}

function picker(copts: ControlOptions) {
    return <div></div>
}

function range(copts: ControlOptions) {
    return <div></div>
}

function input(copts: ControlOptions) {
    return <div></div>
}

function read(copts: ControlOptions) {
    return <div></div>
}