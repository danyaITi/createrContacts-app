export interface UserData {
    email:string,
    password:string
    id:number
}

export interface UserResponse {
    accessToken:string
    user: UserData
  }