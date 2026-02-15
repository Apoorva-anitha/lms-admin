import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { mockCourses } from '@/helpers/mockData';
import { Course } from '@/types';

const Courses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>(mockCourses);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        difficulty: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
        prerequisites: [] as string[],
    });

    const filteredCourses = courses.filter(
        (course) =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Advanced':
                return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    const handleAddCourse = () => {
        setFormData({ title: '', description: '', duration: '', difficulty: 'Beginner', prerequisites: [] });
        setEditingCourse(null);
        setShowAddModal(true);
    };

    const handleEditCourse = (course: Course) => {
        setFormData({
            title: course.title,
            description: course.description,
            duration: course.duration,
            difficulty: course.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
            prerequisites: course.prerequisites || [],
        });
        setEditingCourse(course);
        setShowAddModal(true);
    };

    const handleDeleteCourse = (courseId: string) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            setCourses(courses.filter((c) => c.id !== courseId));
        }
    };

    const handlePrereqToggle = (courseId: string) => {
        setFormData(prev => ({
            ...prev,
            prerequisites: prev.prerequisites.includes(courseId)
                ? prev.prerequisites.filter(id => id !== courseId)
                : [...prev.prerequisites, courseId]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCourse) {
            // Update existing course
            setCourses(
                courses.map((c) =>
                    c.id === editingCourse.id
                        ? { ...c, ...formData, updatedAt: new Date().toISOString() }
                        : c
                )
            );
        } else {
            // Add new course
            const newCourse: Course = {
                id: `c${Date.now()}`,
                ...formData,
                assignedTo: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setCourses([...courses, newCourse]);
        }

        setShowAddModal(false);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Courses</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage all courses in the system</p>
                </div>
                <button
                    onClick={handleAddCourse}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                    <Plus size={20} />
                    Add Course
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 hover:shadow-md transition-shadow flex flex-col h-full"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    {course.title}
                                </h3>
                                <span
                                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
                                        course.difficulty
                                    )}`}
                                >
                                    {course.difficulty}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {course.description}
                        </p>

                        <div className="flex-1">
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <span>Duration: {course.duration}</span>
                                <span>{course.assignedTo?.length || 0} students</span>
                            </div>

                            {course.prerequisites && course.prerequisites.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold uppercase tracking-wider">Prerequisites:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {course.prerequisites.map((prereqId) => {
                                            const prereq = courses.find((c) => c.id === prereqId);
                                            return (
                                                <span
                                                    key={prereqId}
                                                    className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 rounded text-[10px] text-primary-700 dark:text-primary-300 font-medium border border-primary-100 dark:border-primary-800"
                                                >
                                                    {prereq?.title || prereqId}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-dark-800 mt-auto">
                            <button
                                onClick={() => handleEditCourse(course)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-sm"
                            >
                                <Edit size={16} />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteCourse(course.id)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm"
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No courses found</p>
                </div>
            )}

            {/* Add/Edit Course Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-dark-950 rounded-2xl shadow-2xl max-w-lg w-full p-8 border border-gray-100 dark:border-dark-800 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {editingCourse ? 'Edit Course' : 'Create New Course'}
                            </h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Course Title
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white transition-all"
                                        placeholder="e.g., Advanced React Patterns"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Duration
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white transition-all"
                                        placeholder="e.g., 6 weeks"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Difficulty Level
                                    </label>
                                    <select
                                        value={formData.difficulty}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                difficulty: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced',
                                            })
                                        }
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white transition-all appearance-none"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white transition-all"
                                    rows={3}
                                    placeholder="Enter a detailed course description..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Select Prerequisites
                                </label>
                                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto p-3 bg-gray-50 dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-dark-800">
                                    {courses
                                        .filter(c => !editingCourse || c.id !== editingCourse.id)
                                        .map(course => (
                                            <label
                                                key={course.id}
                                                className="flex items-center gap-3 p-2 hover:bg-white dark:hover:bg-dark-800 rounded-lg cursor-pointer transition-colors group"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.prerequisites.includes(course.id)}
                                                    onChange={() => handlePrereqToggle(course.id)}
                                                    className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                                />
                                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                                                    {course.title}
                                                </span>
                                            </label>
                                        ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-6 border-t border-gray-100 dark:border-dark-800">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-dark-700 font-semibold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5"
                                >
                                    {editingCourse ? 'Update Course' : 'Create Course'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
