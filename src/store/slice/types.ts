import { UserData } from '../../types/auth'
import { KnownError } from '../api/auth.api'

export interface State {
	isAuth: boolean
	userToken: string | null
	userInfo: UserData | null
	isLoading: boolean
	errorLogin: KnownError | undefined
	isRegister: boolean
	errorSign: KnownError | undefined
}
