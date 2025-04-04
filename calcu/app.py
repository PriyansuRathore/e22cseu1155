from flask import Flask, jsonify, request
import requests
import time

app = Flask(__name__)
WINDOW_SIZE = 10
NUMBER_APIS = {
    "p": "http://20.244.56.144/evaluation-service/primes",
    "f": "http://20.244.56.144/evaluation-service/fibo",
    "e": "http://20.244.56.144/evaluation-service/even",
    "r": "http://20.244.56.144/evaluation-service/rand",
}
stored_numbers = []  

def fetch_numbers(url):
    try:
        start_time = time.time()
        response = requests.get(url, timeout=0.5)  # 500ms timeout
        if time.time() - start_time > 0.5 or response.status_code != 200:
            return []
        return response.json().get("numbers", [])
    except requests.RequestException:
        return []

@app.route("/numbers/<string:numberid>", methods=["GET"])
def get_numbers(numberid):
    if numberid not in NUMBER_APIS:
        return jsonify({"error": "Invalid number type"}), 400
    
    global stored_numbers
    prev_state = stored_numbers.copy()
    
    # Fetch new numbers from API
    new_numbers = fetch_numbers(NUMBER_APIS[numberid])
    unique_new_numbers = [num for num in new_numbers if num not in stored_numbers]
    
    # Maintain sliding window
    stored_numbers.extend(unique_new_numbers)
    stored_numbers = stored_numbers[-WINDOW_SIZE:]
    
    # Compute average
    avg = round(sum(stored_numbers) / len(stored_numbers), 2) if stored_numbers else 0.0
    
    return jsonify({
        "windowPrevState": prev_state,
        "windowCurrState": stored_numbers,
        "avg": avg
    })

if __name__ == "__main__":
    app.run(host="localhost", port=9876, debug=True)
