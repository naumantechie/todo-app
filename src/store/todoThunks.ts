import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UpdateTodoPayload } from '../types/todo';

const API_BASE_URL = 'https://api.freeapi.app/api/v1/todos';

// helper func to handle error in thunks
const handleAsyncError = (error: any): string => {
    return axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : 'Failed to create todo';
};

// Async thunk for creating a new todo
export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async (title: string, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_BASE_URL, { title });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

// Aysnc thunk for updating todo
export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async ({ id, title }: UpdateTodoPayload, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${API_BASE_URL}/${id}`, {
                title,
            });
            return response.data.data;
        } catch (error) {
            rejectWithValue(handleAsyncError(error));
        }
    }
);

// Aynsc thunk for deleting a todo
export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}`);
            return response.data.data.deletedTodo;
        } catch (error) {
            rejectWithValue(handleAsyncError(error));
        }
    }
);

// Aynsc thunk for toggling status of a todo
export const toggleTodoStatus = createAsyncThunk(
    'todo/toggleTodoStatus',
    async (id: string | undefined, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `${API_BASE_URL}/toggle/status/${id}`
            );
            return response.data.data;
        } catch (error) {
            rejectWithValue(handleAsyncError(error));
        }
    }
);

// Async thunk for fetching todos
export const fetchTodos = createAsyncThunk(
    'todo/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_BASE_URL);
            console.log(response);
            return response.data.data;
        } catch (error) {
            rejectWithValue(handleAsyncError(error));
        }
    }
);
