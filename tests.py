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


if __name__ == '__main__':
    unittest.main()

