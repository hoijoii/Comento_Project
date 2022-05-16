from django.db import models
from django.db.models import Sum
from django import forms

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    writer = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    startDay = models.DateField(blank=True, null=True)
    endDay = models.DateField(blank=True, null=True)
    formfile = models.FileField(upload_to="", blank=True, null=True)
    def __str__(self):
        return self.title

class File(models.Model):
    title = models.CharField(default='filename', blank=True, max_length=255)
    file = models.FileField(upload_to="", null=True)
    uploader = models.CharField(max_length=10, blank=True)
    upload_at = models.DateTimeField(auto_now=True, blank=True)
    def __str__(self):
        return self.title

class Filedata(models.Model):
    companyCode = models.IntegerField(null=True, default='')
    companyName = models.CharField(max_length=50, null=True)
    classification = models.CharField(max_length=10, null=True)
    closingMonth = models.DateField(null=True)
    revenue = models.IntegerField(null=True)
    operatingIncome = models.IntegerField(null=True)
    netIncome = models.IntegerField(null=True)

    def __str__(self):
        return self.companyName
