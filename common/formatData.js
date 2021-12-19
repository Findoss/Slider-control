export const formatData = (action, payload, code = 200) => {
  return JSON.stringify({ action: action, payload: payload, code: code });
};
