import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: Request, { params }: { params: Promise<{ countyName: string }> }) {
  const { countyName } = await params
  const filename = `${countyName}.json`
  const geojsonPath = path.join(process.cwd(), 'src', 'app', 'geojson', filename)

  try {
    const fileContent = await fs.readFile(geojsonPath, 'utf8')
    const geojsonData = JSON.parse(fileContent)
    return new Response(JSON.stringify(geojsonData), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(`Error reading GeoJSON file for ${countyName}:`, error)
    return new Response('GeoJSON file not found or invalid', { status: 404 })
  }
}
