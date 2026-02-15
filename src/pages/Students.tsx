import React, { useState } from 'react';
import { Search, X, Award, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { mockStudents, mockCourses } from '@/helpers/mockData';
import { Student, Department, Year } from '@/types';

const Students: React.FC = () => {
    const [students] = useState<Student[]>(mockStudents);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [selectedBadge, setSelectedBadge] = useState<string>('all');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    // Get all unique badges for the filter
    const allBadges = Array.from(new Set(students.flatMap(s => s.badges || []))).sort();

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = selectedDepartment === 'all' || student.department === selectedDepartment;
        const matchesYear = selectedYear === 'all' || student.year === selectedYear;
        const matchesBadge = selectedBadge === 'all' || (student.badges && student.badges.includes(selectedBadge));
        return matchesSearch && matchesDepartment && matchesYear && matchesBadge;
    });

    const getCourseTitle = (courseId: string) => {
        return mockCourses.find(c => c.id === courseId)?.title || courseId;
    };

    return (
        <div className="space-y-6 animate-fade-in mb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Directory</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        View profiles, track progress, and manage student credentials
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white transition-all text-sm"
                        />
                    </div>

                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="px-4 py-2.5 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm"
                    >
                        <option value="all">All Departments</option>
                        {Object.values(Department).map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>

                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="px-4 py-2.5 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm"
                    >
                        <option value="all">All Years</option>
                        {Object.values(Year).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>

                    <select
                        value={selectedBadge}
                        onChange={(e) => setSelectedBadge(e.target.value)}
                        className="px-4 py-2.5 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm"
                    >
                        <option value="all">Filter by Badge</option>
                        {allBadges.map((badge) => (
                            <option key={badge} value={badge}>{badge}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between px-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Found {filteredStudents.length} students
                </p>
                {(selectedDepartment !== 'all' || selectedYear !== 'all' || selectedBadge !== 'all' || searchTerm) && (
                    <button
                        onClick={() => {
                            setSelectedDepartment('all');
                            setSelectedYear('all');
                            setSelectedBadge('all');
                            setSearchTerm('');
                        }}
                        className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-semibold"
                    >
                        Reset filters
                    </button>
                )}
            </div>

            {/* Students Table */}
            <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-dark-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-dark-800/50 border-b border-gray-200 dark:border-dark-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Student</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">College</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Department</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Year</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Badges</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Progress</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-dark-800">
                            {filteredStudents.map((student) => (
                                <tr
                                    key={student.id}
                                    onClick={() => setSelectedStudent(student)}
                                    className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors cursor-pointer group"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                    {student.name}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {student.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {student.college === 'St. Joseph College of Engineering' ? 'SJCE' : 'SJCT'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                            {student.department}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                        {student.year}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex -space-x-2">
                                            {student.badges?.slice(0, 2).map((badge, idx) => (
                                                <div
                                                    key={idx}
                                                    title={badge}
                                                    className="w-8 h-8 rounded-full bg-white dark:bg-dark-800 border-2 border-gray-100 dark:border-dark-700 flex items-center justify-center shadow-sm"
                                                >
                                                    <Award size={14} className="text-orange-500" />
                                                </div>
                                            ))}
                                            {student.badges && student.badges.length > 2 && (
                                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-700 border-2 border-white dark:border-dark-800 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-400 shadow-sm">
                                                    +{student.badges.length - 2}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="text-sm font-bold text-primary-600 dark:text-primary-400">
                                            {Math.round((student.completedCourses.length / (student.enrolledCourses.length || 1)) * 100)}%
                                        </div>
                                        <div className="text-[10px] text-gray-500 dark:text-gray-400">
                                            {student.completedCourses.length}/{student.enrolledCourses.length} courses
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredStudents.length === 0 && (
                <div className="text-center py-20 bg-white dark:bg-dark-900 rounded-2xl border border-dashed border-gray-300 dark:border-dark-700">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">No students found</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto mt-2">
                        Try adjusting your search or filters to find what you're looking for.
                    </p>
                </div>
            )}

            {/* Student Profile Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-dark-950 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-100 dark:border-dark-800 flex flex-col">
                        {/* Modal Header */}
                        <div className="relative h-32 bg-gradient-to-r from-primary-600 to-purple-700 p-6 flex items-end">
                            <button
                                onClick={() => setSelectedStudent(null)}
                                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <X size={20} />
                            </button>
                            <div className="flex items-center gap-4 translate-y-12">
                                <div className="w-24 h-24 rounded-2xl bg-white dark:bg-dark-900 p-1 shadow-xl">
                                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-3xl font-black">
                                        {selectedStudent.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="pb-2">
                                    <h2 className="text-2xl font-black text-white drop-shadow-md">
                                        {selectedStudent.name}
                                    </h2>
                                    <p className="text-white/80 text-sm font-medium">
                                        {selectedStudent.college}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="mt-14 p-8 overflow-y-auto flex-1 custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column: Info & Badges */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Academic Details</h3>
                                        <div className="bg-gray-50 dark:bg-dark-900 p-4 rounded-2xl border border-gray-100 dark:border-dark-800 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 font-medium">Department</span>
                                                <span className="text-xs font-bold text-gray-900 dark:text-white bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">{selectedStudent.department}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 font-medium">Year</span>
                                                <span className="text-xs font-bold text-gray-900 dark:text-white">{selectedStudent.year}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 font-medium">Email</span>
                                                <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[150px]">{selectedStudent.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Skill Badges</h3>
                                            <Award size={14} className="text-orange-500" />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedStudent.badges?.map((badge, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 bg-orange-50 dark:bg-orange-900/10 text-orange-700 dark:text-orange-400 text-[10px] font-black rounded-lg border border-orange-100 dark:border-orange-900/30 flex items-center gap-1"
                                                >
                                                    <CheckCircle size={10} />
                                                    {badge}
                                                </span>
                                            ))}
                                            {(!selectedStudent.badges || selectedStudent.badges.length === 0) && (
                                                <p className="text-xs text-gray-400 italic">No badges earned yet</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Courses Progress */}
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Ongoing Courses</h3>
                                            <Clock size={14} className="text-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            {selectedStudent.enrolledCourses
                                                .filter(id => !selectedStudent.completedCourses.includes(id))
                                                .map(id => (
                                                    <div key={id} className="flex items-center gap-3 p-3 bg-blue-50/50 dark:bg-blue-900/5 rounded-xl border border-blue-100/50 dark:border-blue-900/20 group hover:border-blue-300 transition-all cursor-default">
                                                        <BookOpen size={14} className="text-blue-500" />
                                                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                                            {getCourseTitle(id)}
                                                        </span>
                                                    </div>
                                                ))}
                                            {selectedStudent.enrolledCourses.length === selectedStudent.completedCourses.length && (
                                                <p className="text-xs text-gray-400 italic">All courses completed!</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Completed</h3>
                                            <CheckCircle size={14} className="text-green-500" />
                                        </div>
                                        <div className="space-y-2">
                                            {selectedStudent.completedCourses.map(id => (
                                                <div key={id} className="flex items-center gap-3 p-3 bg-green-50/50 dark:bg-green-900/5 rounded-xl border border-green-100/50 dark:border-green-900/20">
                                                    <CheckCircle size={14} className="text-green-500" />
                                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                                        {getCourseTitle(id)}
                                                    </span>
                                                </div>
                                            ))}
                                            {selectedStudent.completedCourses.length === 0 && (
                                                <p className="text-xs text-gray-400 italic">No completed courses yet</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-gray-50 dark:bg-dark-900/50 border-t border-gray-100 dark:border-dark-800 flex justify-end">
                            <button
                                onClick={() => setSelectedStudent(null)}
                                className="px-6 py-2 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-xs shadow-sm hover:translate-y-[-1px] transition-all border border-gray-200 dark:border-dark-700"
                            >
                                Close Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Students;
