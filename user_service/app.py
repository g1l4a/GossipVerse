from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = []


@app.route('/users', methods=['POST'])
def register_user():
    data = request.json
    username = data.get('username')

    if not username:
        return jsonify({'error': 'Username is required'}), 400

    if username in users:
        return jsonify({'error': 'Username already exists'}), 400

    users.append(username)

    return jsonify({'message': f'User {username} registered successfully!'}), 201


@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)


if __name__ == '__main__':
    app.run(port=5001)
