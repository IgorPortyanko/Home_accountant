

export const createDate = (time: number) => {
    const data = new Date(time)
    const formDay = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ]
    const formMonce = [
        'Січня',
        'Лютого',
        'Березня',
        'Квітня',
        'Травня',
        'Червня',
        'Липня',
        'Серпня',
        'Вересня',
        'Жовтня',
        'Листопада',
        'Грудня'

    ]

    const formDate = (dat:number) => {
        let dateForm = ''
        if (dat < 10) {
            dateForm = `0${dat}`
            return dateForm
        }
        else return dat
    }

    

    const dateForTime = {
        Y: data.getFullYear(),
        M: formDate(data.getMonth() + 1), 
        D: formDate(data.getDate()), 
        Hour: formDate(data.getHours()), 
        Min: formDate(data.getMinutes()),
        Sec: formDate(data.getSeconds()),
        Day: formDay[data.getDay()],
        FullMonce: formMonce[data.getMonth()]
    }

    return dateForTime
}

export const dateNow = () => {
    const dateNow = createDate(Date.now())
    return ( `${dateNow.Y}-${dateNow.M}-${dateNow.D}`)
}