from django.db import models

class Job(models.Model):
    title = models.CharField(default=None, blank=True, null=True, max_length=10)
    image = models.ImageField(upload_to='images/')
    summary = models.CharField(max_length=200)

