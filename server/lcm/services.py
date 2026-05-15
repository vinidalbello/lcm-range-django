from math import gcd
from functools import reduce


def _lcm(a: int, b: int) -> int:
    return abs(a * b) // gcd(a, b)


def calculate_lcm_range(x: int, y: int) -> int:
    return reduce(_lcm, range(x, y + 1))
