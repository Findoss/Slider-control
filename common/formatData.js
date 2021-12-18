export const formatData = (action, payload, code = 200) => {
  const msg = JSON.stringify({ action: action, payload: payload, code: code });

  console.log(JSON.parse(msg));

  return msg;
};
