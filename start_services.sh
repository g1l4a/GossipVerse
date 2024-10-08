#!/bin/bash

# Start the message service
echo "Starting Message Service..."
cd message_service
export FLASK_APP=app.py
flask run --port=5002 &  # Run the backend in the background

# Start the feed service
echo "Starting Feed Service..."
cd ../feed_service
export FLASK_APP=app.py
flask run --port=5004 &  # Run the feed service in the background

# Start the user service
echo "Starting User Service..."
cd ../user_service
export FLASK_APP=app.py
flask run --port=5001 &  

# Start the user service
echo "Starting Likes Service..."
cd ../like_service
export FLASK_APP=app.py
flask run --port=5003 &  

# Start the frontend
echo "Starting Frontend..."
cd ../frontend
python3 -m http.server 5000  # Serve frontend on port 5000

wait  # Wait for all background processes to finish

