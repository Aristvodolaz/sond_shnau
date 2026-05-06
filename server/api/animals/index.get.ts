import { fetchAnimalsList, parseAnimalsQuery } from '~/server/utils/animalsList'

export default defineEventHandler(async (event) => {
  try {
    const parsed = parseAnimalsQuery(event)
    return await fetchAnimalsList(parsed)
  } catch (error: any) {
    console.error('Error in /api/animals:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch animals'
    })
  }
})
