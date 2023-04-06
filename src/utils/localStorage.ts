export const setValueStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

export const getValueStorage = (key: string) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) ?? '') : []
}

