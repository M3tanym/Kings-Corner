# Example
from graphene import Schema, ObjectType, Field, String, Boolean


class Tree(ObjectType):
    name = String()
    species = String()
    deciduous = Boolean()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.name == 'pine':
            self.species = 'pinus'

        elif self.species == 'pinus':
            self.name = 'pine'

        if self.name == 'pine':
            self.deciduous = True


class Query(ObjectType):
    tree = Field(Tree, name=String(), species=String())

    @staticmethod
    def resolve_tree(self, info, **kwargs):
        return Tree(**kwargs)


# noinspection PyTypeChecker
schema = Schema(query=Query)


if __name__ == "__main__":
    query = """
        query {
          tree(name: "pine") {
            deciduous
          }
        }
    """

    result = schema.execute(query)
    print(result)
