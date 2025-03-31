# 📚 Professor Insight Dashboard

A full-stack application built for the **Round 1 Foundation Challenge** of the two-stage technical evaluation process. This system manages academic professor profiles, supports rich data analysis, and showcases clean frontend/backend integration.

---

## 🧠 Core Objectives Fulfilled

- ✅ Full-stack CRUD app with Flask + Angular
- ✅ RESTful API with data validation and error handling
- ✅ Clean UI/UX (Angular 19+ with Material Design)
- ✅ MongoDB integration
- ✅ Dynamic data analysis via JSON ingestion
- ✅ Narrative findings and publication breakdowns
- ✅ Git-based version tracking with modular code

---

## ⚙️ Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| Frontend   | Angular 19+, Angular Material |
| Backend    | Python Flask           |
| Database   | MongoDB (local)        |
| Extras     | pandas (for data loading), Postman (for API testing)

---

## 📁 Project Structure

```
project/
│
├── backend/                # Flask API
│   ├── app.py              # Main API routes
│   ├── import_professors.py # JSON importer (auto-clears DB)
│
├── frontend/               # Angular App (v19+)
│   ├── src/app/
│   │   ├── dashboard/
│   │   ├── add-edit-professor/
│   │   └── professor-profile/
│
├── data-analysis/          # JSON input files
│   ├── Nishant Garg_data.json
│   └── Prannoy Suraneni_data.json
```

---

### 🔌 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt  # flask, pymongo, flask-cors
python import_professors.py      # Reset + load JSON data
python app.py                    # Launch Flask API
```

> MongoDB must be running locally at `localhost:27017`  
> Alternatively, update the URI for MongoDB Atlas.

---

### 🧑‍💻 Frontend Setup

```bash
cd frontend
npm install
ng serve --open
```

> Launches at `http://localhost:4200`

---

## 📡 API Endpoints

| Method | Endpoint                | Description             |
|--------|-------------------------|-------------------------|
| GET    | `/professors`           | Summary of all professors |
| GET    | `/professors/:id`       | Full professor detail   |
| POST   | `/professors`           | Create professor        |
| PUT    | `/professors/:id`       | Edit professor          |
| DELETE | `/professors/:id`       | Remove professor        |

---

## 🎯 Features

### Dashboard (Angular)
- View all professors with name, citation count, and publication count
- Edit/Delete/Create professor entries
- Responsive layout with Material styling

### Profile Page
- Detailed publication cards with:
  - Title, Type, DOI (link)
  - Year, Date, Citation count
  - Authors, Journal

### Admin Features
- JSON import with DB reset
- Form for rich publication entry
- Publication editing with author parsing
- Error handling for invalid operations

---

## 📊 Data Analysis Component

Implemented as part of JSON ingestion and display:
- `import_professors.py` reads JSON files, parses structured academic metadata
- Total citation/publication stats displayed on dashboard
- Per-publication metrics broken down in profile view

> Optionally exportable to a PDF report or analyzable with pandas.

---

## ✅ Evaluation Criteria Checklist

| Requirement                          | Status |
|--------------------------------------|--------|
| Functional full-stack CRUD app       | ✅     |
| RESTful APIs with validation         | ✅     |
| Frontend + Backend integration       | ✅     |
| MongoDB used as database             | ✅     |
| Clean, responsive UI/UX              | ✅     |
| Git-based progress history           | ✅     |
| Data insights via JSON ingestion     | ✅     |
| Detailed README                      | ✅     |

---

## 🧪 Testing

- Run `import_professors.py` to seed MongoDB
- Test API with Postman (`localhost:5000/professors`)
- Use UI to create, view, and edit professors

---

## 🛡️ Future Enhancements (Round 2 Candidates)

- JWT-based role authentication
- PDF report export for professor profile
- Search, filter, and sort across professors
- Admin-only access to edit routes

---

## 👨‍💻 Author

Developed by **Raaghav Pillai**  
UIUC · Computer Science + Education Major