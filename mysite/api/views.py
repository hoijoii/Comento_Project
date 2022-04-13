from .models import Post, File, Filedata
from .serializers import PostSerializer, FileSerializer, FiledataSerializer
from django.core import serializers
from rest_framework import viewsets
from rest_framework.views import APIView
from tablib import Dataset
from django.shortcuts import render
from django.contrib import messages
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest, FileResponse
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os
import datetime as dt
import pandas as pd

from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes


# Create your views here.


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


post_detail = PostViewSet.as_view({
    'get': 'retrieve',
})

class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    '''
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
'''
file_detail = FileViewSet.as_view({
        'get': 'retrieve',
    })

@csrf_exempt
@api_view(['GET', 'POST'])
def import_data_to_db(request):
    print('s')

    try:
        if request.method=='GET':
            exceldata_list = Filedata.objects.all()
            serializer = FiledataSerializer(exceldata_list, many=True)
            return Response(serializer.data)

        elif request.method=='POST' and request.FILES['myfile']:
            myfile = request.FILES['myfile']
            '''
            if not myfile.name.endswith('xlsx'):
                messages.info(request, 'wrong format')
                return render(request, 'importexcel.html')
            '''
            fs = FileSystemStorage()
            filename = fs.save(myfile.name, myfile)
            print(filename)
            uploaded_file_url = fs.url(filename)
            excel_file = uploaded_file_url
            print(excel_file)

            empexceldata = pd.read_excel("."+excel_file, engine='openpyxl')
            print(type(empexceldata))
            dbframe = empexceldata

            for dbframe in dbframe.itertuples():
                fromdate_obj = dt.datetime.strptime(str(dbframe.closingMonth), '%Y-%m-%d %H:%M:%S')
                obj = Filedata.objects.create(companyCode=dbframe.companyCode, companyName=dbframe.companyName, classification=dbframe.classification, closingMonth=fromdate_obj, revenue=dbframe.revenue, operatingIncome=dbframe.operatingIncome, netIncome=dbframe.netIncome)

            print(type(obj))
            obj.save()

            return HttpResponse(status=201)

    except Exception as identifier:
        print(identifier)

    return HttpResponse(status=401)








    '''
    if request.method == 'POST':
        file = request.FILES.get('files')
        obj = File.objects.create(
            file=file
        )


    return render(request, 'upload.html')

'''
'''
@csrf_exempt
def simple_upload(request):
    if request.method == 'POST':
        file_resource = FileResource()
        dataset = Dataset()
        new_file = request.FILES.get('myfile')
        print(new_file)

        if not new_file.name.endswith('xlsx'):
            messages.info(request, 'wrong format')
            return render(request, 'upload.html')

        imported_data = dataset.load(new_file.read(), format='xlsx')
        for data in imported_data:
            value = Filedata(
                data[0],
                data[1]
            )
            value.save()
    return render(request, 'upload.html')
'''



'''
class ImportExcel(APIView):

    def get(self, request):
        rev_obj = Filedata.objects.all()
        serializer = FiledataSerializer(rev_obj, many=True)
        df = pd.DataFrame(serializer.data)
        print(df)

        return Response({'status':200})

'''


'''
@csrf_exempt
def article_details(request, pk):
    try:
        post = Post.object.get(pk=pk)
    except Post.DoesNotExist:
        return HttpResponse(status=404)

    if request.method=='GET':
        serializer = PostSerializer(post)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
'''