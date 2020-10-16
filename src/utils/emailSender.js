import emailjs from 'emailjs-com';

const SERVICE_ID = process.env.REACT_APP_SERVICE_ID
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID
const USER_ID = process.env.REACT_APP_USER_ID

export const emailSender = (parameter, message) => {
    let emailTemplateParams = {
        parameter: `${parameter}`,
        message: `${message}`,
        receiver_email: process.env.REACT_APP_RECEIVER_EMAIL
    };
     
    emailjs.send(SERVICE_ID, TEMPLATE_ID, emailTemplateParams, USER_ID)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
}
