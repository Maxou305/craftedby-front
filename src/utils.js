export function formatDate(isoDate) {
  const date = new Date(isoDate)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Les mois sont indexés à partir de 0
  const day = String(date.getUTCDate()).padStart(2, '0')

  return `${day}/${month}/${year}`
}
