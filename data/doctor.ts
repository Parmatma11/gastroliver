import { Doctor } from '../types/content';

export const doctorData: Doctor = {
  name: "Dr. Ankita Gupta",
  designation: "Gastroenterologist, Hepatologist, Endoscopist",
  qualifications: [
    "M.B.B.S",
    "M.D. (Medicine)",
    "DM (Gastroenterology) - Gold Medalist"
  ],
  experienceYears: 15,
  education: [
    {
      degree: "M.B.B.S",
      institution: "Government Medical College"
    },
    {
      degree: "M.D. (Medicine)",
      institution: "Christian Medical College, Ludhiana",
      year: 2012
    },
    {
      degree: "DM (Gastroenterology)",
      institution: "Dayanand Medical College",
      year: 2015
    }
  ],
  fellowships: [
    "Advanced Endoscopy & Luminal Gastroenterology, Sir Ganga Ram Hospital, New Delhi (2016-17)"
  ],
  specialTraining: [
    "GI Motility Training, American Neurogastroenterology and Motility Studies, Medical College of Georgia (Digestive Health Centre), Georgia, USA"
  ],
  memberships: [
    "European Society of Medical Oncology"
  ],
  bio: `Dr. Ankita Gupta is a leading Gastroenterologist, Hepatologist and Endoscopist practicing in South Delhi. With over 15 years of experience in the medical field, she is dedicated to providing high-quality care to patients with digestive, liver, and biliary disorders. 

She completed her MD from the prestigious Christian Medical College, Ludhiana in 2012, followed by her DM in Gastroenterology from Dayanand Medical College, where she was awarded a Gold Medal for academic excellence. She then pursued a Fellowship in Advanced Endoscopy & Luminal Gastroenterology at the world-renowned Sir Ganga Ram Hospital in New Delhi (2016-17). 

Furthering her specialized training, she undertook GI Motility studies at the Medical College of Georgia's Digestive Health Centre in the USA. She has expertise in a wide array of advanced endoscopic procedures, including UGI endoscopy, colonoscopy, ERCP, capsule endoscopy, esophageal manometry, and Fibroscan.`,
  profileImage: "/images/doctor/profile_main.jpg",
  introImages: [
    "/images/doctor/intro_1.jpg",
    "/images/doctor/intro_2.jpg"
  ],
  certificates: [
    "/images/doctor/certificates/certificate_main.jpg",
    "/images/doctor/certificates/certificate_1.jpg",
    "/images/doctor/certificates/certificate_2.jpg",
    "/images/doctor/certificates/certificate_4.jpg",
    "/images/doctor/certificates/certificate_5.jpg",
    "/images/doctor/certificates/certificate_6.jpg",
    "/images/doctor/certificates/certificate_7.jpg",
    "/images/doctor/certificates/certificate_8.jpg",
    "/images/doctor/certificates/certificate_9.jpg",
    "/images/doctor/certificates/certificate_10.jpg",
    "/images/doctor/certificates/certificate_11.jpg",
    "/images/doctor/certificates/certificate_12.jpg"
  ],
  careerTimeline: [
    {
      period: "2020 - Present",
      role: "Director & Chief Consultant",
      institution: "GLEC - Gastro Liver Endoscopy Centre, South Delhi",
      image: "/images/doctor/career/gastroliver-2020.jpg"
    },
    {
      period: "2018 - 2020",
      role: "Consultant Gastroenterologist",
      institution: "Nayati Hospital",
      image: "/images/doctor/career/nayati_hospital.jpg"
    },
    {
      period: "2017 - 2018",
      role: "Consultant Gastroenterologist",
      institution: "Primus Hospital, New Delhi",
      image: "/images/doctor/career/primus_hospital.jpg"
    },
    {
      period: "2016 - 2017",
      role: "Fellow in Advanced Endoscopy",
      institution: "Sir Ganga Ram Hospital, New Delhi",
      image: "/images/doctor/career/fellowship.jpg"
    },
    {
      period: "2012 - 2015",
      role: "Resident (DM Gastroenterology)",
      institution: "Dayanand Medical College",
      image: "/images/doctor/career/medical_college.jpg"
    }
  ]
};
