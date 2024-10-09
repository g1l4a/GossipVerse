# Software Architecture - Team 16 - Homework 5
# Message and Feed Application

A simple web application that allows users to register, post messages, and
view a feed of recent messages. The application consists of multiple
services: user service, message service, feed service, likes service, and
a frontend interface.

## Features

- User registration
- Post messages
- View a feed of the latest messages
- Like messages
- Modern and responsive frontend design

## Technologies Used

- Flask (Python) for backend services
- HTML, CSS, JavaScript for the frontend
- Python 3.x

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/g1l4a/GossipVerse
   cd GossipVerse
   ```

2. **Create a Virtual Environment**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For macOS/Linux
   # or
   venv\Scripts\activate  # For Windows
   ```

3. **Install Required Packages**

   Navigate to each service directory and install the required packages:

   ```bash
   # For Message Service
   cd ../message_service
   pip install -r requirements.txt

   # For Feed Service
   cd ../feed_service
   pip install -r requirements.txt

   # For User Service
   cd ../user_service
   pip install -r requirements.txt

   # For Likes Service
   cd ../like_service
   pip install -r requirements.txt
   ```

4. **Start the Services**

   Navigate to the root of the project directory and start the services:

   ```bash
   chmod +x start_services.sh
   ./start_services.sh
   ```

   This will start all the backend services and the frontend server.

## Usage

1. **Open the Frontend**

   Visit `http://localhost:5000` in your web browser to access the
   application.

2. **Register a User**

   Enter a username in the input field and click on the register button.

3. **Post Messages**

   After registering, you can post messages by entering content in the
   message input field.

4. **View Feed**

   The feed will not automatically load and need press refresh feed button to get latest messages.

5. **Like Messages**

   Users can like messages

## API Endpoints

### User Service

- `POST /users`: For registration user.
- `GET /users`: Get all users.

### Message Service

- `POST /messages`: Post a new message.
- `GET /messages`: Retrieve 10 last messages.

### Feed Service

- `POST /update_feed`: Update messages.
- `POST /like/<int:message_id>`: Update likes.
- `GET /feed`: Retrieve the last 10 messages.

### Likes Service

- `POST /like/<message_id>`: Like message.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE)
file for more information.

```

### Instructions to Use the README

1. **File Location**: Save this text as `README.md` in the root of your 
project directory.
2. **Customization**: Replace placeholders like `yourusername` with your 
actual GitHub username and add any additional instructions or features 
specific to your application.
3. **License**: Make sure to include a LICENSE file if you mention one in 
the README.

Feel free to modify it further based on your project’s needs!
