import { type NextRequest } from 'next/server';
import { getNowPlaying } from 'lib/spotify';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req: NextRequest) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  const song = await response.json();

  if (song.item === null) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[2].url;
  const songUrl = song.item.external_urls.spotify;
  const previewUrl = song.item.preview_url;

  return new Response(
    JSON.stringify({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      previewUrl
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    }
  );
}
