from flask import Blueprint, jsonify, request
from models import User, HealthActivity
from app import db

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    new_user = User(username=data['username'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'})

# Define other routes as needed
@user_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and user.password == password:
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'})

# user_routes.py

# ... Previous imports ...

@user_bp.route('/get_activities/<int:user_id>', methods=['GET'])
def get_activities(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'})

    activities = HealthActivity.query.filter_by(user_id=user.id).all()
    activity_list = [{'name': activity.name, 'date': activity.date} for activity in activities]

    return jsonify({'activities': activity_list})

# user_routes.py

# ... Previous imports ...

@user_bp.route('/record_activity', methods=['POST'])
def record_activity():
    data = request.json
    user_id = data['user_id']
    name = data['name']
    date = data['date']
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'})

    new_activity = HealthActivity(user_id=user.id, name=name, date=date)
    db.session.add(new_activity)
    db.session.commit()
    
    return jsonify({'message': 'Activity recorded successfully'})
