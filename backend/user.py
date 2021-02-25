from ariadne import ObjectType

from utils import fix_return_dict
from db import users_collection, matches_collection, items_collection

user = ObjectType("User")


@user.field("friends")
async def resolve_friends(obj, info, **kwargs):

    return fix_return_dict(users_collection.find({"_id": {"$in": obj["friends"]}}))


@user.field("invites")
async def resolve_invites(obj, info, **kwargs):

    return fix_return_dict(users_collection.find({"_id": {"$in": obj["invites"]}}))


@user.field("matches")
async def resolve_matches(obj, info, **kwargs):

    return fix_return_dict(matches_collection.find({"_id": {"$in": obj["matches"]}}))


@user.field("items")
async def resolve_items(obj, info, **kwargs):

    return fix_return_dict(items_collection.find({"_id": {"$in": obj["items"]}}))
