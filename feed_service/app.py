from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory message storage
messages = [
    {"id": 1, "username": "user1", "content": "Hello World!", "likes": 0},
    {"id": 2, "username": "user2", "content": "This is my second message!", "likes": 0},
    {"id": 3, "username": "user3", "content": "Loving this app!", "likes": 0},
]

@app.route('/')
def home():
    return "Welcome to the Feed Service! Use the '/feed' endpoint to see messages."

@app.route('/feed', methods=['GET'])
def get_feed():
    return jsonify(messages[-10:])  # Return the last 10 messages

@app.route('/update_feed', methods=['POST'])
def update_feed():
    data = request.json
    if data:
        data["likes"] = 0  # Ensure every new message starts with 0 likes
        messages.append(data)
        return jsonify({"status": "Feed updated"}), 201
    return jsonify({"error": "Invalid data"}), 400

@app.route('/like/<int:message_id>', methods=['POST'])
def like_message(message_id):
    for message in messages:
        if message["id"] == message_id:
            message["likes"] += 1
            return jsonify({"status": "Message liked"}), 201
    return jsonify({"error": "Message not found"}), 404

if __name__ == "__main__":
    app.run(port=5004)
