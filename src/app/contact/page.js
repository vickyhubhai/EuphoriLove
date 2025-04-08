"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../_components/shared/Navbar';

const FAQ = [
  {
    question: "How do I create a room?",
    answer: "Simply click the 'Create a Room' button on the homepage and share the room code with your partner. You can then start listening to music together!"
  },
  {
    question: "Is EuphoriLove free to use?",
    answer: "Yes, EuphoriLove is completely free to use with all basic features. We may introduce premium features in the future, but the core functionality will always remain free."
  },
  {
    question: "Can I use EuphoriLove on mobile?",
    answer: "Yes, EuphoriLove is fully responsive and works on all devices including smartphones and tablets. You can enjoy the same experience across all your devices."
  },
  {
    question: "How does the voice chat feature work?",
    answer: "The voice chat feature uses WebRTC technology to enable real-time voice communication. Just click the microphone button to start talking with your partner in the room."
  },
  {
    question: "Can I customize my room?",
    answer: "Yes! You can personalize your room with different themes, backgrounds, and even add shared notes. These customizations help create a unique experience for you and your partner."
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const faqRef = useRef(null);

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
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! We will get back to you soon.'
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
    // Scroll to the expanded FAQ item
    if (faqRef.current) {
      const faqItems = faqRef.current.children;
      if (faqItems[index]) {
        faqItems[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Image src="/heart.png" alt="Contact" width={60} height={60} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold gradient-text mb-4">Contact Us</h1>
          <p className="text-white/80">
            Have questions or suggestions? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="glass-effect p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-primary w-full"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-primary w-full"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-primary w-full"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="input-primary w-full"
                  placeholder="Your message..."
                />
              </div>

              {status.message && (
                <div className={`p-4 rounded-lg ${
                  status.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="glass-effect p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar" ref={faqRef}>
              {FAQ.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-white/10 pb-4 last:border-0"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left flex items-center justify-between py-2 hover:text-primary-400 transition-colors"
                  >
                    <h3 className="text-white font-medium">{item.question}</h3>
                    <svg
                      className={`w-5 h-5 text-white/60 transform transition-transform ${
                        expandedFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedFAQ === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <p className="text-white/70 pt-2">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}