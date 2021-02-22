import uvicorn
from starlette.applications import Starlette

from ariadne.asgi import GraphQL
from schema import schema

app = Starlette(debug=True)
app.mount("/graphql", GraphQL(schema, debug=True))

if __name__ == "__main__":

    uvicorn.run("app:app")
