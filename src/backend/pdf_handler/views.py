from django.http import HttpResponse
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import PDFSerializer, SplitPDFSerializer


from utils.split_pdf import splitPdf


import os
# Create your views here.

class FileUpload(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request):
        serializer = PDFSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        #save the file
        print(request.data['pdf'])
        os.makedirs('pdfs', exist_ok=True)
        with open('pdfs/' + request.data['pdf'].name, 'wb+') as destination:
            for chunk in request.data['pdf'].chunks():
                destination.write(chunk)
        return Response('File Upload', status=status.HTTP_201_CREATED)

class SplitPDF(APIView):
    serializer_class = SplitPDFSerializer

    def post(self, request):
        serializer = SplitPDFSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        #acces to file_name
        pdf = request.data['pdf']
        delimiter = request.data['split_in_page']
        output = serializer.validated_data['output']

        #save the file
        print(request.data['pdf'])
        os.makedirs('pdfs', exist_ok=True)
        with open('pdfs/' + request.data['pdf'].name, 'wb+') as destination:
            for chunk in request.data['pdf'].chunks():
                destination.write(chunk)

        splitPdf(f"./pdfs/{pdf.name}", delimiter, output)
        return Response('File Split', status=status.HTTP_201_CREATED)
