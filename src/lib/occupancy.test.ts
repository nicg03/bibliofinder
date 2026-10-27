import assert from "node:assert/strict";
import test from "node:test";
import { blendOccupancy, occupancyFromPercent } from "./occupancy";

test("soglie semaforo", () => {
  assert.equal(occupancyFromPercent(0), "green");
  assert.equal(occupancyFromPercent(39), "green");
  assert.equal(occupancyFromPercent(40), "yellow");
  assert.equal(occupancyFromPercent(75), "yellow");
  assert.equal(occupancyFromPercent(76), "red");
});

test("sede chiusa non ha semaforo", () => {
  const result = blendOccupancy({
    isOpen: false,
    weekday: 1,
    hour: 12,
    reports: [],
  });
  assert.equal(result.status, "closed");
  assert.equal(result.percent, null);
  assert.equal(result.source, "closed");
});

test("senza report usa la stima oraria", () => {
  const result = blendOccupancy({
    isOpen: true,
    weekday: 2,
    hour: 16,
    reports: [],
  });
  assert.equal(result.source, "estimate");
  assert.equal(result.status, "open");
  assert.ok(result.percent != null);
});

test("report recenti pesano più della stima", () => {
  const estimate = blendOccupancy({
    isOpen: true,
    weekday: 2,
    hour: 10,
    reports: [],
  });
  const crowded = blendOccupancy({
    isOpen: true,
    weekday: 2,
    hour: 10,
    reports: [
      { level: "red", ageMinutes: 5 },
      { level: "red", ageMinutes: 8 },
    ],
  });
  assert.equal(crowded.source, "reports");
  assert.ok((crowded.percent ?? 0) > (estimate.percent ?? 0));
});
