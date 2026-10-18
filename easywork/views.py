from datetime import datetime
from django.shortcuts import render


def home(request):
    """
    Renders the personal portfolio homepage for Omkar Taru.
    This view is completely static/database-independent, ensuring fast
    load times and full compatibility with Render hosting without DB overhead.
    """
    context = {
        "current_year": datetime.now().year,
        "github_url": "https://github.com/Itsot",
        "project_github_url": "https://github.com/Itsot/djangobuisness",
    }
    return render(request, "index.html", context)
