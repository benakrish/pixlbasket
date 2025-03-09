import { useState, FormEvent } from 'react';
import { Button } from '../../common/Button';
import { sendEmail } from '../../services/emailService';
import './Contact.css';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // In a production environment, uncomment this line to actually send emails
      await sendEmail(formData);
      
      // For development/demo purposes, simulate sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <header className="contact-header">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </header>
        
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-info-item">
              <div className="contact-info-icon">📧</div>
              <div className="contact-info-text">
                <h3>Email</h3>
                <p>pixlbasket@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">📱</div>
              <div className="contact-info-text">
                <h3>Social</h3>
                <p>Follow us on Twitter and Discord</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">⏱️</div>
              <div className="contact-info-text">
                <h3>Response Time</h3>
                <p>We typically respond within 24-48 hours</p>
              </div>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Send Us a Message</h2>
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={formStatus === 'submitting'}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={formStatus === 'submitting'}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={formStatus === 'submitting'}
              >
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Game Feedback">Game Feedback</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Business Inquiry">Business Inquiry</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                disabled={formStatus === 'submitting'}
              ></textarea>
            </div>
            
            <div className="form-submit">
              <Button 
                type="submit" 
                size="lg" 
                fullWidth 
                isLoading={formStatus === 'submitting'}
                disabled={formStatus === 'submitting'}
              >
                Send Message
              </Button>
            </div>
            
            {formStatus === 'success' && (
              <div className="form-message success">
                Your message has been sent successfully. We'll get back to you soon!
              </div>
            )}
            
            {formStatus === 'error' && (
              <div className="form-message error">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;