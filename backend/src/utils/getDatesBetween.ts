export const getDatesBetween = (startDate:Date, endDate: Date) => {
    const dates= []
    const currentDate = new Date(startDate.getTime())

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate).toISOString())
        currentDate.setDate(currentDate.getDate() + 1)
    }

    return dates
}