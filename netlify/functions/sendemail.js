const emailjs = require('emailjs-com');
emailjs.init(process.env.EMAILJS_USER_ID);

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);

    // Log incoming request body
    console.log('Received body:', body);

    const { service_id, template_id, user_id, template_params } = body;

    // Log extracted values
    console.log('Service ID:', service_id);
    console.log('Template ID:', template_id);
    console.log('User ID:', user_id);
    console.log('Template Params:', template_params);

    if (!service_id || !template_id || !user_id || !template_params) {
      console.log('Missing required parameters');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request body', error: 'Missing parameters' }),
      };
    }

    const response = await emailjs.send(service_id, template_id, template_params, user_id);

    // Log EmailJS response
    console.log('EmailJS response:', response);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully', response }),
    };
  } catch (error) {
    console.error('Error occurred:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error: error.toString() }),
    };
  }
};
