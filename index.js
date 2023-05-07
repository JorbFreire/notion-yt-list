import axios from 'axios'
import { google } from 'googleapis'
import { Client } from "@notionhq/client"

const NOTION_KEY = process.env.NOTION_KEY
const YOUTUBE_KEY = process.env.YOUTUBE_KEY

const notion = new Client({ auth: NOTION_KEY })

const getNotionSubs = async () => {
  const database_id = process.env.DATABASE_ID
  const response = await notion.databases.query({ database_id })
  if (response.has_more)
    console.info('More to show')
  return response.results
}

const getYoutubeSubs = async () => {
  const youtube = google.youtube('v3');
  return await axios.get('https://www.googleapis.com/youtube/v3/list?access_token=' + YOUTUBE_KEY)
}

export default async function main() {
  const notionSubs = await getNotionSubs()
  // const youtubeSubs = await getYoutubeSubs()
  console.log(notionSubs)
}

main()
