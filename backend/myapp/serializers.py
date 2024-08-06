from rest_framework import serializers
from .models import FootInsight

class FootInsightSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootInsight
        fields = '__all__'
