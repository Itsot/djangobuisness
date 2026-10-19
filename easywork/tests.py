from django.test import TestCase, Client
from django.urls import reverse


class ComingSoonHomepageTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_homepage_status_code_and_template(self):
        """Test homepage loads with 200 OK and uses index.html."""
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

    def test_homepage_coming_soon_and_tech_elements(self):
        """Verify essential Coming Soon title and high-tech developer elements."""
        response = self.client.get(reverse('home'))
        content = response.content.decode('utf-8')

        # Coming Soon branding & tech titles
        self.assertIn("COMING SOON", content)
        self.assertIn("Omkar Taru", content)
        self.assertIn("Android", content)
        self.assertIn("Django", content)
        self.assertIn("NEXT-GEN DEVELOPER PORTFOLIO", content)
        self.assertIn("cyberCanvas", content)
        self.assertIn("https://github.com/Itsot", content)

    def test_database_independence(self):
        """Verify that loading the homepage executes zero database queries."""
        with self.assertNumQueries(0):
            response = self.client.get(reverse('home'))
            self.assertEqual(response.status_code, 200)
