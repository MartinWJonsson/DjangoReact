from django.test import TestCase

from .models import Product

def create_product(name, desc, price):
    return Product.objects.create(product_name=name, product_description=desc, product_price=price)

class ProductModelTest(TestCase):
    def test_new_product_has_id(self):
        new_product = create_product("test_product", "test_desc", 1.99)

        self.assertIsNot(new_product.id, None)
    
    def test_product_name_exists(self):
        new_product = create_product("test_product", "test_desc", 0.1)

        self.assertIs(str(new_product), "test_product")
    
    def test_new_product_has_invalid_name(self):
        new_product = create_product("p", "test_desc", .1)

        self.assertIs(new_product.name_is_valid(), False)
    
    def test_new_product_has_valid_name(self):
        new_product = create_product("test_product", "test_desc", .1)

        self.assertIs(new_product.name_is_valid(), True)
    
    def test_new_product_has_invalid_description(self):
        new_product = create_product("test_product", "desc", .1)

        self.assertIs(new_product.description_is_valid(), False)
    
    def test_new_product_has_valid_description(self):
        new_product = create_product("test_product", "test_desc", .1)

        self.assertIs(new_product.description_is_valid(), True)

    def test_new_product_has_0_price(self):
        new_product = create_product("test_product", "test_desc", 0)

        self.assertIs(new_product.price_is_valid(), False)
    
    def test_new_product_has_valid_price(self):
        new_product = create_product("test_product", "test_desc", 0.1)

        self.assertIs(new_product.price_is_valid(), True)