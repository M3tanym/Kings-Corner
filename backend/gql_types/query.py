from ariadne import QueryType

from ..db import users_collection, matches_collection
from ..utils import clean_kwargs, dict_to_snake_case

query = QueryType()


@query.field("user")
async def resolve_user(_, info, **kwargs):

    return dict_to_snake_case(users_collection.find_one(clean_kwargs(kwargs)))


@query.field("match")
async def resolve_match(_, info, **kwargs):

    return dict_to_snake_case(matches_collection.find_one(clean_kwargs(kwargs)))
