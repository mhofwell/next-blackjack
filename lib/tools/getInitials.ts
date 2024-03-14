export function getInitials(username: string) {
    if (username === '') {
        return '?';
    }
    return username.substring(0, 2).toLowerCase();
}
