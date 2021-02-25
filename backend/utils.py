from bson.objectid import ObjectId
import re


def clean_kwargs(kwargs):

    clean_args = {key: kwargs[key] for key in kwargs if kwargs[key] is not None}

    if "_id" in clean_args:

        clean_args["_id"] = ObjectId(clean_args["_id"])

    return clean_args


def fix_return_dict(dictionary):

    new_dict = {}

    for key in dictionary:

        new_dict[to_snake_case(key)] = dictionary[key]

    return new_dict


def to_snake_case(variable):

    return re.sub(r'(?<!^)(?=[A-Z])', '_', variable).lower()
