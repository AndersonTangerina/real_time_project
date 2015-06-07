from pusher import Pusher

pusher = Pusher(
  app_id=u'123318',
  key=u'c7bc422dd5eda7e850d1',
  secret=u'64a0413771428038ea19'
)

if __name__ == '__main__':
    pusher.trigger(u'real_time_channel', u'real_time_event', {u'message': u'Test Success'})
