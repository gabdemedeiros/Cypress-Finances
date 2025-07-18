export const format = (value) => {
    let formattedValue

    formattedValue = value.replace(',', '.')
    formattedValue = Number(formattedValue.split('$')[1].trim())

    formattedValue = String(value).includes('-') ? -formattedValue : formattedValue

    return formattedValue
}

export const randomNumber = () => {
    return Math.floor(Math.random() * 101)
}


export const prepareLocalStorage = (win) => {

    win.localStorage.setItem('dev.finances:transactions', JSON.stringify([
        {
            description: "Mesada",
            amount: 150 * 100,
            date: "11/03/2025"
        },
        {
            description: "Milho de pipoca",
            amount: - 9 * 100,
            date: "12/03/2025"
        },
        {
            description: "Rodízio",
            amount: - 75 * 100,
            date: "12/03/2025"
        },
    ])
    )

}

