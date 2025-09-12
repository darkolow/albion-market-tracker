from flask import Flask, jsonify, request, send_file
import requests

app = Flask(__name__)

@app.route('/albion/item-price', methods=['GET'])
def get_item_price():
    item = request.args.get('item', 'T4_BAG')
    location = request.args.get('location', 'Caerleon')
    url = f"https://www.albion-online-data.com/api/v2/stats/prices/{item}?locations={location}"
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to fetch data'}), response.status_code

@app.route('/')
def index():
    return send_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)
