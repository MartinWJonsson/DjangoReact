from django.db import models
from django.contrib import admin
from django.core.validators import MinValueValidator



class Product(models.Model):
    product_name = models.CharField(max_length=200)
    product_description = models.CharField(max_length=200)
    product_price = models.FloatField(validators=[MinValueValidator(0.1)])

    class Meta:
        ordering = ['product_name']

    @admin.display(
        boolean = True,
        ordering = 'product_name',
    )

    def __str__(self):
        return self.product_name
    
    def price_is_valid(self):
        return self.product_price >= 0.1

    def name_is_valid(self):
        return len(self.product_name) >= 3

    def description_is_valid(self):
        return len(self.product_description) >= 5