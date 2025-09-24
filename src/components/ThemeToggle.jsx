import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    const handleToggle = () => {
        const nextTheme = !isDark;
        setIsDark(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme ? 'dark' : 'light');
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleToggle}
                className={`
          relative inline-flex items-center h-12 w-24 rounded-full p-1
          transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-50
          ${isDark ? 'bg-green-950 focus:ring-green-900' : 'bg-green-300 focus:ring-gray-200'}
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
                <Moon className="h-5 w-5 text-blue-600" />
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
                            isDark ? 'opacity-0' : 'opacity-30 text-gray-600'
                        }`}
                    />
                </div>
            </button>

        </div>
    );
}
