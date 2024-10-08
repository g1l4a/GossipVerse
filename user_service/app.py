from flask import Flask, jsonify, request

app = Flask(__name__)
users = {}  # In-memory user storage

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    if username in users:
        return jsonify({'error': 'Username already exists!'}), 400
    users[username] = {'username': username}
    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(list(users.values())), 200

if __name__ == '__main__':
    app.run(port=5001)

