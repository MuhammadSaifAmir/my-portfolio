// Import the Axios library
const axios = require('axios');

// Handler function for the serverless function
exports.handler = async (event) => {
    // Parse incoming data
    const data = JSON.parse(event.body);
    
    // Construct the request payload
    const { service_id, template_id, user_id, template_params } = data;
    const { from_name, from_email, message, age, education, field_of_interest, programming_skills } = template_params;

    // Prepare the data for EmailJS service
    const emailData = {
        service_id,
        template_id,
        user_id,
        template_params: {
            from_name,
            from_email,
            message,
            age,
            education,
            field_of_interest,
            programming_skills
        }
    };

    try {
        // Make a POST request using Axios
        const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData);
        console.log('Email sent:', response.data);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully', data: response.data })
        };
    } catch (error) {
        console.error('Failed to send email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email', error: error.message })
        };
    }
};
