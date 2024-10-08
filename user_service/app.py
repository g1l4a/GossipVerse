from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

users = []  # In-memory user storage

@app.route('/users', methods=['POST'])
def register_user():
    data = request.json
    username = data.get('username')

    if not username:
        return jsonify({'error': 'Username is required'}), 400

    # Check if the username already exists in the list
    if username in users:
        return jsonify({'error': 'Username already exists'}), 400

    # Add the new user to the list
    users.append(username)

    return jsonify({'message': f'User {username} registered successfully!'}), 201

# To view all registered users (for debugging or verification purposes)
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)

if __name__ == '__main__':
    app.run(port=5001)
