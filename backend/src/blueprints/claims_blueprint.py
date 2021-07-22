from flask_rest_api import Blueprint
from flask.views import MethodView
from src.database import claims as orm
from src.models.exceptions.http_exceptions import HTTPResourceNotFound
from src.schemas.claims import ResponseClaimSchema

blueprint = Blueprint(
    'claims',
    __name__
)


@blueprint.route("", methods=['GET'])
class NotesView(MethodView):

    @blueprint.response(schema=ResponseClaimSchema(many=True))
    def get(self):
        return orm.get_claims()


@blueprint.route("/<uuid:claim_id>", methods=['GET'])
class NotesView(MethodView):

    @blueprint.response(schema=ResponseClaimSchema)
    def get(self, claim_id):
        claim = orm.get_claims_for_id(claim_id)
        if claim is None:
            raise HTTPResourceNotFound
        return claim
