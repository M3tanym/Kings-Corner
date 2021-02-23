from bson.objectid import ObjectId


def clean_kwargs(kwargs):

    clean_args = {key: kwargs[key] for key in kwargs if kwargs[key] is not None}

    if "_id" in clean_args:

        clean_args["_id"] = ObjectId(clean_args["_id"])

    return clean_args
