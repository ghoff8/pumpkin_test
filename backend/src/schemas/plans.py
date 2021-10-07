
from src.models.plan import Plan
from src.schemas.base import BaseResponseSchema
from src.schemas.base import BaseModelSchema


class PlanSchema(BaseModelSchema):
    class Meta:
        strict = True
        ordered = True
        transient = True
        dump_only = ('id', 'vaccines', 'wellness_exam', 'blood_test', 'vaccine_util', 'blood_test_util', 'wellness_exam_util')
        fields = dump_only
        model = Plan


class ResponsePlanSchema(PlanSchema, BaseResponseSchema):
    class Meta(PlanSchema.Meta):
        pass