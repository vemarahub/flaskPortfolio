import json

from flask import Flask, jsonify, send_from_directory, render_template
from urllib.parse import quote as url_quote
import requests

app = Flask(__name__, static_folder='static')


@app.route('/videos')
def serve_videos():
    return send_from_directory(app.static_folder, 'videos.html')


@app.route('/blogs')
def serve_blogs():
    return send_from_directory(app.static_folder, 'blogs.html')


@app.route('/books')
def serve_books():
    return send_from_directory(app.static_folder, 'books.html')

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/videos', methods=['GET'])
def get_videos():
    api_key = 'AIzaSyDLzk6Q1WdKM8eqUkxQb8Y7rHukTT1kioc'
    channel_id = 'UCNnyXez3-1s06t8tkXuzY5g'
    #url = f'https://www.googleapis.com/youtube/v3/search?key={url_quote(api_key)}&channelId={url_quote(channel_id)}&part=snippet,id&order=date&maxResults=10'
    #response = requests.get(url)
    playlists_url = f'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId={url_quote(channel_id)}&maxResults=25&key={url_quote(api_key)}'
    playlists_response = requests.get(playlists_url)
    #data = playlists_response.json()
    playlists = playlists_response.json().get('items', [])

    # Fetch videos for each playlist
    all_videos = {}
    for playlist in playlists:
        playlist_id = playlist['id']
        playlist_title = playlist['snippet']['title']

        videos_url = f'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId={playlist_id}&key={url_quote(api_key)}'
        videos_response = requests.get(videos_url)
        videos = videos_response.json().get('items', [])

        all_videos[playlist_title] = videos
    return jsonify(all_videos)


@app.route('/api/blogs')
def get_blogs():
    with open('static/json/blogs.json') as f:
        return json.load(f)


if __name__ == '__main__':
    app.run(debug=True)
