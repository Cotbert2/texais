from rest_framework import serializers
from .models import PDF, SplitPDF, ProtectPDF, MergePDF, WatermarkPDF, EnumeratePDF


class PDFSerializer(serializers.Serializer):
    class Meta:
        model = PDF
        fields = '__all__'

class SplitPDFSerializer(serializers.Serializer):
    pdf = serializers.FileField()
    split_in_page = serializers.IntegerField()
    output = serializers.ListField(child=serializers.CharField(max_length=1000))


class ProtectPDFSerializer(serializers.Serializer):
    class Meta:
        model = ProtectPDF,
        filds = '__all__'

class IntercalatePDFSerializer(serializers.Serializer):
    pdf = serializers.FileField()
    order = serializers.ListField(child=serializers.IntegerField())

class MergePDFSerializer(serializers.Serializer):
    pdf = serializers.ListField(child=serializers.FileField())
    class Meta:
        model = MergePDF
        fields = '__all__'

class WatermarkPDFSerializer(serializers.Serializer):
    class Meta:
        model = WatermarkPDF
        fields = '__all__'

class EnumeratePDFSerializer(serializers.Serializer):
    class Meta:
        model = EnumeratePDF
        fields = '__all__'