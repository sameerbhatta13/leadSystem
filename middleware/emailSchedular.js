const cron = require('node-cron')
const Auth = require('../src/auth/auth.model')
const sendEmail = require('../src/utils/sendEmail')


const scheduleEmail = () => {
    cron.schedule('04 12 * * *', async () => {
        console.log('checking follow up')
        // const statuses = ['Follow Up', 'Client', 'Student']
        const currDate = new Date()
        currDate.setUTCHours(0, 0, 0, 0)
        const nextDate = new Date(currDate)
        nextDate.setUTCDate(currDate.getUTCDate() + 1)

        console.log('nextdate', nextDate)

        const userToFollowup = await Auth.find({
            status: 'Follow Up',
            // visitdate:{$lte:currDate},
            followUp: {
                $gte: currDate,
                $lt: nextDate

            },
            // isFollowUp: false

        })
        console.log('currDate', currDate)
        console.log(userToFollowup)

        for (const user of userToFollowup) {
            console.log('sending email to ')
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

                // user.status = 'followup'
                // user.isFollowUp = true
                await user.save()
                console.log('follow up email is send ')
            } catch (error) {
                console.error(`Error sending email to ${user.name}:`, error);
            }

        }
    })
}


const scheduleEmailForClient = () => {
    cron.schedule('44 13 * * *', async () => {
        console.log('checking client followup')

        const currDate = new Date()
        currDate.setUTCHours(0, 0, 0, 0)

        const tensDayBefore = new Date(currDate)
        tensDayBefore.setUTCDate(currDate.getUTCDate() + 10)

        const statuses = ["Client", "Student"]
        console.log('currdate', currDate)
        console.log('nextdate', tensDayBefore)

        const userToRemind = await Auth.find({
            status: { $in: statuses },
            endDate: {
                $lte: tensDayBefore
            }
        })
        console.log(userToRemind.length)
        console.log("userToRemind", userToRemind)
        for (const user of userToRemind) {
            // console.log('user to followup', userToRemind)
            try {
                await sendEmail({
                    subject: ` Reminder: Your Project Deadline is Approaching: ${user.name}`,
                    html: `<h1>Client Name ${user.name}</h1>
                    <p>Client phone Number:<b> ${user.phone} </b></p>
                    <p>This is a reminder that your deadline is on <b>${user.endDate}</b></p>
                    <p>Please ensure all necessary actions are completed before the due date </b></p>
                    <p>student phone Number:<b> ${user.email} </b></p>
                    <p>student enquires for:<b> ${user.service}</b></p>
                    <p>course fees:<b> ${user.budget} </b></p>`

                })

                console.log('follow up email send')
            } catch (error) {
                console.error(`Error sending email to ${user.name}:`, error);
            }
        }

    })
}

module.exports = { scheduleEmail, scheduleEmailForClient }
