from ariadne import MutationType
from bson import ObjectId

from ..db import users_collection, matches_collection
from ..utils import clean_kwargs

mutation = MutationType()


@mutation.field("createUser")
async def create_user(_, info, **kwargs):

    new_user = {
        **kwargs,
        "name": None,
        "avatar": None,
        "phoneNumber": None,
        "friends": [],
        "invites": [],
        "activeMatches": [],
        "finishedMatches": [],
        "money": None,
        "items": []
    }
    new_user["_id"] = users_collection.insert_one(new_user).inserted_id
    return new_user


@mutation.field("login")
async def login(_, info, **kwargs):

    return users_collection.find_one(clean_kwargs(kwargs))


@mutation.field("modifyUser")
async def modify_user(_, info, **kwargs):

    player_id = {"_id": ObjectId(kwargs["playerID"])}
    return users_collection.update_one(player_id, {'$set': clean_kwargs(kwargs)})


@mutation.field("requestFriend")
async def request_friend(_, info, **kwargs):

    player_id = {"_id": ObjectId(kwargs["playerID"])}
    users_collection.update_one(player_id, {'$push': {'friends': ObjectId(kwargs["friendID"])}})
    return users_collection.find_one(player_id)


@mutation.field("createMatch")
async def create_match(_, info, **kwargs):

    player_id = {"_id": ObjectId(kwargs["playerID"])}
    new_match = {
        "name": None,
        "players": [player_id["_id"]],
        "history": [],
        "currentTurn": player_id["_id"],
        "currentState": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
    }
    new_match["_id"] = matches_collection.insert_one(new_match).inserted_id
    users_collection.update_one(player_id, {'$push': {'activeMatches': new_match["_id"]}})
    return new_match


@mutation.field("inviteFriend")
async def invite_friend(_, info, **kwargs):

    player_id = {"_id": ObjectId(kwargs["playerID"])}
    users_collection.update_one(player_id, {'$push': {'invites': ObjectId(kwargs["friendID"])}})
    return users_collection.find_one(player_id)
