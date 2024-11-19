export  const formatWIBTime = (utcTime) => {
  return new Date(utcTime).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
});
  };