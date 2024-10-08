from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

messages = []


@app.route("/messages", methods=["POST"])
def post_message():
    data = request.json
    username = data.get("username")
    content = data.get("content")

    if not username or not content or len(content) > 400:
        return jsonify({"error": "Invalid message data"}), 400

    new_message = {
        "id": len(messages) + 1,
        "username": username,
        "content": content
    }
    messages.append(new_message)

    try:
        requests.post("http://localhost:5004/update_feed", json=new_message)
    except Exception as e:
        print(f"Failed to notify feed service: {e}")

    return jsonify({"message": "Message posted successfully!"}), 201


@app.route('/feed', methods=['GET'])
def get_feed():
    return jsonify(messages[-10:])


if __name__ == "__main__":
    app.run(port=5002)
