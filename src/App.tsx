import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.scss'
import { useAuth } from './hooks/useAuth'
import ContactsPage from './pages/contacts/Contacts'
import LogIn from './pages/LogIn'
import Register from './pages/Register'
import { RootState } from './store/store'
import { RequireAuth } from './hoc/RequireAuth'

function App() {
	const auth = useSelector((state: RootState) => state.auth.isAuth)
	const { logoutUser, init } = useAuth()
	const navigate = useNavigate()

	const logoutHandler = () => {
		navigate('/login')
		logoutUser()
	}

	useEffect(() => {
		init()
	}, [])

	return (
		<>
			<div className='header'>
				<div className='container pt-2'>
					<div className='row align-items-center'>
						<div className='col-11'>
							<h2>Мои контакты</h2>
						</div>
						{auth && (
							<div className='col'>
								<h6 onClick={logoutHandler} style={{ cursor: 'pointer' }}>
									Выйти
								</h6>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='App'>
				<Routes>
					<Route
						path='/'
						element={
							<RequireAuth auth={auth} redirectTo='/login'>
								<ContactsPage />
							</RequireAuth>
						}
					/>
					<Route path='/login' element={<LogIn />} />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</div>
		</>
	)
}

export default App
