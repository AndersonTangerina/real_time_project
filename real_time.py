from flask import Flask, render_template
from flask.ext.triangle import Triangle

app = Flask(__name__)
Triangle(app)

@app.route('/', methods=['GET'])
def index():
    """
    Returns index page of web site.
    """

    return render_template("index.html",)




