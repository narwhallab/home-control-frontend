import { ControlOptions } from "./copts";
import lightbulb from "../images/lightbulb.png";

/** 
 *  device.rs
 * 
 *  pub id: String,
 *  pub dev_type: DeviceType,
 *  pub name: String,
 *  pub desc: String,
 *  pub img: String,
 *  pub ctrl_opts: Vec<ControlOptions>,
 */
export class Device {
    id!: string;
    dev_type!: string;
    name!: string;
    desc!: string;
    img!: string;
    ctrl_opts!: ControlOptions[];
}

// export const sampleDevices: Device[] = [
//     {
//         id: "myid1",
//         dev_type: "commandable",
//         name: "전등",
//         desc: "불을 켜고 끕니다",
//         img: lightbulb,
//         ctrl_opts: [
//             {
//                 name: "led",
//                 opt_type: "picker",
//                 values: ["on", "off"],
//                 range_max: 0.0,
//                 range_min: 0.0
//             }
//         ]
//     },
//     {
//         id: "myid2",
//         dev_type: "commandable",
//         name: "전등",
//         desc: "불을 켜고 끕니다",
//         img: lightbulb,
//         ctrl_opts: []
//     },
//     {
//         id: "myid3",
//         dev_type: "commandable",
//         name: "전등",
//         desc: "불을 켜고 끕니다",
//         img: lightbulb,
//         ctrl_opts: []
//     },
//     {
//         id: "myid4",
//         dev_type: "commandable",
//         name: "전등",
//         desc: "불을 켜고 끕니다",
//         img: lightbulb,
//         ctrl_opts: []
//     },
//     {
//         id: "myid5",
//         dev_type: "commandable",
//         name: "전등",
//         desc: "불을 켜고 끕니다",
//         img: lightbulb,
//         ctrl_opts: []
//     },
//     {
//         id: "myid6",
//         dev_type: "commandable",
//         name: "전등",
//         desc: "불을 켜고 끕니다",
//         img: lightbulb,
//         ctrl_opts: []
//     },
//     {
//         id: "myid7",
//         dev_type: "commandable",
//         name: "전등",
//         desc: "불을 켜고 끕니다",
//         img: lightbulb,
//         ctrl_opts: []
//     }
// ]