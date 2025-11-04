module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
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
"[project]/lib/database.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/database.ts [app-route] (ecmascript)");
;
;
;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
async function hashPassword(password) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, 12);
}
async function verifyPassword(password, hashedPassword) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, hashedPassword);
}
function generateToken(user) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
        userId: user.id,
        email: user.email,
        role: user.role
    }, JWT_SECRET, {
        expiresIn: '7d'
    });
}
function verifyToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
    } catch  {
        return null;
    }
}
async function registerUser(data) {
    try {
        // Check if user already exists
        const existingUser = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getUserByEmail(data.email);
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
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"])(),
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
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].createUser(userWithPassword);
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
        const userWithPassword = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getUserByEmail(data.email);
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
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getUserById(decoded.userId);
    if (!user) return null;
    // Remove password if it exists
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
}),
"[project]/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const body = await request.json();
        // Validate required fields
        if (!body.email || !body.password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Email and password are required'
            }, {
                status: 400
            });
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loginUser"])(body);
        if ('error' in result) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: result.error
            }, {
                status: 401
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            user: result.user,
            token: result.token
        });
    } catch (error) {
        console.error('Login error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e2cd2c3d._.js.map