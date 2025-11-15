export const emptyToNull = (value: string): string => {
    return value?.trim() ? value : null;
}
