// Static "full COA" detail content shown in the View Full COA modal.
//
// This is placeholder/demo content, not real lab data — it exists so the
// COA section has something to show while there's no backend model for it
// yet. To update or add products over time, just add/edit entries in
// COA_DETAILS below; nothing else needs to change. Products in
// static-certificates.ts that have no matching entry here automatically
// fall back to a simple auto-generated detail (see getCoaDetail below).

export interface CoaDetailRow {
  label: string;
  spec?: string;
  value: string;
  /** Set false for informational rows that shouldn't get a checkmark/green styling. */
  pass?: boolean;
}

export interface CoaDetailSection {
  heading: string;
  rows: CoaDetailRow[];
}

export interface CoaSampleInfoRow {
  label: string;
  value: string;
}

export interface CoaDetail {
  /** Matches `${name}|${dosage}` from static-certificates.ts */
  key: string;
  labLine: string;
  /** Supports **bold** markers for the lab name / purity callouts. */
  summary: string;
  sampleInfo?: CoaSampleInfoRow[];
  sections: CoaDetailSection[];
}

export const COA_DETAILS: CoaDetail[] = [
  {
    key: "NAD+|500mg",
    labLine: "Janoshik Laboratories | ISO/IEC 17025 Accredited",
    summary:
      "Our NAD+ 500mg has been third-party tested by **Janoshik Laboratories** (COA # COA-2026-CM2I16, Analysis Date 05/08/2026) and confirmed at **99.65% purity**.",
    sections: [
      {
        heading: "Purity & Quant (HPLC)",
        rows: [
          { label: "Purity (HPLC)", spec: "≥95.0%", value: "99.65%" },
          { label: "Net Content", spec: "Report Only", value: "529.14 mg" },
          { label: "Identity (ID)", spec: "NAD+", value: "NAD+ — Confirmed" },
        ],
      },
      {
        heading: "Sterility & Endotoxin",
        rows: [
          { label: "Sterility (PCR)", spec: "No Growth", value: "No Growth — PASS" },
          { label: "Endotoxin (USP <85>)", spec: "<0.25 EU/mL", value: "0.084 EU/mL — PASS" },
        ],
      },
    ],
  },
  {
    key: "KLOW|80mg",
    labLine: "Analytical Formulations Inc. + Freedom Diagnostics",
    summary:
      "Our KLOW 80mg has been third-party tested by **Analytical Formulations Inc.** (cGLP Certified) and **Freedom Diagnostics** (USP <85> endotoxin panel). All tests passed.",
    sections: [
      {
        heading: "Purity & Identity (UV/VIS)",
        rows: [
          { label: "Qualitative ID — KPV Component", spec: "Matches reference standard", value: "Matches — PASS" },
          { label: "Qualitative ID — BPC-157 Component", spec: "Matches reference standard", value: "Matches — PASS" },
          { label: "Blend Purity", spec: "NLT 98%", value: "99.3% — PASS" },
        ],
      },
      {
        heading: "Endotoxin Testing (USP <85>)",
        rows: [
          { label: "Endotoxin Replicate 1", value: "Pass" },
          { label: "Endotoxin Replicate 2", value: "Pass" },
        ],
      },
      {
        heading: "Heavy Metals & Microbiology",
        rows: [
          { label: "Heavy Metals (Combined)", spec: "NMT 150ppb", value: "<10ppb — PASS" },
          { label: "TAMC (Aerobic Microbial)", spec: "NMT 1,000 CFU/ml", value: "0 — PASS" },
          { label: "TYMC (Yeast & Mold)", spec: "NMT 100 CFU/ml", value: "0 — PASS" },
        ],
      },
    ],
  },
  {
    key: "KPV|10mg",
    labLine: "Analytical Formulations, Inc. + Freedom Diagnostics",
    summary:
      "Our KPV 10mg has been tested by **Analytical Formulations, Inc.** (cGLP Certified, 03/16/2026) and **Freedom Diagnostics** (Accession # 2603110157, 03/12/2026) — confirmed at **99.5% purity**.",
    sampleInfo: [
      { label: "Product", value: "KPV 10mg" },
      { label: "Batch / Lot #", value: "KPV10-03102026" },
      { label: "Receive Date (AFI)", value: "03/12/2026" },
      { label: "Accession # (Freedom)", value: "2603110157" },
    ],
    sections: [
      {
        heading: "Purity & Identity (AFI — UV/VIS)",
        rows: [
          { label: "Qualitative ID — Vial A", spec: "Matches reference standard", value: "Matches — PASS" },
          { label: "Qualitative ID — Vial B", spec: "Matches reference standard", value: "Matches — PASS" },
          { label: "Percent Purity — Vial A", spec: "NLT 98%", value: "99.5% — PASS" },
          { label: "Percent Purity — Vial B", spec: "NLT 98%", value: "99.5% — PASS" },
        ],
      },
      {
        heading: "Quantitative Assay — Beer-Lambert (AFI)",
        rows: [
          { label: "Net Content — Vial A", spec: "NLT 95% of label claim", value: "12.54 mg — PASS" },
          { label: "Net Content — Vial B", spec: "NLT 95% of label claim", value: "12.78 mg — PASS" },
        ],
      },
      {
        heading: "Heavy Metals & Microbiology (AFI)",
        rows: [
          { label: "Heavy Metals (Pb, Cd, Hg, Ni, Fe, Co)", spec: "NMT 150ppb Combined", value: "<20ppb — PASS" },
          { label: "TAMC (Aerobic Microbial)", spec: "NMT 1,000 CFU/ml", value: "0 — PASS" },
          { label: "TYMC (Yeast & Mold)", spec: "NMT 100 CFU/ml", value: "0 — PASS" },
        ],
      },
      {
        heading: "Endotoxin Testing — Freedom Diagnostics (USP <85>)",
        rows: [
          { label: "Endotoxin Replicate 1", spec: "USP <85>", value: "Pass" },
          { label: "Endotoxin Replicate 2", spec: "USP <85>", value: "Pass" },
        ],
      },
    ],
  },
  {
    key: "TB-500|5mg",
    labLine: "Freedom Diagnostics | US-Owned & Operated",
    summary:
      "Our TB-500 5mg has been third-party tested by **Freedom Diagnostics** (Accession # 2602030166, Reported 02/05/2026) and confirmed at **99.19% average purity**.",
    sampleInfo: [
      { label: "Product", value: "TB-500 5mg" },
      { label: "Search Code", value: "IonP2602030166" },
      { label: "Lot #", value: "TB5-02022026" },
      { label: "Received", value: "02/03/2026" },
      { label: "Reported", value: "02/05/2026" },
      { label: "Appearance", value: "White Lyophilized Powder" },
    ],
    sections: [
      {
        heading: "Analytical Results (HPLC + LC-MS)",
        rows: [
          { label: "Identity (LC-MS)", value: "Thymosin Beta-4 — Confirmed" },
          { label: "Average Purity", value: "99.19%" },
          { label: "Net Content — Vial 1", value: "5.27 mg" },
          { label: "Net Content — Vial 2", value: "5.43 mg" },
          { label: "Average Net Peptide", value: "5.35 mg" },
          { label: "Purity — Vial 1", value: "98.65%" },
        ],
      },
    ],
  },
  {
    key: "BPC-157/TB-500|20mg",
    labLine: "Janoshik Laboratories | ISO/IEC 17025 Accredited",
    summary:
      "Our BPC-157 / TB-500 (Wolverine) 20mg has been third-party tested by **Janoshik Laboratories** (COA # COA-2026-XBJQZD, Analysis Date 05/08/2026) and confirmed at **99.93% purity**.",
    sampleInfo: [
      { label: "COA #", value: "COA-2026-XBJQZD" },
      { label: "Lot Number", value: "BB20-05042026" },
      { label: "Accession #", value: "ACC-2026-2018" },
      { label: "Concentration", value: "20mg" },
      { label: "Sample Matrix", value: "Lyophilized" },
      { label: "Analysis Date", value: "05/08/2026" },
    ],
    sections: [
      {
        heading: "Blend Purity & Quant (HPLC)",
        rows: [
          { label: "Purity (HPLC)", spec: "≥95.0%", value: "99.93%" },
          { label: "Identity (ID)", spec: "BPC-157; TB-500", value: "Confirmed — PASS" },
          { label: "Net Blend Peptide Content", spec: "Report Only", value: "21.07 mg" },
          { label: "— BPC-157 (51%)", value: "10.75 mg" },
        ],
      },
    ],
  },
  {
    key: "BPC-157/TB-500|10mg",
    labLine: "Kovera Labs | Report # KVR-2026-56F742",
    summary:
      "Our BPC-157 / TB-500 (Wolverine) 10mg has been third-party tested by **Kovera Labs** (Report # KVR-2026-56F742, Certified 04/22/2026) and confirmed at **99.758% purity**.",
    sampleInfo: [
      { label: "Product", value: "BPC-157/TB-500" },
      { label: "Batch", value: "BB10-04202026" },
      { label: "Labeled Qty", value: "10mg" },
      { label: "Form", value: "Lyophilized Powder" },
    ],
    sections: [
      {
        heading: "Test Results",
        rows: [
          { label: "Blend Avg Purity", spec: ">98%", value: "99.758%" },
          { label: "Blend Avg Net Content", spec: "10mg ±10%", value: "11.73 mg" },
          { label: "Blend Identification (LC-MS)", spec: "BPC-157/TB-500", value: "Confirmed" },
          { label: "Endotoxin Safety Screen", spec: "≤0.5 EU/mL", value: "PASS" },
          { label: "Microbial Sterility Screen", spec: "No Growth", value: "No Growth" },
        ],
      },
    ],
  },
  {
    key: "CJC-1295 / IPAMORELIN|5/5mg",
    labLine: "Kovera Labs | Report # KVR-2026-8D7BBB",
    summary:
      "Our CJC-1295 / Ipamorelin (No DAC) has been third-party tested by **Kovera Labs** (Report # KVR-2026-8D7BBB, Certified 05/17/2026) and confirmed at **99.870% purity**.",
    sections: [
      {
        heading: "Test Results",
        rows: [
          { label: "Blend Avg Purity", spec: ">98%", value: "99.870%" },
          { label: "Blend Avg Net Content", spec: "10mg ±10%", value: "10.82 mg" },
          { label: "Blend Identification (LC-MS)", spec: "CJC-1295 (No DAC)/Ipamorelin", value: "Confirmed" },
          { label: "Endotoxin Safety Screen", spec: "≤0.5 EU/mL", value: "PASS" },
          { label: "Microbial Sterility Screen", spec: "No Growth", value: "No Growth" },
        ],
      },
      {
        heading: "Heavy Metal Screening",
        rows: [
          { label: "Arsenic (As)", value: "Negative" },
          { label: "Cadmium (Cd)", value: "Negative" },
          { label: "Lead (Pb)", value: "Negative" },
          { label: "Mercury (Hg)", value: "Negative" },
        ],
      },
    ],
  },
  {
    key: "IPAMORELIN|10mg",
    labLine: "Janoshik Laboratories | ISO/IEC 17025 Accredited",
    summary:
      "Our Ipamorelin 10mg has been third-party tested by **Janoshik Laboratories** (COA # COA-2026-3-LYBQ, Analysis Date 05/08/2026) and confirmed at **99.97% purity**.",
    sampleInfo: [
      { label: "Lot Number", value: "IP10-05042026" },
      { label: "Concentration", value: "10mg" },
      { label: "Sample Matrix", value: "Lyophilized" },
    ],
    sections: [
      {
        heading: "Purity & Quant (HPLC)",
        rows: [
          { label: "Purity (HPLC)", spec: "≥95.0%", value: "99.97%" },
          { label: "Net Peptide Content", spec: "Report Only", value: "10.61 mg" },
          { label: "Identity (ID)", value: "Ipamorelin — Confirmed" },
        ],
      },
      {
        heading: "Sterility & Endotoxin",
        rows: [
          { label: "Sterility (PCR)", spec: "No Growth", value: "No Growth — PASS" },
          { label: "Endotoxin (USP <85>)", spec: "<0.25 EU/mL", value: "0.055 EU/mL — PASS" },
        ],
      },
    ],
  },
  {
    key: "TESAMORELIN|20mg",
    labLine: "Kovera Labs (Supplier COA)",
    summary:
      "Our Tesamorelin 20mg has been third-party tested by **Kovera Labs** (Report # KVR-2026-404D23, certified 04/16/2026) and confirmed at **99.866% purity**.",
    sections: [
      {
        heading: "Test Results",
        rows: [
          { label: "Batch Avg Purity (HPLC)", value: "99.866%" },
          { label: "Batch Avg Net Content", value: "11.64 mg" },
          { label: "Identity Confirmation (LC-MS)", value: "Tesamorelin" },
          { label: "Endotoxin Safety Screen", value: "≤0.5 EU/mL — PASS" },
          { label: "Microbial Sterility Screen", value: "No Growth" },
        ],
      },
      {
        heading: "Heavy Metal Screening (ICP)",
        rows: [
          { label: "Arsenic (As)", value: "Negative" },
          { label: "Cadmium (Cd)", value: "Negative" },
          { label: "Lead (Pb)", value: "Negative" },
          { label: "Mercury (Hg)", value: "Negative" },
        ],
      },
      {
        heading: "Batch Conformity",
        rows: [
          { label: "Vial 1", value: "99.896% · 11.73 mg", pass: false },
          { label: "Vial 2", value: "99.836% · 11.56 mg", pass: false },
        ],
      },
    ],
  },
  {
    key: "TESAMORELIN|10mg",
    labLine: "Analytical Formulations Inc. | cGLP Certified",
    summary:
      "Our Tesamorelin 10mg has been third-party tested by **Analytical Formulations Inc.** (Batch/Lot # TESA10-02152026) and confirmed at **99.1% purity**.",
    sampleInfo: [
      { label: "Test Product", value: "Tesamorelin 10mg" },
      { label: "Batch / Lot #", value: "TESA10-02152026" },
    ],
    sections: [
      {
        heading: "Purity & Identity (UV/VIS)",
        rows: [
          { label: "Qualitative ID — Vial A", spec: "Matches reference standard", value: "Matches — PASS" },
          { label: "Qualitative ID — Vial B", spec: "Matches reference standard", value: "Matches — PASS" },
          { label: "Percent Purity — Vial A", spec: "NLT 98%", value: "99.1% — PASS" },
          { label: "Percent Purity — Vial B", spec: "NLT 98%", value: "99.1% — PASS" },
        ],
      },
      {
        heading: "Heavy Metals & Microbiology",
        rows: [{ label: "Heavy Metals (Combined)", spec: "NMT 150ppb", value: "<10ppb — PASS" }],
      },
    ],
  },
  {
    key: "GHK-CU|100mg",
    labLine: "Janoshik Laboratories | ISO/IEC 17025 Accredited",
    summary:
      "Our GHK-Cu 100mg has been third-party tested by **Janoshik Laboratories** (COA # COA-2026-BIUPTS, Analysis Date 05/08/2026) and confirmed at **99.48% purity**.",
    sections: [
      {
        heading: "Purity & Quant (HPLC)",
        rows: [
          { label: "Purity (HPLC)", spec: "≥95.0%", value: "99.48%" },
          { label: "Net Peptide Content", spec: "Report Only", value: "106.42 mg" },
          { label: "Identity (ID)", spec: "GHK-Cu", value: "GHK-Cu — Confirmed" },
        ],
      },
      {
        heading: "Sterility & Endotoxin",
        rows: [
          { label: "Sterility (PCR)", spec: "No Growth", value: "No Growth — PASS" },
          { label: "Endotoxin (USP <85>)", spec: "<0.25 EU/mL", value: "0.055 EU/mL — PASS" },
        ],
      },
    ],
  },
  {
    key: "GHK-CU|50mg",
    labLine: "Janoshik Laboratories | ISO/IEC 17025 Accredited",
    summary:
      "Our GHK-Cu 50mg has been third-party tested by **Janoshik Laboratories** (COA # COA-2026-IGAMNK, Analysis Date 06/27/2026) and confirmed at **99.97% purity**.",
    sections: [
      {
        heading: "Full QC Panel",
        rows: [
          { label: "Purity (HPLC)", spec: "≥95.0%", value: "99.97%" },
          { label: "Net Peptide Content", spec: "Report Only", value: "51.43 mg" },
          { label: "Identity (HPLC-RTM)", spec: "GHK Cu", value: "GHK-Cu — Confirmed" },
          { label: "Fentanyl Screen", spec: "50 ng/mL cutoff", value: "Not Detected" },
        ],
      },
      {
        heading: "Sterility & Endotoxin",
        rows: [
          { label: "Sterility (PCR)", spec: "No Growth", value: "No Growth — PASS" },
          { label: "Endotoxin (USP <85>)", spec: "Report Result", value: "NMT 0.05 EU/mL" },
        ],
      },
    ],
  },
  {
    key: "GLP-3 (RT)|30mg",
    labLine: "Janoshik Laboratories | ISO/IEC 17025 Accredited",
    summary:
      "Our GLP-3 (RT) 30mg has been third-party tested by **Janoshik Laboratories** (COA # COA-2026-JSWUY0, Analysis Date 05/08/2026) and confirmed at **99.62% purity**.",
    sections: [
      {
        heading: "Test Results",
        rows: [
          { label: "Purity (HPLC)", spec: "≥95.0%", value: "99.62%" },
          { label: "Net Peptide Content", spec: "Report Only", value: "30.64 mg" },
          { label: "Identity (ID)", value: "Retatrutide — Confirmed" },
        ],
      },
      {
        heading: "Sterility & Endotoxin",
        rows: [
          { label: "Sterility (PCR)", spec: "No Growth", value: "No Growth — PASS" },
          { label: "Endotoxin (USP <85>)", spec: "<0.25 EU/mL", value: "0.085 EU/mL — PASS" },
        ],
      },
    ],
  },
  {
    key: "GLP-3 (RT)|20mg",
    labLine: "Kovera Labs (Supplier COA)",
    summary:
      "Our GLP-3 (RT) 20mg has been third-party tested by **Kovera Labs** (Report # KVR-2026-2A0656, certified 04/22/2026) and confirmed at **99.862% purity**.",
    sections: [
      {
        heading: "Test Results",
        rows: [
          { label: "Batch Avg Purity", spec: ">98%", value: "99.862%" },
          { label: "Batch Avg Net Content", spec: "20mg ±10%", value: "22.88 mg" },
          { label: "Identity (LC-MS)", spec: "ION-3R", value: "ION-3R — Confirmed" },
          { label: "Endotoxin Safety Screen", spec: "<0.5 EU/mL", value: "PASS" },
          { label: "Microbial Sterility Screen", spec: "No Growth", value: "No Growth" },
        ],
      },
      {
        heading: "Heavy Metal Screening",
        rows: [
          { label: "Arsenic (As)", value: "Negative" },
          { label: "Cadmium (Cd)", value: "Negative" },
          { label: "Lead (Pb)", value: "Negative" },
          { label: "Mercury (Hg)", value: "Negative" },
        ],
      },
    ],
  },
  {
    key: "GLP-3 (RT)|10mg",
    labLine: "Janoshik Laboratories | ISO/IEC 17025 Accredited",
    summary:
      "Our GLP-3 (RT) 10mg has been third-party tested by **Janoshik Laboratories** (COA # COA-2026-V-PNHB, Analysis Date 05/08/2026) and confirmed at **98.49% purity**.",
    sections: [
      {
        heading: "Test Results",
        rows: [
          { label: "Purity (HPLC)", spec: "≥95.0%", value: "98.49%" },
          { label: "Net Peptide Content", spec: "Report Only", value: "10.1 mg" },
          { label: "Identity (ID)", value: "Retatrutide — Confirmed" },
        ],
      },
      {
        heading: "Sterility & Endotoxin",
        rows: [
          { label: "Sterility (PCR)", spec: "No Growth", value: "No Growth — PASS" },
          { label: "Endotoxin (USP <85>)", spec: "<0.25 EU/mL", value: "0.054 EU/mL — PASS" },
        ],
      },
    ],
  },
  {
    key: "BPC-157|10mg",
    labLine: "Janoshik Laboratories | ISO/IEC 17025 Accredited",
    summary:
      "Our BPC-157 10mg has been third-party tested by **Janoshik Laboratories** (COA # COA-2026-A-227X, Analysis Date 05/29/2026) and confirmed at **99.84% purity**.",
    sections: [
      {
        heading: "Full QC Panel Results",
        rows: [
          { label: "Purity (HPLC)", spec: "≥95.0%", value: "99.84%" },
          { label: "Net Content", spec: "Report Only", value: "10.43 mg" },
          { label: "Identity (ID)", spec: "BPC-157", value: "BPC-157 — Confirmed" },
          { label: "Fentanyl Screen", spec: "50 ng/mL cutoff", value: "Not Detected" },
        ],
      },
      {
        heading: "Sterility & Endotoxin",
        rows: [
          { label: "Sterility (PCR)", spec: "No Growth", value: "No Growth — PASS" },
          { label: "Endotoxin (USP <85>)", spec: "<0.25 EU/mL", value: "0.055 EU/mL — PASS" },
        ],
      },
    ],
  },
  {
    key: "BPC-157|5mg",
    labLine: "Freedom Diagnostics | US-Owned & Operated",
    summary:
      "Our BPC-157 5mg has been third-party tested by **Freedom Diagnostics** (Accession # 2606250586, Reported 06/29/2026) and confirmed at **99.51% purity**.",
    sections: [
      {
        heading: "Analytical Results",
        rows: [
          { label: "Identity (LC-MS)", value: "BPC-157 — Confirmed" },
          { label: "Purity (HPLC-UV)", value: "99.51%" },
          { label: "Net Content Average", value: "5.79 mg" },
          { label: "Fentanyl Screen", value: "Negative" },
        ],
      },
      {
        heading: "Sterility & Endotoxin",
        rows: [
          { label: "Endotoxin Rep 1 (USP <85>)", spec: "≤0.05 EU/mL", value: "Pass" },
          { label: "Endotoxin Rep 2 (USP <85>)", spec: "≤0.05 EU/mL", value: "Pass" },
          { label: "Microbial Analysis (PCR)", spec: "No Microbial DNA", value: "Pass" },
        ],
      },
    ],
  },
];

export function getCoaDetail(name: string, dosage: string, purity: string, lab: string): CoaDetail {
  const key = `${name}|${dosage}`;
  const found = COA_DETAILS.find((d) => d.key === key);
  if (found) return found;

  // Fallback for products without hand-authored detail yet — still shows a
  // working modal using the basic info already on the card.
  return {
    key,
    labLine: lab,
    summary: `Our ${name}${dosage !== "—" ? ` ${dosage}` : ""} has been third-party tested by **${lab}** and confirmed at **${purity} purity**.`,
    sections: [
      {
        heading: "Purity & Identity",
        rows: [
          { label: "Purity", value: purity },
          { label: "Identity (ID)", value: `${name} — Confirmed` },
        ],
      },
    ],
  };
}
