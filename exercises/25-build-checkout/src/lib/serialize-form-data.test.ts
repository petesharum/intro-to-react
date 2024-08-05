import { serializeFormData } from './serialize-form-data';

test('should serialize form data with single key-value pair', () => {
  const formData = new FormData();
  formData.append('name', 'John Doe');

  const result = serializeFormData(formData);

  expect(result).toEqual({ name: 'John Doe' });
});

test('should serialize form data with multiple key-value pairs', () => {
  const formData = new FormData();
  formData.append('name', 'John Doe');
  formData.append('age', '30');
  formData.append('email', 'johndoe@example.com');

  const result = serializeFormData(formData);

  expect(result).toEqual({
    name: 'John Doe',
    age: '30',
    email: 'johndoe@example.com',
  });
});

test('should serialize form data with empty values', () => {
  const formData = new FormData();
  formData.append('name', '');
  formData.append('age', '');
  formData.append('email', '');

  const result = serializeFormData(formData);

  expect(result).toEqual({ name: '', age: '', email: '' });
});
