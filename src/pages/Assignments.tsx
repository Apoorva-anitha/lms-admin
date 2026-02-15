import React, { useState } from 'react';
import { Users, Layers, Calendar, Award, Search } from 'lucide-react';
import { AssignmentType, Department, Year } from '@/types';
import { mockCourses, mockStudents, getStudentsByFilter } from '@/helpers/mockData';

const Assignments: React.FC = () => {
    const [selectedType, setSelectedType] = useState<AssignmentType>(AssignmentType.INDIVIDUAL);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    // Filters for different assignment types
    const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([]);
    const [selectedYears, setSelectedYears] = useState<Year[]>([]);
    const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [previewStudents, setPreviewStudents] = useState<typeof mockStudents>([]);

    const allDomains = Array.from(new Set(mockStudents.map(s => s.domain).filter(Boolean) as string[])).sort();

    const assignmentTypes = [
        { type: AssignmentType.INDIVIDUAL, icon: Users, label: 'Individual', color: 'purple' },
        { type: AssignmentType.DEPARTMENT, icon: Layers, label: 'Department', color: 'green' },
        { type: AssignmentType.YEAR, icon: Calendar, label: 'Year', color: 'orange' },
        { type: AssignmentType.DOMAIN, icon: Award, label: 'Domain', color: 'indigo' },
    ];

    const handlePreview = () => {
        let students: typeof mockStudents = [];

        switch (selectedType) {
            case AssignmentType.INDIVIDUAL:
                students = mockStudents.filter((s) => selectedStudents.includes(s.id));
                break;
            case AssignmentType.DEPARTMENT:
                students = getStudentsByFilter({ department: selectedDepartments });
                break;
            case AssignmentType.YEAR:
                students = getStudentsByFilter({ year: selectedYears });
                break;
            case AssignmentType.DOMAIN:
                students = getStudentsByFilter({ domain: selectedDomains });
                break;
            default:
                students = [];
        }

        setPreviewStudents(students);
    };

    const handleSubmit = () => {
        alert(`Assignment created! Course: ${selectedCourse}, Type: ${selectedType}, Students: ${previewStudents.length}`);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Course Assignments</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Assign courses to students using different selection methods
                </p>
            </div>

            {/* Assignment Type Selection */}
            <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Select Assignment Type</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {assignmentTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = selectedType === type.type;
                        return (
                            <button
                                key={type.type}
                                onClick={() => setSelectedType(type.type)}
                                className={`p-4 rounded-lg border-2 transition-all ${isSelected
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-200 dark:border-dark-700 hover:border-primary-300 dark:hover:border-primary-700'
                                    }`}
                            >
                                <Icon
                                    className={`mx-auto mb-2 ${isSelected ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'
                                        }`}
                                    size={24}
                                />
                                <p
                                    className={`text-sm font-medium ${isSelected ? 'text-primary-700 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    {type.label}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Course Selection */}
            <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Select Course</h2>
                <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                >
                    <option value="">Choose a course...</option>
                    {mockCourses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.title} ({course.difficulty})
                        </option>
                    ))}
                </select>
            </div>

            {/* Student Selection based on type */}
            <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {selectedType === AssignmentType.INDIVIDUAL && 'Select Students'}
                    {selectedType === AssignmentType.DEPARTMENT && 'Select Departments'}
                    {selectedType === AssignmentType.YEAR && 'Select Years'}
                    {selectedType === AssignmentType.DOMAIN && 'Select Domains'}
                </h2>

                {/* Individual Selection */}
                {selectedType === AssignmentType.INDIVIDUAL && (
                    <div className="space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search students by name or department..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {mockStudents
                                .filter((s) =>
                                    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    s.department.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((student) => (
                                    <label
                                        key={student.id}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-dark-700 transition-all"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.includes(student.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedStudents([...selectedStudents, student.id]);
                                                } else {
                                                    setSelectedStudents(selectedStudents.filter((id) => id !== student.id));
                                                }
                                            }}
                                            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {student.department} - {student.year}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            {mockStudents.filter((s) =>
                                s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                s.department.toLowerCase().includes(searchTerm.toLowerCase())
                            ).length === 0 && (
                                    <p className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                                        No students found matching "{searchTerm}"
                                    </p>
                                )}
                        </div>
                    </div>
                )}

                {/* Department Selection */}
                {selectedType === AssignmentType.DEPARTMENT && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.values(Department).map((dept) => (
                            <label
                                key={dept}
                                className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-800 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedDepartments.includes(dept)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedDepartments([...selectedDepartments, dept]);
                                        } else {
                                            setSelectedDepartments(selectedDepartments.filter((d) => d !== dept));
                                        }
                                    }}
                                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{dept}</span>
                            </label>
                        ))}
                    </div>
                )}

                {/* Year Selection */}
                {selectedType === AssignmentType.YEAR && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.values(Year).map((year) => (
                            <label
                                key={year}
                                className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-800 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedYears.includes(year)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedYears([...selectedYears, year]);
                                        } else {
                                            setSelectedYears(selectedYears.filter((y) => y !== year));
                                        }
                                    }}
                                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{year}</span>
                            </label>
                        ))}
                    </div>
                )}

                {/* Domain Selection */}
                {selectedType === AssignmentType.DOMAIN && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {allDomains.map((domain) => (
                            <label
                                key={domain}
                                className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-800 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedDomains.includes(domain)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedDomains([...selectedDomains, domain]);
                                        } else {
                                            setSelectedDomains(selectedDomains.filter((d) => d !== domain));
                                        }
                                    }}
                                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{domain}</span>
                            </label>
                        ))}
                        {allDomains.length === 0 && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 col-span-full py-4 text-center">
                                No domains found in student data.
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Preview and Submit */}
            <div className="flex gap-4">
                <button
                    onClick={handlePreview}
                    disabled={!selectedCourse}
                    className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
                >
                    Preview Students ({previewStudents.length})
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!selectedCourse || previewStudents.length === 0}
                    className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
                >
                    Create Assignment
                </button>
            </div>

            {/* Preview List */}
            {previewStudents.length > 0 && (
                <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Preview - {previewStudents.length} Students Selected
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                        {previewStudents.map((student) => (
                            <div
                                key={student.id}
                                className="p-3 rounded-lg bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700"
                            >
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {student.department} - {student.year}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assignments;
