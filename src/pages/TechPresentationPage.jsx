import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Code, Layers, Database, Lock, Palette, Settings } from 'lucide-react';

const Slide = ({ children, title, icon: Icon }) => (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-700">
            {Icon && <Icon className="w-10 h-10 text-blue-400" />}
            <h1 className="text-4xl font-bold">{title}</h1>
        </div>
        <div className="flex-1 flex flex-col justify-center">
            {children}
        </div>
    </div>
);

const TechBadge = ({ name, category, color = "blue" }) => {
    const colors = {
        blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        green: "bg-green-500/20 text-green-300 border-green-500/30",
        purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        pink: "bg-pink-500/20 text-pink-300 border-pink-500/30"
    };

    return (
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-all">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 border ${colors[color]}`}>
                {category}
            </div>
            <div className="text-lg font-semibold">{name}</div>
        </div>
    );
};

const FeatureItem = ({ title, description }) => (
    <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-blue-500">
        <h3 className="text-xl font-semibold mb-2 text-blue-300">{title}</h3>
        <p className="text-slate-300">{description}</p>
    </div>
);

export default function TechPresentation() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        // Slide 1: Title
        <Slide key={0} title="Project Tech Stack" icon={Code}>
            <div className="text-center space-y-6">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Modern React Application
                </h2>
                <p className="text-2xl text-slate-300">A comprehensive overview of our technology choices</p>
                <div className="mt-12 flex justify-center gap-8 text-slate-400">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400">React 18</div>
                        <div className="text-sm">Core Framework</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">Material-UI</div>
                        <div className="text-sm">Component Library</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">Tailwind CSS</div>
                        <div className="text-sm">Styling</div>
                    </div>
                </div>
            </div>
        </Slide>,

        // Slide 2: Core Technologies
        <Slide key={1} title="Core Technologies" icon={Layers}>
            <div className="grid grid-cols-2 gap-6">
                <TechBadge name="React 18" category="Framework" color="blue" />
                <TechBadge name="React Router v6" category="Routing" color="blue" />
                <TechBadge name="Material-UI (MUI)" category="UI Library" color="purple" />
                <TechBadge name="Tailwind CSS" category="Styling" color="green" />
                <TechBadge name="Lucide React" category="Icons" color="orange" />
                <TechBadge name="Context API" category="State Management" color="pink" />
            </div>
            <div className="mt-8 bg-slate-800/30 rounded-lg p-6 border border-slate-700">
                <p className="text-slate-300 text-lg">
                    <span className="text-blue-400 font-semibold">Architecture:</span> Component-based with functional components and React Hooks
                </p>
            </div>
        </Slide>,

        // Slide 3: UI & Styling
        <Slide key={2} title="UI & Styling Approach" icon={Palette}>
            <div className="space-y-6">
                <FeatureItem
                    title="Hybrid Styling System"
                    description="Combining Material-UI components with Tailwind CSS utilities for maximum flexibility"
                />
                <FeatureItem
                    title="Complete Dark Mode"
                    description="Full light/dark theme implementation with system preference detection"
                />
                <FeatureItem
                    title="Responsive Design"
                    description="Mobile-first approach with responsive grids and adaptive layouts"
                />
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">MUI sx</div>
                        <div className="text-sm opacity-80">Component Props</div>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">Tailwind</div>
                        <div className="text-sm opacity-80">Utility Classes</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">CSS-in-JS</div>
                        <div className="text-sm opacity-80">Dynamic Styles</div>
                    </div>
                </div>
            </div>
        </Slide>,

        // Slide 4: Backend Integration
        <Slide key={3} title="Backend Integration" icon={Database}>
            <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <h3 className="text-xl font-semibold mb-3 text-green-400">REST API Endpoints</h3>
                    <div className="grid grid-cols-2 gap-3 text-slate-300 text-sm">
                        <div className="flex items-start gap-2">
                            <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-mono whitespace-nowrap">POST</div>
                            <div className="flex-1">
                                <code className="text-blue-300 text-xs">/api/v1/auth/login</code>
                                <p className="text-xs text-slate-400">User authentication</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-mono whitespace-nowrap">POST</div>
                            <div className="flex-1">
                                <code className="text-blue-300 text-xs">/users</code>
                                <p className="text-xs text-slate-400">User registration</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-mono whitespace-nowrap">PATCH</div>
                            <div className="flex-1">
                                <code className="text-blue-300 text-xs">/users/:id</code>
                                <p className="text-xs text-slate-400">Update user profile</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-mono whitespace-nowrap">DELETE</div>
                            <div className="flex-1">
                                <code className="text-blue-300 text-xs">/users/:id</code>
                                <p className="text-xs text-slate-400">Delete user account</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-mono whitespace-nowrap">GET</div>
                            <div className="flex-1">
                                <code className="text-blue-300 text-xs">/users/:id</code>
                                <p className="text-xs text-slate-400">Get user details</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-mono whitespace-nowrap">GET</div>
                            <div className="flex-1">
                                <code className="text-blue-300 text-xs">/forms</code>
                                <p className="text-xs text-slate-400">Retrieve user forms</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <h3 className="text-xl font-semibold mb-3 text-purple-400">API Features</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2 text-slate-300">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                JWT Bearer Token Authentication
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                JSON Request/Response Format
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                RESTful Architecture
                            </div>
                        </div>
                        <div className="space-y-2 text-slate-300">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                Error Handling & Validation
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                CORS Enabled
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                Railway Cloud Hosting
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <TechBadge name="Fetch API" category="HTTP Client" color="blue" />
                    <TechBadge name="Railway" category="Backend Hosting" color="purple" />
                </div>
            </div>
        </Slide>,

        // Slide 5: Authentication
        <Slide key={4} title="Authentication System" icon={Lock}>
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-300">JWT Token-Based Auth</h3>
                    <ul className="space-y-3 text-slate-300">
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            Secure token storage and management
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            Protected routes with redirect logic
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            Session persistence across refreshes
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            Authorization headers in API requests
                        </li>
                    </ul>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <code className="text-sm text-green-400">
                        const &#123; user, login, logout, updateUser &#125; = useAuth();
                    </code>
                    <p className="text-slate-400 text-sm mt-2">Custom hook for centralized auth management</p>
                </div>
            </div>
        </Slide>,

        // Slide 6: State Management
        <Slide key={5} title="State Management" icon={Settings}>
            <div className="space-y-6">
                <FeatureItem
                    title="Context API + Custom Hooks"
                    description="AuthServiceProvider for global user state with useAuth hook"
                />
                <FeatureItem
                    title="Component State"
                    description="useState and useEffect for local component state and side effects"
                />
                <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                        <h4 className="text-lg font-semibold mb-3 text-purple-400">Global State</h4>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li>• User authentication</li>
                            <li>• User profile data</li>
                            <li>• Theme preferences</li>
                            <li>• Token management</li>
                        </ul>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                        <h4 className="text-lg font-semibold mb-3 text-blue-400">Local State</h4>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li>• Form inputs</li>
                            <li>• Loading states</li>
                            <li>• Error messages</li>
                            <li>• UI interactions</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Slide>,

        // Slide 7: Key Features
        <Slide key={6} title="Key Features Implemented" icon={Code}>
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-400 mb-4">User Management</h3>
                    <div className="space-y-3 text-slate-300">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Registration & Login
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Profile Editing
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Avatar Selection
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Password Management
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Account Deletion
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-purple-400 mb-4">Role System</h3>
                    <div className="space-y-3">
                        <div className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg border border-red-500/30">
                            ADMIN
                        </div>
                        <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-lg border border-purple-500/30">
                            MANAGER
                        </div>
                        <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg border border-blue-500/30">
                            DEVELOPER
                        </div>
                        <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-lg border border-green-500/30">
                            USER
                        </div>
                    </div>
                </div>
            </div>
        </Slide>,

        // Slide 8: Development Best Practices
        <Slide key={7} title="Development Practices" icon={Code}>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">Code Quality</h3>
                    <ul className="space-y-2 text-slate-300">
                        <li>✓ Component-based architecture</li>
                        <li>✓ Reusable custom hooks</li>
                        <li>✓ Proper error handling</li>
                        <li>✓ Form validation</li>
                        <li>✓ Loading states</li>
                    </ul>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h3 className="text-xl font-semibold mb-4 text-green-400">UX Practices</h3>
                    <ul className="space-y-2 text-slate-300">
                        <li>✓ Responsive layouts</li>
                        <li>✓ Accessibility (ARIA)</li>
                        <li>✓ User feedback alerts</li>
                        <li>✓ Smooth transitions</li>
                        <li>✓ Error messaging</li>
                    </ul>
                </div>
            </div>
            <div className="mt-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/30">
                <p className="text-center text-lg text-slate-300">
                    <span className="text-blue-400 font-semibold">Modern React patterns</span> with professional UI/UX implementation
                </p>
            </div>
        </Slide>,

        // Slide 9: Summary
        <Slide key={8} title="Tech Stack Summary" icon={Layers}>
            <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Production-Ready Application
                    </h2>
                    <p className="text-xl text-slate-300">Built with modern tools and best practices</p>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-500/30 text-center">
                        <div className="text-3xl mb-2">⚛️</div>
                        <div className="text-lg font-semibold">React Ecosystem</div>
                        <div className="text-sm text-slate-400 mt-2">Hooks, Router, Context</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-500/30 text-center">
                        <div className="text-3xl mb-2">🎨</div>
                        <div className="text-lg font-semibold">Modern UI</div>
                        <div className="text-sm text-slate-400 mt-2">MUI + Tailwind CSS</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-500/30 text-center">
                        <div className="text-3xl mb-2">🔐</div>
                        <div className="text-lg font-semibold">Secure Auth</div>
                        <div className="text-sm text-slate-400 mt-2">JWT + Protected Routes</div>
                    </div>
                </div>
            </div>
        </Slide>
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="w-full h-screen bg-slate-900 flex flex-col">
            <div className="flex-1 relative">
                {slides[currentSlide]}
            </div>

            {/* Navigation */}
            <div className="bg-slate-950 border-t border-slate-800 p-4 flex items-center justify-between">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                </button>

                <div className="flex items-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentSlide
                                    ? 'bg-blue-500 w-8'
                                    : 'bg-slate-700 hover:bg-slate-600'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                    <span className="ml-4 text-slate-400 text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
                </div>

                <button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}