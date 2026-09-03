/**
 * Numeric integrity of the published signature thresholds.
 *
 * The whole point of these figures is that a reader can check them. These
 * tests pin the properties that make that true, so a bad regeneration or a
 * hand-edit fails CI instead of shipping an authoritative-looking wrong number.
 *
 * The statewide identity below is the check that originally caught a wrong
 * Nevada County figure. Keep it.
 *
 * Pure assertions, no browser and no page navigation.
 */
import { test, expect } from "@playwright/test";
import {
  COUNTY_THRESHOLDS,
  STATE,
  STATEWIDE_VOTES,
  STATEWIDE_STATUTE,
  STATEWIDE_AMENDMENT,
  thresholdFor,
  fieldFor,
} from "../src/data/thresholds/california";

test.describe("California county thresholds", () => {
  test("covers all 58 counties, each named once", () => {
    expect(STATE).toBe("California");
    expect(COUNTY_THRESHOLDS).toHaveLength(58);
    expect(new Set(COUNTY_THRESHOLDS.map(c => c.county)).size).toBe(58);
  });

  test("every threshold is ceil(votes / 10) per §9118", () => {
    for (const { county, votes, threshold } of COUNTY_THRESHOLDS) {
      expect(votes, `${county} votes`).toBeGreaterThan(0);
      expect(threshold, `${county} threshold`).toBe(Math.ceil(votes / 10));
    }
  });

  test("county votes sum to the statewide total", () => {
    const sum = COUNTY_THRESHOLDS.reduce((a, c) => a + c.votes, 0);
    expect(sum).toBe(STATEWIDE_VOTES);
  });

  test("statewide constants reproduce California's published requirements", () => {
    // Round-half-up of 5% and 8% of the gubernatorial vote. These two published
    // figures are the external anchor proving the vote basis is correct.
    expect(STATEWIDE_STATUTE).toBe(546_651);
    expect(STATEWIDE_AMENDMENT).toBe(874_641);
    expect(Math.floor(STATEWIDE_VOTES * 0.05 + 0.5)).toBe(STATEWIDE_STATUTE);
    expect(Math.floor(STATEWIDE_VOTES * 0.08 + 0.5)).toBe(STATEWIDE_AMENDMENT);
  });

  test("rows are ordered ascending by threshold", () => {
    const t = COUNTY_THRESHOLDS.map(c => c.threshold);
    expect(t).toEqual([...t].sort((a, b) => a - b));
  });

  test("figures cited in site copy still hold", () => {
    // Referenced by name in /why, /foundation and /thresholds. If the dataset is
    // regenerated after the next gubernatorial election these will change, and
    // the prose must be updated in the same commit.
    expect(thresholdFor("Nevada")).toBe(5074);
    expect(thresholdFor("Alpine")).toBe(62);
  });

  test("lookups pair label with threshold and reject unknown counties", () => {
    expect(fieldFor("Nevada")).toEqual({ region: "Nevada County", threshold: 5074 });
    expect(() => thresholdFor("Nevda")).toThrow(/Unknown county/);
    expect(() => fieldFor("Atlantis")).toThrow(/Unknown county/);
  });
});
