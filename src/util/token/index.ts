
export const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch (e) {
    console.error('Error decoding token', e);
    return null;
  }
};
