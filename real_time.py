from flask import Flask, render_template, request
from flask.ext.triangle import Triangle
from utils import crossdomain
from pusher_config import pusher

app = Flask(__name__)
Triangle(app)

@app.route('/', methods=['GET'])
def index():
    """
    Returns index page of web site.
    """

    return render_template("index.html",)

@app.route('/real', methods=['POST', 'GET'])
@crossdomain(origin='*')
def real_time_receiver():
    """
    Receive updates from facebook and send to Pusher.
    """

    if request.method == 'GET':
        return request.args.get('hub.challenge', 'Not Authorized!')
    else:
        object_json = request.json['object']
        entry_json = request.json['entry']
        pusher.trigger(u'real_time_channel', u'real_time_event', {u'message': entry_json})
        return "Facebook Post Update"


