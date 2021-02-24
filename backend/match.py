from ariadne import ObjectType
from db import users_collection

match = ObjectType("Match")


@match.field("players")
async def resolve_players(obj, info, **kwargs):

    return users_collection.find({"_id": {"$in": obj["players"]}})
