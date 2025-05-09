from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017")
db = client["myDB"]
professors_collection = db["professors"]

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Flask API!"}), 200

@app.route("/professors", methods=["GET"])
def get_professors():
    results = list(professors_collection.find({}, {
        "name": 1,
        "total_citations": 1,
        "total_publications": 1
    }))
    for prof in results:
        prof["_id"] = str(prof["_id"])
    return jsonify(results), 200


@app.route("/professors/<prof_id>", methods=["GET"])
def get_professor_detail(prof_id):
    try:
        prof = professors_collection.find_one({"_id": ObjectId(prof_id)})
        if prof:
            prof["_id"] = str(prof["_id"])
            return jsonify(prof), 200
        return jsonify({"error": "Professor not found"}), 404
    except:
        return jsonify({"error": "Invalid ID"}), 400

@app.route("/professors", methods=["POST"])
def create_professor():
    data = request.get_json()
    new_professor = {
        "name": data.get("name"),
        "total_citations": data.get("total_citations", 0),
        "total_publications": data.get("total_publications", 0),
        "publications": data.get("publications", [])
    }
    result = professors_collection.insert_one(new_professor)
    new_professor["_id"] = str(result.inserted_id)
    return jsonify(new_professor), 201


@app.route("/professors/<prof_id>", methods=["PUT"])
def update_professor(prof_id):
    data = request.get_json()
    updated_data = {
        "name": data.get("name"),
        "total_citations": data.get("total_citations", 0),
        "total_publications": data.get("total_publications", 0),
        "publications": data.get("publications", [])
    }
    result = professors_collection.update_one({"_id": ObjectId(prof_id)}, {"$set": updated_data})
    if result.matched_count == 1:
        updated_data["_id"] = prof_id
        return jsonify(updated_data), 200
    return jsonify({"error": "Professor not found"}), 404


@app.route("/professors/<prof_id>", methods=["DELETE"])
def delete_professor(prof_id):
    result = professors_collection.delete_one({"_id": ObjectId(prof_id)})
    if result.deleted_count == 1:
        return jsonify({"message": "Professor deleted"}), 200
    return jsonify({"error": "Professor not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)