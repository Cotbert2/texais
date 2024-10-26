from django.db import models

# Create your models here.


class PDF(models.Model):
    pdf = models.FileField(upload_to='pdfs/')

    def __str__(self):
        return self.pdf.name