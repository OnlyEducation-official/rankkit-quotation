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
      <div>
      <div style="text-align:center; margin-bottom:24px;">
          <div style="font-size:34px; font-weight:800; line-height:1.1; margin-bottom:8px;">
            Terms &amp; Conditions
          </div>
          <div style="font-size:14px; color:#6b7280;">
            Please read our guidelines carefully to ensure a smooth and creative experience for everyone.
          </div>
        </div>
        <p style="margin:0 0 8px 0;">1. This quotation is valid for 7 days from the date of issue.</p>
        <p style="margin:0 0 8px 0;">2. Any additional work outside the agreed scope will be charged separately.</p>
        <p style="margin:0;">3. Payment terms will be mutually discussed before project initiation.</p>
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
      <div style="font-family: Arial, sans-serif; color:#111827;">
        <div style="text-align:center; margin-bottom:24px;">
          <div style="font-size:12px; font-weight:700; letter-spacing:1px; color:#1e3a8a; text-transform:uppercase; margin-bottom:6px;">
            Studio Policy
          </div>
          <div style="font-size:34px; font-weight:800; line-height:1.1; margin-bottom:8px;">
            Terms &amp; Conditions
          </div>
          <div style="font-size:14px; color:#6b7280;">
            Please read our guidelines carefully to ensure a smooth and creative experience for everyone.
          </div>
        </div>

        <div style="
          border:1px solid #f59e0b;
          background:#fff7ed;
          border-radius:8px;
          padding:14px 16px;
          margin:0 auto 24px auto;
          max-width:520px;
        ">
          <div style="font-weight:700; color:#92400e; margin-bottom:6px;">
            Strict Prohibition
          </div>
          <div style="font-size:14px; color:#78350f; line-height:1.5;">
            Use of paint, flour, or any form of powder/liquid is strictly prohibited in the studio to maintain equipment safety.
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px;">
          <div style="border:1px solid #e5e7eb; border-radius:10px; padding:18px;">
            <div style="font-size:16px; font-weight:700; margin-bottom:12px;">Time &amp; Booking</div>
            <ul style="margin:0; padding-left:18px; line-height:1.7; font-size:14px;">
              <li>1. Rental starts from the confirmed booking time, not when the shoot actually begins.</li>
              <li>2. A 30-minute grace period is allowed for pack-up.</li>
              <li>3. If pack-up exceeds the grace period, a full hour charge will be applied.</li>
              <li>4. If a subsequent client is booked, you are strictly obliged to vacate strictly when your slot is over.</li>
            </ul>
          </div>

          <div style="border:1px solid #e5e7eb; border-radius:10px; padding:18px;">
            <div style="font-size:16px; font-weight:700; margin-bottom:12px;">House Rules &amp; Hygiene</div>
            <ul style="margin:0; padding-left:18px; line-height:1.7; font-size:14px;">
              <li>1. Do not litter the studio with food or waste; keeping the space clean is your responsibility.</li>
              <li>2. Ensure all mess is meticulously cleaned up and removed before leaving.</li>
              <li>3. Use of paint, flour, or any powder/liquid that causes mess is strictly prohibited.</li>
            </ul>
          </div>

          <div style="border:1px solid #e5e7eb; border-radius:10px; padding:18px;">
            <div style="font-size:16px; font-weight:700; margin-bottom:12px;">Liability &amp; Damages</div>
            <ul style="margin:0; padding-left:18px; line-height:1.7; font-size:14px;">
              <li>1. The client is fully responsible for any damage caused during the session, regardless of who caused it.</li>
              <li>2. All damages identified will be charged to the client.</li>
            </ul>
          </div>

          <div style="border:1px solid #e5e7eb; border-radius:10px; padding:18px;">
            <div style="font-size:16px; font-weight:700; margin-bottom:12px;">Capacity &amp; Logistics</div>
            <ul style="margin:0; padding-left:18px; line-height:1.7; font-size:14px;">
              <li>1. Maximum occupancy is 12 to 15 people (including artists/crew).</li>
              <li>2. Enough parking space is available for car and bike.</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
};