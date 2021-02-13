from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine

motor = AsyncIOMotorClient(host="209.159.204.189", port=5433)
engine = AIOEngine(motor_client=motor, database="Recipe")