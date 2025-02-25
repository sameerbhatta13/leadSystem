const { v4: uuidV4 } = require('uuid')
const otpGenerator = () => {

    const uniqueId = uuidV4()
    const otp = uniqueId.replace(/\D/g, '').slice(0, 4)


    return newOtp = otp.padStart(4, '0')




}

module.exports = otpGenerator