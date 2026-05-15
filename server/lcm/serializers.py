import re
from rest_framework import serializers


class LcmInputSerializer(serializers.Serializer):
    MAX_VALUE = 10_000

    x = serializers.CharField()
    y = serializers.CharField()

    INTEGER_PATTERN = re.compile(r"^\d+$")

    def _validate_integer_string(self, value: str, field_name: str) -> int:
        if not self.INTEGER_PATTERN.match(value):
            raise serializers.ValidationError(
                f"'{field_name}' must be a positive integer."
            )
        parsed = int(value)
        if parsed <= 0:
            raise serializers.ValidationError(
                f"'{field_name}' must be greater than zero."
            )
        if parsed > self.MAX_VALUE:
            raise serializers.ValidationError(
                f"'{field_name}' must be at most {self.MAX_VALUE}."
            )
        return parsed

    def validate_x(self, value: str) -> int:
        return self._validate_integer_string(value, "x")

    def validate_y(self, value: str) -> int:
        return self._validate_integer_string(value, "y")

    def validate(self, data: dict) -> dict:
        x, y = data.get("x"), data.get("y")
        if x is not None and y is not None and x >= y:
            raise serializers.ValidationError(
                "'x' must be strictly less than 'y'."
            )
        return data
