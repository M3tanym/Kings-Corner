from graphene import ObjectType, String, Scalar, ID, List, Int, Field, Boolean


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


class Tree(ObjectType):
    name = String()
    species = String()
    deciduous = Boolean()
    treeData = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.treeData = {'name': self.name, 'species': self.species, 'deciduous': self.deciduous}

        if self.name == 'pine':
            self.treeData['species'] = 'pinus pinus'
        elif self.species == 'pinus pinus':
            self.treeData['name'] = 'pine'
        if self.name == 'pine':
            self.treeData['deciduous'] = True

    def resolve_name(self, info):
        return self.treeData['name']

    def resolve_species(self, info):
        return self.treeData['species']

    def resolve_deciduous(self, info):
        return self.treeData['deciduous']


class Query(ObjectType):
    # user = User()
    # users = List(User, required=True)
    # match = Match()
    # matches = List(Match, required=True)
    # friends = List(User, required=True)
    tree = Field(Tree, name=String(), species=String())

    def resolve_tree(parent, info, **kwargs):
        return Tree(**kwargs)
