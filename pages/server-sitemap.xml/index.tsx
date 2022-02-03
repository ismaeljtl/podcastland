import { GetServerSideProps } from 'next'
// @ts-ignore
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { CuratedListElement } from '../../interfaces/curatedList'
import { Genre } from '../../interfaces/genre'

// fetcher function to fetch multiple calls (i.e. genreEpisodes)
const fetcher = async (id: any) => {
  let response = await fetch(
    `${process.env.BASE_URL}/best_podcasts?genre_id=${id}&page=1&region=us&safe_mode=0`,
    {
      method: 'GET',
      headers: { 'X-ListenAPI-Key': process.env.NEXT_PUBLIC_KEY! }
    }
  )
  return await response.json()
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const url = 'https://podcastland.vercel.app'

  const landingData = await Promise.all([
    fetch(`${process.env.BASE_URL}/genres?top_level_only=1`, {
      method: 'GET',
      headers: { 'X-ListenAPI-Key': process.env.NEXT_PUBLIC_KEY! }
    }),
    fetch(`${process.env.BASE_URL}/curated_podcasts`, {
      method: 'GET',
      headers: { 'X-ListenAPI-Key': process.env.NEXT_PUBLIC_KEY! }
    })
  ])
  const landingData1: any = await landingData[0].json()
  const landingData2: any = await landingData[1].json()
  const genres: Genre[] = landingData1.genres
  const curatedPodcasts: CuratedListElement[] = landingData2.curated_lists

  const genreEpisodes = await Promise.all(
    genres.map((genre) => fetcher(genre.id))
  )

  let episodes = []
  const complexEpisodes = genreEpisodes.map((genre) =>
    genre.podcasts.map((episode: any) => ({
      loc: `${url}/episodes/${episode.id}`,
      lastmod: new Date().toISOString()
    }))
  )
  for (let i = 0; i < complexEpisodes.length; i++) {
    for (let j = 0; j < complexEpisodes.length; j++) {
      if (complexEpisodes[i][j]) {
        episodes.push(complexEpisodes[i][j])
      }
    }
  }

  const fields: ISitemapField[] = [
    ...genres.map((genre) => ({
      loc: `${url}/category/${genre.id}`,
      lastmod: new Date().toISOString()
    })),
    ...curatedPodcasts.map((curated) => ({
      loc: `${url}/curated/${curated.id}`,
      lastmod: new Date().toISOString()
    })),
    ...episodes.map((i) => ({ ...i }))
  ]

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default () => {}
