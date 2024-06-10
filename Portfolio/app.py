from flask import Flask, jsonify, send_from_directory
from urllib.parse import quote as url_quote
import requests

app = Flask(__name__, static_folder='static')


@app.route('/videos')
def serve_videos():
    return send_from_directory(app.static_folder, 'videos.html')


@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/videos', methods=['GET'])
def get_videos():
    api_key = 'AIzaSyDLzk6Q1WdKM8eqUkxQb8Y7rHukTT1kioc'
    channel_id = 'UCNnyXez3-1s06t8tkXuzY5g'
    url = f'https://www.googleapis.com/youtube/v3/search?key={url_quote(api_key)}&channelId={url_quote(channel_id)}&part=snippet,id&order=date&maxResults=10'
    response = requests.get(url)
    data = response.json()
    return jsonify(data['items'])


if __name__ == '__main__':
    app.run(debug=True)
