export const ADMIN_EMAILS = [
    "admin@jadetimesjournals.com",
    "your-admin-email@example.com"
];

/**
 * Checks if a user has admin privileges based on their email.
 * @param {Object} user - The Firebase user object.
 * @returns {boolean}
 */
export const isAdminUser = (user) => {
    if (!user || !user.email) return false;
    return ADMIN_EMAILS.includes(user.email.toLowerCase());
};
