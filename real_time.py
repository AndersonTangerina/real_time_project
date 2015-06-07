from flask import Flask, render_template

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    """
    Returns index page of web site.
    """

    return render_template("index.html",)




