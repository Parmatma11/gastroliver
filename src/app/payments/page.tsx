import { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '../../components/layout/PageHero';
import { contactData } from '../../../data/contact';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Online Payment - UPI QR Code | Gastroliver Clinic Delhi",
  description: "Scan the UPI QR code to make safe online payments for consulting or diagnostic fees at Gastro Liver Endoscopy Centre, South Delhi.",
  alternates: {
    canonical: "/payments/",
  }
};

export default function PaymentsPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Payment' }
  ];

  return (
    <main className={styles.container}>
      <PageHero
        title="Online Payment"
        subtitle="Quick, safe, and direct UPI payment for clinic consulting and diagnostic tests"
        breadcrumbs={breadcrumbs}
        bannerImage="/images/clinic/hslider4.jpg"
      />

      <section className={`container ${styles.wrapper}`}>
        <div className={styles.paymentCard}>
          <div className={styles.instructionsBlock}>
            <h2>How to Pay via UPI</h2>
            <p className={styles.introText}>
              Scan the official Gastro Liver Endoscopy Centre UPI QR code below using any mobile payment application.
            </p>
            
            <ol className={styles.stepsList}>
              <li>Open GPay, PhonePe, Paytm, BHIM, or any mobile banking application.</li>
              <li>Select the <strong>Scan QR Code</strong> option within the app.</li>
              <li>Hold your camera over the QR code on this page.</li>
              <li>Verify the receiver name displays as <strong>GLEC - Gastro Liver Endoscopy Centre</strong>.</li>
              <li>Enter the payment amount and complete the transaction securely using your UPI PIN.</li>
            </ol>

            <div className={styles.receiptCallout}>
              <strong>Important:</strong> After successful payment, please take a screenshot of the receipt showing the Transaction ID, and send it to our clinic WhatsApp number <strong>{contactData.phone}</strong> to confirm your booking.
            </div>
          </div>

          <div className={styles.qrBlock}>
            <div className={styles.qrBorder}>
              <div className={styles.qrImageContainer}>
                <Image
                  src="/images/payments/upi_qr.jpeg"
                  alt="GLEC UPI QR Code for Payments"
                  fill
                  sizes="300px"
                  className={styles.qrImage}
                  priority
                />
              </div>
            </div>
            <span className={styles.qrLabel}>GLEC Official UPI QR Code</span>
            <span className={styles.acceptedLabel}>Accepted Apps: BHIM, GPay, Paytm, PhonePe & More</span>
          </div>
        </div>
      </section>
    </main>
  );
}
