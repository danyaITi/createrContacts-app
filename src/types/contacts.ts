export interface IContacts {
    id:number,
    firstName:string,
    surName:string,
    phone:string
}

export interface NContact {
    firstName:string,
    surName:string,
    phone:string,
    userId:number | undefined,
}