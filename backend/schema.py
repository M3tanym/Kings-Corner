from ariadne import load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers
from ariadne import QueryType, MutationType

from bson.objectid import ObjectId

from user import user
from match import match
from utils import clean_kwargs, dict_to_snake_case

from db import matches_collection, users_collection

type_defs = load_schema_from_path("../schema.graphql")

query = QueryType()
mutation = MutationType()


@query.field("user")
async def resolve_user(_, info, **kwargs):

    return dict_to_snake_case(users_collection.find_one(clean_kwargs(kwargs)))


@query.field("match")
async def resolve_match(_, info, **kwargs):

    return dict_to_snake_case(matches_collection.find_one(clean_kwargs(kwargs)))


@mutation.field("createUser")
async def create_user(_, info, **kwargs):

    new_user = {
        **kwargs,
        "name": None,
        "avatar": None,
        "phoneNumber": None,
        "money": None,
        "friends": [],
        "invites": [],
        "matches": [],
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
        "currentState": ""
    }
    new_match["_id"] = matches_collection.insert_one(new_match).inserted_id
    users_collection.update_one(player_id, {'$push': {'matches': new_match["_id"]}})
    return new_match


@mutation.field("invitePlayer")
async def invite_player(_, info, **kwargs):

    player_id = {"_id": ObjectId(kwargs["playerID"])}
    users_collection.update_one(player_id, {'$push': {'invites': ObjectId(kwargs["friendID"])}})
    return users_collection.find_one(player_id)


schema = make_executable_schema(
    type_defs, snake_case_fallback_resolvers,
    query, mutation, user, match
)
