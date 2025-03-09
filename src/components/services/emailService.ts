import emailjs from 'emailjs-com';

interface EmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (params: EmailParams): Promise<void> => {
  // Replace these with your actual EmailJS credentials
  const serviceId = 'service_ngxd1ja';
  const templateId = 'template_sdpxf0u';
  const userId = 'MDP6xIT74D8xZ8OL2';
  
  const templateParams = {
    from_name: params.name,
    reply_to: params.email,
    subject: params.subject,
    message: params.message,
    to_email: 'pixlbasket@gmail.com'
  };
  
  try {
    await emailjs.send(serviceId, templateId, templateParams, userId);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};