from uuid import UUID

from src.database.db import Session
from src.models import Claim


def get_claims():
    return Session.query(Claim).all()


def get_claims_for_id(claim_id: UUID):
    return Session.query(Claim).filter(Claim.id == claim_id)
