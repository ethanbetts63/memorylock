import json
from pathlib import Path
from django.conf import settings
from .models import FAQ

def generate_faqs_from_jsonl():
    """
    Reads a JSONL file containing FAQ data and populates the FAQ model.
    It uses update_or_create to avoid duplicate entries based on the question.
    """
    faqs_file = Path(settings.BASE_DIR) / 'data' / 'faqs.jsonl'
    
    if not faqs_file.exists():
        print(f"Data file not found at: {faqs_file}")
        return 0, 0

    created_count = 0
    updated_count = 0

    with open(faqs_file, 'r') as f:
        for line in f:
            try:
                data = json.loads(line)
                faq, created = FAQ.objects.update_or_create(
                    question=data['question'],
                    defaults={
                        'answer': data['answer'],
                        'pages': data['pages'],
                    }
                )
                if created:
                    created_count += 1
                else:
                    updated_count += 1
            except json.JSONDecodeError:
                print(f"Skipping invalid JSON line: {line.strip()}")
            except KeyError as e:
                print(f"Skipping line with missing key {e}: {line.strip()}")

    return created_count, updated_count
