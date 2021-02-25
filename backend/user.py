from ariadne import ObjectType

from utils import dict_to_snake_case
from db import users_collection, matches_collection, items_collection

user = ObjectType("User")


@user.field("friends")
async def resolve_friends(obj, info, **kwargs):

    friends_list = users_collection.find({"_id": {"$in": obj["friends"]}})
    return [dict_to_snake_case(friend) for friend in friends_list]


@user.field("invites")
async def resolve_invites(obj, info, **kwargs):

    invites_list = users_collection.find({"_id": {"$in": obj["invites"]}})
    return [dict_to_snake_case(invite) for invite in invites_list]


@user.field("matches")
async def resolve_matches(obj, info, **kwargs):

    matches_list = matches_collection.find({"_id": {"$in": obj["matches"]}})
    return [dict_to_snake_case(match) for match in matches_list]


@user.field("items")
async def resolve_items(obj, info, **kwargs):

    items_list = items_collection.find({"_id": {"$in": obj["items"]}})
    return [dict_to_snake_case(item) for item in items_list]
