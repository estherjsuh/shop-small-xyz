# from flask import Flask 
# from .extensions import db, mail, CORS
# from .api import main
# from .commands import create_tables


# def create_app(config_file="settings.py"):
#     app = Flask(__name__, static_folder='../build', static_url_path='/')
#     app.config.from_pyfile(config_file)
#     db.init_app(app)
#     mail.init_app(app)
#     CORS(app)

#     app.register_blueprint(main)
#     app.cli.add_command(create_tables)

#     return app 

# if __name__ == "__main__":
#     app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

