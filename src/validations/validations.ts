import dayjs from 'dayjs';

const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/

    if (!emailRegex.test(email)) {
        return 'Email format is not valid'
    }

    if (!email) {
        return 'Must provide an email'
    }

    if (typeof (email) !== "string") {
        return 'Incorrect email'
    }

    if (email.length > 100) {
        return 'Maximum 100 characters'
    }
}

const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/

    if (!passwordRegex.test(password)) {
        return 'Password must be between 6 and 12 characters and contain at least one lowercase letter, one uppercase letter, one number, and one special character'
    }

    if (!password) {
        return 'Must provide a password'
    }

    if (typeof (password) !== "string") {
        return 'Incorrect password'
    }

    if (password.length > 12) {
        return 'Maximum 12 characters'
    }

}

const validateDni = (dni: string) => {
    const dniRegex = /^[0-9]{8}[A-Za-z]$/

    if (!dniRegex.test(dni)) {
        return 'Document ID is not valid'
    }

    if (!dni) {
        return 'Must provide a document ID'
    }

    if (typeof (dni) !== "string") {
        return 'Incorrect document ID'
    }

    if (dni.length > 9) {
        return 'Maximum 8 letters and 1 character'
    }
}

const validatePhone = (phone: string) => {
    const spanishPhoneRegex = /^(?:\+34|0034|34)?[6-9]\d{8}$/

    if (!spanishPhoneRegex.test(phone)) {
        return 'Phone is not valid'
    }

    if (!phone) {
        return 'Must provide a phone'
    }

    if (typeof (phone) !== "string") {
        return 'Incorrect phone'
    }

    if (phone.length > 9) {
        return 'Maximum 9 characters'
    }
}

const validateName = (name: string) => {
    if (!name) {
        return 'Must provide a name'
    }

    if (name !== undefined && name.trim() !== '' && name.length >= 50) {
        return 'Maximum 50 characters'
    }

}

const validateLastName = (lastName: string) => {
    if (!lastName) {
        return 'Must provide a last name'
    }

    if (lastName !== undefined && lastName.trim() !== '' && lastName.length >= 50) {
        return 'Maximum 50 characters'
    }

}

const validateService = (service: string) => {
    if (!service) {
        return 'Must provide a service'
    }
    const validService = ['physiotherapy', 'osteopathy']
    const serviceTrue = service.toLowerCase()

    if (!validService.includes(serviceTrue)) {
        return 'Incorrect service, please choose a valid service (physiotherapy, osteopathy)'
    }

}

const validateDate = (date: string) => {
    let today = dayjs()

    if (!date) {
        return 'Must provide a date'
    }

    if (!/^\d{2}-\d{2}-\d{4}$/.test(date)) {
        return 'Incorrect date, please choose a valid date DD-MM-YYYY'
    }

    if (dayjs(date, "DD-MM-YYYY").isBefore(today, 'day')) {
        return 'Current date is before selected date. Please, choose a valid date.'
    }


}

const validateAppointmentHour = (selectedHour: string) => {
    if (!selectedHour) {
        return 'Must provide a hour'
    }

    if (typeof (selectedHour) !== "string") {
        return 'Incorrect hour'
    }

    const validHours = ['09:00', '10:15', '11:30', '12:45', '16:00', '17:15', '18:30']

    if (!validHours.includes(selectedHour)) {
        return 'Incorrect hour, please choose a valid hour (09:00, 10:15, 11:30, 12:45, 14:00, 16:00, 17:15, 18:30)'
    }
}

const validateDateHour = (date: string, hour: string) => {
    let today = dayjs()

    if (dayjs(date, "DD-MM-YYYY").isBefore(today, 'day')) {
        return 'Current date is before selected date. Please, choose a valid date.'
    }

}

export {
    validateEmail,
    validatePassword,
    validateDni,
    validatePhone,
    validateName,
    validateLastName,
    validateService,
    validateDate,
    validateAppointmentHour
}