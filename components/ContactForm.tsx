import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { Button } from './Button';

const FormRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex items-center gap-4 px-4 py-2">
    <label className="w-20 text-base text-gray-800 dark:text-white flex-shrink-0">{label}</label>
    <div className="flex-1">
      {children}
    </div>
  </div>
);

export const ContactForm: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
        setSent(false);
        setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center text-center animate-app-open py-10">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
          <Send size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
        <p className="text-gray-500 dark:text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <BaseCard className="overflow-hidden mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <FormRow label="Name">
            <input 
              required 
              type="text" 
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              className="w-full bg-transparent text-black dark:text-white text-base py-2 focus:outline-none placeholder-gray-400"
              placeholder="John Doe"
            />
          </FormRow>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <FormRow label="Email">
            <input 
              required 
              type="email" 
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              className="w-full bg-transparent text-black dark:text-white text-base py-2 focus:outline-none placeholder-gray-400"
              placeholder="john@example.com"
            />
          </FormRow>
        </div>
        <div>
           <div className="flex items-start gap-4 px-4 py-2">
              <label className="w-20 text-base text-gray-800 dark:text-white pt-2 flex-shrink-0">Message</label>
              <div className="flex-1">
                <textarea 
                  required
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full bg-transparent text-black dark:text-white text-base py-2 focus:outline-none placeholder-gray-400 resize-none"
                  placeholder="I have a project idea..."
                />
              </div>
            </div>
        </div>
      </BaseCard>

      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
};