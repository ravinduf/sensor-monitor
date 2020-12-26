const emailNotification = require('./notificationMethods/emailNotification')
const smsNotification = require('./notificationMethods/smsNotification')

// const notificationSender = ({notifier}) => {
//     if(notifier.email){
//         emailNotification();
//     }

//     else if (notifier.phoneNumber) {
//         smsNotification();
//         voiceNotification()
//     }
// }
module.exports.notificationSender = function(notifier) {
    if(notifier.email){
        emailNotification()
        return true
    }

    else if (notifier.phoneNumber) {
        smsNotification()
        voiceNotification()
        return true
    } else {
        return false
    }
}

