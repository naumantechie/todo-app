import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo, TodoState } from '../types/todo';
import {
    createTodo,
    deleteTodo,
    fetchTodos,
    toggleTodoStatus,
    updateTodo,
} from './todoThunks';

const initialState: TodoState = {
    todos: [],
    createLoading: false,
    fetchLoading: false,
    // Add more loading states based on async actions
    error: null,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // create todo cases
            .addCase(createTodo.pending, (state) => {
                state.createLoading = true;
                state.error = null;
            })
            .addCase(
                createTodo.fulfilled,
                (state, action: PayloadAction<Todo>) => {
                    state.createLoading = false;
                    state.todos.push(action.payload);
                }
            )
            .addCase(createTodo.rejected, (state, action) => {
                state.createLoading = false;
                state.error = action.payload as string;
            })
            // update todo cases
            .addCase(
                updateTodo.fulfilled,
                (state, action: PayloadAction<Todo>) => {
                    // state.updatingTodo = false;
                    const updatedTodo = action.payload;

                    const index = state.todos.findIndex(
                        (todo) => todo._id === updatedTodo._id
                    );

                    if (index !== -1) state.todos[index] = updatedTodo;
                }
            )
            // delete todo cases
            .addCase(
                deleteTodo.fulfilled,
                (state, action: PayloadAction<Todo>) => {
                    state.todos = state.todos.filter(
                        (todo) => todo._id !== action.payload._id
                    );
                }
            )
            // toggle status cases
            .addCase(
                toggleTodoStatus.fulfilled,
                (state, action: PayloadAction<Todo>) => {
                    const updatedTodo = action.payload;

                    const index = state.todos.findIndex(
                        (todo) => todo._id === updatedTodo._id
                    );

                    if (index !== -1) state.todos[index] = updatedTodo;
                }
            )
            // fetch todos cases
            .addCase(fetchTodos.pending, (state) => {
                state.fetchLoading = true;
                state.error = null;
            })
            .addCase(
                fetchTodos.fulfilled,
                (state, action: PayloadAction<Todo[]>) => {
                    state.fetchLoading = false;
                    state.todos = action.payload;
                }
            )
            .addCase(fetchTodos.rejected, (state, action) => {
                state.fetchLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = todoSlice.actions;

export default todoSlice.reducer;
