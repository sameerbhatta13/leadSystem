const cron = require('node-cron')
const Auth = require('../src/auth/auth.model')
const sendEmail = require('../src/utils/sendEmail')


const scheduleEmail = () => {
    cron.schedule('0 11 * * *', async () => {
        console.log('checking follow up')
        const currDate = new Date()

        const userToFollowup = await Auth.find({
            status: 'active',
            // visitdate:{$lte:currDate},
            folloUp: { $lte: currDate, }

        })

        for (const user of userToFollowup) {
            try {
                //send the followup emails
                await sendEmail({
                    subject: ` MAKE A CALL TO ${user.name}`,
                    html: `<h1>here is the detail information of the ${user.name}</h1>
                    <p>student phone Number:<b> ${user.phone} </b></p>
                    <p>student phone Number:<b> ${user.email} </b></p>
                    <p>student enquires for:<b> ${user.service}</b></p>
                    <p>course fees:<b> ${user.budget} </b></p>
                    `
                })

                user.status = 'followup'
                user.isFollowUp = true
                await user.save()
                console.log('follow up email is send ')
            } catch (error) {
                console.error(`Error sending email to ${user.name}:`, error);
            }

        }
    })
}

module.exports = scheduleEmail
