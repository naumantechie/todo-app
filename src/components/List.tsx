import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import ListItem from './ListItem';
import { fetchTodos } from '../store/todoThunks';

export default function List() {
    const dispatch = useAppDispatch();
    const { todos, fetchLoading, error } = useAppSelector(
        (state) => state.todos
    );

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    if (fetchLoading) return <p className="mt-10">Loading...</p>;
    if (error) return <p className="mt-10">Error: {error}</p>;

    return (
        <ul className="mt-10 text-left">
            {todos?.map((todo) => (
                <ListItem key={todo._id} {...todo} />
            ))}
        </ul>
    );
}
