export function post({ url, body, onSuccess, onError }) {
  const request = new XMLHttpRequest();
  request.open('POST', url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(body));

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      const data = JSON.parse(request.responseText);
      if (request.status === 200) {
        onSuccess(data);
      } else {
        onError(data);
      }
    }
  };

  return request;
}
