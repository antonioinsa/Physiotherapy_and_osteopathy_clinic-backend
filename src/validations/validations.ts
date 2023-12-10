

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/
const dniRegex = /^[0-9]{8}[A-Za-z]$/
const spanishPhoneRegex = /^(?:\+34|0034|34)?[6-9]\d{8}$/


export{ emailRegex, passwordRegex, dniRegex, spanishPhoneRegex}