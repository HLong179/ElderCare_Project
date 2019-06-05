export function addNote(data) {
    return {
        type: 'ADD_NOTES',
        payload: data,
    }
}