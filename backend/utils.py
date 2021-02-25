from bson.objectid import ObjectId
from stringcase import snakecase


def clean_kwargs(kwargs):

    clean_args = {key: kwargs[key] for key in kwargs if kwargs[key] is not None}

    if "_id" in clean_args:

        clean_args["_id"] = ObjectId(clean_args["_id"])

    return clean_args


def dict_to_snake_case(dictionary):

    return {snakecase(key): dictionary[key] for key in dictionary}
