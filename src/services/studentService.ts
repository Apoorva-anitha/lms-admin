import api, { handleApiError } from '@/helpers/api';
import { Student, ApiResponse, Department, Year, College } from '@/types';
import { mockStudents, simulateDelay, getStudentsByFilter } from '@/helpers/mockData';

// Using mock data for now - replace with actual API calls when backend is ready

export const studentService = {
    // Get all students
    async getAllStudents(): Promise<Student[]> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.get<ApiResponse<Student[]>>('/students');
            // return response.data.data || [];
            return mockStudents;
        } catch (error) {
            console.error('Error fetching students:', handleApiError(error));
            throw error;
        }
    },

    // Get student by ID
    async getStudentById(id: string): Promise<Student | null> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.get<ApiResponse<Student>>(`/students/${id}`);
            // return response.data.data || null;
            return mockStudents.find((s) => s.id === id) || null;
        } catch (error) {
            console.error('Error fetching student:', handleApiError(error));
            throw error;
        }
    },

    // Filter students
    async filterStudents(filters: {
        college?: College;
        department?: Department[];
        domain?: string[];
        year?: Year[];
        batch?: string[];
    }): Promise<Student[]> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.post<ApiResponse<Student[]>>('/students/filter', filters);
            // return response.data.data || [];
            return getStudentsByFilter(filters);
        } catch (error) {
            console.error('Error filtering students:', handleApiError(error));
            throw error;
        }
    },

    // Search students
    async searchStudents(query: string): Promise<Student[]> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.get<ApiResponse<Student[]>>(`/students/search?q=${query}`);
            // return response.data.data || [];
            return mockStudents.filter(
                (s) =>
                    s.name.toLowerCase().includes(query.toLowerCase()) ||
                    s.email.toLowerCase().includes(query.toLowerCase())
            );
        } catch (error) {
            console.error('Error searching students:', handleApiError(error));
            throw error;
        }
    },

    // Create student
    async createStudent(studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.post<ApiResponse<Student>>('/students', studentData);
            // return response.data.data!;
            const newStudent: Student = {
                ...studentData,
                id: `s${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            return newStudent;
        } catch (error) {
            console.error('Error creating student:', handleApiError(error));
            throw error;
        }
    },

    // Update student
    async updateStudent(id: string, studentData: Partial<Student>): Promise<Student> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.put<ApiResponse<Student>>(`/students/${id}`, studentData);
            // return response.data.data!;
            const student = mockStudents.find((s) => s.id === id);
            if (!student) throw new Error('Student not found');
            return { ...student, ...studentData, updatedAt: new Date().toISOString() };
        } catch (error) {
            console.error('Error updating student:', handleApiError(error));
            throw error;
        }
    },

    // Delete student
    async deleteStudent(id: string): Promise<void> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // await api.delete(`/students/${id}`);
            console.log(`Student ${id} deleted`);
        } catch (error) {
            console.error('Error deleting student:', handleApiError(error));
            throw error;
        }
    },
};

export default studentService;
