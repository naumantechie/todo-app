import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createTodo } from '../store/todoThunks';

export default function Form() {
    const dispatch = useAppDispatch();
    const { error, createLoading } = useAppSelector((state) => state.todos);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentTarget = e.currentTarget as HTMLFormElement;
        const formData = new FormData(currentTarget);
        const todoText = formData.get('todoText') as string;

        if (!todoText.trim()) return;

        try {
            await dispatch(createTodo(todoText)).unwrap();
            currentTarget.reset();
        } catch (error) {
            console.error('Failed to create todo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-10 flex-col">
            <label htmlFor="todo-input" className="block mb-2">
                What's on your mind?
            </label>
            <input
                required
                type="text"
                id="todo-input"
                name="todoText"
                placeholder="hm..."
                className="bg-white border-2 rounded-l-md p-2 text-lg inline-block w-80"
            />
            <button
                className="text-white bg-blue-500 !border-none !rounded-l-none !p-3 inline-block w-20 hover:!bg-gray-700"
                disabled={createLoading}
            >
                {createLoading ? 'Adding...' : 'Add'}
            </button>
            {error && <p className="block mt-1 color-red-600">{error}</p>}
        </form>
    );
}
