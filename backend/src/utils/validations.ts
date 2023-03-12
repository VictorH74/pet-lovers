import validator from 'validator'

export const validateAddress = (address: string): boolean => {
    const pattern = /^zip=\d{8}__street=[\w\s]*__number=\d+__neighbourhood=[\w\s]*__city=[\w\s]*__stateUF=[A-Z]{2}$/
    return validator.matches(address, pattern)
}


// zip=83750296__street=rua Qualquer__number=6831__neighbourhood=bairro Qualquer__city=Cidadela__stateUF=UK