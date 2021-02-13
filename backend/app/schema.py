from graphene_pydantic import PydanticObjectType

from graphene import Schema, ObjectType, Field, NonNull, ID, Boolean, Int, Float, String, List, Date

from database import engine
# from models import User
# did we want to define user there instead?


class Item(ObjectType):
    itemID = ID()


class Invite(ObjectType):
    pass


class Move(ObjectType):
    pass


class BoardState(ObjectType):
    pass


class Match(ObjectType):
    matchID = NonNull(ID)
    name = NonNull(String)
    players = NonNull(List(NonNull(lambda: User)))
    boardState = BoardState()
    history = NonNull(List(NonNull(String)))
    currentTurn = NonNull(lambda: User)
    currentState = NonNull(String)


class User(ObjectType):
    playerID = ID()
    name = String()
    avatar = String()
    email = String()
    inGameName = String()
    phoneNumber = String()
    password = String()
    friends = NonNull(List(NonNull(lambda: User)))
    invites = NonNull(List(NonNull(lambda: User)))
    matches = NonNull(List(NonNull(Match)))
    money = Int()
    items = NonNull(List(NonNull(Item)))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.inGameName == 'insane':
            self.name = 'max'


class Query(ObjectType):
    user = Field(User, playerID=ID(), email=String(), inGameName=String(), phoneNumber=String())
    match = Field(Match, matchID=ID())

    @staticmethod
    def resolve_user(parent, info, **kwargs):
        return User(**kwargs)

    @staticmethod
    def resolve_match(parent, info, **kwargs):
        return Match(**kwargs)


# noinspection PyTypeChecker
schema = Schema(query=Query)


if __name__ == "__main__":
    query = """
        query {
          user(inGameName: "insane") {
            name
          }
        }
    """

    result = schema.execute(query)
    print(result)
