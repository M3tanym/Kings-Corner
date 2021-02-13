import motor

# TODO un-vcs this
import uvicorn as uvicorn
from fastapi import FastAPI
from fastapi_users.db import MongoDBUserDatabase
from starlette.requests import Request
from starlette.graphql import GraphQLApp

from auth import auth_backends, jwt_authentication
from models import UserDB, User, UserCreate, UserUpdate
from fastapi_users import FastAPIUsers

from graphene import Schema
import schema


DATABASE_URL = "mongodb://209.159.204.189:27017"
client = motor.motor_asyncio.AsyncIOMotorClient(
    DATABASE_URL, uuidRepresentation="standard"
)
db = client["kingscorner"]
collection = db["users"]

app = FastAPI(title="Kings Corner", version='0.1')
user_db = MongoDBUserDatabase(UserDB, collection)


fastapi_users = FastAPIUsers(
    user_db,
    auth_backends,
    User,
    UserCreate,
    UserUpdate,
    UserDB,
)

app.include_router(
    fastapi_users.get_auth_router(jwt_authentication),
    tags=["auth"],
)


def on_after_register(user: UserDB, request: Request):
    print(f"User {user.id} has registered.")


app.include_router(
    fastapi_users.get_register_router(on_after_register),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_users_router(),
    prefix="/users",
    tags=["users"],
)

# noinspection PyTypeChecker
s = Schema(query=schema.Query)

app.add_route("/graphql", GraphQLApp(schema=s))

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, log_level="info")
