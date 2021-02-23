import uvicorn
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from ariadne.asgi import GraphQL
from schema import schema

middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'])
]

app = Starlette(debug=True, middleware=middleware)
app.mount("/graphql", GraphQL(schema, debug=True))


if __name__ == "__main__":

    uvicorn.run("app:app", reload=True)
