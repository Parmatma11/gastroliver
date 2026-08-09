# PowerShell script to download all gastroliver.in assets in an organized structure

$remoteBase = "https://gastroliver.in/wp-content/uploads/"
$localBase = Join-Path $PSScriptRoot "..\public\images"

# List of assets: RemotePath -> LocalPath (relative to $localBase)
$assets = @{
    # Branding
    "2022/01/favicon.png" = "logo\favicon.png"
    "2022/02/Esophageal-Stricture-banner.jpg" = "logo\hospital-banner.jpg"
    "2025/01/carousel-1.jpg" = "logo\hospital-carousel-1.jpg"

    # Hero / Slider
    "2022/01/ankita_gupta_banner.jpg" = "hero\banner_1.jpg"
    "2022/01/ankita_gupta_staff.jpg" = "hero\banner_2.jpg"

    # Doctor Profile
    "2026/04/WhatsApp-Image-2026-04-10-at-6.29.46-PM.jpeg" = "doctor\profile_main.jpg"
    "2026/04/WhatsApp-Image-2026-04-24-at-3.59.26-PM.jpeg" = "doctor\intro_1.jpg"
    "2026/05/WhatsApp-Image-2026-04-29-at-5.38.14-PM-1.jpeg" = "doctor\intro_2.jpg"
    "2026/05/WhatsApp-Image-2026-04-29-at-5.29.14-PM.jpeg" = "doctor\appointment_doc.jpg"

    # Doctor Certificates
    "2022/01/certificate.jpg" = "doctor\certificates\certificate_main.jpg"
    "2022/01/certificate1.jpg" = "doctor\certificates\certificate_1.jpg"
    "2022/01/certificate2.jpg" = "doctor\certificates\certificate_2.jpg"
    "2022/01/certificate4.jpg" = "doctor\certificates\certificate_4.jpg"
    "2022/01/certificate5.jpg" = "doctor\certificates\certificate_5.jpg"
    "2022/01/certificate6.jpg" = "doctor\certificates\certificate_6.jpg"
    "2022/01/certificate7.jpg" = "doctor\certificates\certificate_7.jpg"
    "2022/01/certificate8.jpg" = "doctor\certificates\certificate_8.jpg"
    "2022/01/certificate9.jpg" = "doctor\certificates\certificate_9.jpg"
    "2022/01/certificate10.jpg" = "doctor\certificates\certificate_10.jpg"
    "2022/01/certificate11.jpg" = "doctor\certificates\certificate_11.jpg"
    "2022/01/certificate12.jpg" = "doctor\certificates\certificate_12.jpg"

    # Doctor Career Timeline
    "2022/03/gastroliver-2020onwords.jpg" = "doctor\career\gastroliver-2020.jpg"
    "2022/03/nayati_hospital.jpg" = "doctor\career\nayati_hospital.jpg"
    "2022/03/primus_hospital.jpg" = "doctor\career\primus_hospital.jpg"
    "2022/01/tanning.jpg" = "doctor\career\training.jpg"
    "2022/01/old-clinic1.jpg" = "doctor\career\old-clinic1.jpg"
    "2022/01/old-clinic2.jpg" = "doctor\career\old-clinic2.jpg"
    "2022/01/old-clinic3.jpg" = "doctor\career\old-clinic3.jpg"
    "2022/01/old-clinic4.jpg" = "doctor\career\old-clinic4.jpg"
    "2022/01/old-clinic5.jpg" = "doctor\career\old-clinic5.jpg"
    "2022/01/old-clinic6.jpg" = "doctor\career\old-clinic6.jpg"
    "2022/01/medical_collage.jpg" = "doctor\career\medical_college.jpg"
    "2022/01/aig_hydrabad.jpg" = "doctor\career\aig_hyderabad.jpg"
    "2022/01/advanced-training.jpg" = "doctor\career\advanced-training.jpg"
    "2022/01/fellowship.jpg" = "doctor\career\fellowship.jpg"
    "2022/01/pvc_kochi.jpg" = "doctor\career\pvc_kochi.jpg"

    # Quick Action Cards
    "2022/01/24x7-emergency.jpg" = "hero\emergency_card.jpg"
    "2022/01/schedule-hours.jpg" = "hero\schedule_card.jpg"

    # Condition Tabs
    "2022/01/gas-and-bloating.jpg" = "diseases\tabs\abdominal_pain.jpg"
    "2022/01/acidity-and-reflux.jpg" = "diseases\tabs\acidity_reflux.jpg"
    "2022/01/diarrhoea-and-constipation.jpg" = "diseases\tabs\diarrhea_constipation.jpg"
    "2022/01/abdomen-pain.jpg" = "diseases\tabs\gas_bloating.jpg"
    "2022/02/gastro-intestinal-bleeding.jpg" = "diseases\tabs\gi_bleeding.jpg"
    "2022/01/alcoholism-and-liver-diseases.jpg" = "diseases\tabs\liver_diseases.jpg"
    "2022/01/jaundice.jpg" = "diseases\tabs\jaundice.jpg"
    "2022/01/piles.jpg" = "diseases\tabs\piles.jpg"

    # Condition Icons (PNG)
    "2022/02/abdominal_pain.png" = "icons\abdominal_pain.png"
    "2022/02/dyspepsia.png" = "icons\dyspepsia.png"
    "2022/02/constipation.png" = "icons\constipation.png"
    "2022/02/gas_and_bloating.png" = "icons\gas_bloating.png"
    "2022/02/intestinal_bleeding.png" = "icons\intestinal_bleeding.png"
    "2022/02/alcoholism.png" = "icons\alcoholism.png"
    "2022/02/jaundice.png" = "icons\jaundice.png"
    "2022/02/piles.png" = "icons\piles.png"

    # Facility Icons
    "2022/01/cholangioscopy.png" = "icons\cholangioscopy.png"
    "2022/01/ercp.png" = "icons\ercp.png"
    "2022/02/capsule-endoscopy-img.png" = "icons\capsule_endoscopy.png"
    "2022/01/poem.png" = "icons\poem.png"
    "2022/01/ugi-endoscopy.png" = "icons\ugi_endoscopy.png"
    "2022/01/manometry.png" = "icons\manometry.png"
    "2022/01/colonoscopy.png" = "icons\colonoscopy.png"
    "2022/02/fibroscan-img.png" = "icons\fibroscan.png"
    "2022/01/dietician.png" = "icons\dietician.png"

    # Process Steps
    "2022/01/make-appointment.jpg" = "icons\step_make_appointment.jpg"
    "2022/01/get-consultation.jpg" = "icons\step_get_consultation.jpg"
    "2022/01/get-examined.jpg" = "icons\step_get_examined.jpg"
    "2022/01/get-cure-and-relief.jpg" = "icons\step_get_cure_relief.jpg"

    # Homepage Gallery (NextGEN thumbnails/source)
    "2022/01/client.jpg" = "gallery\clinic_interior_1.jpg"
    "2022/01/office.jpg" = "gallery\clinic_interior_2.jpg"
    "2022/01/hslider4.jpg" = "gallery\endoscopy_room_1.jpg"
    "2021/12/hslider5.jpg" = "gallery\liver_specialist.jpg"
    "2022/01/hslider6.jpg" = "gallery\staff_group_1.jpg"
    "2022/01/hslider7.jpg" = "gallery\fibroscan_machine.jpg"
    "2022/01/hslider8-1.jpg" = "gallery\bp_check_patient.jpg"
    "2022/01/dr-ankita.jpg" = "gallery\dr_ankita_clinic.jpg"
    "2022/01/hslider9.jpg" = "gallery\staff_group_2.jpg"
    "2022/01/patient.jpg" = "gallery\patient_care.jpg"

    # Testimonials
    "2022/01/male_avtar.png" = "testimonials\male_avatar.png"
    "2022/01/female_avtar.png" = "testimonials\female_avatar.png"

    # Payment
    "2022/07/upi.jpeg" = "payments\upi_qr.jpeg"

    # Weight Loss
    "2026/04/Group-4.webp" = "blog\weight-loss-group-4.webp"
    "2026/04/Group-16-2.webp" = "blog\weight-loss-group-16.webp"
    "2026/04/Group-5.webp" = "blog\weight-loss-group-5.webp"
    "2026/04/Group-9-1.webp" = "blog\weight-loss-group-9.webp"

    # Core Side Images for Disease/Procedure Pages
    "2022/02/Dyspepsia-side-cm.jpg" = "diseases\side_dyspepsia.jpg"
    "2022/02/Abdomen-pain-side-cm.jpg" = "diseases\side_abdominal_pain.jpg"
    "2022/02/Intestinal-Gas-side-cm.jpg" = "diseases\side_intestinal_gas.jpg"
    "2022/02/PAINLESS-THERAPY-FOR-PILES-cm-side.jpg" = "procedures\side_painless_piles.jpg"
    "2022/02/gastrointestinal-bleeding-right-cm.jpg" = "diseases\side_gi_bleeding.jpg"
    "2022/02/diarrhoea-and-constipation-side-cm.jpg" = "diseases\side_diarrhea_constipation.jpg"
    "2022/02/hiatus-hernia-cm.jpg" = "diseases\side_hiatus_hernia.jpg"
    "2022/02/Dysphagia-side-cm.jpg" = "diseases\side_dysphagia.jpg"
    "2022/02/Irritable-Bowel-Syndrome.jpg" = "diseases\side_ibs.jpg"
    "2022/02/colonoscopy-side-img.jpg" = "procedures\side_colonoscopy.jpg"
    "2022/02/ercp-side-img.jpg" = "procedures\side_ercp.jpg"
    "2022/02/capsule_edosocopy_sideimg.jpg" = "procedures\side_capsule_endoscopy.jpg"
    "2022/02/Manometry-ps-cm.jpg" = "procedures\side_manometry.jpg"
    "2022/02/liver-biopsy-img-cm.jpg" = "procedures\side_liver_biopsy.jpg"
    "2022/02/fibroscan-slide-img-cm.jpg" = "procedures\side_fibroscan.jpg"
    "2022/02/poem-side-cm.jpg" = "procedures\side_poem.jpg"

    # Core Blog Banner Images
    "2022/01/Top-5-Things-That-Cause-Stomach-Pain.jpg" = "blog\stomach_pain_cause.jpg"
    "2022/01/Top-14-Low-Fodmap-Snack-Ideas-For-A-Healthy-You.jpg" = "blog\fodmap_snacks.jpg"
    "2022/01/Benefits-Of-Exercise-On-Your-Digestion.jpg" = "blog\exercise_digestion.jpg"
    "2022/01/Consequences-of-Alcohol-Drinking-on-GI-Health-of-Women.jpg" = "blog\alcohol_women_gi.jpg"
    "2022/01/5-Steps-To-Lessen-Heartburn-And-Indigestion.jpg" = "blog\lessen_heartburn.jpg"
    "2023/06/Black-and-White-Blog-Banner-3-1024x576.jpg" = "blog\peptic_ulcer_delhi.jpg"
    "2023/06/Black-and-White-Blog-Banner-2-1024x576.jpg" = "blog\colonoscopy_guide.jpg"
    "2023/06/Black-and-White-Blog-Banner-1-1024x576.jpg" = "blog\ibd_delhi.jpg"
}

Write-Host "Starting asset download workflow..." -ForegroundColor Cyan

foreach ($remote in $assets.Keys) {
    $localRel = $assets[$remote]
    $localPath = Join-Path $localBase $localRel
    $localDir = Split-Path $localPath -Parent

    # Ensure parent directory exists
    if (!(Test-Path $localDir)) {
        New-Item -ItemType Directory -Path $localDir -Force | Out-Null
    }

    $url = $remoteBase + $remote
    Write-Host "Downloading: $url -> $localPath"

    try {
        # Check if already exists to avoid redundant download
        if (Test-Path $localPath) {
            Write-Host "File already exists. Skipping." -ForegroundColor Yellow
        } else {
            Invoke-WebRequest -Uri $url -OutFile $localPath -TimeoutSec 15
            Write-Host "Success!" -ForegroundColor Green
        }
    } catch {
        Write-Host "Failed to download $url : $_" -ForegroundColor Red
    }
}

Write-Host "Asset download completed!" -ForegroundColor Cyan
