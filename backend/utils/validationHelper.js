export function isValidEmail(email) {
  const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
  return emailRegex.test(email);
}
export function isValidNumber(value) {
  return (
    !isNaN(value) &&
    (typeof value === 'number' ||
      (typeof value === 'string' && value.trim() !== ''))
  );
}
