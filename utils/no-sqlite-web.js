export function openDatabase() {
  console.warn("SQLite not supported on web -- using mock.");
  return { transaction() {} };
}