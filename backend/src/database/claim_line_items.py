from uuid import UUID

from src.database.db import Session
from src.models import ClaimLineItem

import logging
logger = logging.getLogger('werkzeug')

def set_claim_line_items(data):
    for entry in data:
        Session.query(ClaimLineItem).filter(ClaimLineItem.claim_line_item_type == entry.get('claim_type').lower().replace(" ", "_")).update({"decision": entry.get('decision')})
        Session.commit()
    
    