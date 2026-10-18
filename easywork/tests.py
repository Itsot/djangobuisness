from django.test import TestCase, Client
from django.urls import reverse


class PortfolioHomepageTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_homepage_status_code_and_template(self):
        """Test homepage loads with 200 OK and uses index.html."""
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

    def test_homepage_seo_and_content(self):
        """Verify essential SEO tags and sections are rendered."""
        response = self.client.get(reverse('home'))
        content = response.content.decode('utf-8')

        # SEO meta & titles
        self.assertIn("Omkar Taru | Software Developer Portfolio", content)
        self.assertIn("Explore Omkar Taru's software development portfolio", content)

        # Headings & Sections
        self.assertIn("Hi, I'm <span class=\"gradient-text\">Omkar Taru.</span>", content)
        self.assertIn("Software Developer <span class=\"headline-sep\">|</span>", content)
        self.assertIn("Android & Django Developer", content)
        self.assertIn("Let's Work Together", content)
        self.assertIn("https://github.com/Itsot", content)

    def test_database_independence(self):
        """Verify that loading the homepage executes zero database queries."""
        with self.assertNumQueries(0):
            response = self.client.get(reverse('home'))
            self.assertEqual(response.status_code, 200)
