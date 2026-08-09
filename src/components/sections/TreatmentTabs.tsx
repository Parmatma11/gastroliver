'use client';

import { useState } from 'react';
import Image from 'next/image';
import { treatmentTabs } from '../../../data/homepage';
import Button from '../ui/Button';
import styles from './TreatmentTabs.module.css';

export default function TreatmentTabs() {
  const [activeTab, setActiveTab] = useState(treatmentTabs[0].id);

  const activeTabContent = treatmentTabs.find(tab => tab.id === activeTab) || treatmentTabs[0];

  const handleOpenAppointment = () => {
    const event = new CustomEvent('open-appointment');
    window.dispatchEvent(event);
  };

  return (
    <div className={styles.tabsContainer}>
      {/* Tabs List */}
      <div className={styles.tabsList} role="tablist" aria-label="Treatment categories">
        {treatmentTabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Image src={tab.icon} alt="" width={24} height={24} className={styles.tabIcon} />
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Panel */}
      <div className={styles.tabPanel} role="tabpanel">
        <div className={styles.panelGrid}>
          <div className={styles.panelImageColumn}>
            <div className={styles.panelImageWrapper}>
              <Image
                src={activeTabContent.image}
                alt={activeTabContent.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.panelImage}
              />
            </div>
          </div>
          <div className={styles.panelInfoColumn}>
            <h3 className={styles.panelTitle}>{activeTabContent.title}</h3>
            <p className={styles.panelDesc}>{activeTabContent.description}</p>
            <div className={styles.panelActions}>
              <Button variant="primary" size="md" onClick={() => window.location.href = activeTabContent.link}>
                View Treatment Guidelines
              </Button>
              <Button variant="outline" size="md" onClick={handleOpenAppointment}>
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
