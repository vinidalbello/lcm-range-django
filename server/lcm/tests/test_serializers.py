from django.test import SimpleTestCase

from lcm.serializers import LcmInputSerializer


class LcmInputSerializerTest(SimpleTestCase):
    def _serialize(self, data):
        s = LcmInputSerializer(data=data)
        s.is_valid()
        return s

    def test_valid_input(self):
        s = self._serialize({"x": "1", "y": "10"})
        self.assertTrue(s.is_valid())
        self.assertEqual(s.validated_data["x"], 1)
        self.assertEqual(s.validated_data["y"], 10)

    def test_x_is_float_string(self):
        s = self._serialize({"x": "1.5", "y": "10"})
        self.assertFalse(s.is_valid())
        self.assertIn("x", s.errors)

    def test_y_is_float_string(self):
        s = self._serialize({"x": "1", "y": "10.5"})
        self.assertFalse(s.is_valid())
        self.assertIn("y", s.errors)

    def test_x_is_zero(self):
        s = self._serialize({"x": "0", "y": "10"})
        self.assertFalse(s.is_valid())
        self.assertIn("x", s.errors)

    def test_y_is_zero(self):
        s = self._serialize({"x": "1", "y": "0"})
        self.assertFalse(s.is_valid())
        self.assertIn("y", s.errors)

    def test_x_is_negative(self):
        s = self._serialize({"x": "-1", "y": "10"})
        self.assertFalse(s.is_valid())
        self.assertIn("x", s.errors)

    def test_x_is_non_numeric(self):
        s = self._serialize({"x": "abc", "y": "10"})
        self.assertFalse(s.is_valid())
        self.assertIn("x", s.errors)

    def test_x_is_scientific_notation(self):
        s = self._serialize({"x": "1e5", "y": "10"})
        self.assertFalse(s.is_valid())
        self.assertIn("x", s.errors)

    def test_x_equal_to_y(self):
        s = self._serialize({"x": "5", "y": "5"})
        self.assertFalse(s.is_valid())

    def test_x_greater_than_y(self):
        s = self._serialize({"x": "10", "y": "3"})
        self.assertFalse(s.is_valid())

    def test_missing_x(self):
        s = self._serialize({"y": "10"})
        self.assertFalse(s.is_valid())
        self.assertIn("x", s.errors)

    def test_missing_y(self):
        s = self._serialize({"x": "1"})
        self.assertFalse(s.is_valid())
        self.assertIn("y", s.errors)

    def test_empty_string_x(self):
        s = self._serialize({"x": "", "y": "10"})
        self.assertFalse(s.is_valid())
        self.assertIn("x", s.errors)

    def test_x_exceeds_max_value(self):
        s = self._serialize({"x": "10001", "y": "20000"})
        self.assertFalse(s.is_valid())
        self.assertIn("x", s.errors)

    def test_y_exceeds_max_value(self):
        s = self._serialize({"x": "1", "y": "10001"})
        self.assertFalse(s.is_valid())
        self.assertIn("y", s.errors)

    def test_both_at_max_value(self):
        s = self._serialize({"x": "9999", "y": "10000"})
        self.assertTrue(s.is_valid())
