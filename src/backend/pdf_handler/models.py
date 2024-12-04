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
    
class IntercalatePDFs(models.Model):
    pdf = models.FileField(upload_to='pdfs/')
    order = models.IntegerField(max_length=1000)

    def __str__(self):
        return self.pdf.name

class MergePDF(models.Model):
    output = models.CharField(max_length=1000)

    def __str__(self):
        return self.output
    
class WatermarkPDF(models.Model):
    pdf = models.FileField(upload_to='pdfs/')
    watermark = models.FileField(upload_to='pdfs/')
    output = models.CharField(max_length=1000)

    def __str__(self):
        return self.pdf.name
    
class EnumeratePDF(models.Model):
    pdf = models.FileField(upload_to='pdfs/')
    output = models.CharField(max_length=1000)
    start = models.IntegerField()
    end = models.IntegerField()
    number = models.IntegerField()

    def __str__(self):
        return self.pdf.name