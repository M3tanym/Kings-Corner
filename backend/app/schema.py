
from graphene_pydantic import PydanticObjectType

from graphene import Scalar, ObjectType, Field, NonNull
from graphene import ID, Boolean, Int, Float, String, List, Date

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


class User(ObjectType):

    id = ID()
    token = String()

    name = String()
    avatar = Url()

    email = String()
    inGameName = String()
    phoneNumber = String()
    password = String()

    friends = NonNull(List(NonNull(Field(lambda: User))))
    invites = NonNull(List(NonNull(Field(lambda: User))))
    matches = NonNull(List(NonNull(Field(Match))))

    money = Int()
    items = NonNull(List(NonNull(Item())))

    def __init__(self):
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

    user = Field(User, id=ID(), email=String(), username=String(), phoneNumber=String())
    users = NonNull(List(NonNull(Field(User))))
    match = Field(Match, id=NonNull(ID()))
    friends = NonNull(List(Field(User, id=NonNull(ID()))))
    matches = NonNull(List(NonNull(Field(Match, id=ID(), userID=ID()))))

    def resolve_user(parent, info, **kwargs):

        return User(**kwargs)
