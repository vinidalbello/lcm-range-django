from django.urls import path

from .views import LcmView

urlpatterns = [
    path("lcm/", LcmView.as_view(), name="lcm"),
]
