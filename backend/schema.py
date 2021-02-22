from ariadne import load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers
from ariadne import QueryType, MutationType
from pymongo import MongoClient

client = MongoClient("mongodb+srv://mrosoff:uMnAALQJ378NvBKL@kings-corner.6kmun.mongodb.net/Kings-Corner?retryWrites=true&w=majority")
users_collection = client['Kings-Corner'].Users
matches_collection = client['Kings-Corner'].Matches

type_defs = load_schema_from_path("../schema.graphql")

query = QueryType()
mutation = MutationType()


@query.field("user")
def resolve_user(_, info, **kwargs):

    clean_kwargs = {key: kwargs[key] for key in kwargs if kwargs[key] is not None}
    return users_collection.find_one(clean_kwargs)


@query.field("match")
def resolve_match(_, info, **kwargs):

    clean_kwargs = {key: kwargs[key] for key in kwargs if kwargs[key] is not None}
    return matches_collection.find_one(clean_kwargs)


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

    pass


@mutation.field("modifyUser")
def modify_user(_, info, **kwargs):

    pass


@mutation.field("requestFriend")
def request_friend(_, info, **kwargs):

    pass


@mutation.field("createMatch")
def create_match():

    pass


@mutation.field("invitePlayer")
def invite_player(_, info, **kwargs):

    pass


schema = make_executable_schema(type_defs, query, mutation, snake_case_fallback_resolvers)
