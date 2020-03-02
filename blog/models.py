from django.db import models

class blogPost(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateTimeField()
    image = models.ImageField(upload_to='images/')
    body = models.TextField()

    #uses the title for the name of each blogPost object in the admin view
    def __str__(self):
        return self.title

    def summary(self):
        return self.body[:100]

    def datePretty(self):
        return self.date.strftime('%b %e %Y')