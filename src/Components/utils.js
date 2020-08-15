export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export function getRndFloat(min, max) {
    return (Math.random() * (max - min + 1)) + min;
}