from src.database.db import Session
from src.models import Plan

def get_plans():
    query = Session.query(Plan).all()
    return query
