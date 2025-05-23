
'use client'

export default function Button( { title }: { title?: string } ) {

	function handleClick(){
		alert('where are you from?')
	}

	return (
		<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			onClick={handleClick}
		>
			{title}
		</button>
	)
}

