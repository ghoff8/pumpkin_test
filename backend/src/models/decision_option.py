from typing import List

from sqlalchemy.sql.sqltypes import Enum
from src.models.constants.enums import DecisionOptionEnum
from sqlalchemy import Column, String

from .base import Base
from .mixins import DateTimeMixin, UUIDidMixin

class DecisionOption(Base, DateTimeMixin, UUIDidMixin):
    __tablename__ = 'decision_options'

    option = Column(Enum(DecisionOptionEnum), nullable=False)