/**
 * @format
 */

export const genKey = () => {
  return (Math.random() * 1000000).toFixed(0);
};

export const formatData = (action, payload, code = 200) => {
  return JSON.stringify({ action: action, payload: payload, code: code });
};
