export function toLocalDateTime(utcDateTimeStr, locale) {
  const utcDateTime = new Date(utcDateTimeStr);
  return (
    utcDateTime.toLocaleDateString(locale) +
    " " +
    utcDateTime.toLocaleTimeString(locale)
  );
}
