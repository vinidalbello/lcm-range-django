from django.test import SimpleTestCase
from django.urls import reverse


class LcmViewTest(SimpleTestCase):
    def test_canonical_example(self):
        response = self.client.get(reverse("lcm"), {"x": "1", "y": "10"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["result"], "2520")

    def test_response_contains_x_and_y(self):
        response = self.client.get(reverse("lcm"), {"x": "1", "y": "10"})
        data = response.json()
        self.assertEqual(data["x"], 1)
        self.assertEqual(data["y"], 10)

    def test_result_is_string(self):
        response = self.client.get(reverse("lcm"), {"x": "1", "y": "10"})
        self.assertIsInstance(response.json()["result"], str)

    def test_large_range_result_exceeds_js_max_safe_integer(self):
        response = self.client.get(reverse("lcm"), {"x": "1", "y": "50"})
        self.assertEqual(response.status_code, 200)
        result = int(response.json()["result"])
        self.assertGreater(result, 2**53)

    def test_invalid_x_returns_400(self):
        response = self.client.get(reverse("lcm"), {"x": "abc", "y": "10"})
        self.assertEqual(response.status_code, 400)

    def test_float_x_returns_400(self):
        response = self.client.get(reverse("lcm"), {"x": "1.5", "y": "10"})
        self.assertEqual(response.status_code, 400)

    def test_zero_x_returns_400(self):
        response = self.client.get(reverse("lcm"), {"x": "0", "y": "10"})
        self.assertEqual(response.status_code, 400)

    def test_negative_x_returns_400(self):
        response = self.client.get(reverse("lcm"), {"x": "-1", "y": "10"})
        self.assertEqual(response.status_code, 400)

    def test_x_equal_y_returns_400(self):
        response = self.client.get(reverse("lcm"), {"x": "5", "y": "5"})
        self.assertEqual(response.status_code, 400)

    def test_x_greater_than_y_returns_400(self):
        response = self.client.get(reverse("lcm"), {"x": "10", "y": "3"})
        self.assertEqual(response.status_code, 400)

    def test_missing_x_returns_400(self):
        response = self.client.get(reverse("lcm"), {"y": "10"})
        self.assertEqual(response.status_code, 400)

    def test_missing_y_returns_400(self):
        response = self.client.get(reverse("lcm"), {"x": "1"})
        self.assertEqual(response.status_code, 400)

    def test_no_params_returns_400(self):
        response = self.client.get(reverse("lcm"))
        self.assertEqual(response.status_code, 400)

    def test_very_large_range_returns_200(self):
        response = self.client.get(reverse("lcm"), {"x": "1", "y": "10000"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("result", response.json())
