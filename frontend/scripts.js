const API_URL = 'http://localhost:5002';  // Update this to your actual message service URL

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
