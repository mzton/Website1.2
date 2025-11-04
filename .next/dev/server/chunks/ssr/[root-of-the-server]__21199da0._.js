module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children }) {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("dark");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
        setTheme(initialTheme);
        applyTheme(initialTheme);
    }, []);
    const applyTheme = (newTheme)=>{
        const html = document.documentElement;
        if (newTheme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    };
    const toggleTheme = ()=>{
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };
    // Prevent flash of unstyled content
    if (!mounted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-theme": theme,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "hidden",
                id: "theme-toggle",
                "data-current-theme": theme,
                onChange: ()=>toggleTheme()
            }, void 0, false, {
                fileName: "[project]/components/theme-provider.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/theme-provider.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
function useTheme() {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("dark");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(savedTheme || (prefersDark ? "dark" : "light"));
    }, []);
    const toggleTheme = ()=>{
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        const html = document.documentElement;
        if (newTheme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    };
    return {
        theme,
        toggleTheme
    };
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/lib/database.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db,
    "generateId",
    ()=>generateId
]);
// In-memory database simulation for development
// In production, this would be replaced with a real database
class Database {
    users = new Map();
    teacherProfiles = new Map();
    clientProfiles = new Map();
    bookings = new Map();
    reviews = new Map();
    documents = new Map();
    // User operations
    createUser(user) {
        this.users.set(user.id, user);
        return user;
    }
    getUserById(id) {
        return this.users.get(id);
    }
    getUserByEmail(email) {
        return Array.from(this.users.values()).find((user)=>user.email === email);
    }
    updateUser(id, updates) {
        const user = this.users.get(id);
        if (user) {
            const updatedUser = {
                ...user,
                ...updates,
                updatedAt: new Date()
            };
            this.users.set(id, updatedUser);
            return updatedUser;
        }
        return undefined;
    }
    // Teacher profile operations
    createTeacherProfile(profile) {
        this.teacherProfiles.set(profile.id, profile);
        return profile;
    }
    getTeacherProfile(teacherId) {
        return Array.from(this.teacherProfiles.values()).find((profile)=>profile.teacherId === teacherId);
    }
    updateTeacherProfile(teacherId, updates) {
        const profile = this.getTeacherProfile(teacherId);
        if (profile) {
            const updatedProfile = {
                ...profile,
                ...updates
            };
            this.teacherProfiles.set(profile.id, updatedProfile);
            return updatedProfile;
        }
        return undefined;
    }
    getAllTeachers() {
        const teachers = Array.from(this.users.values()).filter((user)=>user.role === 'teacher');
        return teachers.map((teacher)=>({
                ...teacher,
                profile: this.getTeacherProfile(teacher.id)
            }));
    }
    // Client profile operations
    createClientProfile(profile) {
        this.clientProfiles.set(profile.id, profile);
        return profile;
    }
    getClientProfile(clientId) {
        return Array.from(this.clientProfiles.values()).find((profile)=>profile.clientId === clientId);
    }
    updateClientProfile(clientId, updates) {
        const profile = this.getClientProfile(clientId);
        if (profile) {
            const updatedProfile = {
                ...profile,
                ...updates
            };
            this.clientProfiles.set(profile.id, updatedProfile);
            return updatedProfile;
        }
        return undefined;
    }
    // Booking operations
    createBooking(booking) {
        this.bookings.set(booking.id, booking);
        return booking;
    }
    getBooking(id) {
        return this.bookings.get(id);
    }
    getBookingsByTeacher(teacherId) {
        return Array.from(this.bookings.values()).filter((booking)=>booking.teacherId === teacherId);
    }
    getBookingsByClient(clientId) {
        return Array.from(this.bookings.values()).filter((booking)=>booking.clientId === clientId);
    }
    updateBooking(id, updates) {
        const booking = this.bookings.get(id);
        if (booking) {
            const updatedBooking = {
                ...booking,
                ...updates
            };
            this.bookings.set(id, updatedBooking);
            return updatedBooking;
        }
        return undefined;
    }
    // Review operations
    createReview(review) {
        this.reviews.set(review.id, review);
        return review;
    }
    getReviewsByTeacher(teacherId) {
        return Array.from(this.reviews.values()).filter((review)=>review.teacherId === teacherId);
    }
    getReviewsByClient(clientId) {
        return Array.from(this.reviews.values()).filter((review)=>review.clientId === clientId);
    }
    updateReview(reviewId, updates) {
        const review = this.reviews.get(reviewId);
        if (review) {
            const updatedReview = {
                ...review,
                ...updates
            };
            this.reviews.set(reviewId, updatedReview);
            return updatedReview;
        }
        return undefined;
    }
    // Document operations
    createDocument(document) {
        this.documents.set(document.id, document);
        return document;
    }
    getDocumentsByTeacher(teacherId) {
        return Array.from(this.documents.values()).filter((doc)=>doc.teacherId === teacherId);
    }
    updateDocument(id, updates) {
        const document = this.documents.get(id);
        if (document) {
            const updatedDocument = {
                ...document,
                ...updates
            };
            this.documents.set(id, updatedDocument);
            return updatedDocument;
        }
        return undefined;
    }
}
const db = new Database();
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
}),
"[project]/lib/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateToken",
    ()=>generateToken,
    "getCurrentUser",
    ()=>getCurrentUser,
    "hashPassword",
    ()=>hashPassword,
    "loginUser",
    ()=>loginUser,
    "registerUser",
    ()=>registerUser,
    "verifyPassword",
    ()=>verifyPassword,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/database.ts [app-ssr] (ecmascript)");
;
;
;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
async function hashPassword(password) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hash(password, 12);
}
async function verifyPassword(password, hashedPassword) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].compare(password, hashedPassword);
}
function generateToken(user) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].sign({
        userId: user.id,
        email: user.email,
        role: user.role
    }, JWT_SECRET, {
        expiresIn: '7d'
    });
}
function verifyToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
    } catch  {
        return null;
    }
}
async function registerUser(data) {
    try {
        // Check if user already exists
        const existingUser = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].getUserByEmail(data.email);
        if (existingUser) {
            return {
                error: 'User with this email already exists'
            };
        }
        // Validate password match
        if (data.password !== data.confirmPassword) {
            return {
                error: 'Passwords do not match'
            };
        }
        // Hash password
        const hashedPassword = await hashPassword(data.password);
        // Create user
        const user = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateId"])(),
            email: data.email,
            name: data.name,
            role: data.role,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Store user with hashed password (in real app, password would be in separate table)
        const userWithPassword = {
            ...user,
            password: hashedPassword
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].createUser(userWithPassword);
        // Generate token
        const token = generateToken(user);
        return {
            user,
            token
        };
    } catch (error) {
        return {
            error: 'Registration failed'
        };
    }
}
async function loginUser(data) {
    try {
        // Find user
        const userWithPassword = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].getUserByEmail(data.email);
        if (!userWithPassword) {
            return {
                error: 'Invalid email or password'
            };
        }
        // Verify password
        const isValidPassword = await verifyPassword(data.password, userWithPassword.password);
        if (!isValidPassword) {
            return {
                error: 'Invalid email or password'
            };
        }
        // Remove password from user object
        const { password, ...user } = userWithPassword;
        // Generate token
        const token = generateToken(user);
        return {
            user,
            token
        };
    } catch (error) {
        return {
            error: 'Login failed'
        };
    }
}
function getCurrentUser(token) {
    const decoded = verifyToken(token);
    if (!decoded) return null;
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].getUserById(decoded.userId);
    if (!user) return null;
    // Remove password if it exists
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
}),
"[project]/contexts/auth-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check for existing token on mount
        const token = localStorage.getItem('auth-token');
        if (token) {
            const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])(token);
            if (currentUser) {
                setUser(currentUser);
            } else {
                localStorage.removeItem('auth-token');
            }
        }
        setIsLoading(false);
    }, []);
    const login = (token)=>{
        localStorage.setItem('auth-token', token);
        const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])(token);
        if (currentUser) {
            setUser(currentUser);
        }
    };
    const logout = ()=>{
        localStorage.removeItem('auth-token');
        setUser(null);
    };
    const updateUser = (updatedUser)=>{
        setUser(updatedUser);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isLoading,
            login,
            logout,
            updateUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/auth-context.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
}),
"[project]/components/google-translate.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GoogleTranslate,
    "setGoogleTranslateLanguage",
    ()=>setGoogleTranslateLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function GoogleTranslate() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Avoid duplicate injection
        if (document.getElementById("google-translate-script")) return;
        window.googleTranslateElementInit = function() {
            const google = window.google;
            if (!google?.translate) return;
            new google.translate.TranslateElement({
                pageLanguage: "en",
                includedLanguages: "en,ko",
                autoDisplay: false
            }, "google_translate_element");
        };
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
    }, []);
    // Hidden container for the Google widget
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "google_translate_element",
        style: {
            display: "none"
        }
    }, void 0, false, {
        fileName: "[project]/components/google-translate.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}
function setGoogleTranslateLanguage(lang) {
    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event("change"));
        return;
    }
    // Fallback: set cookie and reload (if widget not initialized yet)
    const from = "en";
    const to = lang;
    const cookieVal = `/${from}/${to}`;
    document.cookie = `googtrans=${cookieVal}; path=/`; // site cookie
    document.cookie = `googtrans=${cookieVal}; domain=.${location.hostname}; path=/`;
    location.reload();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__21199da0._.js.map