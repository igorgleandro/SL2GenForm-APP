import React from 'react';
import { FileText, Users, Shield, Zap, Target, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-6">
                        <FileText className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        About Our Platform
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        A modern form generation platform built with React, designed to streamline document creation and management for teams and individuals.
                    </p>
                </div>

                {/* Main Content Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Our Mission
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            To deliver clean, modern, and user-friendly form generation experiences using cutting-edge web technologies. We empower users to create, manage, and customize forms efficiently with an intuitive interface and robust backend support.
                        </p>
                    </div>


                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Heart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Our Values
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Innovation, collaboration, and attention to detail. We believe every project deserves a great user experience, from seamless authentication to beautiful dark mode support and responsive design across all devices.
                        </p>
                    </div>
                </div>


                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        What We Offer
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-3">
                                <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                User Management
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Comprehensive authentication system with role-based access control, profile customization, and secure account management.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-3">
                                <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Form Generation
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Create and manage dynamic forms with ease. Access your forms anytime from a personalized dashboard with full CRUD capabilities.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-3">
                                <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Modern Experience
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Built with React and Material UI, featuring dark mode support, responsive design, and smooth transitions for an exceptional user experience.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Built With Modern Technologies
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['React', 'React Router', 'Material UI', 'Tailwind CSS', 'Lucide Icons', 'RESTful API'].map((tech) => (
                            <span
                                key={tech}
                                className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>


                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                        <Shield className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                Disclaimer
                            </h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                The documents generated by this website are provided on an "as-is" basis for convenience only. We do not guarantee the accuracy, completeness, or suitability of any generated content. You use and rely on the information at your own risk. Please review all generated documents carefully before using them, as errors may exist. We assume no responsibility or liability for any damages, losses, or consequences resulting from your use of or reliance on the generated data.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-12">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Questions or feedback? Visit our <a href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Contact page</a> to get in touch.
                    </p>
                </div>
            </div>
        </div>
    );
}