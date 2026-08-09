'use client';

import React, { useState } from 'react';
import PageHero from '../../components/layout/PageHero';
import { contactData } from '../../../data/contact';
import Button from '../../components/ui/Button';
import styles from '../../app/contact/page.module.css';

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Contact Us' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Schedule a consultation, ask a question, or find GLEC clinic directions"
        breadcrumbs={breadcrumbs}
        bannerImage="/images/clinic/hslider4.jpg"
      />

      <section className={`container ${styles.wrapper}`}>
        {/* Info Columns */}
        <div className={styles.grid}>
          {/* Left Column: Details & Map */}
          <div className={styles.infoCol}>
            <h2>Clinic Details</h2>
            <p className={styles.clinicIntro}>
              Visit Gastro Liver Endoscopy Centre (GLEC) under Chief Consultant Gastroenterologist Dr. Ankita Gupta.
            </p>

            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Emergency Phone</span>
                <span className={styles.value}>
                  <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`}>{contactData.phone}</a>
                </span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.label}>Email Address</span>
                <span className={styles.value}>
                  <a href={`mailto:${contactData.emailPrimary}`}>{contactData.emailPrimary}</a>
                </span>
                {contactData.emailSecondary && (
                  <span className={styles.value}>
                    <a href={`mailto:${contactData.emailSecondary}`}>{contactData.emailSecondary}</a>
                  </span>
                )}
              </div>

              <div className={styles.detailItem}>
                <span className={styles.label}>Opening Hours</span>
                <div className={styles.hoursList}>
                  {contactData.openingHours.map((h, idx) => (
                    <div key={idx} className={styles.hoursRow}>
                      <span className={styles.days}>{h.days}:</span>
                      <span className={styles.hours}>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.label}>Clinic Address</span>
                <address className={styles.addressValue}>{contactData.address}</address>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className={styles.mapContainer}>
              <iframe
                title="Gastro Liver Endoscopy Centre Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.6063467634597!2d77.23460457633215!3d28.55156687570997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m2!2sGLEC%20-%20Gastro%20Liver%20Endoscopy%20Centre!5e0!3m2!1sen!2sin!4v1715012345678!5m2!1sen!2sin"
                width="100%"
                height="280"
                style={{ border: 0, borderRadius: '4px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className={styles.formCol}>
            <h2>Send a Message</h2>
            <p className={styles.formIntro}>
              Fill in the form below. Our clinic coordinator will contact you shortly to confirm details.
            </p>

            {submitted ? (
              <div className={styles.successMessage}>
                <h3>Thank You!</h3>
                <p>Your message has been successfully received. We will get back to you as soon as possible.</p>
                <button onClick={() => setSubmitted(false)} className={styles.resetBtn}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="How can we help you? Describe symptoms or request details"
                  />
                </div>

                <Button variant="primary" type="submit" size="md">
                  Submit Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
