import validator from 'validator'

export const validateLocation = (location: string): boolean => {
    const pattern = /^\d+__\d+__[^_=]*$/
    return validator.matches(location, pattern)
}

export const validatePhone = (phone: string): boolean => {
    const pattern = /^\d{11}$/
    return validator.matches(phone, pattern)
}


// zip=\d{8}            OK
// location=[^_=]*        OK
// number=\d+           OK
// neighborhood=[^_=]*  OK
// city=[^_=]*          OK
// stateUF=[A-Z]{2}     OK

// zip=45994160__address=Monte Carmelo__number=1123__neighborhood=Ed'u-ár.d°:o Magalhaes__city=Teixeira de Freitas__stateUF=BA"