from pymongo import MongoClient

client = MongoClient("mongodb+srv://mrosoff:uMnAALQJ378NvBKL@kings-corner.6kmun.mongodb.net/Kings-Corner?retryWrites=true&w=majority")
users_collection = client['Kings-Corner'].Users
matches_collection = client['Kings-Corner'].Matches
items_collection = client['Kings-Corner'].Items

