from graphene_pydantic import PydanticObjectType

from graphene import Schema, Mutation, ObjectType, Field, NonNull, ID, Boolean, Int, Float, String, List, Date

from pymongo import MongoClient

from database import engine
# from models import User
# did we want to define user there instead?

client = MongoClient("mongodb+srv://mrosoff:uMnAALQJ378NvBKL@kings-corner.6kmun.mongodb.net/Kings-Corner?retryWrites=true&w=majority")
users_collection = client['Kings-Corner'].Users
matches_collection = client['Kings-Corner'].Matches


class Item(ObjectType):

    itemID = NonNull(ID)
    name = NonNull(String)
    description = NonNull(String)

    def __init__(self, *args, **kwargs):

        super().__init__(*args, **kwargs)


class Invite(ObjectType):

    matchID = NonNull(ID)
    playerID = NonNull(ID)

    def __init__(self, *args, **kwargs):

        super().__init__(*args, **kwargs)


class Move(ObjectType):

    matchID = NonNull(ID)
    fromSquare = NonNull(String)
    toSquare = NonNull(String)

    def __init__(self, *args, **kwargs):

        super().__init__(*args, **kwargs)


class Match(ObjectType):

    matchID = NonNull(ID)
    name = String()
    players = NonNull(List(NonNull(lambda: User)))
    history = NonNull(List(NonNull(String)))
    currentTurn = NonNull(lambda: User)
    currentState = NonNull(String)

    def __init__(self, *args, **kwargs):

        super().__init__(*args, **kwargs)


class User(ObjectType):

    playerID = NonNull(ID)
    name = String()
    avatar = String()
    email = NonNull(String)
    inGameName = NonNull(String)
    phoneNumber = String()
    password = NonNull(String)
    friends = NonNull(List(NonNull(lambda: User)))
    invites = NonNull(List(NonNull(lambda: User)))
    matches = NonNull(List(NonNull(Match)))
    money = Int()
    items = NonNull(List(NonNull(Item)))

    def __init__(self, *args, is_mutation=False, **kwargs):

        super().__init__(*args, **kwargs)

        if not is_mutation:
            # todo
            pass
        self.playerID = "test"
        self.friends = []
        self.invites = []
        self.matches = []
        self.items = []


class Query(ObjectType):

    user = Field(User, playerID=ID(), email=String(), inGameName=String(), phoneNumber=String())
    match = Field(Match, matchID=NonNull(ID))

    @staticmethod
    def resolve_user(parent, info, **kwargs):

        return User(**kwargs)

    @staticmethod
    def resolve_match(parent, info, **kwargs):

        return Match(**kwargs)


class CreateUser(Mutation):

    class Arguments:

        email = NonNull(String)
        password = NonNull(String)
        inGameName = NonNull(String)

    Output = User

    @staticmethod
    def mutate(root, info, **kwargs):

        player_id = users_collection.insert_one(kwargs).inserted_id
        return User(playerID=player_id, **kwargs)


class Login(Mutation):

    class Arguments:

        pass

    Output = User

    def mutate(root, info, **kwargs):

        return User()


class ModifyUser(Mutation):

    class Arguments:

        pass

    Output = User

    def mutate(root, info, **kwargs):

        return User()


class RequestFriend(Mutation):

    class Arguments:

        pass

    Output = User

    def mutate(root, info, **kwargs):

        return User()


class CreateMatch(Mutation):

    class Arguments:

        pass

    Output = Match

    def mutate(root, info, **kwargs):

        return Match()


class InvitePlayer(Mutation):

    class Arguments:

        pass

    Output = Match

    def mutate(root, info, **kwargs):

        return Match()


class Mutation(ObjectType):

    createUser = CreateUser.Field()
    login = Login.Field()
    modifyUser = ModifyUser.Field()
    requestFriend = RequestFriend.Field()
    createMatch = CreateMatch.Field()
    invitePlayer = InvitePlayer.Field()


# noinspection PyTypeChecker
schema = Schema(query=Query, mutation=Mutation)
