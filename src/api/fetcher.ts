import ky from "ky"
import { Device } from "../data/devices"
import { getCookie } from "./cookies"

export let access_key = getCookie("access_key")

function retrieveData(device: Device, callback: () => void) {
    ky.post(`/api/fetch_info`, { json: { device_id: device.id }, headers: { "Content-Type": "application/json", "Authorization": `bearer ${access_key}` } })
}

async function listDevices(): Promise<Device[]> {
    return await ky.get(`/api/list_devices`).json<Device[]>()
}
