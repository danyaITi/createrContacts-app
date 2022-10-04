import { UserData } from "../../types/auth";
import { KnownError } from "../api/auth.api";

export interface State {
    auth:boolean,
    userToken: string | null,
    userInfo: UserData | null,
    loading:boolean,
    errorLogin: KnownError | undefined ,
    errorSign:KnownError | undefined 
}