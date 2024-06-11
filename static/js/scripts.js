document.addEventListener('DOMContentLoaded', function() {
    const videoGallery = document.getElementById('video-gallery');

    fetch('/api/videos')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (item.id.kind === 'youtube#video') {
                    const videoElement = document.createElement('div');
                    videoElement.classList.add('video');
                    videoElement.innerHTML = `
                        <iframe width="360" height="215" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                        <h3>${item.snippet.title}</h3>
                    `;
                    videoGallery.appendChild(videoElement);
                }
            });
        })
        .catch(error => console.error('Error fetching YouTube data:', error));
});
