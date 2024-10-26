#Endpoints: (POST)
#api/pdf-handler/split
#api/pdf-handler/merge
#api/pdf-handler/watermark
#api/pdf-handler/intercalate
#api/pdf-handler/secure/block
#api/pdf-handler/secure/unblock
#api/pdf-handler/enumerate


from django.urls import path

from .views import FileUpload

urlpatterns = [
    path('upload/', FileUpload.as_view()),
]
