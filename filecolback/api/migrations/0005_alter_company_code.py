# Generated by Django 4.0.4 on 2022-07-05 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_company'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='code',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
