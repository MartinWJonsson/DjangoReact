from django.test import TestCase

from .models import Product

def create_product(name, desc, price):
    return Product.objects.create(product_name=name, product_description=desc, product_price=price)

class ProductModelTest(TestCase):
    def test_new_product_has_id(self):
        new_product = create_product("test_product", "test_desc", 1.99)

        self.assertIsNot(new_product.id, None)

    def test_new_product_has_0_price(self):
        new_product = create_product("test_product", "test_desc", 0)

        self.assertIs(new_product.price_is_valid(), False)
    
    
    def test_new_product_has_valid_price(self):
        new_product = create_product("test_product", "test_desc", 0.1)

        self.assertIs(new_product.price_is_valid(), True)