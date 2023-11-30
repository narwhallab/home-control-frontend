import ky from "ky"
import { Device } from "../data/devices"
import { getCookie } from "./cookies"

export let access_key = getCookie("access_key")

export async function retrieveData(device: Device): Promise<Object> {
    if (device.dev_type == "readable") {
        return {
            "gom": "makguksu"
        }
    } else {
        return {  }
    }
    // todo: remove top code
    // todo: uncomment the bottom code
    // return await ky.post(`/api/fetch_info`, { 
    //     json: { 
    //         device_id: device.id
    //     }, 
    //     headers: { 
    //         "Content-Type": "application/json", 
    //         "Authorization": `bearer ${access_key}`
    //     }
    // }).json<Object>()
}

export async function listDevices(): Promise<Device[]> {
    return await ky.get(`/api/list_devices`).json<Device[]>()
}