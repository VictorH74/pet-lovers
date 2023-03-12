import validator from 'validator'

export const validateAddress = (address: string): boolean => {
    const pattern = /^zip=\d{8}_street=\w+_number=\d+_neighbourhood=\w+_city=\w+_stateUF=[A-Z]{2}$/
    return validator.matches(address, pattern)
}