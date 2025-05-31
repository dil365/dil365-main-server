export function deepCopy(model) {
    if(model) {
        return JSON.parse(JSON.stringify(model));
    }
}
