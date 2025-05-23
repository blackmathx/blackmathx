import { Todo } from "@/lib/types/types";


const TodoItem = ({ todo }: { todo: Todo }) => {



    return (
        <li className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-gray-700">{todo.title}</span>
        </li>
    )
}

export default TodoItem;