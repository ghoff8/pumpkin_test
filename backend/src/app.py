from flask import Flask
from flask_cors import CORS
from flask_rest_api import Api
from src.blueprints import plans_blueprint
from src.blueprints import claims_blueprint, decision_options_blueprint
from src.config import EnvConfig
import logging


def create_app():
    app = Flask("Pumpkin Fullstack Test")

    app.config.from_object(EnvConfig())
    
    logging.basicConfig(filename='record.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

    CORS(
        app,
        send_wildcard=True,
        expose_headers='Content-Range,Access-Control-Allow-Origin,Access-Control-Allow-Headers'
    )

    api = Api(app)
    api.register_blueprint(claims_blueprint.blueprint, url_prefix='/claims')
    api.register_blueprint(decision_options_blueprint.blueprint, url_prefix='/decision_options')
    api.register_blueprint(plans_blueprint.blueprint, url_prefix='/plans')

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(port=8085, host='0.0.0.0', debug=True)
