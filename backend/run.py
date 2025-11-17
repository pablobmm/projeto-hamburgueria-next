from apps.app import app
from flask_cors import CORS
if __name__ == '__main__':
    CORS(app)
    app.run(
        host=app.config["HOST"],
        port=app.config["PORT"],
        debug=app.config["DEBUG"]
    )