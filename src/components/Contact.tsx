import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useTranslation } from 'react-i18next';
import AboutMeSection from '../components/AboutMeSection';

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '', form: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', form: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { name: '', email: '', message: '', form: '' };

    // Validation logic...
    if (!formData.name.trim()) {
      newErrors.name = t('nameRequired');
      valid = false;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = t('validEmailRequired');
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = t('messageRequired');
      valid = false;
    }

    const apiKey = import.meta.env.VITE_API_KEY;

    const dev = import.meta.env.VITE_DEV_MODE;

    let url = import.meta.env.VITE_API_URL;

    if (dev === 'true') {
      url = 'http://localhost:8000';
    }

    if (valid) {
      setLoading(true);
      try {
        const response = await fetch(url + '/send_email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
        } else {
          const data = await response.json();
          setErrors({ ...errors, form: data.detail || 'An error occurred' });
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ ...errors, form: 'An error occurred while sending the email.' });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column - About Me Section */}
        <div className="flex flex-col justify-center">
          <AboutMeSection />
        </div>

        {/* Right Column - Contact Form */}
        <div className="flex flex-col justify-center">
          {isSubmitted ? (
            <div className="bg-green-100 text-green-800 p-4 rounded-md">
              {t('thankYouMessage')}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
            >
              <h1 className="text-4xl font-bold mb-8">{t('contactMe')}</h1>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('yourName')}
                </label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('namePlaceholder')}
                  required
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('yourEmail')}
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('emailPlaceholder')}
                  required
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('yourMessage')}
                </label>
                <Textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('messagePlaceholder')}
                  required
                  rows={6}
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
              </div>
              {errors.form && <p className="text-red-600 text-sm mt-1">{errors.form}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-md shadow-md transition-colors duration-300"
              >
                {loading ? t('sending') : t('sendMessage')}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
