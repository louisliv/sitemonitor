let bases = document.getElementsByTagName('base');
export const environment = {
  production: true,
  apiUrl: `http://${window.location.host}${bases[0].getAttribute('href')}/api`
};
