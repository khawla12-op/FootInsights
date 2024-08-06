from rest_framework import viewsets
from rest_framework import generics
from .models import FootInsight
from .serializers import FootInsightSerializer

class FootInsightViewSet(viewsets.ModelViewSet):
    queryset = FootInsight.objects.all()
    serializer_class = FootInsightSerializer

class PlayerDeleteView(generics.DestroyAPIView):
    queryset = FootInsight.objects.all()
    serializer_class = FootInsightSerializer

class PlayerUpdateView(generics.UpdateAPIView):
    queryset = FootInsight.objects.all()
    serializer_class = FootInsightSerializer