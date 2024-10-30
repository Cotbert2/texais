from django.db import models

# Create your models here.


class PDF(models.Model):
    pdf = models.FileField(upload_to='pdfs/')

    def __str__(self):
        return self.pdf.name

class SplitPDF(models.Model):
    pdf = models.FileField(upload_to='pdfs/')
    output = models.CharField(max_length=1000)
    split_in_page = models.IntegerField()

    def __str__(self):
        return self.pdf.name
    

class ProtectPDF(models.Model):
    pdf = models.FileField(upload_to='pdfs/')
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.pdf.name