
from src.database.db import Session
from src.models import DecisionOption

def get_options():
    query = Session.query(DecisionOption).all()
    return query

