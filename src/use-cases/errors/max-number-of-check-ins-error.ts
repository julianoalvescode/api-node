export class MaxnumberOfCheckinsError extends Error {
  constructor() {
    super("Max number of check-ins reached.");
  }
}
