import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);


    useEffect(() => {

        const updateThemeState = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const isCurrentlyDark = currentTheme === 'dark';
            setIsDark(isCurrentlyDark);
            console.log('ThemeToggle: Current theme is', currentTheme);
        };


        updateThemeState();


        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    updateThemeState();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    const handleToggle = () => {
        const nextTheme = !isDark ? 'dark' : 'light';
        setIsDark(!isDark);
        document.documentElement.setAttribute('data-theme', nextTheme);
        console.log('ThemeToggle: Switched to', nextTheme);

    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleToggle}
                className={`
                    relative inline-flex items-center h-12 w-24 rounded-full p-1
                    transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-50
                    ${isDark ? 'bg-gray-700 focus:ring-gray-600' : 'bg-emerald-300 focus:ring-emerald-200'}
                `}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
                <span
                    className={`
                        inline-block h-10 w-10 rounded-full bg-white shadow-lg transform transition-all duration-300 ease-in-out
                        flex items-center justify-center
                        ${isDark ? 'translate-x-12' : 'translate-x-0'}
                    `}
                >
                    <span
                        className={`transform transition-transform duration-300 ${
                            isDark ? 'rotate-180' : 'rotate-0'
                        }`}
                    >
                        {isDark ? (
                            <Moon className="h-5 w-5 text-indigo-600" />
                        ) : (
                            <Sun className="h-5 w-5 text-yellow-500" />
                        )}
                    </span>
                </span>

                {/* Background icons */}
                <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                    <Sun
                        className={`h-4 w-4 transition-opacity duration-300 ${
                            isDark ? 'opacity-30 text-white' : 'opacity-0'
                        }`}
                    />
                    <Moon
                        className={`h-4 w-4 transition-opacity duration-300 ${
                            isDark ? 'opacity-0' : 'opacity-30 text-gray-700'
                        }`}
                    />
                </div>
            </button>
        </div>
    );
}