# ML Project

## Overview
This project is an MVP for an image classification system using a fine-tuned CNN model. It includes a FastAPI backend and a React frontend.

## Tech Stack
- **Backend**: FastAPI
- **AI/ML**: PyTorch, torchvision
- **Frontend**: React (separate project)
- **Database**: None (stateless MVP)

## Project Structure
```
ML_project/
├── app/
│   ├── main.py
│   ├── routers/
│   ├── services/
│   └── models/
├── training/
├── inference/
├── tests/
├── .env
├── config.json
└── README.md
```

## Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ML_project
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:
   ```bash
   uvicorn app.main:app --reload
   ```

## Environment Variables
Define the following variables in the `.env` file:
- `API_KEY`: Your API key

## Testing
Run tests using:
```bash
pytest tests/
```