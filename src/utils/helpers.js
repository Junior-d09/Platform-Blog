export const truncate = (text, n = 120) => {
  if (!text) return '';
  return text.length > n ? text.slice(0, n) + '…' : text;
};

export const formatDateFake = (id) => {
  // JSONPlaceholder n'a pas de dates; on crée une date artificielle basée sur id
  const base = new Date(2020, 0, 1);
  const d = new Date(base.getTime() + id * 24 * 60 * 60 * 1000);
  return d.toLocaleDateString();
};
