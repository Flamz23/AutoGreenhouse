from flask import Flask, render_template
from flask_socketio import SocketIO
import pigpio
import random

pi = pigpio.pi()
app = Flask(__name__)
socketio = SocketIO(app)


TEMP = random.randint(60, 80)
HUMID = random.randint(0, 70)
MOISTURE = random.randint(0, 70)


@app.route('/')
def index():
    return render_template('index.html')  # _ws_client.html')


@socketio.on('connect')
def test_connect():
    print('Client connected')


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


# @socketio.on('get_gpio_state')
# def get_gpio(data):
#     print(data)

#     parsed = json.loads(data)

#     pin = parsed['pin']
#     state = pi.read(pin)
#     socketio.emit('gpio_state', state)


@socketio.on('set_gpio_state')
def set_gpio(data):

    print(data['pin'])

    pin = data['pin']
    state = data['state']
    pi.set_mode(pin, pigpio.OUTPUT)
    pi.write(pin, state)


@socketio.on('refresh_request')
def refresh_request():
    socketio.emit('gpio_refresh', {
                  'temp': TEMP, 'humid': HUMID, 'moisture': MOISTURE})
    print('refresh')


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
