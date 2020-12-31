const emailNotification = require('./notificationMethods/emailNotification')
const smsNotification = require('./notificationMethods/smsNotification')
const voiceNotification = require('./notificationMethods/voiceNotification')

module.exports.notificationSender = function(notifiers) {
    notifiers.forEach(function(notifier) {
        if(notifier.email){
            emailNotification.emailNotificationSend()
            return true
        }
    
        else if (notifier.phoneNumber) {
            smsNotification.smsNotificationSend()
            voiceNotification.voiceNotificationSend()
            return true
        } else {
            return false
        }
    });
}

