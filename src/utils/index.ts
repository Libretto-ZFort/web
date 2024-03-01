export const truncateText = (text: string, maxLength: number = 500): string => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
};
