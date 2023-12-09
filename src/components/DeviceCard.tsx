import { useEffect, useState } from 'react'
import { retrieveData } from '../api/fetcher'
import { Device } from '../data/devices'
import "../styles/DeviceCard.css"
import DeviceController from './DeviceController'

export default function DeviceCard({device}: {device: Device}) {
    const [data, setData] = useState("")

    useEffect(() => {
        retrieveData(device).then(r => {
            setData(JSON.stringify(r))
        })
    }, [])

    // console.log(device.ctrl_opts);

    let controllers = device.ctrl_opts.map(e => <DeviceController copts={e} device={device} />)

    return (
        <div className="device-card" id={device.id}>
            <img className='device-card-image' src={device.img} alt="lightbulb" />
            <h1 className='device-card-title'>{device.name}</h1>
            <span className='device-card-type'>{device.dev_type}</span>
            <span className='device-card-description'>{device.desc}</span>
            <div className="device-card-button" onClick={e => e.currentTarget.parentElement?.classList.toggle("device-card-active")}>관리</div>
            <div className='device-card-control'>
                {/* { data } */}
                { controllers }
            </div>
        </div>
    )
}