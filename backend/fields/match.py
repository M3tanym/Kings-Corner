from ariadne import ObjectType

from ..utils import dict_to_snake_case
from ..db import users_collection

match = ObjectType("Match")


@match.field("players")
async def resolve_players(obj, info, **kwargs):

    players_list = users_collection.find({"_id": {"$in": obj["players"]}})
    return [dict_to_snake_case(player) for player in players_list]


@match.field("currentTurn")
async def resolve_current_turn(obj, info, **kwargs):

    player_id = obj["current_turn"]
    return dict_to_snake_case(users_collection.find_one(player_id))
