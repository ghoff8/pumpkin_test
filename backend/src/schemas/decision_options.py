from marshmallow_enum import EnumField
from src.models.constants.enums import DecisionOptionEnum
from src.models.decision_option import DecisionOption
from src.schemas.base import BaseResponseSchema

from src.schemas.base import BaseModelSchema


class DecisionOptionSchema(BaseModelSchema):
    class Meta:
        strict = True
        ordered = True
        transient = True
        model = DecisionOption

    option = EnumField(DecisionOptionEnum, by_value=True)


class ResponseDecisionOptionSchema(DecisionOptionSchema, BaseResponseSchema):
    class Meta(DecisionOptionSchema.Meta):
        pass