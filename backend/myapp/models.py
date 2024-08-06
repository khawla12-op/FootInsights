from djongo import models

class FootInsight(models.Model):
    id = models.ObjectIdField()
    Name = models.CharField(max_length=255)
    photoUrl = models.URLField()
    Best_Position = models.CharField(max_length=50)
    Age = models.IntegerField()
    Stamina = models.IntegerField()
    Strength = models.IntegerField()
    Height = models.IntegerField()
    Weight = models.IntegerField()
    Agility = models.IntegerField()
    Acceleration = models.IntegerField()
    Sprint_Speed = models.IntegerField()
    Nationality = models.CharField(max_length=255)
    Club = models.CharField(max_length=255)
    Cardiac_Frequency = models.IntegerField()
    Humidity = models.IntegerField()
    Temperature = models.IntegerField()
    Status = models.CharField(max_length=50)
    status_encoded = models.IntegerField()

    class Meta:
        db_table = "FootInsights"  # Assurez-vous que le nom de la table correspond à votre collection MongoDB
