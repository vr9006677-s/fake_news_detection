from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load model
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

@app.route('/predict', methods=['POST'])
def predict():
    text = request.json['text']
    vector = vectorizer.transform([text])
    result = model.predict(vector)[0]

    if result == 1:
        output = "Real News"
    else:
        output = "Fake News"

    return jsonify({"result": output})

app.run(port=5000)
