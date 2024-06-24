const emailjs = require('emailjs-com');

exports.handler = async (event) => {
    console.log('Received event:', event);

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    let templateParams;
    try {
        templateParams = JSON.parse(event.body);
    } catch (error) {
        console.error('Failed to parse request body:', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid request body', error }),
        };
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const userId = process.env.EMAILJS_USER_ID;

    console.log('Using EmailJS serviceId:', serviceId, 'templateId:', templateId, 'userId:', userId);

    try {
        const response = await emailjs.send(serviceId, templateId, templateParams, userId);
        console.log('EmailJS response:', response);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!', response }),
        };
    } catch (error) {
        console.error('Failed to send email via EmailJS:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email', error }),
        };
    }
};
