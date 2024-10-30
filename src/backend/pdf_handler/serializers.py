from rest_framework import serializers
from .models import PDF, SplitPDF, ProtectPDF


class PDFSerializer(serializers.Serializer):
    class Meta:
        model = PDF
        fields = '__all__'

class SplitPDFSerializer(serializers.Serializer):
    pdf = serializers.FileField()
    split_in_page = serializers.IntegerField()
    output = serializers.ListField(child=serializers.CharField(max_length=1000))


class ProtectPDFSerializer(serializers.Serializer):
    class Mera:
        model = ProtectPDF,
        filds = '__all__'

