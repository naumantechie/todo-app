export interface TodoState {
    todos: Todo[];
    createLoading: boolean;
    fetchLoading: boolean;
    error: string | null;
}

export interface Todo {
    _id?: string;
    title: string;
    description?: string;
    isComplete?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateTodoPayload {
    id: string | undefined;
    title: string;
}
