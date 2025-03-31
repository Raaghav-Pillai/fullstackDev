import json
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["myDB"]
professors_collection = db["professors"]

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

files = [
    "data-analysis/Nishant Garg_data.json",
    "data-analysis/Prannoy Suraneni_data.json"
]

for path in files:
    data = load_json(path)

    professor = {
        "name": data.get("name"),
        "designation": data.get("designation"),
        "department": data.get("department"),
        "education": data.get("education", []),
        "research_interests": data.get("research_interests", []),
        "courses": data.get("courses", []),
        "publications": data.get("publications", []),
        "email": data.get("email"),
        "office": data.get("office"),
        "website": data.get("website"),
        "photo_url": data.get("photo_url")
    }

    professors_collection.insert_one(professor)