from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/like", methods=["POST"])
def like_message():
    data = request.json
    message_id = data.get("message_id")

    if not message_id:
        return jsonify({"error": "Message ID required"}), 400

    try:
        response = requests.post(f"http://localhost:5004/like/{message_id}")
        if response.status_code == 201:
            return jsonify({"message": "Message liked successfully!"}), 201
        return jsonify({"error": response.json().get("error")}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5003)
