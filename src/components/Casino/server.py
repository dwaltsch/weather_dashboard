from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import random
import requests
import json

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

@app.route('/enterbet')
def enterbet():
    uuid = request.args.get('uuid')
    bet = request.args.get('bet')
    temp = request.args.get('temp')
    conn = sqlite3.connect('casino.db')
    c = conn.cursor()
    c.execute('SELECT funds FROM users WHERE uuid=?', (uuid,))
    funds = c.fetchone()[0]
    if int(bet) > funds:
        # return error as a json
        return jsonify({'msg': 'Insufficient funds', 'funds': funds})
    else:
        funds = funds - int(bet)
        c.execute('UPDATE users SET funds=? WHERE uuid=?', (funds, uuid))
        c.execute('INSERT INTO bets VALUES (?, ?, ?)', (uuid, bet, temp))
        conn.commit()
        conn.close()
        print(funds, bet, temp)
        checkbet()
        return jsonify({'msg': 'Bet entered', 'funds': funds})

def createtbl():
    conn = sqlite3.connect('casino.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                (uuid text PRIMARY KEY, funds real)''')
    conn.commit()
    conn.close()


def createbettbl():
    conn = sqlite3.connect('casino.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS bets
                (uuid text, bet real, temp real)''')
    conn.commit()
    conn.close()

def checkbet():
    # fetch latest bet
    conn = sqlite3.connect('casino.db')
    c = conn.cursor()
    c.execute('SELECT temp FROM bets ORDER BY ROWID DESC LIMIT 1')
    bet = c.fetchone()
    if(int(bet[0]) == getrandomtemp()):
        c.execute('SELECT uuid, bet FROM bets ORDER BY ROWID DESC LIMIT 1')
        uuid = c.fetchone()
        c.execute('SELECT funds FROM users WHERE uuid=?', (uuid,))
        funds = c.fetchone()
        funds = funds[0] * 2
        c.execute('UPDATE users SET funds=? WHERE uuid=?', (funds, uuid))
        c.execute('DELETE FROM bets WHERE uuid=?', (uuid,))
        print('Bet won')
    else:
        # delete all bets
        c.execute('DELETE FROM bets')
        print('Bet lost')
    conn.commit()
    conn.close()


def getrandomtemp():
    randomweather = random.randint(0, 10)
    with open('../../secret/secret.json', 'r') as f:
        secret = json.load(f)
        secret = secret['apiKey']
    url = 'https://api.openweathermap.org/data/3.0/onecall?lat=47.4137716&lon=9.7236938&appid=' + secret + '&units=metric'
    r = requests.get(url)
    data = r.json()
    hourly_temps = int(data["hourly"][randomweather]["temp"])
    print(hourly_temps)
    return hourly_temps


if __name__ == '__main__':
    getrandomtemp()
    app.run()