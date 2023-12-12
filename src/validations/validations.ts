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
    if (name !== undefined && name.trim() !== '' && name.length >= 50) {
        return 'Maximum 50 characters'
    }

    if (!name) {
        return 'Must provide a name'
    }
}

const validateLastName = (lastName: string) => {
    if (lastName !== undefined && lastName.trim() !== '' && lastName.length >= 50) {
        return 'Maximum 50 characters'
    }

    if (!lastName) {
        return 'Must provide a last name'
    }
}

const validateService = (service: string) => {
    const validService = ['physiotherapy', 'osteopathy']

    if (!validService.includes(service)) {
        return 'Incorrect service, please choose a valid service (physiotherapy, osteopathy)'
    }

    if (!service) {
        return 'Must provide a service'
    }
}

const validateDate = (date: string) => {
    const currentDate = dayjs()
    const selectDate = dayjs(date)

    if (selectDate.isBefore(currentDate, 'day')) {
        return 'Current date is before selected date. Please, choose a valid date.'
    }

    if (!selectDate.isValid() || selectDate < currentDate) {
        return 'Invalid date, before the appointment creation'
    }

    if (!selectDate) {
        return 'Must provide a date'
    }

}

const validateAppointmentHour = (selectedHour: string) => {
    if (!selectedHour) {
        return 'Must provide a hour'
    }

    if (typeof (selectedHour) !== "string") {
        return 'Incorrect hour'
    }

    const validHours = ['09:00', '10:15', '11:30', '12:45',  '16:00', '17:15', '18:30']

    if (!validHours.includes(selectedHour)) {
        return 'Incorrect hour, please choose a valid hour (09:00, 10:15, 11:30, 12:45, 14:00, 16:00, 17:15, 18:30)'
    }
}

// const validateAppointment = (selectedDate: string, selectedHour: string) => {
    
//     const currentDate = dayjs();
//     const selectDate = dayjs(selectedDate);

//     if (selectDate.isBefore(currentDate, 'day')) {
//         return 'Current date is before selected date. Please, choose a valid date'
//     }

//     if (!selectDate.isValid() || selectDate < currentDate) {
//         return 'Invalid date, before the appointment creation'
//     }

//     if (!selectedHour) {
//         return 'Must provide an hour'
//     }

//     if (typeof selectedHour !== "string") {
//         return 'Incorrect hour'
//     }

//     const validHours = ['09:00', '10:15', '11:30', '12:45', '16:00', '17:15', '18:30']

//     if (!validHours.includes(selectedHour)) {
//         return 'Incorrect hour, please choose a valid hour (09:00, 10:15, 11:30, 12:45, 16:00, 17:15, 18:30)'
//     }

//     // Validacion de solapamiento de citas
//     const newAppointmentStart = dayjs(`${selectedDate} ${selectedHour}`)
//     const newAppointmentEnd = newAppointmentStart.add(1, 'hour')

//     // Almacenamos las citas existentes
//     const existingAppointments = [
//         { date: '2023-01-15', startTime: '10:00', endTime: '11:00' },
//         { date: '2023-01-16', startTime: '14:00', endTime: '15:30' },
//     ]

//     // Check for overlap with existing appointments
//     for (const appointment of existingAppointments) {
//         const existingAppointmentStart = dayjs(`${appointment.date} ${appointment.startTime}`);
//         const existingAppointmentEnd = dayjs(`${appointment.date} ${appointment.endTime}`);

//         if (
//             (newAppointmentStart.isAfter(existingAppointmentStart) && newAppointmentStart.isBefore(existingAppointmentEnd)) ||
//             (newAppointmentEnd.isAfter(existingAppointmentStart) && newAppointmentEnd.isBefore(existingAppointmentEnd)) ||
//             (newAppointmentStart.isSameOrBefore(existingAppointmentStart) && newAppointmentEnd.isSameOrAfter(existingAppointmentEnd))
//         ) {
//             return 'The new appointment overlaps with an existing appointment. Please choose another date or time.';
//         }
//     }

//     // If it passes all validations, the appointment is valid
//     return 'The new appointment is valid.';
// }


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