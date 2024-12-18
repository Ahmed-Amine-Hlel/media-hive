export const calculateAge = (dateOfBirth: Date) => {
    const diff = Date.now() - new Date(dateOfBirth).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}