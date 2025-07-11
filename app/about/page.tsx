'use client'

import { ToastContainer, toast } from 'react-toastify';

export default function About() {

	function toastit() {
		toast(
			<h3>Success.</h3>,
			{
				position: 'top-right',
				autoClose: 3000,
				style: {
					background: '#6495ED',
					color: '#fff',
				},
				closeButton: true,
				customProgressBar: true
			}
		)
	}



	return (
		<>
		
			<button className="outline outline-1 outline-gray-300 block my-2 rounded-sm bg-gray-100 p-1 active:bg-gray-300" type="button" onClick={toastit} >toast button</button>

			<ToastContainer />
		</>
	)
}