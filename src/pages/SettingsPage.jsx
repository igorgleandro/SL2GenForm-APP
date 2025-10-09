import React, { useEffect, useMemo, useState } from "react";
import { Mail, Lock, Sun, Moon, MonitorCog, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { useAuth } from "../providers/AuthServiceProvider.jsx";


export default function SettingsPage() {

    const { user,onSave} = useAuth();
console.log(user);

    const avatars = useMemo(
        () => [
            "/images/avatar/avatar1.png",
            "/images/avatar/avatar2.png",
            "/images/avatar/avatar3.png",
            "/images/avatar/avatar4.png",
            "/images/avatar/avatar5.png",
        ],
        []
    );

    // ----- Form State -----
    const [name, setName] = useState(user.name || "");
    const [surname, setSurname] = useState(user?.surname || "");
    const [role, setRole] = useState(user?.role || " ");
    const [email, setEmail] = useState(user?.email || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [theme, setTheme] = useState(() => user?.theme || "system");
    const [avatar, setAvatar] = useState(user?.avatar || avatars[0]);

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const validate = () => {
        setError("");
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (newPassword || confirmPassword || currentPassword) {
            if (!currentPassword) {
                setError("Enter your current password to set a new one.");
                return false;
            }
            if (newPassword.length < 8) {
                setError("New password must be at least 8 characters.");
                return false;
            }
            if (newPassword !== confirmPassword) {
                setError("New password and confirmation do not match.");
                return false;
            }
        }
        return true;
    };


    const saveSettings = async (payload) => {

        const tokenKey = user.tokenType + " " + user.token;

         const res = await fetch(`http://localhost:8080/users/${user.id}`, {
         method: "PATCH",
         headers: {
              "Content-Type": "application/json",
               Authorization: tokenKey,
         },
         body: JSON.stringify(payload),
         });

         if (!res.ok) throw new Error(`HTTP ${res.status}`);

        await new Promise((r) => setTimeout(r, 400));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            name: name?.trim(),
            surname: surname?.trim(),
            email: email?.trim(),
            role: role?.trim(),
            theme: theme?.trim(),
            avatar,
            ...(newPassword ? { password: newPassword } : {}) // backend expects "password"
        };

        try {
            setSaving(true);
            setMessage("");
            setError("");
            if (onSave) await onSave(payload);
            else await saveSettings(payload);
            setMessage("Settings saved successfully.");
            // Clear password fields after save
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError(err?.message || "Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-[80vh] w-full flex justify-center px-4 py-10 bg-neutral-50 dark:bg-gray-900">
            <div className="w-full max-w-3xl">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <MonitorCog className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100">Settings</h1>
                </div>

                {/* Card */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-neutral-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm p-6 space-y-8"
                >
                    {/* Email */}
                    <section>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-neutral-100 mb-4">Account</h2>
                        <div className="grid gap-4">
                            <label className="block">
                <span className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 mb-1">
                  <Mail className="h-4 w-4" /> Email
                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-800/20"
                                    placeholder="you@example.com"
                                    required
                                />
                            </label>
                        </div>
                    </section>

                    {/* Password */}
                    <section>
                        <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">Password</h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                            Leave these fields blank if you don't want to change your password.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <label className="block">
                <span className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 mb-1">
                  <Lock className="h-4 w-4" /> Current password
                </span>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-gray-900 px-3 py-2 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-800/20"
                                />
                            </label>
                            <label className="block">
                <span className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 mb-1">
                  New password
                </span>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-gray-900 px-3 py-2 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-800/20"
                                />
                            </label>
                            <label className="block">
                <span className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 mb-1">
                  Confirm new password
                </span>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-gray-900 px-3 py-2 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-800/20"
                                />
                            </label>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">Profile</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <label className="block">
                                <span className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 mb-1">First name</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-gray-900 px-3 py-2 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-800/20"
                                    placeholder="Your name"
                                />
                            </label>

                            <label className="block">
                                <span className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 mb-1">Surname</span>
                                <input
                                    type="text"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-gray-900 px-3 py-2 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-800/20"
                                    placeholder="Your surname"
                                />
                            </label>

                            <label className="block">
                                <span className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 mb-1">Role</span>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-gray-900 px-3 py-2 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-800/20"
                                >
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="MANAGER">Manager</option>
                                    <option value="DEVELOPER">Developer</option>
                                </select>
                            </label>
                        </div>
                    </section>

                    {/* Theme */}
                    <section>
                        <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">Appearance</h2>
                        <div className="flex flex-wrap items-center gap-3" role="radiogroup" aria-label="Theme">
                            <ThemePill
                                icon={<Sun className="h-4 w-4" />}
                                label="Light"
                                active={theme === "light"}
                                onClick={() => setTheme("light")}
                            />
                            <ThemePill
                                icon={<Moon className="h-4 w-4" />}
                                label="Dark"
                                active={theme === "dark"}
                                onClick={() => setTheme("dark")}
                            />
                            <ThemePill
                                icon={<MonitorCog className="h-4 w-4" />}
                                label="System"
                                active={theme === "system"}
                                onClick={() => setTheme("system")}
                            />
                        </div>
                    </section>

                    {/* Avatar */}
                    <section>
                        <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">Avatar</h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" /> Choose one:
                        </p>

                        <div className="grid grid-cols-5 gap-4">
                            {avatars.map((src) => (
                                <button
                                    key={src}
                                    type="button"
                                    onClick={() => setAvatar(src)}
                                    className={`relative rounded-2xl p-1 border transition ${
                                        avatar === src
                                            ? "border-neutral-900 dark:border-neutral-100 shadow"
                                            : "border-transparent hover:border-neutral-300 dark:hover:border-neutral-700"
                                    }`}
                                    aria-pressed={avatar === src}
                                    aria-label="Choose avatar"
                                >
                                    <img
                                        src={src}
                                        alt="Avatar option"
                                        className="aspect-square w-full rounded-xl object-cover"
                                    />
                                    {avatar === src && (
                                        <CheckCircle2 className="absolute -right-2 -top-2 h-5 w-5 text-green-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-4 pt-2">
                        <div className="text-sm">
                            {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
                            {!error && message && (
                                <p className="text-green-700 dark:text-green-400">{message}</p>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    // reset to last saved / defaults
                                    setName(user?.name || "");
                                    setSurname(user?.surname || "");
                                    setRole(user?.role || "USER");
                                    setEmail(user?.email || "");
                                    setAvatar(user?.avatar || avatars[0]);
                                    setTheme(localStorage.getItem("pref-theme") || "system");
                                    setCurrentPassword("");
                                    setNewPassword("");
                                    setConfirmPassword("");
                                    setError("");
                                    setMessage("");
                                }}
                                className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-5 py-2 font-medium disabled:opacity-70"
                            >
                                {saving ? "Saving…" : "Save changes"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

function ThemePill({ icon, label, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                active
                    ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                    : "border-neutral-300 text-neutral-700 hover:bg-neutral-100/60 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800/60"
            }`}
            aria-pressed={active}
        >
            {icon}
            {label}
        </button>
    );
}
