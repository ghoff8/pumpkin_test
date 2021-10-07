from flask_rest_api import Blueprint
from flask.views import MethodView
from flask import request
from src.database import decision_options as dec_orm
from src.database import claim_line_items as cl_orm
from src.schemas.decision_options import ResponseDecisionOptionSchema

blueprint = Blueprint(
    'decision_options',
    __name__
)


@blueprint.route("", methods=['GET'])
class NotesView(MethodView):

    @blueprint.response(schema=ResponseDecisionOptionSchema(many=True))
    def get(self):
        return dec_orm.get_options()

@blueprint.route("/set", methods=['POST'])
class NotesView(MethodView):
    
    @blueprint.response()
    def post(self):
        return cl_orm.set_claim_line_items(request.get_json())