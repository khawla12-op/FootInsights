from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FootInsightViewSet
# from .views import upload_csv
# from .views import chatbot_query
from .views import predict
from .views import player_detail

router = DefaultRouter()
router.register(r'footinsights', FootInsightViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/footinsights/<int:pk>',player_detail,name='player-detail'),
    # path('upload_csv/', upload_csv, name='upload_csv'),
    # path('chatbot_query/', chatbot_query, name='chatbot_query'),
    path('predict/', predict, name='predict'),
]
