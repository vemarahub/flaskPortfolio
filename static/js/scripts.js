document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/videos')
        .then(response => response.json())
        .then(data => {
            const videoSections = document.getElementById('video-sections');
            for (const [playlistTitle, videos] of Object.entries(data)) {
                const section = document.createElement('div');
                section.classList.add('playlist-section');

                const title = document.createElement('h3');
                title.classList.add('playlist-title');
                title.textContent = playlistTitle;
                title.setAttribute('data-toggle', 'collapse');
                title.setAttribute('data-target', `#${playlistTitle.replace(/\s+/g, '-')}`);
                section.appendChild(title);

                const videoContainer = document.createElement('div');
                videoContainer.classList.add('video-container', 'collapse');
                videoContainer.id = playlistTitle.replace(/\s+/g, '-');

                videos.forEach(video => {
                    const videoItem = document.createElement('div');
                    videoItem.classList.add('video-item');

                    const iframe = document.createElement('iframe');
                    iframe.width = '560';
                    iframe.height = '315';
                    iframe.src = `https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`;
                    iframe.frameBorder = '0';
                    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
                    iframe.allowFullscreen = true;

                    const caption = document.createElement('p');
                    caption.textContent = video.snippet.title;

                    videoItem.appendChild(iframe);
                    videoItem.appendChild(caption);
                    videoContainer.appendChild(videoItem);
                });

                section.appendChild(videoContainer);
                videoSections.appendChild(section);
            }

            // Add event listeners for dropdown functionality
            const playlistTitles = document.querySelectorAll('.playlist-title');
            playlistTitles.forEach(title => {
                title.addEventListener('click', function() {
                    const target = document.getElementById(this.getAttribute('data-target').substring(1));
                    target.classList.toggle('collapse');
                });
            });
        })
        .catch(error => console.error('Error fetching videos:', error));

    fetch('/api/blogs')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('blogs-container');
            for (const topic in data) {
                // Create the collapsible button
                const collapsible = document.createElement('button');
                collapsible.className = 'collapsible';
                collapsible.textContent = topic;

                // Create the content div
                const content = document.createElement('div');
                content.className = 'content';

                data[topic].forEach(blog => {
                    const blogCard = document.createElement('div');
                    blogCard.className = 'blog-card';

                    const blogTitle = document.createElement('a');
                    blogTitle.href = blog.link;
                    blogTitle.textContent = blog.title;
                    blogTitle.target = '_blank';

                    const blogPlatform = document.createElement('div');
                    blogPlatform.className = 'blog-platform';
                    blogPlatform.textContent = `Platform: ${blog.platform}`;

                    blogCard.appendChild(blogTitle);
                    blogCard.appendChild(blogPlatform);
                    content.appendChild(blogCard);
                });

                container.appendChild(collapsible);
                container.appendChild(content);

                collapsible.addEventListener('click', function() {
                    this.classList.toggle('active');
                    const content = this.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            }
        });
});
