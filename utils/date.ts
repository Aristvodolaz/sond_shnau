/**
 * Formats any date string (ISO, timestamp, etc.) or Date object
 * into YYYY-MM-DD format suitable for HTML date inputs.
 */
export function formatDateForInput(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return ''
  
  if (typeof dateInput === 'string') {
    // If it starts with YYYY-MM-DD (e.g. 2023-05-12 or 2023-05-12T00:00:00.000Z)
    const match = dateInput.match(/^(\d{4}-\d{2}-\d{2})/)
    if (match) {
      return match[1]
    }
  }
  
  try {
    const date = new Date(dateInput)
    if (isNaN(date.getTime())) return ''
    
    // Use UTC methods to avoid timezone shift for date-only values
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')
    
    return `${year}-${month}-${day}`
  } catch {
    return ''
  }
}
