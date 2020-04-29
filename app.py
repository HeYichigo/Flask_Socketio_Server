import logging
from flask_socketio import SocketIO, emit
from flask import Flask, render_template, jsonify
import eventlet
eventlet.monkey_patch()


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app=app, async_mode='eventlet', cors_allowed_origins='*')


@app.route('/zigbee/index')
def index():
    return render_template('index.html')


@socketio.on('collection_channl', namespace='/zigbee')
def broadcast_message(message):
    logging.info(message)
    emit('view_channl', {'data': message}, broadcast=True)


@socketio.on('connect', namespace='/zigbee')
def connect():
    logging.info('already connected')
    emit('view_channl', {'data': 'Connected'})


@socketio.on('disconnect', namespace='/zigbee')
def disconnect():
    logging.error('disconnect')
