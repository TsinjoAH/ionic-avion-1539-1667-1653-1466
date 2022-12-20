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

export const getPlanes = (success: (list: Plane[])=> any) => {
    let Planes = localStorage.getItem("planes")
    if (Planes == null) {
        refreshPlanes(success);
    }
    success(JSON.parse(Planes??"[]") as Plane[]);
}

export const refreshPlanes = (success?: (list: Plane[])=> any) => {
    http.get(baseUrl("planes"))
        .then((res) => {
            localStorage.setItem("planes", JSON.stringify(res.data.data))
            if (success) {
                success(res.data.data as Plane[])
            }
        })
        .catch((err) => console.log(err));
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
