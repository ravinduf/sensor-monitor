const emailNotification = require('./notificationMethods/emailNotification')
const smsNotification = require('./notificationMethods/smsNotification')

const notificationSender = ({notifier}) => {
    if(notifier.email){
        emailNotification();
    }

    else if (notifier.phoneNumber) {
        smsNotification();
        voiceNotification()
    }
}

