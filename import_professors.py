import json
from pymongo import MongoClient

# Connect to local MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["myDB"]
collection = db["professors"]

# 🔥 Clear the collection before importing
collection.delete_many({})
print("✅ Cleared existing professors.")

# Files to import
files = [
    "./data-analysis/Nishant Garg_data.json",
    "./data-analysis/Prannoy Suraneni_data.json"
]

def load_professor(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    return {
        "name": data.get("name"),
        "total_citations": data.get("total_citations", 0),
        "total_publications": data.get("total_publications", 0),
        "publications": [
            {
                "title": pub.get("title"),
                "type": pub.get("type"),
                "doi": pub.get("doi"),
                "publication_year": pub.get("publication_year"),
                "publication_date": pub.get("publication_date"),
                "cited_by_count": pub.get("cited_by_count", 0),
                "authors": pub.get("authors", []),
                "journal": pub.get("journal")
            }
            for pub in data.get("publications", [])
        ]
    }

# Import loop
for file in files:
    professor = load_professor(file)
    result = collection.insert_one(professor)
    print(f"✅ Inserted {professor['name']} with ID {result.inserted_id}")
