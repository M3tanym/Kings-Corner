from fastapi_users.authentication import JWTAuthentication

#TODO ya know
SECRET = "actually_make_this_a_secret"

auth_backends = []
jwt_authentication = JWTAuthentication(secret=SECRET, lifetime_seconds=3600)
auth_backends.append(jwt_authentication)