import {baseUrl} from "./global_config";
import axios from "axios";
import {getHeaders} from "./login.service";
const http = axios;

export interface odometer {
    id: number;
    date : Date;
    start: number;
    end: number;
}

export interface Plane {
    id: number,
    imgBase64: string,
    licensePlate: string,
    currentKm: number,
    begin_assurance: Date,
    end_assurance: Date,
    kmList: odometer[]
}

export const getPlanesExpiredIn = (month: number, set: (Planes: Plane[]) => void) => {
    http.get(baseUrl(`planes/expired/${month}`), {headers: getHeaders()})
        .then(response => {
            set(response.data.data as Plane[])
        })
        .catch(error => console.log(error));
}

export const getPlanes = (success: (list: Plane[]) => any) => {
    let planes = localStorage.getItem("planes")
    if (planes == null) {
        refreshPlanes().then((data: Plane[]) => {
            success(data)
        });
        return;
    }
    success(JSON.parse(planes??"[]") as Plane[])
}

export const refreshPlanes = async () => {
    let res = await http.get(baseUrl("planes"));
    localStorage.setItem("planes", JSON.stringify(res.data.data))
    return res.data.data as Plane[]
}

export const getPlane = (id:number, set: (v: Plane) => any) => {
    let planes: Plane[] = JSON.parse(localStorage.getItem("planes")??"[]") as Plane[];
    let plane = planes.find(v => v.id === id) as Plane;
    set(plane);
};

export const updateImg = async (id: number | undefined, _img: any) => {
    if (!id) return ;
    return await http.put(baseUrl(`planes/img/${id}`), {
        img: _img
    });
}
