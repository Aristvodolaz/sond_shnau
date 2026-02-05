import { query } from '~/server/database/db'

export default defineEventHandler(async () => {
  const result = await query('SELECT * FROM adopted ORDER BY year DESC, adoption_date DESC')

  return result.rows.map((dog: any) => ({
    id: dog.id.toString(),
    name: dog.name,
    type: dog.type,
    year: dog.year,
    city: dog.city,
    photo: dog.photo,
    adoptionDate: dog.adoption_date
  }))
})
