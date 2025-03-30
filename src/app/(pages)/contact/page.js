"use client";
import Image from 'next/image';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://discord.com/api/webhooks/1355495798367846451/aQhZrPP1W4mAooGPTkMLgzi0Q_R6PPsU20q4gBFAbPyJsHTTfWodPMk_zBpizsIi0zdK', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [{
            title: 'New Contact Form Submission',
            color: 0x5865F2,
            fields: [
              { name: 'Name', value: formData.name || 'Not provided', inline: true },
              { name: 'Email', value: formData.email || 'Not provided', inline: true },
              { name: 'Message', value: formData.message || 'Not provided' }
            ],
            timestamp: new Date().toISOString()
          }]
        })
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full h-full min-h-screen bg-background background-gradient overflow-hidden' suppressHydrationWarning>
      <div className='flex flex-col max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8' suppressHydrationWarning>
        
        
        {/* Glassmorphism blurs */}
        <div className='absolute -bottom-32 -left-32 bg-primary-600/20 w-[700px] h-[700px] rounded-full blur-3xl' suppressHydrationWarning></div>
        <div className='absolute -top-16 -right-40 bg-secondary-500/20 w-[500px] h-[500px] rounded-full blur-3xl' suppressHydrationWarning></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-500/10 w-[900px] h-[900px] rounded-full blur-3xl -z-10' suppressHydrationWarning></div>
        
        <main className="glass-effect rounded-xl p-8 mt-8 relative z-10" suppressHydrationWarning>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Get in Touch</h1>
              <p className="text-white/80 mb-8 leading-relaxed">
                Have questions, suggestions, or just want to say hello? We'd love to hear from you! Fill out the form and we'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group cursor-glow-secondary">
                  <div className="h-12 w-12 rounded-full bg-primary-600/30 flex items-center justify-center group-hover:bg-primary-600/50 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Email Us</h3>
                    <p className="text-white/70">contact@euphori-love.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group cursor-glow-secondary">
                  <div className="h-12 w-12 rounded-full bg-secondary-600/30 flex items-center justify-center group-hover:bg-secondary-600/50 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Location</h3>
                    <p className="text-white/70">Globally, We handle Remotely</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group cursor-glow-secondary">
                  <div className="h-12 w-12 rounded-full bg-accent-600/30 flex items-center justify-center group-hover:bg-accent-600/50 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Hours</h3>
                    <p className="text-white/70">24/7 - We're Always Online</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-8 md:mt-0">
              {submitSuccess ? (
                <div className="glass-effect p-8 rounded-xl border border-primary-500/30 text-center">
                  <div className="h-16 w-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold gradient-text mb-2">Message Sent!</h3>
                  <p className="text-white/80">Thank you for reaching out. We'll get back to you soon!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-xl border border-primary-500/30">
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-white/80 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-primary w-full transition-all duration-300 focus:shadow-lg focus:shadow-primary-500/20"
                      placeholder="Your Full Name"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-white/80 mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-primary w-full transition-all duration-300 focus:shadow-lg focus:shadow-primary-500/20"
                      placeholder="youremail@example.com"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-white/80 mb-2">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="input-primary w-full transition-all duration-300 focus:shadow-lg focus:shadow-primary-500/20"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full group transition-all duration-300 transform hover:translate-y-[-2px] cursor-glow"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span>Send Message</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContactPage;