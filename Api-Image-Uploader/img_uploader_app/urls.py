from django.urls import path
from .views import MyView
# from .views import get_csrf_token

urlpatterns = [
    path('api/image-uploader/', MyView.as_view() , name='mi_vista'),
   # path('api/get-csrf-token/', get_csrf_token.as_view(), name='get_csrf_token'),
]
