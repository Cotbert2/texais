# Generated by Django 5.1.2 on 2024-12-05 01:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pdf_handler', '0002_enumeratepdf_watermarkpdf'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='enumeratepdf',
            name='end',
        ),
    ]
