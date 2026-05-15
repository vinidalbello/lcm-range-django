from django.test import SimpleTestCase

from lcm.services import calculate_lcm_range


class CalculateLcmRangeTest(SimpleTestCase):
    def test_canonical_example(self):
        self.assertEqual(calculate_lcm_range(1, 10), 2520)

    def test_small_range(self):
        self.assertEqual(calculate_lcm_range(2, 4), 12)

    def test_consecutive_numbers(self):
        self.assertEqual(calculate_lcm_range(4, 5), 20)

    def test_same_number_repeated(self):
        self.assertEqual(calculate_lcm_range(7, 7), 7)

    def test_range_starting_above_one(self):
        self.assertEqual(calculate_lcm_range(3, 6), 60)

    def test_large_range_produces_big_integer(self):
        result = calculate_lcm_range(1, 50)
        self.assertIsInstance(result, int)
        self.assertGreater(result, 2**53)

    def test_very_large_range(self):
        result = calculate_lcm_range(1, 10000)
        self.assertIsInstance(result, int)
        self.assertGreater(result, 0)
