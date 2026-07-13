export class DateUtils {
  static nowIso(): string {
    return new Date().toISOString();
  }
}