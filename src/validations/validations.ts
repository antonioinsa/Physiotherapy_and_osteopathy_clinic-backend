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

const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) {
        return 'Must confirm password'
    }

    if (typeof confirmPassword !== 'string') {
        return 'Incorrect password'
    }

    if (confirmPassword.length > 12) {
        return 'Maximum 12 characters'
    }

    if (password !== confirmPassword) {
        return 'Passwords must match'
    }
}

const validateDni = (documentId: string) => {
    const dniRegex = /^[0-9]{8}[A-Za-z]$/

    if (!dniRegex.test(documentId)) {
        return 'Document ID is not valid'
    }

    if (!documentId) {
        return 'Must provide a document ID'
    }

    if (typeof (documentId) !== "string") {
        return 'Incorrect document ID'
    }

    if (documentId.length > 9) {
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
        return 'Current date is before selected date. Please, choose a valid date'
    }


}

const validateHour = (hour: string) => {
    let today = dayjs()

    if (!hour) {
        return 'Must provide an hour'
    }

    if (typeof (hour) !== "string") {
        return 'Incorrect hour'
    }

    const validHours = ['09:00', '10:15', '11:30', '12:45', '16:00', '17:15', '18:30']

    if (!validHours.includes(hour)) {
        return 'Incorrect hour, please choose a valid hour (09:00, 10:15, 11:30, 12:45, 16:00, 17:15, 18:30)'
    }

    if (dayjs(hour, "HH:mm").isBefore(today, 'minute')) {
        return 'Please choose another available hour'
    }

    const currentHour = dayjs().format("HH:mm")
    if (validHours.some(validHour => dayjs(validHour, "HH:mm").isBefore(currentHour, 'minute'))) {
        return 'Current hour exceeds available hours'
    }
}

const validateAppointment = (date: string, hour: string) => {
    let today = dayjs()
    const validHours = ['09:00', '10:15', '11:30', '12:45', '16:00', '17:15', '18:30']

    if (dayjs(date, "DD-MM-YYYY").isSame(today, 'day') && dayjs(hour, "HH:mm").isBefore(today, 'minute')) {
        return 'Current hour is before selected hour. Please choose a valid hour'
    }

    if (dayjs(date, "DD-MM-YYYY").isSame(today, 'day') && validHours.includes(hour)) {
        return 'Please choose another available hour or another day'
    }

    if (dayjs(date, "DD-MM-YYYY").isBefore(today, 'day')) {
        return 'Current date is before selected date. Please choose a valid date'
    }

    if (!validHours.includes(hour)) {
        return 'Please choose a valid hour (09:00, 10:15, 11:30, 12:45, 16:00, 17:15, 18:30)'
    }
}

const validateTown = (town: string) => {
    if (town.length < 4 || town.length > 30) {
        return 'Minimum 4 and Maximum 30 characters'
    }

    if (/\s/.test(town) && /^\s|\s$/.test(town)) {
        return 'Cannot contain spaces at the beginning or end'
    }

    if (!/^[a-zA-Z0-9\s']+$/g.test(town)) {
        return 'Cannot contain special characters, except apostrophe'
    }
}

const validateCountry = (country: string) => {
    if (country.length < 4 || country.length > 30) {
        return 'Minimum 4 and Maximum 30 characters'
    }

    if (/\s/.test(country) && /^\s|\s$/.test(country)) {
        return 'Cannot contain spaces at the beginning or end'
    }

    if (!/^[a-zA-Z0-9\s']+$/g.test(country)) {
        return 'Cannot contain special characters, except apostrophe'
    }
}

const validateZipCode = (zipCode: string) => {
    if (zipCode.length !== 5) {
        return 'Must have exactly 5 characters'
    }
}

const validateDoor = (door: string) => {
    if (door.length < 1 || door.length > 4) {
        return 'Minimum 1 and Maximum 4 characters'
    }

    if (!/\d/.test(door)) {
        return 'Must contain at least one number'
    }

    if (!/^[a-zA-Z0-9]{0,4}$/.test(door)) {
        return 'Maximum 4 characters'
    }

    if (/\s/.test(door) && /^\s|\s$/.test(door)) {
        return 'Cannot contain spaces at the beginning or end'
    }

    if (!/^[a-zA-Z0-9\s]*$/g.test(door)) {
        return 'Cannot contain special characters'
    }
}

const validateStreet = (street: string) => {
    if (street.length < 4 || street.length > 100) {
        return 'Minimum 4 and Maximum 100 characters'
    }

    if (/\s/.test(street) && /^\s|\s$/.test(street)) {
        return 'Cannot contain spaces at the beginning or end'
    }

    if (!/^[a-zA-Z0-9\s']+$/g.test(street)) {
        return 'Cannot contain special characters, except apostrophe'
    }
}

const validateSpecialty = (specialty: string) => {
    if (!specialty) {
        return 'Must provide a specialty'
    }

    if (typeof specialty !== 'string') {
        return 'Incorrect specialty'
    }

    if (specialty !== 'physiotherapy' && specialty !== 'osteopathy') {
        return 'You must choose a valid specialty (physiotherapy, osteopathy)'
    }
}

const validatePicture = (picture: string) => {
    if (!picture) {
        return 'Must provide a picture'
    }

    if (typeof picture !== 'string') {
        return 'Incorrect picture'
    }

    if (picture.length > 255) {
        return 'Maximum 255 characters'
    }

    if (!/^https?:\/\/\S+$/.test(picture)) {
        return 'Picture must be a valid URL'
    }

    if (!/\.(jpg|jpeg|png)$/i.test(picture)) {
        return 'Picture must be a valid URL with a valid format (jpg, jpeg, png)'
    }
}

const validateRole = (role: string) => {
    if (!role) {
        return 'Must provide a role'
    }

    if (typeof role !== 'string') {
        return 'Incorrect role'
    }

    if (role !== 'user' && role !== 'admin') {
        return 'You must choose a valid role (user, admin)'
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
    validateHour,
    validateAppointment,
    validateConfirmPassword,
    validateTown,
    validateCountry,
    validateZipCode,
    validateDoor,
    validateStreet,
    validateSpecialty,
    validatePicture,
    validateRole
}
