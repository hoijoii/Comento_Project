# Generated by Django 4.0.4 on 2022-04-23 11:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0011_auto_20220217_1851'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Filedata',
        ),
        migrations.RemoveField(
            model_name='file',
            name='file',
        ),
        migrations.RemoveField(
            model_name='post',
            name='formfile',
        ),
        migrations.AddField(
            model_name='file',
            name='files',
            field=models.FileField(null=True, upload_to='documents'),
        ),
        migrations.AddField(
            model_name='file',
            name='post',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.post'),
        ),
        migrations.AlterField(
            model_name='file',
            name='title',
            field=models.CharField(default='filename', max_length=255),
        ),
        migrations.AlterField(
            model_name='file',
            name='uploader',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
