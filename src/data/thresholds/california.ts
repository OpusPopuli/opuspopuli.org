/*
 * CALIFORNIA county initiative signature thresholds. Elections Code §9118.
 *
 * One file per state. The shape here (jurisdiction, votes, threshold, plus the
 * source and statute it derives from) is state-agnostic; the statute and the
 * arithmetic behind it are not. California uses 10% of the county gubernatorial
 * vote. Another state's local-initiative threshold, where one exists at all, is
 * set by its own code and computed from its own election records.
 *
 * Adding a state means adding a sibling file derived from that state's official
 * returns. It does NOT mean applying the §9118 formula to other states'
 * numbers. Do not estimate, interpolate, or carry this formula across a state
 * line.
 *
 *
 * §9118: a county initiative petition must be signed by voters "not less in
 * number than 10 percent of the entire vote cast within the county for all
 * candidates for Governor at the last gubernatorial election." Meeting it
 * compels the board of supervisors to act — adopt the ordinance, submit it to
 * the voters, or order a report.
 *
 * SOURCE — every number below is derived from one official file:
 *   California Secretary of State, Statement of the Vote,
 *   General Election of November 8, 2022 — Governor, by county.
 *   https://elections.cdn.sos.ca.gov/sov/2022-general/sov/19-governor.xlsx
 *   Retrieved 2026-09-02.
 *
 * METHOD: 2022 was a top-two general, so "all candidates for Governor" is
 * Newsom + Dahle. County `threshold` is ceil(votes / 10): §9118 requires NOT
 * LESS THAN 10 percent, so any fractional remainder rounds up.
 *
 * VERIFICATION of the vote basis: the county totals here sum to 10,933,018,
 * matching the Statement of Vote's own State Totals row. Five percent of that
 * sum is 546,651 and eight percent is 874,641 — exactly California's
 * published statewide signature requirements for an initiative statute and a
 * constitutional amendment in this cycle. That the same vote basis reproduces
 * both published statewide figures is the check that these county vote counts
 * are right.
 *
 * NOTE ON ROUNDING: the two statewide constants below use round-half-up,
 * which is what reproduces the SOS published figures. County thresholds use
 * ceil instead, per the stricter "not less in number than" language in §9118.
 * The two rules agree for almost every county; where they differ, ceil is the
 * conservative reading and the one that cannot leave a petition short.
 *
 * DO NOT hand-edit these values. Regenerate them from the SOS file above
 * after the next gubernatorial election.
 */

/** The state this dataset covers. */
export const STATE = 'California';

export interface CountyThreshold {
  /** County name. */
  county: string;
  /** Total votes cast for all gubernatorial candidates, Nov 8 2022. */
  votes: number;
  /** Signatures required under Elections Code §9118. */
  threshold: number;
}

/** The official Statement of Vote file every figure here is derived from. */
export const SOURCE_URL =
  'https://elections.cdn.sos.ca.gov/sov/2022-general/sov/19-governor.xlsx';

/** Human-readable citation for SOURCE_URL. */
export const SOURCE_LABEL =
  'California Secretary of State — Statement of the Vote, General Election, November 8, 2022';

/** Landing page for the full Statement of Vote, for readers who want context. */
export const SOURCE_PAGE_URL =
  'https://www.sos.ca.gov/elections/prior-elections/statewide-election-results/general-election-nov-8-2022/statement-vote';

/** The statute itself, on the Legislature's site. */
export const STATUTE_URL =
  'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=ELEC&sectionNum=9118.';

/** Total gubernatorial vote statewide, Nov 8 2022. */
export const STATEWIDE_VOTES = 10933018;

/** Statewide initiative statute: five percent of the gubernatorial vote. */
export const STATEWIDE_STATUTE = 546651;

/** Statewide constitutional amendment: eight percent of the gubernatorial vote. */
export const STATEWIDE_AMENDMENT = 874641;

/** All 58 counties, ascending by signature threshold. */
export const COUNTY_THRESHOLDS: CountyThreshold[] = [
  { county: 'Alpine', votes: 619, threshold: 62 },
  { county: 'Sierra', votes: 1543, threshold: 155 },
  { county: 'Modoc', votes: 3412, threshold: 342 },
  { county: 'Trinity', votes: 4527, threshold: 453 },
  { county: 'Mono', votes: 4569, threshold: 457 },
  { county: 'Colusa', votes: 5562, threshold: 557 },
  { county: 'Inyo', votes: 7477, threshold: 748 },
  { county: 'Mariposa', votes: 7840, threshold: 784 },
  { county: 'Glenn', votes: 7930, threshold: 793 },
  { county: 'Del Norte', votes: 8375, threshold: 838 },
  { county: 'Plumas', votes: 8633, threshold: 864 },
  { county: 'Lassen', votes: 9170, threshold: 917 },
  { county: 'Siskiyou', votes: 17723, threshold: 1773 },
  { county: 'Amador', votes: 18655, threshold: 1866 },
  { county: 'San Benito', votes: 19578, threshold: 1958 },
  { county: 'Yuba', votes: 19631, threshold: 1964 },
  { county: 'Lake', votes: 20131, threshold: 2014 },
  { county: 'Tehama', votes: 20631, threshold: 2064 },
  { county: 'Calaveras', votes: 21240, threshold: 2124 },
  { county: 'Tuolumne', votes: 23230, threshold: 2323 },
  { county: 'Kings', votes: 26912, threshold: 2692 },
  { county: 'Sutter', votes: 28106, threshold: 2811 },
  { county: 'Imperial', votes: 29869, threshold: 2987 },
  { county: 'Mendocino', votes: 30394, threshold: 3040 },
  { county: 'Madera', votes: 36961, threshold: 3697 },
  { county: 'Humboldt', votes: 47798, threshold: 4780 },
  { county: 'Napa', votes: 50108, threshold: 5011 },
  { county: 'Nevada', votes: 50737, threshold: 5074 },
  { county: 'Merced', votes: 55273, threshold: 5528 },
  { county: 'Yolo', votes: 67135, threshold: 6714 },
  { county: 'Shasta', votes: 68520, threshold: 6852 },
  { county: 'Butte', votes: 72441, threshold: 7245 },
  { county: 'El Dorado', votes: 88671, threshold: 8868 },
  { county: 'Tulare', votes: 91326, threshold: 9133 },
  { county: 'Monterey', votes: 102129, threshold: 10213 },
  { county: 'Santa Cruz', votes: 104169, threshold: 10417 },
  { county: 'Marin', votes: 119064, threshold: 11907 },
  { county: 'San Luis Obispo', votes: 119630, threshold: 11963 },
  { county: 'Solano', votes: 130619, threshold: 13062 },
  { county: 'Stanislaus', votes: 130967, threshold: 13097 },
  { county: 'Santa Barbara', votes: 135374, threshold: 13538 },
  { county: 'San Joaquin', votes: 177325, threshold: 17733 },
  { county: 'Placer', votes: 182069, threshold: 18207 },
  { county: 'Kern', votes: 188712, threshold: 18872 },
  { county: 'Sonoma', votes: 197454, threshold: 19746 },
  { county: 'Fresno', votes: 219085, threshold: 21909 },
  { county: 'San Mateo', votes: 247517, threshold: 24752 },
  { county: 'Ventura', votes: 280935, threshold: 28094 },
  { county: 'San Francisco', votes: 301466, threshold: 30147 },
  { county: 'Contra Costa', votes: 388503, threshold: 38851 },
  { county: 'San Bernardino', votes: 454500, threshold: 45450 },
  { county: 'Sacramento', votes: 477613, threshold: 47762 },
  { county: 'Alameda', votes: 487969, threshold: 48797 },
  { county: 'Santa Clara', votes: 541895, threshold: 54190 },
  { county: 'Riverside', votes: 595901, threshold: 59591 },
  { county: 'Orange', votes: 956940, threshold: 95694 },
  { county: 'San Diego', votes: 1029228, threshold: 102923 },
  { county: 'Los Angeles', votes: 2389227, threshold: 238923 },
];

/**
 * Signature threshold for a named county. Throws at build time on a typo or a
 * county that is not in the dataset, so a wrong number cannot reach a page.
 */
export function thresholdFor(county: string): number {
  const row = COUNTY_THRESHOLDS.find(c => c.county === county);
  if (!row) throw new Error(`Unknown county: ${county}`);
  return row.threshold;
}

/**
 * Display label and threshold for a county, as one value.
 *
 * `Field` takes the label and the number as separate props, which means a
 * caller could pair one county's name with another county's threshold and
 * publish a wrong figure that looks authoritative. Spreading this helper makes
 * the pair atomic:
 *
 *   <Field {...fieldFor('Nevada')} />
 *
 * Throws at build time on an unknown county, so a typo fails the build rather
 * than reaching a page.
 */
export function fieldFor(county: string): { region: string; threshold: number } {
  return { region: `${county} County`, threshold: thresholdFor(county) };
}
