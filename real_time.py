from flask import Flask, render_template, request, abort
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
        mode = request.args.get('hub.mode', '')
        verify_token = request.args.get('hub.verify_token', False)

        if mode == "subscribe" and verify_token:
            challenge = request.args.get('hub.challenge', '')
            return challenge
        else:
            abort(405)
    else:
        if request.json:
            object_json = request.json.get('object', {})
            entry_json = request.json.get('entry', {})
            pusher.trigger(u'real_time_channel', u'real_time_event', {u'message': entry_json})
        return "Facebook Post Update"
