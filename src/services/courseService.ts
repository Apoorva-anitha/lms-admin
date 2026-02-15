import api, { handleApiError } from '@/helpers/api';
import { Course, ApiResponse, PaginatedResponse } from '@/types';
import { mockCourses, simulateDelay } from '@/helpers/mockData';

// Using mock data for now - replace with actual API calls when backend is ready

export const courseService = {
    // Get all courses
    async getAllCourses(): Promise<Course[]> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.get<ApiResponse<Course[]>>('/courses');
            // return response.data.data || [];
            return mockCourses;
        } catch (error) {
            console.error('Error fetching courses:', handleApiError(error));
            throw error;
        }
    },

    // Get course by ID
    async getCourseById(id: string): Promise<Course | null> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.get<ApiResponse<Course>>(`/courses/${id}`);
            // return response.data.data || null;
            return mockCourses.find((c) => c.id === id) || null;
        } catch (error) {
            console.error('Error fetching course:', handleApiError(error));
            throw error;
        }
    },

    // Create new course
    async createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.post<ApiResponse<Course>>('/courses', courseData);
            // return response.data.data!;
            const newCourse: Course = {
                ...courseData,
                id: `c${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            return newCourse;
        } catch (error) {
            console.error('Error creating course:', handleApiError(error));
            throw error;
        }
    },

    // Update course
    async updateCourse(id: string, courseData: Partial<Course>): Promise<Course> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.put<ApiResponse<Course>>(`/courses/${id}`, courseData);
            // return response.data.data!;
            const course = mockCourses.find((c) => c.id === id);
            if (!course) throw new Error('Course not found');
            return { ...course, ...courseData, updatedAt: new Date().toISOString() };
        } catch (error) {
            console.error('Error updating course:', handleApiError(error));
            throw error;
        }
    },

    // Delete course
    async deleteCourse(id: string): Promise<void> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // await api.delete(`/courses/${id}`);
            console.log(`Course ${id} deleted`);
        } catch (error) {
            console.error('Error deleting course:', handleApiError(error));
            throw error;
        }
    },

    // Search courses
    async searchCourses(query: string): Promise<Course[]> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.get<ApiResponse<Course[]>>(`/courses/search?q=${query}`);
            // return response.data.data || [];
            return mockCourses.filter(
                (c) =>
                    c.title.toLowerCase().includes(query.toLowerCase()) ||
                    c.description.toLowerCase().includes(query.toLowerCase())
            );
        } catch (error) {
            console.error('Error searching courses:', handleApiError(error));
            throw error;
        }
    },
};

export default courseService;
