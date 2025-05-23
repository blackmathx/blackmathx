import { getTodos } from '@/lib/services/todos'
import TodoList from '@/components/TodoList';

export default async function List() {

	const res = await getTodos();

	return (
		// <ul>
		// 	{Array.isArray(res) && res.length > 0 ? (
		// 		res.map((todo: {title: string, id: string}, idx: number) => (
		// 			<li key={todo.id || idx}>{todo.title || JSON.stringify(todo)}</li>
		// 		))
		// 	) : (
		// 		<li>No todos found.</li>
		// 	)}
		// </ul>
		<>
			{Array.isArray(res) && res.length > 0 ? (
				<TodoList todos={res} />
			) : (
				<li>Loading...</li>
			)}
		</>

	);
}
