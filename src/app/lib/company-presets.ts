import { CompanyType } from "../types/quotation";

export const COMPANY_PRESETS: Record<
  CompanyType,
  {
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
    notes: string;
    terms: string;
  }
> = {
  "rankkit-media": {
    companyName: "Rankkit Media",
    companyAddress: "Ambience Court, 1702, Phase 2, Sector 19E, Vashi, Navi Mumbai, Maharashtra 400703",
    companyPhone: "+91 9090 434376",
    companyEmail: "rankkitmedia@gmail.com",
    notes:
      "Thank you for the opportunity to submit this quotation. We look forward to working with you.",
    terms: `
      <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 650px; margin: 40px auto; color: #1f2937; line-height: 1.6;">
  
  <div style="text-align: center; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
    <h2 style="font-size: 28px; font-weight: 800; color: #111827; margin: 0 0 8px 0; letter-spacing: -0.025em;">
      Terms &amp; Conditions
    </h2>
    <p style="font-size: 14px; color: #6b7280; margin: 0;">
      Please read our guidelines carefully to ensure a smooth and creative experience.
    </p>
  </div>

  <div style="background-color: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; padding: 24px;">
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <span style="font-weight: 700; color: #3b82f6; min-width: 20px;">01</span>
        <p style="margin: 0; font-size: 15px;">This quotation is valid for <span style="font-weight: 600;">7 days</span> from the date of issue.</p>
      </div>

      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <span style="font-weight: 700; color: #3b82f6; min-width: 20px;">02</span>
        <p style="margin: 0; font-size: 15px;">Any additional work outside the agreed scope will be charged separately.</p>
      </div>

      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <span style="font-weight: 700; color: #3b82f6; min-width: 20px;">03</span>
        <p style="margin: 0; font-size: 15px;">Payment terms will be mutually discussed and finalized before project initiation.</p>
      </div>

      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <span style="font-weight: 700; color: #3b82f6; min-width: 20px;">04</span>
        <p style="margin: 0; font-size: 15px;">50% advance payment required to confirm.</p>
      </div>

      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <span style="font-weight: 700; color: #3b82f6; min-width: 20px;">05</span>
        <p style="margin: 0; font-size: 15px;">Re-scheduling must be addressed in advance.</p>
      </div>

      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <span style="font-weight: 700; color: #3b82f6; min-width: 20px;">06</span>
        <p style="margin: 0; font-size: 15px;">Last-minute cancellations are non-refundable.</p>
      </div>

    </div>
  </div>

  <div style="margin-top: 16px; text-align: right;">
    <span style="font-size: 12px; color: #9ca3af; font-style: italic;">Thank you for your business.</span>
  </div>
</div>
    `
  },
  "rankkit-studio": {
    companyName: "Rankkit Studio",
    companyAddress: "Ambience Court, 1703, Phase 2, Sector 19E, Vashi, Navi Mumbai, Maharashtra 400703",
    companyPhone: "+91 9090 434376",
    companyEmail: "rankkitstudio@gmail.com",
    notes:
      "Thank you for considering Rankkit Studio for your production requirement. We would be happy to support your project.",
    terms: `
      <div style="font-family: 'Inter', Arial, sans-serif; color: #111827; max-width: 900px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 40px;">
    <div style="font-size: 12px; font-weight: 700; letter-spacing: 1.5px; color: #1e3a8a; text-transform: uppercase; margin-bottom: 8px;">
      Studio Policy
    </div>
    <div style="font-size: 36px; font-weight: 800; line-height: 1.1; margin-bottom: 12px; color: #111827;">
      Terms & Conditions
    </div>
    <div style="font-size: 15px; color: #6b7280; max-width: 500px; margin: 0 auto;">
      Please read our guidelines carefully to ensure a smooth and creative experience for everyone.
    </div>
  </div>

  <div style="border: 1px solid #f59e0b; background: #fff7ed; border-radius: 12px; padding: 16px 20px; margin-bottom: 32px; display: flex; align-items: center; gap: 12px;">
    <div style="font-size: 20px;">⚠️</div>
    <div>
      <div style="font-weight: 700; color: #92400e; font-size: 15px;">Strict Prohibition</div>
      <div style="font-size: 14px; color: #78350f; line-height: 1.5;">
        Use of paint, flour, or any form of powder/liquid is strictly prohibited in the studio to maintain equipment safety.
      </div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    
    <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; background: #f9fafb;">
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: #1e3a8a; display: flex; align-items: center; gap: 8px;">
        General Policies
      </div>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.6; font-size: 13.5px; color: #374151;">
        <li style="margin-bottom: 8px;">Quotation valid for <strong>7 days</strong> from issue.</li>
        <li style="margin-bottom: 8px;">Additional work outside scope is charged separately.</li>
        <li style="margin-bottom: 8px;"><strong>50% advance</strong> payment required to confirm.</li>
        <li style="margin-bottom: 8px;">Re-scheduling must be addressed in advance.</li>
        <li>Last-minute cancellations are non-refundable.</li>
      </ul>
    </div>

    <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: #1e3a8a;">Time & Booking</div>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.6; font-size: 13.5px; color: #4b5563;">
        <li style="margin-bottom: 8px;">Rental starts from confirmed time, not arrival.</li>
        <li style="margin-bottom: 8px;">20-30 mins wrap-up time included.</li>
        <li style="margin-bottom: 8px;">Exceeding grace period incurs a full hour charge.</li>
        <li>Must vacate promptly if a subsequent client is booked.</li>
      </ul>
    </div>

    <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: #1e3a8a;">House Rules & Hygiene</div>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.6; font-size: 13.5px; color: #4b5563;">
        <li style="margin-bottom: 8px;">Do not litter; keeping the space clean is your responsibility.</li>
        <li style="margin-bottom: 8px;">Ensure all mess is cleaned before leaving.</li>
        <li>Strict prohibition of mess-causing liquids or powders.</li>
      </ul>
    </div>

    <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: #1e3a8a;">Liability & Capacity</div>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.6; font-size: 13.5px; color: #4b5563;">
        <li style="margin-bottom: 8px;">Client is liable for <strong>all damages</strong> during session.</li>
        <li style="margin-bottom: 8px;">Damages must be paid for immediately.</li>
        <li style="margin-bottom: 8px;">Max occupancy: <strong>12-15 people</strong>.</li>
        <li>Ample parking available for cars and bikes.</li>
      </ul>
    </div>

  </div>
</div>
    `
  }, "both": {
    companyName: "Rankkit Media",
    companyAddress: "Ambience Court, 1702, Phase 2, Sector 19E, Vashi, Navi Mumbai, Maharashtra 400703",
    companyPhone: "+91 9090 434376",
    companyEmail: "rankkitmedia@gmail.com",
    notes:
      "Thank you for the opportunity to submit this quotation. We look forward to working with you.",
    terms: `
      <div style="font-family: 'Inter', Arial, sans-serif; color: #111827; max-width: 900px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 40px;">
    <div style="font-size: 36px; font-weight: 800; line-height: 1.1; margin-bottom: 12px; color: #111827;">
      Terms & Conditions
    </div>
    <div style="font-size: 15px; color: #6b7280; max-width: 500px; margin: 0 auto;">
      Please read our guidelines carefully to ensure a smooth and creative experience for everyone.
    </div>
  </div>

  <div style="border: 1px solid #f59e0b; background: #fff7ed; border-radius: 12px; padding: 16px 20px; margin-bottom: 32px; display: flex; align-items: center; gap: 12px;">
    <div style="font-size: 20px;">⚠️</div>
    <div>
      <div style="font-weight: 700; color: #92400e; font-size: 15px;">Strict Prohibition</div>
      <div style="font-size: 14px; color: #78350f; line-height: 1.5;">
        Use of paint, flour, or any form of powder/liquid is strictly prohibited in the studio to maintain equipment safety.
      </div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    
    <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; background: #f9fafb;">
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: #1e3a8a; display: flex; align-items: center; gap: 8px;">
        General Policies
      </div>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.6; font-size: 13.5px; color: #374151;">
        <li style="margin-bottom: 8px;">Quotation valid for <strong>7 days</strong> from issue.</li>
        <li style="margin-bottom: 8px;">Additional work outside scope is charged separately.</li>
        <li style="margin-bottom: 8px;"><strong>50% advance</strong> payment required to confirm.</li>
        <li style="margin-bottom: 8px;">Re-scheduling must be addressed in advance.</li>
        <li>Last-minute cancellations are non-refundable.</li>
      </ul>
    </div>

    <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: #1e3a8a;">Time & Booking</div>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.6; font-size: 13.5px; color: #4b5563;">
        <li style="margin-bottom: 8px;">Rental starts from confirmed time, not arrival.</li>
        <li style="margin-bottom: 8px;">20-30 mins wrap-up time included.</li>
        <li style="margin-bottom: 8px;">Exceeding grace period incurs a full hour charge.</li>
        <li>Must vacate promptly if a subsequent client is booked.</li>
      </ul>
    </div>

    <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: #1e3a8a;">House Rules & Hygiene</div>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.6; font-size: 13.5px; color: #4b5563;">
        <li style="margin-bottom: 8px;">Do not litter; keeping the space clean is your responsibility.</li>
        <li style="margin-bottom: 8px;">Ensure all mess is cleaned before leaving.</li>
        <li>Strict prohibition of mess-causing liquids or powders.</li>
      </ul>
    </div>

    <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: #1e3a8a;">Liability & Capacity</div>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.6; font-size: 13.5px; color: #4b5563;">
        <li style="margin-bottom: 8px;">Client is liable for <strong>all damages</strong> during session.</li>
        <li style="margin-bottom: 8px;">Damages must be paid for immediately.</li>
        <li style="margin-bottom: 8px;">Max occupancy: <strong>12-15 people</strong>.</li>
        <li>Ample parking available for cars and bikes.</li>
      </ul>
    </div>

  </div>
</div>
    `
  },
};