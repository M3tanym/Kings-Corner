from pymongo import MongoClient

mongoUri = "mongodb+srv://mrosoff:uMnAALQJ378NvBKL@kings-corner.6kmun.mongodb.net/Kings-Corner?retryWrites=true&w=majority"

client = MongoClient(mongoUri)

users_collection = client['Kings-Corner'].Users
matches_collection = client['Kings-Corner'].Matches
items_collection = client['Kings-Corner'].Items

