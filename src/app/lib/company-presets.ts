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

        {{CUSTOM_TERMS}}

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
      <div style="
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    max-width: 760px;
    margin: 0 auto;
    color: #1f2937;
    line-height: 1.45;
    padding: 8px 10px;
    box-sizing: border-box;
  ">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 18px;">
      <div style="
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #1e3a8a;
        margin-bottom: 6px;
      ">
        Studio Policy
      </div>

      <h1 style="
        font-size: 28px;
        font-weight: 800;
        color: #111827;
        margin: 0 0 6px 0;
        letter-spacing: -0.02em;
        line-height: 1.1;
      ">
        Terms &amp; Conditions
      </h1>

      <p style="
        font-size: 13px;
        color: #6b7280;
        margin: 0 auto;
        max-width: 620px;
      ">
        Please read these guidelines carefully to ensure a smooth and professional studio experience.
      </p>
    </div>

    <!-- Policy Grid -->
    <div style="
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 18px;
    ">

      <div style="
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 14px;
        box-shadow: 0 4px 10px rgba(17,24,39,0.04);
        page-break-inside: avoid;
      ">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="font-size: 16px; color: #1e3a8a;">◷</div>
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #111827;">Time &amp; Booking</h3>
        </div>
        <div style="height: 1px; background: #e5e7eb; margin-bottom: 5px;"></div>
        <ul style="
          margin: 0;
          padding-left: 18px;
          color: #1f2937;
          font-size: 12px;
          line-height: 1.45;
        ">
          <li style="margin-bottom: 5px;">Rental starts from the confirmed booking time.</li>
          <li style="margin-bottom: 5px;">A 10-minute grace period is allowed for pack-up.</li>
          <li style="margin-bottom: 5px;">Exceeding the grace period may attract an extra hour charge.</li>
          <li>Clients must vacate on time if another booking follows.</li>
        </ul>
      </div>

      <div style="
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 14px;
        box-shadow: 0 4px 10px rgba(17,24,39,0.04);
        page-break-inside: avoid;
      ">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="font-size: 16px; color: #1e3a8a;">⌂</div>
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #111827;">House Rules &amp; Hygiene</h3>
        </div>
        <div style="height: 1px; background: #e5e7eb; margin-bottom: 5px;"></div>
        <ul style="
          margin: 0;
          padding-left: 18px;
          color: #1f2937;
          font-size: 12px;
          line-height: 1.45;
        ">
          <li style="margin-bottom: 8px;">Do not litter the studio with food or waste.</li>
          <li style="margin-bottom: 8px;">All mess must be cleaned before leaving.</li>
          <li>Mess-causing powders or liquids are not allowed.</li>
        </ul>
      </div>

      <div style="
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 14px;
        box-shadow: 0 4px 10px rgba(17,24,39,0.04);
        page-break-inside: avoid;
      ">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="font-size: 16px; color: #dc2626;">⚒</div>
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #111827;">Liability &amp; Damages</h3>
        </div>
        <div style="height: 1px; background: #e5e7eb; margin-bottom: 5px;"></div>
        <ul style="
          margin: 0;
          padding-left: 18px;
          color: #1f2937;
          font-size: 12px;
          line-height: 1.45;
        ">
          <li style="margin-bottom: 8px;">The client is responsible for any damage during the session.</li>
          <li>All identified damages will be chargeable.</li>
        </ul>
      </div>

      <div style="
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 14px;
        box-shadow: 0 4px 10px rgba(17,24,39,0.04);
        page-break-inside: avoid;
      ">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="font-size: 16px; color: #1e3a8a;">👥</div>
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #111827;">Capacity &amp; Logistics</h3>
        </div>
        <div style="height: 1px; background: #e5e7eb; margin-bottom: 5px;"></div>
        <ul style="
          margin: 0;
          padding-left: 18px;
          color: #1f2937;
          font-size: 12px;
          line-height: 1.45;
        ">
          <li style="margin-bottom: 8px;">Maximum occupancy is 10 to 13 people including crew.</li>
          <li>Parking is available for cars and bikes.</li>
        </ul>
      </div>
    </div>

    <!-- Commercial Terms -->
    <div style="
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      background: #f9fafb;
      padding: 16px;
      box-shadow: 0 4px 10px rgba(17,24,39,0.04);
      page-break-inside: avoid;
    ">
      <div style="
        text-align: center;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #e5e7eb;
      ">
        <h2 style="
          font-size: 20px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 4px 0;
          letter-spacing: -0.02em;
        ">
          Commercial Terms
        </h2>
        <p style="
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        ">
          Please review the following commercial terms before confirmation.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; ">

        <div style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="font-weight: 700; color: #3b82f6; min-width: 18px; font-size: 12px;">01</span>
          <p style="margin: 0; font-size: 12px;">This quotation is valid for <span style="font-weight: 600;">7 days</span> from the date of issue.</p>
        </div>

        <div style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="font-weight: 700; color: #3b82f6; min-width: 18px; font-size: 12px;">02</span>
          <p style="margin: 0; font-size: 12px;">Any additional work outside the agreed scope will be charged separately.</p>
        </div>

        <div style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="font-weight: 700; color: #3b82f6; min-width: 18px; font-size: 12px;">03</span>
          <p style="margin: 0; font-size: 12px;">Payment terms will be mutually discussed and finalized before project initiation.</p>
        </div>

        {{CUSTOM_TERMS}}

      </div>
    </div>

    <div style="margin-top: 10px; text-align: right;">
      <span style="font-size: 11px; color: #9ca3af; font-style: italic;">
        Thank you for your business.
      </span>
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
      <div style="
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    max-width: 760px;
    margin: 0 auto;
    color: #1f2937;
    line-height: 1.45;
    padding: 8px 10px;
    box-sizing: border-box;
  ">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 18px;">
      <div style="
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #1e3a8a;
        margin-bottom: 6px;
      ">
        Studio Policy
      </div>

      <h1 style="
        font-size: 28px;
        font-weight: 800;
        color: #111827;
        margin: 0 0 6px 0;
        letter-spacing: -0.02em;
        line-height: 1.1;
      ">
        Terms &amp; Conditions
      </h1>

      <p style="
        font-size: 13px;
        color: #6b7280;
        margin: 0 auto;
        max-width: 620px;
      ">
        Please read these guidelines carefully to ensure a smooth and professional studio experience.
      </p>
    </div>

    <!-- Policy Grid -->
    <div style="
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 18px;
    ">

      <div style="
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 14px;
        box-shadow: 0 4px 10px rgba(17,24,39,0.04);
        page-break-inside: avoid;
      ">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="font-size: 16px; color: #1e3a8a;">◷</div>
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #111827;">Time &amp; Booking</h3>
        </div>
        <div style="height: 1px; background: #e5e7eb; margin-bottom: 5px;"></div>
        <ul style="
          margin: 0;
          padding-left: 18px;
          color: #1f2937;
          font-size: 12px;
          line-height: 1.45;
        ">
          <li style="margin-bottom: 5px;">Rental starts from the confirmed booking time.</li>
          <li style="margin-bottom: 5px;">A 10-minute grace period is allowed for pack-up.</li>
          <li style="margin-bottom: 5px;">Exceeding the grace period may attract an extra hour charge.</li>
          <li>Clients must vacate on time if another booking follows.</li>
        </ul>
      </div>

      <div style="
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 14px;
        box-shadow: 0 4px 10px rgba(17,24,39,0.04);
        page-break-inside: avoid;
      ">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="font-size: 16px; color: #1e3a8a;">⌂</div>
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #111827;">House Rules &amp; Hygiene</h3>
        </div>
        <div style="height: 1px; background: #e5e7eb; margin-bottom: 5px;"></div>
        <ul style="
          margin: 0;
          padding-left: 18px;
          color: #1f2937;
          font-size: 12px;
          line-height: 1.45;
        ">
          <li style="margin-bottom: 8px;">Do not litter the studio with food or waste.</li>
          <li style="margin-bottom: 8px;">All mess must be cleaned before leaving.</li>
          <li>Mess-causing powders or liquids are not allowed.</li>
        </ul>
      </div>

      <div style="
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 14px;
        box-shadow: 0 4px 10px rgba(17,24,39,0.04);
        page-break-inside: avoid;
      ">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="font-size: 16px; color: #dc2626;">⚒</div>
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #111827;">Liability &amp; Damages</h3>
        </div>
        <div style="height: 1px; background: #e5e7eb; margin-bottom: 5px;"></div>
        <ul style="
          margin: 0;
          padding-left: 18px;
          color: #1f2937;
          font-size: 12px;
          line-height: 1.45;
        ">
          <li style="margin-bottom: 8px;">The client is responsible for any damage during the session.</li>
          <li>All identified damages will be chargeable.</li>
        </ul>
      </div>

      <div style="
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 14px;
        box-shadow: 0 4px 10px rgba(17,24,39,0.04);
        page-break-inside: avoid;
      ">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="font-size: 16px; color: #1e3a8a;">👥</div>
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #111827;">Capacity &amp; Logistics</h3>
        </div>
        <div style="height: 1px; background: #e5e7eb; margin-bottom: 5px;"></div>
        <ul style="
          margin: 0;
          padding-left: 18px;
          color: #1f2937;
          font-size: 12px;
          line-height: 1.45;
        ">
          <li style="margin-bottom: 8px;">Maximum occupancy is 10 to 13 people including crew.</li>
          <li>Parking is available for cars and bikes.</li>
        </ul>
      </div>
    </div>

    <!-- Commercial Terms -->
    <div style="
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      background: #f9fafb;
      padding: 16px;
      box-shadow: 0 4px 10px rgba(17,24,39,0.04);
      page-break-inside: avoid;
    ">
      <div style="
        text-align: center;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #e5e7eb;
      ">
        <h2 style="
          font-size: 20px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 4px 0;
          letter-spacing: -0.02em;
        ">
          Commercial Terms
        </h2>
        <p style="
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        ">
          Please review the following commercial terms before confirmation.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; ">

        <div style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="font-weight: 700; color: #3b82f6; min-width: 18px; font-size: 12px;">01</span>
          <p style="margin: 0; font-size: 12px;">This quotation is valid for <span style="font-weight: 600;">7 days</span> from the date of issue.</p>
        </div>

        <div style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="font-weight: 700; color: #3b82f6; min-width: 18px; font-size: 12px;">02</span>
          <p style="margin: 0; font-size: 12px;">Any additional work outside the agreed scope will be charged separately.</p>
        </div>

        <div style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="font-weight: 700; color: #3b82f6; min-width: 18px; font-size: 12px;">03</span>
          <p style="margin: 0; font-size: 12px;">Payment terms will be mutually discussed and finalized before project initiation.</p>
        </div>

        {{CUSTOM_TERMS}}

      </div>
    </div>

    <div style="margin-top: 10px; text-align: right;">
      <span style="font-size: 11px; color: #9ca3af; font-style: italic;">
        Thank you for your business.
      </span>
    </div>

  </div>
    `
  },
};