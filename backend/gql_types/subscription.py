import asyncio

from ariadne import SubscriptionType

subscription = SubscriptionType()


@subscription.source("getMatchUpdates")
async def counter_generator(obj, info, **kwargs):

    # addToHash.push(**kwargs["playerID"])

    for i in range(5):

        await asyncio.sleep(1)
        yield i
