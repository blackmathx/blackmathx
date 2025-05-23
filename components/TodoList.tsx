import { Todo } from "@/lib/types/types";
import TodoItem from "./TodoItem";


const TodoList = ({ todos }: { todos: Todo[] }) => {

    return (
        <ul className="space-y-3">
            {todos.map((todo) => (
                <TodoItem key={todo.title} todo={todo} />
            ))}
        </ul>
    )
}
export default TodoList;

