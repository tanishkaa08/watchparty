
## Getting Started

### Prerequisites

- Node.js `>= 18`
- Python `>= 3.9`
- pip / pipenv / virtualenv
- Git

---


## Backend Setup (Django)

```bash
# Clone the repo
git clone https://github.com/yourusername/watchparty.git
cd watchparty/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
````


### Frontend Setup (Next.js)

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
## Troubleshooting

* Make sure backend and frontend are running on different ports (`8000` and `3000`)
* CORS or WebSocket issues? Enable CORS in Django
* Ensure your Django Channels setup is correct in `asgi.py`, `routing.py`, and `settings.py`

---

