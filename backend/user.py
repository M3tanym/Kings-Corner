from ariadne import ObjectType
from db import users_collection

user = ObjectType("User")


@user.field("friends")
async def resolve_friends(obj, info, **kwargs):

    return users_collection.find({"_id": {"$in": obj["friends"]}})
