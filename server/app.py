from flask import Flask, request, jsonify, session
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime
from config import Config
import sqlite3
import os

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, supports_credentials=True)

def init_db():
    with sqlite3.connect('admin.db') as conn:
        c = conn.cursor()
        c.execute('''
        CREATE TABLE IF NOT EXISTS rooms (
            id TEXT PRIMARY KEY,
            users INTEGER,
            status TEXT,
            type TEXT,
            created_at TIMESTAMP,
            duration INTEGER
        )
        ''')
        conn.commit()

@app.before_first_request
def setup():
    init_db()
    if not os.path.exists('instance'):
        os.makedirs('instance')

@app.route('/api/admin/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if username == app.config['ADMIN_USERNAME'] and password == app.config['ADMIN_PASSWORD']:
        session['admin'] = True
        return jsonify({'status': 'success', 'message': 'Login successful'})
    return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401

@app.route('/api/admin/logout', methods=['POST'])
def logout():
    session.pop('admin', None)
    return jsonify({'status': 'success', 'message': 'Logged out successfully'})

@app.route('/api/admin/dashboard', methods=['GET'])
def get_dashboard_data():
    if not session.get('admin'):
        return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401
        
    with sqlite3.connect('admin.db') as conn:
        c = conn.cursor()
        
        # Get total rooms
        c.execute('SELECT COUNT(*) FROM rooms')
        total_rooms = c.fetchone()[0]
        
        # Get active rooms
        c.execute('SELECT COUNT(*) FROM rooms WHERE status = "Active"')
        active_rooms = c.fetchone()[0]
        
        # Get active rooms list
        c.execute('''
        SELECT id, users, status, type, created_at, duration 
        FROM rooms 
        WHERE status = "Active" 
        ORDER BY created_at DESC 
        LIMIT 5
        ''')
        active_rooms_list = [{
            'id': row[0],
            'users': row[1],
            'status': row[2],
            'type': row[3],
            'createdAt': row[4],
            'duration': f'{row[5]} mins'
        } for row in c.fetchall()]
        
        return jsonify({
            'status': 'success',
            'data': {
                'totalRooms': total_rooms,
                'activeRooms': active_rooms,
                'peakUsers': max(room['users'] for room in active_rooms_list) if active_rooms_list else 0,
                'avgRoomDuration': '45 mins',  # This would be calculated based on actual data
                'activeRoomsList': active_rooms_list
            }
        })

if __name__ == '__main__':
    app.run(debug=True, port=5000)