from ariadne import load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers
from ariadne import QueryType, MutationType

from bson.objectid import ObjectId

from user import user
from utils import clean_kwargs

from db import matches_collection, users_collection


type_defs = load_schema_from_path("../schema.graphql")

query = QueryType()
mutation = MutationType()


@query.field("user")
def resolve_user(_, info, **kwargs):

    user = users_collection.find_one(clean_kwargs(kwargs))
    print(user)
    return user


@query.field("match")
def resolve_match(_, info, **kwargs):

    return matches_collection.find_one(clean_kwargs(kwargs))


@mutation.field("createUser")
def create_user(_, info, **kwargs):

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
def login(_, info, **kwargs):

    return users_collection.find_one(clean_kwargs(kwargs))


@mutation.field("modifyUser")
def modify_user(_, info, **kwargs):

    return users_collection.find_one(clean_kwargs(kwargs))


@mutation.field("requestFriend")
def request_friend(_, info, **kwargs):

    player_id = {"_id": ObjectId(kwargs["playerID"])}
    users_collection.update_one(player_id, {'$push': {'friends': ObjectId(kwargs["friendID"])}})
    return users_collection.find_one(player_id)


@mutation.field("createMatch")
def create_match(_, info, **kwargs):

    new_match = {
        "name": None,
        "players": [kwargs["playerID"]],
        "history": [],
        "currentTurn": kwargs["playerID"],
        "currentState": ""
    }
    new_match["_id"] = matches_collection.insert_one(new_match).inserted_id
    return new_match


@mutation.field("invitePlayer")
def invite_player(_, info, **kwargs):

    player_id = {"_id": ObjectId(kwargs["playerID"])}
    users_collection.update_one(player_id, {'$push': {'invites': ObjectId(kwargs["friendID"])}})
    return users_collection.find_one(player_id)


schema = make_executable_schema(
    type_defs, snake_case_fallback_resolvers,
    query, mutation, user
)
