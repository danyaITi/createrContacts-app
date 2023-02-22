export interface Contacts {
	id: number
	firstName: string
	surName: string
	phone: string
}

export interface Contact {
	firstName: string
	surName: string
	phone: string
	userId: number | undefined
}
