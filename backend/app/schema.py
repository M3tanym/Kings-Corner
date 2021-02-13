import graphene
from graphene import ObjectType, String, ID, List
from graphene_pydantic import PydanticObjectType

from database import engine
from models import User


class Person(PydanticObjectType):
    class Meta:
        model = User
        # exclude specified fields
        exclude_fields = ("id",)


class Query(graphene.ObjectType):
    people = graphene.List(Person)

    @staticmethod
    def resolve_people(parent, info):
        users = engine.find(User)
        return users


schema = graphene.Schema(query=Query)

if __name__ == "__main__":
    query = """
        query {
          people {
            firstName
          }
        }
    """

    result = schema.execute(query)
    print(result.data['people'][0])

class Name(ObjectType):
    firstName = String()
    lastName = String()
    fullName = String()


class LoginInformation(ObjectType):
    username = String()
    password = String()


class Item(ObjectType):
    pass


"""
class User(ObjectType):
    id = ID()
    name = Name()
    email = String(required=True)
    phoneNumber: String()
    loginInformation: LoginInformation()
    avatar: Scalar()
    friends: List(lambda: User, required=True)
    invites: List(lambda: User, required=True)
    tokens: Int()
    items: List(Item, required=True)
"""


class BoardState(ObjectType):
    currentTurn = User()
    state = String()


class Match(ObjectType):
    id = ID()
    players = List(User, required=True)
    boardState = BoardState()
    name = String()  # TODO why does this need to exist??


class Query(ObjectType):
    user = User()
    users = List(User, required=True)
    match = Match()
    friends = List(User, required=True)
    matches = List(Match, required=True)


class DemoQuery(ObjectType):
    # from the docs, for reference
    # this defines a Field `hello` in our Schema with a single Argument `name`
    hello = String(name=String(default_value="stranger"))
    goodbye = String()

    # our Resolver method takes the GraphQL context (root, info) as well as
    # Argument (name) for the Field and returns data for the query Response
    def resolve_hello(root, info, name):
        return f'Hello {name}!'

    def resolve_goodbye(root, info):
        return 'See ya!'
