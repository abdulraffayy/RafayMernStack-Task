import apiClient from './api';

// TypeScript interfaces for Notes
export interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tags: string[];
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  tags?: string[];
}

export interface NotesResponse {
  success: boolean;
  message: string;
  data: Note[];
}

export interface SingleNoteResponse {
  success: boolean;
  message: string;
  data: Note;
}

const noteService = {
  getAllNotes: async (): Promise<NotesResponse> => {
    try {
      const response = await apiClient.get<NotesResponse>('/notes');
      return response.data;
    } catch (error) {
      throw (error as { response?: { data?: { message?: string } } }).response?.data || {
        success: false,
        message: 'Failed to fetch notes. Please try again.',
      };
    }
  },
  getNoteById: async (id: string): Promise<SingleNoteResponse> => {
    try {
      const response = await apiClient.get<SingleNoteResponse>(`/notes/${id}`);
      return response.data;
    } catch (error) {
      throw (error as { response?: { data?: { message?: string } } }).response?.data || {
        success: false,
        message: 'Failed to fetch note. Please try again.',
      };
    }
  },
  createNote: async (data: CreateNoteData): Promise<SingleNoteResponse> => {
    try {
      const response = await apiClient.post<SingleNoteResponse>('/notes', data);
      return response.data;
    } catch (error) {
      throw (error as { response?: { data?: { message?: string } } }).response?.data || {
        success: false,
        message: 'Failed to create note. Please try again.',
      };
    }
  },
  updateNote: async (id: string, data: UpdateNoteData): Promise<SingleNoteResponse> => {
    try {
      const response = await apiClient.put<SingleNoteResponse>(`/notes/${id}`, data);
      return response.data;
    } catch (error) {
      throw (error as { response?: { data?: { message?: string } } }).response?.data || {
        success: false,
        message: 'Failed to update note. Please try again.',
      };
    }
  },
  deleteNote: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiClient.delete<{ success: boolean; message: string }>(`/notes/${id}`);
      return response.data;
    } catch (error) {
      throw (error as { response?: { data?: { message?: string } } }).response?.data || {
        success: false,
        message: 'Failed to delete note. Please try again.',
      };
    }
  },
  searchNotes: async (query: string): Promise<NotesResponse> => {
    try {
      const response = await apiClient.get<NotesResponse>(`/notes/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw (error as { response?: { data?: { message?: string } } }).response?.data || {
        success: false,
        message: 'Failed to search notes. Please try again.',
      };
    }
  },
};

export default noteService;

