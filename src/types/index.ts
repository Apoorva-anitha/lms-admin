// Enums
export enum College {
    SJCE = 'St. Joseph College of Engineering',
    SJCT = 'St. Joseph College of Technology',
}

export enum Department {
    HOPPE = 'HOPE',
    PEP = 'PEP',
    CSE = 'CSE',
    MECHANICAL = 'Mechanical',
    IT = 'IT',
    CYBERSECURITY = 'Cybersecurity',
    AIDS = 'AIDS',
    AIML = 'AIML',
    ECE = 'ECE',
    EEE = 'EEE',
    BIOTECH = 'Biotech',
}

export enum Year {
    FIRST = '1st Year',
    SECOND = '2nd Year',
    THIRD = '3rd Year',
    FOURTH = '4th Year',
}

export enum AssignmentType {
    INDIVIDUAL = 'individual',
    BATCH = 'batch',
    DEPARTMENT = 'department',
    DOMAIN = 'domain',
    YEAR = 'year',
    RANDOM = 'random',
}

export enum CriteriaOperator {
    AND = 'AND',
    OR = 'OR',
}

// Interfaces
export interface Student {
    id: string;
    name: string;
    email: string;
    college: College;
    department: Department;
    domain?: string;
    year: Year;
    batch?: string;
    enrolledCourses: string[]; // Course IDs
    completedCourses: string[]; // Course IDs
    badges: string[]; // Badge names (e.g., "Software Developer", "AI Specialist")
    createdAt: string;
    updatedAt: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    duration: string; // e.g., "4 weeks"
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    prerequisites: string[]; // Course IDs
    assignedTo: string[]; // Student IDs
    createdAt: string;
    updatedAt: string;
}

export interface Criteria {
    id: string;
    courseId: string; // Course that needs to be completed
    unlocksCourseId: string; // Course that gets unlocked
    operator?: CriteriaOperator;
    additionalCriteria?: Criteria[];
}

export interface Assignment {
    id: string;
    courseId: string;
    assignmentType: AssignmentType;
    studentIds: string[];
    criteria?: Criteria[];
    filters?: {
        college?: College;
        department?: Department[];
        domain?: string[];
        year?: Year[];
        batch?: string[];
        randomCount?: number;
    };
    createdBy: string; // Admin ID
    createdAt: string;
}

export interface Admin {
    id: string;
    name: string;
    email: string;
    role: 'super_admin' | 'admin';
    createdAt: string;
}

export interface DashboardStats {
    totalStudents: number;
    totalCourses: number;
    activeAssignments: number;
    completionRate: number;
    recentActivity: Activity[];
}

export interface Activity {
    id: string;
    type: 'course_assigned' | 'course_completed' | 'student_enrolled';
    description: string;
    timestamp: string;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Form Types
export interface CourseFormData {
    title: string;
    description: string;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    prerequisites: string[];
}

export interface AssignmentFormData {
    courseId: string;
    assignmentType: AssignmentType;
    filters: {
        college?: College;
        department?: Department[];
        domain?: string[];
        year?: Year[];
        batch?: string[];
        randomCount?: number;
    };
    studentIds?: string[];
    criteria?: Criteria[];
}

// Theme
export type Theme = 'purple' | 'black';
