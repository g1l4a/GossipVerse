#!/bin/bash

echo "Starting Message Service..."
cd message_service
export FLASK_APP=app.py
flask run --port=5002 &

echo "Starting Feed Service..."
cd ../feed_service
export FLASK_APP=app.py
flask run --port=5004 &

echo "Starting User Service..."
cd ../user_service
export FLASK_APP=app.py
flask run --port=5001 &  

echo "Starting Likes Service..."
cd ../like_service
export FLASK_APP=app.py
flask run --port=5003 &  

echo "Starting Frontend..."
cd ../frontend
python3 -m http.server 5000

wait

