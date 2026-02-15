import api, { handleApiError } from '@/helpers/api';
import { Assignment, AssignmentFormData, ApiResponse } from '@/types';
import { mockAssignments, simulateDelay } from '@/helpers/mockData';

// Using mock data for now - replace with actual API calls when backend is ready

export const assignmentService = {
    // Get all assignments
    async getAllAssignments(): Promise<Assignment[]> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.get<ApiResponse<Assignment[]>>('/assignments');
            // return response.data.data || [];
            return mockAssignments;
        } catch (error) {
            console.error('Error fetching assignments:', handleApiError(error));
            throw error;
        }
    },

    // Get assignment by ID
    async getAssignmentById(id: string): Promise<Assignment | null> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.get<ApiResponse<Assignment>>(`/assignments/${id}`);
            // return response.data.data || null;
            return mockAssignments.find((a) => a.id === id) || null;
        } catch (error) {
            console.error('Error fetching assignment:', handleApiError(error));
            throw error;
        }
    },

    // Create assignment
    async createAssignment(assignmentData: AssignmentFormData): Promise<Assignment> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.post<ApiResponse<Assignment>>('/assignments', assignmentData);
            // return response.data.data!;

            const newAssignment: Assignment = {
                id: `a${Date.now()}`,
                courseId: assignmentData.courseId,
                assignmentType: assignmentData.assignmentType,
                studentIds: assignmentData.studentIds || [],
                filters: assignmentData.filters,
                criteria: assignmentData.criteria,
                createdBy: 'admin1', // TODO: Get from auth context
                createdAt: new Date().toISOString(),
            };

            console.log('Assignment created:', newAssignment);
            return newAssignment;
        } catch (error) {
            console.error('Error creating assignment:', handleApiError(error));
            throw error;
        }
    },

    // Delete assignment
    async deleteAssignment(id: string): Promise<void> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // await api.delete(`/assignments/${id}`);
            console.log(`Assignment ${id} deleted`);
        } catch (error) {
            console.error('Error deleting assignment:', handleApiError(error));
            throw error;
        }
    },

    // Get assignments by course
    async getAssignmentsByCourse(courseId: string): Promise<Assignment[]> {
        try {
            await simulateDelay();
            // TODO: Replace with actual API call
            // const response = await api.get<ApiResponse<Assignment[]>>(`/assignments/course/${courseId}`);
            // return response.data.data || [];
            return mockAssignments.filter((a) => a.courseId === courseId);
        } catch (error) {
            console.error('Error fetching course assignments:', handleApiError(error));
            throw error;
        }
    },
};

export default assignmentService;
