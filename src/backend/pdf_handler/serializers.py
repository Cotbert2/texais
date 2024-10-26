from rest_framework import serializers
from .models import PDF


class PDFSerializer(serializers.Serializer):
    class Meta:
        model = PDF
        fields = '__all__'

