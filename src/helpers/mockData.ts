import {
    Student,
    Course,
    Assignment,
    College,
    Department,
    Year,
    AssignmentType,
    DashboardStats,
    Activity,
} from '@/types';

// Mock Students
export const mockStudents: Student[] = [
    // St. Joseph College of Engineering - CSE
    {
        id: 's1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@sjce.edu',
        college: College.SJCE,
        department: Department.CSE,
        domain: 'Web Development',
        year: Year.SECOND,
        batch: 'A',
        enrolledCourses: ['c1', 'c2'],
        completedCourses: ['c1'],
        badges: ['Software Developer', 'Frontend Specialist'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-02-10T14:30:00Z',
    },
    {
        id: 's2',
        name: 'Priya Sharma',
        email: 'priya.sharma@sjce.edu',
        college: College.SJCE,
        department: Department.CSE,
        domain: 'Data Science',
        year: Year.THIRD,
        batch: 'B',
        enrolledCourses: ['c3', 'c4'],
        completedCourses: ['c3'],
        badges: ['Data Scientist', 'Python Expert'],
        createdAt: '2024-01-16T09:00:00Z',
        updatedAt: '2024-02-11T11:20:00Z',
    },
    // St. Joseph College of Technology - IT
    {
        id: 's3',
        name: 'Arun Patel',
        email: 'arun.patel@sjct.edu',
        college: College.SJCT,
        department: Department.IT,
        domain: 'Cloud Computing',
        year: Year.FOURTH,
        batch: 'A',
        enrolledCourses: ['c5'],
        completedCourses: [],
        badges: ['Cloud Architect'],
        createdAt: '2024-01-17T08:30:00Z',
        updatedAt: '2024-02-12T10:15:00Z',
    },
    {
        id: 's4',
        name: 'Sneha Reddy',
        email: 'sneha.reddy@sjct.edu',
        college: College.SJCT,
        department: Department.AIML,
        domain: 'Machine Learning',
        year: Year.SECOND,
        batch: 'C',
        enrolledCourses: ['c2', 'c3'],
        completedCourses: ['c2'],
        badges: ['Machine Learning Engineer', 'AI Specialist'],
        createdAt: '2024-01-18T07:45:00Z',
        updatedAt: '2024-02-13T09:30:00Z',
    },
    // HOPPE Department
    {
        id: 's5',
        name: 'Vikram Singh',
        email: 'vikram.singh@sjce.edu',
        college: College.SJCE,
        department: Department.HOPPE,
        year: Year.FIRST,
        batch: 'A',
        enrolledCourses: ['c1'],
        completedCourses: [],
        badges: ['Problem Solver'],
        createdAt: '2024-01-19T11:00:00Z',
        updatedAt: '2024-02-14T12:45:00Z',
    },
    {
        id: 's6',
        name: 'Ananya Iyer',
        email: 'ananya.iyer@sjct.edu',
        college: College.SJCT,
        department: Department.HOPPE,
        year: Year.FIRST,
        batch: 'B',
        enrolledCourses: ['c1'],
        completedCourses: [],
        badges: ['Quick Learner'],
        createdAt: '2024-01-20T10:30:00Z',
        updatedAt: '2024-02-15T08:20:00Z',
    },
    // PEP Department
    {
        id: 's7',
        name: 'Karthik Menon',
        email: 'karthik.menon@sjce.edu',
        college: College.SJCE,
        department: Department.PEP,
        year: Year.SECOND,
        batch: 'A',
        enrolledCourses: ['c2', 'c4'],
        completedCourses: ['c2'],
        badges: ['React Developer'],
        createdAt: '2024-01-21T09:15:00Z',
        updatedAt: '2024-02-16T10:00:00Z',
    },
    // More departments
    {
        id: 's8',
        name: 'Divya Nair',
        email: 'divya.nair@sjce.edu',
        college: College.SJCE,
        department: Department.ECE,
        year: Year.THIRD,
        batch: 'B',
        enrolledCourses: ['c5'],
        completedCourses: [],
        badges: ['Network Associate'],
        createdAt: '2024-01-22T08:00:00Z',
        updatedAt: '2024-02-17T11:30:00Z',
    },
    {
        id: 's9',
        name: 'Arjun Desai',
        email: 'arjun.desai@sjct.edu',
        college: College.SJCT,
        department: Department.MECHANICAL,
        year: Year.FOURTH,
        batch: 'A',
        enrolledCourses: ['c1', 'c3'],
        completedCourses: ['c1'],
        badges: ['CAD Expert'],
        createdAt: '2024-01-23T07:30:00Z',
        updatedAt: '2024-02-18T09:45:00Z',
    },
    {
        id: 's10',
        name: 'Meera Krishnan',
        email: 'meera.krishnan@sjce.edu',
        college: College.SJCE,
        department: Department.EEE,
        year: Year.SECOND,
        batch: 'C',
        enrolledCourses: ['c2'],
        completedCourses: [],
        badges: ['Circuit Designer'],
        createdAt: '2024-01-24T10:15:00Z',
        updatedAt: '2024-02-19T08:30:00Z',
    },
    {
        id: 's11',
        name: 'Rohit Verma',
        email: 'rohit.verma@sjct.edu',
        college: College.SJCT,
        department: Department.CYBERSECURITY,
        year: Year.THIRD,
        batch: 'A',
        enrolledCourses: ['c4', 'c5'],
        completedCourses: ['c4'],
        badges: ['Security Specialist', 'Full Stack Developer'],
        createdAt: '2024-01-25T09:00:00Z',
        updatedAt: '2024-02-20T10:20:00Z',
    },
    {
        id: 's12',
        name: 'Lakshmi Pillai',
        email: 'lakshmi.pillai@sjce.edu',
        college: College.SJCE,
        department: Department.BIOTECH,
        year: Year.FIRST,
        batch: 'B',
        enrolledCourses: ['c1'],
        completedCourses: [],
        badges: ['Biology Research Associate'],
        createdAt: '2024-01-26T08:45:00Z',
        updatedAt: '2024-02-21T09:15:00Z',
    },
    {
        id: 's13',
        name: 'Suresh Babu',
        email: 'suresh.babu@sjct.edu',
        college: College.SJCT,
        department: Department.AIDS,
        year: Year.SECOND,
        batch: 'A',
        enrolledCourses: ['c2', 'c3'],
        completedCourses: ['c2'],
        badges: ['AI Specialist', 'Data Engineer'],
        createdAt: '2024-01-27T11:30:00Z',
        updatedAt: '2024-02-22T12:00:00Z',
    },
];

// Mock Courses
export const mockCourses: Course[] = [
    {
        id: 'c1',
        title: 'Introduction to Programming',
        description: 'Learn the fundamentals of programming with Python',
        duration: '4 weeks',
        difficulty: 'Beginner',
        prerequisites: [],
        assignedTo: ['s1', 's5', 's6', 's9', 's12'],
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-02-01T14:30:00Z',
    },
    {
        id: 'c2',
        title: 'Data Structures and Algorithms',
        description: 'Master essential data structures and algorithmic thinking',
        duration: '6 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['c1'],
        assignedTo: ['s1', 's4', 's7', 's10', 's13'],
        createdAt: '2024-01-11T09:00:00Z',
        updatedAt: '2024-02-02T11:20:00Z',
    },
    {
        id: 'c3',
        title: 'Machine Learning Fundamentals',
        description: 'Introduction to ML concepts and practical applications',
        duration: '8 weeks',
        difficulty: 'Advanced',
        prerequisites: ['c2'],
        assignedTo: ['s2', 's4', 's9', 's13'],
        createdAt: '2024-01-12T08:30:00Z',
        updatedAt: '2024-02-03T10:15:00Z',
    },
    {
        id: 'c4',
        title: 'Web Development Bootcamp',
        description: 'Full-stack web development with React and Node.js',
        duration: '10 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['c1'],
        assignedTo: ['s2', 's7', 's11'],
        createdAt: '2024-01-13T07:45:00Z',
        updatedAt: '2024-02-04T09:30:00Z',
    },
    {
        id: 'c5',
        title: 'Cloud Computing Essentials',
        description: 'Learn AWS, Azure, and cloud architecture patterns',
        duration: '6 weeks',
        difficulty: 'Advanced',
        prerequisites: ['c2', 'c4'],
        assignedTo: ['s3', 's8', 's11'],
        createdAt: '2024-01-14T11:00:00Z',
        updatedAt: '2024-02-05T12:45:00Z',
    },
];

// Mock Assignments
export const mockAssignments: Assignment[] = [
    {
        id: 'a1',
        courseId: 'c1',
        assignmentType: AssignmentType.DEPARTMENT,
        studentIds: ['s5', 's6'],
        filters: {
            department: [Department.HOPPE],
        },
        createdBy: 'admin1',
        createdAt: '2024-02-01T10:00:00Z',
    },
    {
        id: 'a2',
        courseId: 'c2',
        assignmentType: AssignmentType.YEAR,
        studentIds: ['s1', 's4', 's7', 's10', 's13'],
        filters: {
            year: [Year.SECOND],
        },
        createdBy: 'admin1',
        createdAt: '2024-02-02T11:30:00Z',
    },
    {
        id: 'a3',
        courseId: 'c3',
        assignmentType: AssignmentType.DOMAIN,
        studentIds: ['s2', 's4'],
        filters: {
            domain: ['Data Science', 'Machine Learning'],
        },
        createdBy: 'admin1',
        createdAt: '2024-02-03T09:15:00Z',
    },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
    totalStudents: mockStudents.length,
    totalCourses: mockCourses.length,
    activeAssignments: mockAssignments.length,
    completionRate: 42.5,
    recentActivity: [
        {
            id: 'act1',
            type: 'course_completed',
            description: 'Rajesh Kumar completed "Introduction to Programming"',
            timestamp: '2024-02-15T14:30:00Z',
        },
        {
            id: 'act2',
            type: 'course_assigned',
            description: 'Machine Learning Fundamentals assigned to 4 students',
            timestamp: '2024-02-15T12:15:00Z',
        },
        {
            id: 'act3',
            type: 'student_enrolled',
            description: 'New student Lakshmi Pillai enrolled in Biotech',
            timestamp: '2024-02-15T10:00:00Z',
        },
    ],
};

// Helper function to simulate API delay
export const simulateDelay = (ms: number = 500): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Helper function to get students by filter
export const getStudentsByFilter = (filters: {
    college?: College;
    department?: Department[];
    domain?: string[];
    year?: Year[];
    batch?: string[];
}): Student[] => {
    return mockStudents.filter((student) => {
        if (filters.college && student.college !== filters.college) return false;
        if (filters.department && !filters.department.includes(student.department)) return false;
        if (filters.domain && student.domain && !filters.domain.includes(student.domain)) return false;
        if (filters.year && !filters.year.includes(student.year)) return false;
        if (filters.batch && student.batch && !filters.batch.includes(student.batch)) return false;
        return true;
    });
};

// Helper function to get random students
export const getRandomStudents = (count: number): Student[] => {
    const shuffled = [...mockStudents].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, mockStudents.length));
};
