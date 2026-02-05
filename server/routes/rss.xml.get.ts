import { query } from '~/server/database/db'

export default defineEventHandler(async (event) => {
  // Fetch news from database
  const result = await query('SELECT * FROM news WHERE published = true ORDER BY date DESC LIMIT 20')
  
  const siteUrl = 'https://schnauzer-fond.ru' // Replace with actual domain

  // Generate RSS feed
  const rssItems = result.rows.map((item: any) => {
    const pubDate = new Date(item.date).toUTCString()
    const link = `${siteUrl}/news/${item.slug}`
    
    return `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${item.preview}]]></description>
      ${item.image ? `<enclosure url="${siteUrl}${item.image}" type="image/jpeg" />` : ''}
    </item>`
  }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Фонд помощи шнауцерам — Новости</title>
    <link>${siteUrl}</link>
    <description>Новости фонда помощи шнауцерам: истории спасения, пристройства и заботы о собаках</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`

  // Set content type
  event.node.res.setHeader('Content-Type', 'application/xml')
  
  return rss
})
