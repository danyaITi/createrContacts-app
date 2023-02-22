import { Navigate } from 'react-router-dom'

interface Props {
	children: JSX.Element
	redirectTo: string
	auth: boolean
}

export const RequireAuth = ({ children, redirectTo, auth }: Props) => {
	return auth ? children : <Navigate to={redirectTo} />
}
