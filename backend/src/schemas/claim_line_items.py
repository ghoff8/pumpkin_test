from marshmallow_enum import EnumField
from src.models.constants.enums import DecisionOptionEnum
from src.schemas.base import BaseModelSchema
from src.models import ClaimLineItem


class ClaimLineItemSchema(BaseModelSchema):
    class Meta:
        strict = True
        ordered = True
        transient = True
        model = ClaimLineItem
        dump_only = ('claim_line_item_type', 'amount_claimed', 'quantity', 'decision')
        fields = dump_only

    claim_line_item_type = EnumField(ClaimLineItem.ClaimLineItemTypeEnum, by_value=True)
    decision = EnumField(DecisionOptionEnum, by_value=True)
