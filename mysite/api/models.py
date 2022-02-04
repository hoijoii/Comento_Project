from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    writer = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    startDay = models.DateField(blank=True, null=True)
    endDay = models.DateField(blank=True, null=True)
    def __str__(self):
        return self.title

class File(models.Model):
    title = models.CharField(default='filename', max_length=255)
    files = models.FileField(upload_to="documents", null=True)
    uploader = models.CharField(max_length=10)
    upload_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title
