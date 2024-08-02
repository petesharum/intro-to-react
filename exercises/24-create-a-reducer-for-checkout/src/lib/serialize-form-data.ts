/**
 * Serialize form data to an object.
 * @param formData The FormData object to serialize.
 * @returns An object representation of the form data.
 *
 * @example
 * serializeFormData(new FormData(formElement));
 * // { fName: 'John Doe', cardNumber: '1234 5678 9012 3456', expiry: '12/24', cvv: '123', postalCode: '12345' }
 */
export function serializeFormData(formData: FormData) {
  return Object.fromEntries(formData);
}
