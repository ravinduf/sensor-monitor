const emailNotification = require('./notificationMethods/emailNotification')
const smsNotification = require('./notificationMethods/smsNotification')

module.exports.notificationSender = function(notifiers) {
    notifiers.forEach(function(notifier) {
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
    });
}

