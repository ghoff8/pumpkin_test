from typing import List
from sqlalchemy import (Column, Integer)
from sqlalchemy.orm import relationship
from src.models.claim import Claim

from src.models.claim_line_item import ClaimLineItem
from src.models.constants.enums import DecisionOptionEnum

from .base import Base
from .mixins import DateTimeMixin, UUIDidMixin

import logging
logger = logging.getLogger('werkzeug')

class Plan(Base, DateTimeMixin, UUIDidMixin):
    __tablename__ = 'plans'

    vaccines = Column(Integer, nullable=False)
    wellness_exam = Column(Integer, nullable=False)
    blood_test = Column(Integer, nullable=False)

    claims: List[Claim] = relationship(
        "Claim",
        cascade="save-update, merge, delete")

    @property
    def vaccine_util(self):
        line_items = self.claims[0].line_items
        return sum([line_item.quantity for line_item in line_items
            if line_item.claim_line_item_type == ClaimLineItem.ClaimLineItemTypeEnum.vaccine and line_item.decision == DecisionOptionEnum.approved])
    
    @property
    def blood_test_util(self):
        line_items = self.claims[0].line_items
        return sum([line_item.quantity for line_item in line_items
            if line_item.claim_line_item_type == ClaimLineItem.ClaimLineItemTypeEnum.blood_test and line_item.decision == DecisionOptionEnum.approved])
    
    @property
    def wellness_exam_util(self):
        line_items = self.claims[0].line_items
        return sum([line_item.quantity for line_item in line_items 
            if line_item.claim_line_item_type == ClaimLineItem.ClaimLineItemTypeEnum.wellness_exam and line_item.decision == DecisionOptionEnum.approved])