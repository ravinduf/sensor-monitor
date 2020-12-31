const emailNotification = require('./notificationMethods/emailNotification')
const smsNotification = require('./notificationMethods/smsNotification')
const voiceNotification = require('./notificationMethods/voiceNotification')

module.exports.notificationSender = function(notifiers) {
    notifiers.forEach(function(notifier) {
        if(notifier.email){
            emailNotification.emailNotificationSend(notifier.email)
            
        }
    
        if (notifier.number) {
            smsNotification.smsNotificationSend(notifier.number)
            voiceNotification.voiceNotificationSend(notifier.number)
            
        } else {
            return 
        }
    });
}

