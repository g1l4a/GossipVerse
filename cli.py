from flask import Flask, jsonify, request

app = Flask(__name__)

messages = [
    {"id": 1, "username": "user1", "content": "Hello World!"},
    {"id": 2, "username": "user2", "content": "This is my second message!"},
    {"id": 3, "username": "user3", "content": "Loving this app!"},
]


@app.route('/')
def home():
    return "Welcome to the Feed Service! Use the '/feed' endpoint to see messages."


@app.route('/feed', methods=['GET'])
def get_feed():
    return jsonify(messages[-10:])


@app.route('/update_feed', methods=['POST'])
def update_feed():
    data = request.json
    if data:
        messages.append(data)
        return jsonify({"status": "Feed updated"}), 201
    return jsonify({"error": "Invalid data"}), 400


if __name__ == "__main__":
    app.run(port=5005)
