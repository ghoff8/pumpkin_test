import marshmallow as ma

from marshmallow_enum import EnumField
from src.schemas.base import BaseResponseSchema, BaseModelSchema
from src.schemas.claim_line_items import ClaimLineItemSchema
from src.models import Claim


class ClaimSchema(BaseModelSchema):
    class Meta:
        strict = True
        ordered = True
        transient = True
        model = Claim
        dump_only = ('claim_type', 'amount_claimed', 'line_items')
        fields = dump_only

    line_items = ma.fields.Nested(ClaimLineItemSchema, many=True)
    claim_type = EnumField(Claim.ClaimTypeEnum, by_value=True)


class ResponseClaimSchema(ClaimSchema, BaseResponseSchema):
    class Meta(ClaimSchema.Meta):
        pass
