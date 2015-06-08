import real_time
import unittest


class RealTimeTestCase(unittest.TestCase):

    def setUp(self):
        real_time.app.config['TESTING'] = True
        self.app = real_time.app.test_client()

    def test_get_home_sucess(self):
        """
        Check get on home returns status code 200.
        """

        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_post_home_not_allowed(self):
        """
        Check post on home doesn't allowed.
        """

        response = self.app.post('/')
        self.assertEqual(response.status_code, 405)

    def test_get_real_time_receiver_not_subscribe(self):
        """
        Chek if get on /real returns 405 if not coming
        from facebook subscribe.
        """

        response = self.app.get('/real')
        self.assertEqual(response.status_code, 405)

    def test_get_real_time_receiver_with_subscribe(self):
        """
        Chek if get with parameters on /real works fine.

        """

        mode = 'subscribe'
        verify_token = 'true'
        challenge = 'success'

        url = '/real?hub.mode={0}&hub.verify_token={1}&hub.challenge={2}'
        url = url.format(mode, verify_token, challenge)

        response = self.app.get(url)
        self.assertEqual(response.data, "success")


if __name__ == '__main__':
    unittest.main()

