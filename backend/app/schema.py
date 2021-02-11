from graphene import ObjectType, String, Scalar, ID, List, Int


class Name(ObjectType):
    firstName = String()
    lastName = String()
    fullName = String()


class LoginInformation(ObjectType):
    username = String()
    password = String()


class Item(ObjectType):
    pass


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
