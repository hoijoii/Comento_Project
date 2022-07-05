from django.db import models
from account.models import User

# Create your models here.
class Post(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=False)
    title = models.CharField(max_length=100)
    description = models.TextField()
    writer = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    startDay = models.DateField(blank=True, null=True)
    endDay = models.DateField(blank=True, null=True)
    def __str__(self):
        return self.title

class File(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=False)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    files = models.FileField(upload_to="documents", null=True, blank=True)
    uploader = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    upload_at = models.DateTimeField(auto_now=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.title

class Company(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=False)
    code = models.IntegerField(null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.code

