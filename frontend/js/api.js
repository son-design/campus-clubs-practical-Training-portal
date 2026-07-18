// ============================================
// API CONFIGURATION
// ============================================

// Context path ni /api, so BASE_URL inajumuisha /api
const BASE_URL = "http://localhost:8080/api";

const API = {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    CLUBS: `${BASE_URL}/clubs`,
    TRAININGS: `${BASE_URL}/trainings`,
    APPLICATIONS: `${BASE_URL}/applications`
};

// ============================================
// AUTH HELPERS
// ============================================

function getToken() {
    return localStorage.getItem('token');
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function getRole() {
    const user = getUser();
    return user ? user.role : null;
}

function isAuthenticated() {
    return getToken() !== null;
}

function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    };
}

function checkLogin() {
    if (!isAuthenticated()) {
        alert("Please login first");
        window.location = "../login.html";
        return false;
    }
    return true;
}

function checkRole(requiredRole) {
    if (!checkLogin()) return false;
    const role = getRole();
    if (role !== requiredRole && role !== "ADMIN") {
        alert("Access Denied. You need " + requiredRole + " privileges");
        window.location = "../dashboard.html";
        return false;
    }
    return true;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.location = "../login.html";
}

// ============================================
// EXPOSE GLOBALLY
// ============================================

window.API = API;
window.getToken = getToken;
window.getUser = getUser;
window.getRole = getRole;
window.isAuthenticated = isAuthenticated;
window.authHeaders = authHeaders;
window.checkLogin = checkLogin;
window.checkRole = checkRole;
window.logout = logout;