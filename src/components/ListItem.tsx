import type { Todo } from '../types/todo';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import ButtonIcon from './ButtonIcon';
import { useState } from 'react';
import { deleteTodo, toggleTodoStatus, updateTodo } from '../store/todoThunks';
import { useAppDispatch } from '../store/hooks';

export default function ListItem({ _id, title, isComplete }: Todo) {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);

    const handleSave = async () => {
        if (updatedTitle.trim() && updatedTitle !== title) {
            try {
                await dispatch(
                    updateTodo({ id: _id, title: updatedTitle })
                ).unwrap();
                setIsEditing(false);
            } catch (error) {
                console.log(error);
            }
        } else {
            setIsEditing(false);
            setUpdatedTitle(title);
        }
    };

    const handleDelete = async () => {
        try {
            _id && (await dispatch(deleteTodo(_id)).unwrap());
        } catch (error) {
            console.log(error);
        }
    };

    const handleToggleTodoStatus = async () => {
        try {
            await dispatch(toggleTodoStatus(_id)).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <li className="flex gap-5 border-2 border-[#2a2a2a] rounded-md p-5 bg-[#5f9ea0] text-white mb-6 w-[600px]">
            <div>
                <input
                    type="checkbox"
                    name="toggleComplete"
                    onChange={handleToggleTodoStatus}
                    checked={isComplete}
                />
            </div>
            {isEditing ? (
                <input
                    type="text"
                    name="editInput"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.currentTarget.value)}
                    className="bg-white grow-1 border-2 border-[#2a2a2a] text-[#2a2a2a] px-2"
                />
            ) : (
                <p className={`text-xl grow-1 ${isComplete && 'line-through'}`}>
                    {title}
                </p>
            )}
            <div className="text-right w-[50px]">
                {isEditing ? (
                    <ButtonIcon
                        Icon={CheckIcon}
                        width={15}
                        height={15}
                        className="mr-2"
                        onClick={handleSave}
                    />
                ) : (
                    <ButtonIcon
                        Icon={PencilIcon}
                        width={15}
                        height={15}
                        className="mr-2"
                        onClick={() => setIsEditing(true)}
                    />
                )}
                <ButtonIcon
                    Icon={TrashIcon}
                    width={15}
                    height={15}
                    onClick={handleDelete}
                />
            </div>
        </li>
    );
}
