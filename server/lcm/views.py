from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import LcmInputSerializer
from .services import calculate_lcm_range


class LcmView(APIView):
    def get(self, request: Request) -> Response:
        serializer = LcmInputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        x: int = serializer.validated_data["x"]
        y: int = serializer.validated_data["y"]

        result = calculate_lcm_range(x, y)

        return Response({"x": x, "y": y, "result": str(result)})
