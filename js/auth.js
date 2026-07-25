const auth = (() => {
    const STORAGE_KEY = 'finora_user_session';
    const USERS_KEY = 'finora_users';
    const DEMO_USER = {
        email: 'user@test.com',
        password: 'user123',
        name: 'Demo User',
        verified: true
    };

    const init = () => {
        ensureDemoUserExists();
        checkAuthStatus();
    };

    const ensureDemoUserExists = () => {
        let users = getAllUsers();

        // Remove old demo user (admin@test.com) if it exists
        users = users.filter(u => u.email !== 'admin@test.com');

        // Check if new demo user exists
        const demoExists = users.some(u => u.email === DEMO_USER.email);
        if (!demoExists) {
            users.push(DEMO_USER);
        }

        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    };

    const getAllUsers = () => {
        const users = localStorage.getItem(USERS_KEY);
        return users ? JSON.parse(users) : [];
    };

    const getUserByEmail = (email) => {
        const users = getAllUsers();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    };

    const login = (email, password) => {
        const user = getUserByEmail(email);

        if (!user) {
            console.log('User not found:', email);
            return false;
        }

        if (user.password !== password) {
            console.log('Invalid password');
            return false;
        }

        const session = {
            email: user.email,
            name: user.name,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        return true;
    };

    const signup = (fullName, email, password) => {
        if (getUserByEmail(email)) {
            return false;
        }

        const newUser = {
            email: email.toLowerCase(),
            password: password,
            name: fullName,
            createdAt: new Date().toISOString(),
            verified: true
        };

        const users = getAllUsers();
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        return true;
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        window.location.href = 'login.html';
    };

    const isLoggedIn = () => {
        return localStorage.getItem(STORAGE_KEY) !== null;
    };

    const getCurrentUser = () => {
        const session = localStorage.getItem(STORAGE_KEY);
        return session ? JSON.parse(session) : null;
    };

    const checkAuthStatus = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const authPages = ['login.html', 'signup.html'];
        const isAuthPage = authPages.includes(currentPage);

        if (!isLoggedIn() && !isAuthPage) {
            window.location.href = 'login.html';
        }

        if (isLoggedIn() && isAuthPage) {
            window.location.href = 'index.html';
        }
    };

    const updateProfile = (name) => {
        const session = getCurrentUser();
        if (session) {
            session.name = name;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        }
    };

    return {
        init,
        login,
        signup,
        logout,
        isLoggedIn,
        getCurrentUser,
        checkAuthStatus,
        updateProfile
    };
})();

document.addEventListener('DOMContentLoaded', auth.init);
