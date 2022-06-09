export const createActivationDate = (period: string) => {
    const date = new Date()
    switch (period) {
        case 'someday':
            date.setDate(date.getDate() + 52)
        case 'later':
            date.setDate(date.getDate() + 28)
        case 'never':
            date.setDate(date.getDate() + 2)
        case 'soon':
            date.setDate(date.getDate() + 5)
        default:
            date.setDate(date.getDate())
        return date.toISOString().split('T')[0]
    }
}
