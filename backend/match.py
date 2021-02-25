from ariadne import ObjectType

from backend.utils import dict_to_snake_case
from db import users_collection

match = ObjectType("Match")


@match.field("players")
async def resolve_players(obj, info, **kwargs):

    return dict_to_snake_case(users_collection.find({"_id": {"$in": obj["players"]}}))
