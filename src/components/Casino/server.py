from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hi'

@app.route('/loadfunds')
def loadfunds():
    uuid = request.args.get('uuid')
    conn = sqlite3.connect('casino.db')
    # check if the user exists otherwise create a new user with funds = 500
    c = conn.cursor()
    c.execute('SELECT funds FROM users WHERE uuid=?', (uuid,))
    funds = c.fetchone()
    if funds is None:
        c.execute('INSERT INTO users VALUES (?, ?)', (uuid, 500))
        funds = 500
    else:
        funds = funds[0]
    conn.commit()
    conn.close()
    print(funds)
    return str(funds)

def createtbl():
    conn = sqlite3.connect('casino.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                (uuid text PRIMARY KEY, funds real)''')
    conn.commit()
    conn.close()

if __name__ == '__main__':
    app.run()