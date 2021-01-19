import shouldShave from "../shouldShave";

describe("Should shave", () => {
  it("should not be shaved below age 1", () => {
    expect(shouldShave(0, null, 0.99, 99)).toBe(false);
  });
  it("should be shaved from age zero", () => {
    expect(shouldShave(0, null, 4, 400)).toBe(true);
  });
  it("should be shaved on day zero", () => {
    expect(shouldShave(1, 4, 4, 400)).toBe(false);
  });
  it(" should not be shave on day one", () => {
    expect(shouldShave(14, 4, 4, 414)).toBe(true);
  });
  it("  should be shaved on day 14", () => {
    expect(shouldShave(26, 4.14, 4, 426)).toBe(false);
  });
  it("should not be shaved on day 26", () => {
    expect(shouldShave(26, 4.14, 4, 426)).toBe(false);
  });
  it("should be shaved on day 27", () => {
    expect(shouldShave(27, 4.14, 4, 427)).toBe(true);
  });
});
