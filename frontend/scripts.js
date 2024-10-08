const API_URL = 'http://localhost:5002';  // Update this to your actual message service URL

async function registerUser() {
    const username = document.getElementById('username-input').value;
    if (!username) {
        document.getElementById('register-status').innerText = 'Please enter a username.';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users`, {
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
        const response = await fetch(`${API_URL}/feed`, {
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
            listItem.textContent = `[ID: ${message.id}] ${message.username}: ${message.content}`;
            feedElement.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error loading feed:', error);
        alert('Error loading feed: ' + error.message);
    }
}
