import React, { useState, useRef, useEffect } from 'react';
import AnimatedText from './AnimatedText';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    senderMail: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isClosing, setIsClosing] = useState(false);

  // Check if environment variables are loaded
  useEffect(() => {
    console.log('Checking EmailJS configuration...');
    if (!process.env.REACT_APP_EMAILJS_SERVICE_ID) {
      console.error('Missing REACT_APP_EMAILJS_SERVICE_ID');
    }
    if (!process.env.REACT_APP_EMAILJS_TEMPLATE_ID) {
      console.error('Missing REACT_APP_EMAILJS_TEMPLATE_ID');
    }
    if (!process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
      console.error('Missing REACT_APP_EMAILJS_PUBLIC_KEY');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSubmitStatus({ type: null, message: '' });
      setIsClosing(false);
    }, 300);
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    if (!process.env.REACT_APP_EMAILJS_SERVICE_ID || 
        !process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 
        !process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
      console.error('Missing EmailJS configuration');
      setSubmitStatus({
        type: 'error',
        message: 'Email service configuration error. Please contact the administrator.'
      });
      setIsSubmitting(false);
      return;
    }

    if (form.current) {
      console.log('Attempting to send email...');
      emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then((result) => {
        console.log('Email sent successfully:', result);
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.'
        });
        if (form.current) form.current.reset();
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send message. Please try again or contact me directly.'
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
    }
  };

  return (
    <div className="contact">
      <AnimatedText text="Contact Me" element="h1" delay={200} />
      
      <div className="contact-content">
        <section className="contact-info">
          <div className="contact-details">
            <div className="contact-item">
              <p>
                <strong>Email:</strong>
                <a href="mailto:goelnathan@gmail.com">goelnathan@gmail.com</a>
              </p>
            </div>
            <div className="contact-item">
              <p>
                <strong>Phone:</strong>
                <a href="tel:0502141321">050-214-1321</a>
              </p>
            </div>
            <div className="contact-item">
              <p>
                <strong>LinkedIn:</strong>
                <a href="https://www.linkedin.com/in/nathan-goel-015525174/" target="_blank" rel="noopener noreferrer">
                  Nathan Goel
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="contact-form">
          <AnimatedText text="Leave a Message" element="h2" delay={400} />
          <form ref={form} onSubmit={sendEmail} className="animated-text visible" style={{ transitionDelay: '600ms' }}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="senderMail">Your Email</label>
              <input
                type="email"
                id="senderMail"
                name="senderMail"
                placeholder="Enter your email"
                value={formData.senderMail}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group message-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`send-button ${isSubmitting ? 'submitting' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>
      </div>

      {submitStatus.message && (
        <div 
          className={`status-overlay ${isClosing ? 'closing' : ''}`}
          onClick={handleClosePopup}
        >
          <div 
            className={`status-popup ${submitStatus.type} ${isClosing ? 'closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="close-button"
              onClick={handleClosePopup}
              aria-label="Close"
            >
              ×
            </button>
            <p className="message">{submitStatus.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact; 