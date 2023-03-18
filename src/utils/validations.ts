import validator from 'validator'

export const validateAddress = (address: string): boolean => {
    const pattern = /^zip=\d{8}__address=[^_=]*__number=\d+__neighborhood=[^_=]*__city=[^_=]*__stateUF=[A-Z]{2}$/
    return validator.matches(address, pattern)
}

export const validatePhone = (phone: string): boolean => {
    const pattern = /^\d{11}$/
    return validator.matches(phone, pattern)
}


// zip=\d{8}            OK
// address=[^_=]*        OK
// number=\d+           OK
// neighborhood=[^_=]*  OK
// city=[^_=]*          OK
// stateUF=[A-Z]{2}     OK

// zip=45994160__address=Monte Carmelo__number=1123__neighborhood=Ed'u-ár.d°:o Magalhaes__city=Teixeira de Freitas__stateUF=BA"