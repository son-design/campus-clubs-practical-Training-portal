// ===== AUTH HELPERS =====

function getToken() {
    return localStorage.getItem('token');
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function isLoggedIn() {
    return !!getToken();
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
}

function redirectIfNotLoggedIn() {
    if (!isLoggedIn()) {
        window.location.href = '/login';
    }
}

function getUserId() {
    const user = getUser();
    return user ? user.userId : null;
}

function getRole() {
    const user = getUser();
    return user ? user.role : null;
}

function getAuthHeaders() {
    return {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    };
}