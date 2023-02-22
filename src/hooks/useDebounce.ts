import { useState, useEffect } from 'react'

export default function useDebounce(value: string, delay: number) {
	const [name, setName] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setName(value)
		}, delay)

		return () => clearTimeout(handler)
	}, [value])

	return name
}
