from graphene import Scalar, ObjectType, Field, NonNull
from graphene import ID, Boolean, Int, Float, String, List, Date


class User(ObjectType):

    id = ID()
    token = String()

    name = String()
    avatar = Url()

    email = String()
    inGameName = String()
    phoneNumber = String()
    password = String()

    friends = NonNull(List(NonNull(Field(User))))
    invites = NonNull(List(NonNull(Field(User))))
    matches = NonNull(List(NonNull(Field(Match))))

    money = Int()
    items = NonNull(List(NonNull(Item())))

    def __init__(self):

        pass


class Item(ObjectType):

    pass


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
