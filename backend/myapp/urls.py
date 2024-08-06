from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FootInsightViewSet
from .views import PlayerDeleteView
from .views import PlayerUpdateView
router = DefaultRouter()
router.register(r'footinsights', FootInsightViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/footinsights/<int:pk>/delete/', PlayerDeleteView.as_view(), name='player-delete'),
    path('api/footinsights/<int:pk>/update/', PlayerUpdateView.as_view(), name='player-update'),
]
