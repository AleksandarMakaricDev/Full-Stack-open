export const isValidString = (string) => {
    if (typeof string === 'string') {
        return !!string;
    }
    return false;
}