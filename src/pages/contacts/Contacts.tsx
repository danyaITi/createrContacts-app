import React, { useEffect, useState } from 'react'
import { Empty, Input, List, Avatar, Spin } from 'antd'
import {
	useGetContactsQuery,
	useSearchContactQuery
} from '../../store/api/contacts.api'
import { Contacts } from '../../types/contacts'
import useDebounce from '../../hooks/useDebounce'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import CardComponent from '../../componets/items/Card'
import ModalComponent from '../../componets/modal/Modal'
import './Contacts.scss'

const { Search } = Input

const ContactsPage: React.FC = () => {
	const userId = useSelector((state: RootState) => state.auth.userInfo?.id)
	const [search, setSearch] = useState('')

	const debounced = useDebounce(search, 300)

	const { data: contacts, isLoading } = useGetContactsQuery(userId)
	const { data: searched } = useSearchContactQuery(debounced)

	useEffect(() => {}, [debounced])

	return (
		<>
			<div className='container mt-4'>
				<div className='row align-items-center'>
					<div className='col-12 d-flex justify-content-end'>
						<ModalComponent />
					</div>
				</div>
			</div>
			<div className='px-5 mt-5'>
				<div className='row align-items-center'>
					<div className='col-12 col-xxl-4 d-xxl-flex justify-content-xxl-center'>
						<h3>Список контактов:</h3>
					</div>
				</div>
				<div className='d-flex justify-content-center flex-column align-items-center'>
					<Search
						placeholder='Поиск по имени'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className='w-50'
					/>
					{debounced && (
						<List
							style={{
								padding: '0px 10px',
								marginTop: '10px',
								border: '1px solid gray',
								width: '50%',
								maxHeight: '150px',
								overflowY: 'auto'
							}}
							itemLayout='horizontal'
							dataSource={searched}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
										title={
											<div>
												<span>{item.firstName}</span>
												<span>{item.surName}</span>
											</div>
										}
										description={<span>{item.phone}</span>}
									/>
								</List.Item>
							)}
						/>
					)}
				</div>
				<div>
					<ul className='ps-0 mt-5'>
						<div className='container mt-4'>
							{isLoading ? (
								<div className='loader'>
									<Spin size='large' tip='Loading...'></Spin>
								</div>
							) : (
								<>
									{!contacts?.length ? (
										<Empty description='Список контактов пуст' />
									) : (
										<div className='row align-items-center'>
											{contacts.map((obj: Contacts) => (
												<div
													key={obj.id}
													className='col d-flex justify-content-center'
												>
													<li className='mb-4'>
														<CardComponent {...obj} />
													</li>
												</div>
											))}
										</div>
									)}
								</>
							)}
						</div>
					</ul>
				</div>
			</div>
		</>
	)
}

export default ContactsPage
