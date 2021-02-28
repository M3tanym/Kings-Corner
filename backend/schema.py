from ariadne import load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers

from .gql_types.query import query
from .gql_types.mutation import mutation
from .gql_types.subscription import subscription

from .fields.user import user
from .fields.match import match

type_defs = load_schema_from_path("../schema.graphql")

schema = make_executable_schema(
    type_defs, snake_case_fallback_resolvers,
    query, mutation, subscription, user, match
)
