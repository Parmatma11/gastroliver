import { contactData } from '../../../data/contact';
import styles from './ContactWidget.module.css';

export default function ContactWidget() {
  return (
    <div className={styles.grid}>
      {/* Phone */}
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.122-4.1-6.924-6.924l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        </div>
        <h4 className={styles.title}>Call Us</h4>
        <p className={styles.value}>
          <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`}>
            {contactData.phone}
          </a>
        </p>
        <span className={styles.label}>Emergency & Appointments</span>
      </div>

      {/* Email */}
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h4 className={styles.title}>Email Clinic</h4>
        <p className={styles.value}>
          <a href={`mailto:${contactData.emailPrimary}`}>
            {contactData.emailPrimary}
          </a>
        </p>
        {contactData.emailSecondary ? (
          <p className={styles.valueSec}>
            <a href={`mailto:${contactData.emailSecondary}`}>
              {contactData.emailSecondary}
            </a>
          </p>
        ) : null}
      </div>

      {/* Location */}
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
          </svg>
        </div>
        <h4 className={styles.title}>Location</h4>
        <p className={styles.valueAddress}>{contactData.address}</p>
        <a
          href={contactData.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapLink}
        >
          Open Google Maps
        </a>
      </div>

      {/* Opening Hours */}
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className={styles.title}>Working Hours</h4>
        <div className={styles.hoursContainer}>
          {contactData.openingHours.map((item, index) => (
            <div key={index} className={styles.hoursRow}>
              <span className={styles.days}>{item.days}</span>
              <span className={styles.hours}>{item.hours}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
