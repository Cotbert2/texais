from django.http import HttpResponse
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.http import FileResponse, HttpResponse

from .serializers import PDFSerializer, SplitPDFSerializer,  ProtectPDFSerializer


from utils.split_pdf import splitPdf

from utils.block_pdf import protect_pdf

from utils.unblock_pdf import deprotect_pdf
from utils.zipper import zipper


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

        os.makedirs('pdfs', exist_ok=True)
        with open('pdfs/' + request.data['pdf'].name, 'wb+') as destination:
            for chunk in request.data['pdf'].chunks():
                destination.write(chunk)


        try:
            operation_folder, zipname = splitPdf(f"./pdfs/{pdf.name}", int(delimiter), output)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

        if not zipper(operation_folder, f"./deliver/{zipname}"):
            return Response("Something wens wrong", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        response = FileResponse(open(f"./deliver/{zipname}.zip", 'rb' ), as_attachment=True)
        response['Content-Disposition'] = f'attachment; filename="{'merge.zip'}"'

        return response


class BlockPDF(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request):
        serializer = ProtectPDFSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        #save the file
        print(request.data['pdf'])
        os.makedirs('pdfs', exist_ok=True)
        with open('pdfs/' + request.data['pdf'].name, 'wb+') as destination:
            for chunk in request.data['pdf'].chunks():
                destination.write(chunk)
 
        enclosing_folder = protect_pdf(f"./pdfs/{request.data['pdf'].name}", request.data['password'], f"{request.data['pdf'].name}_protected.pdf")
        response = FileResponse(open(f"./{enclosing_folder}", 'rb' ), as_attachment=True)
        response['Content-Disposition'] = f'attachment; filename="{request.data['pdf'].name}_protected.pdf"'
        return response


class UnblockPDF(APIView):
    parser_class = ProtectPDFSerializer(FileUploadParser,)

    def post(self, request):
        print('DEBLOCK')
        serializer = PDFSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        #save the file
        print(request.data['pdf'])
        os.makedirs('pdfs', exist_ok=True)
        with open('pdfs/' + request.data['pdf'].name, 'wb+') as destination:
            for chunk in request.data['pdf'].chunks():
                destination.write(chunk)

        try: 
            enclosing_folder = deprotect_pdf(f"./pdfs/{request.data['pdf'].name}", request.data['password'], f"{request.data['pdf'].name}_deprotected.pdf")
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        response = FileResponse(open(f"./{enclosing_folder}", 'rb' ), as_attachment=True)
        response['Content-Disposition'] = f'attachment; filename="{request.data['pdf'].name}_deprotected.pdf"'
        return response