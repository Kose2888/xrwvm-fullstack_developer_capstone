from django.db import models
from django.utils.timezone import now
from django.core.validators import MaxValueValidator, MinValueValidator

class CarMake(models.Model):
    name = models.CharField(max_length=100, default='N/A')
    description = models.TextField()

    def __str__(self):
        return self.name

class CarModel(models.Model):
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE) # Many-to-One relationship
    name = models.CharField(max_length=100)
    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('CONVERTIBLE', 'Convertible'),
        ('COUPE', 'Coupe'),
        ('MINIVAN', 'Minivan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
        ('HATCHBACK', 'Hatchback'),
        ('PICKUP', 'Pickup'),
    ]
    type = models.CharField(max_length=15, choices=CAR_TYPES, default='SUV')
    year = models.IntegerField(default=2026,
        validators=[
            MaxValueValidator(2026),
            MinValueValidator(2000)
        ])
    
    def __str__(self):
        return self.name
