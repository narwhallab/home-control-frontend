import ky from "ky"
import { Device } from "../data/devices"
import { getCookie } from "./cookies"

export let access_key = getCookie("access_key")

export async function retrieveData(device: Device): Promise<Object> {
    return await ky.post(`/api/fetch_info`, { 
        json: { 
            device_id: device.id
        }, 
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `bearer ${access_key}`
        }
    }).json<Object>()
}

export async function listDevices(): Promise<Device[]> {
    let devicePairs = await ky.get(`/api/list_devices`).json<Object>()
    return Object.values(devicePairs)
}

export async function controlDevice(device: Device, data: Object): Promise<Object> {
    return await ky.post(`/api/control_device`, {
        json: { 
            device_id: device.id,
            data
        }, 
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `bearer ${access_key}`
        }
    }).json<Object>()
}