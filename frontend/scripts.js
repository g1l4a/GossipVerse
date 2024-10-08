const API_URL = 'http://localhost:5002';  // Update this to your actual message service URL
const USER_API_URL = 'http://localhost:5001';
const FEED_API_URL = 'http://localhost:5004';
const LIKE_API_URL = 'http://localhost:5003';

async function registerUser() {
    const username = document.getElementById('username-input').value;
    if (!username) {
        document.getElementById('register-status').innerText = 'Please enter a username.';
        return;
    }

    try {
        const response = await fetch(`${USER_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const result = await response.json();
        document.getElementById('register-status').innerText = `User "${username}" registered successfully!`;
    } catch (error) {
        document.getElementById('register-status').innerText = 'Error registering user: ' + error.message;
        console.error('Error registering user:', error);
    }
}


async function postMessage() {
    const username = document.getElementById('username-input').value;
    const content = document.getElementById('message-input').value;

    if (!username) {
        document.getElementById('post-status').innerText = 'Please enter a username.';
        return;
    }
    if (!content) {
        document.getElementById('post-status').innerText = 'Please enter a message.';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, content: content })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const result = await response.json();
        document.getElementById('post-status').innerText = 'Message posted successfully!';
        document.getElementById('message-input').value = ''; // Clear input after posting
    } catch (error) {
        document.getElementById('post-status').innerText = 'Error posting message: ' + error.message;
        console.error('Error posting message:', error);
    }
}

async function loadFeed() {
    try {
        const response = await fetch(`${FEED_API_URL}/feed`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const messages = await response.json();
        const feedElement = document.getElementById('feed');
        feedElement.innerHTML = ''; // Clear the current feed

        // Display messages in the feed
        messages.forEach(message => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${message.username}: ${message.content}
                <span class="like-section">
                    <button class="like-button" data-id="${message.id}">❤️</button>
                    <span class="like-count">${message.likes || 0}</span>
                </span>
            `;
            feedElement.appendChild(listItem);
        });

        // Attach event listeners for all like buttons
        document.querySelectorAll('.like-button').forEach(button => {
            button.addEventListener('click', async function () {
                const messageId = this.getAttribute('data-id');
                await likeMessage(messageId, this);
            });
        });

    } catch (error) {
        console.error('Error loading feed:', error);
        alert('Error loading feed: ' + error.message);
    }
}

async function likeMessage(messageId, button) {
    try {
        const response = await fetch(`${LIKE_API_URL}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message_id: messageId })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // Update the like count after a successful request
        const result = await response.json();
        const likeCountElement = button.nextElementSibling;
        let currentLikes = parseInt(likeCountElement.textContent);
        likeCountElement.textContent = currentLikes + 1;

    } catch (error) {
        console.error('Error liking message:', error);
        alert('Error liking message: ' + error.message);
    }
}

window.onload = () => {
    loadFeed();  // Automatically load feed when the page is loaded
}