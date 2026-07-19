# Task Manager API — Project 2 (Backend API Development)

DecodeLabs Full Stack Training — Project 2 ke liye simple, complete REST API.
Ismein database nahi hai (in-memory array use hua hai) — kyunki Project 2 ka focus
sirf **API logic** hai: endpoints, validation, aur proper status codes.

## Project Structure
```
project2-backend/
├── server.js          # Main entry point — server yahin se start hota hai
├── routes/
│   └── tasks.js        # Saare /tasks endpoints (GET, POST, PUT, DELETE)
├── data/
│   └── tasks.js         # In-memory "fake database" (array)
└── package.json
```

## Kaise Chalayein (How to Run)

1. Terminal mein project folder open karo:
   ```bash
   cd project2-backend
   ```

2. Dependencies install karo:
   ```bash
   npm install
   ```

3. Server start karo:
   ```bash
   npm start
   ```

4. Browser ya Postman/Thunder Client mein kholo:
   ```
   http://localhost:3000
   ```

## Available Endpoints

| Method | Endpoint       | Kaam                          | Body Example                        |
|--------|---------------|--------------------------------|--------------------------------------|
| GET    | `/tasks`      | Saare tasks ki list            | —                                    |
| GET    | `/tasks/:id`  | Ek specific task               | —                                    |
| POST   | `/tasks`      | Naya task banao                | `{ "title": "Buy milk" }`            |
| PUT    | `/tasks/:id`  | Task update karo (title/done)  | `{ "done": true }`                   |
| DELETE | `/tasks/:id`  | Task delete karo               | —                                    |

## Testing Example (curl se)

```bash
# Saare tasks dekho
curl http://localhost:3000/tasks

# Naya task banao
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn REST APIs"}'

# Task ko "done" mark karo
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'

# Task delete karo
curl -X DELETE http://localhost:3000/tasks/1
```

Postman ya Thunder Client (VS Code extension) use karna aur easier hoga —
GUI mein request bana ke bhej sakte ho.

## Yeh Project Kya-Kya Demonstrate Karta Hai (Deck ke Requirements)

✅ **REST endpoints** — GET aur POST (plus bonus PUT/DELETE)
✅ **RESTful naming** — `/tasks` (noun), method decide karta hai action
✅ **Data validation** — empty title reject hota hai (400 Bad Request)
✅ **Proper HTTP status codes** — 200, 201, 204, 400, 404, 500
✅ **JSON request/response** — client aur server JSON mein baat karte hain
✅ **Error handling** — 404 for missing routes, global 500 handler for crashes

## Next Steps (Bonus / Aage Kya Karein)

- MongoDB add karo taaki data server restart hone par bhi save rahe
- Authentication add karo (login/signup) — sirf logged-in user apna task edit kar sake
- `express-validator` package use karo aur bhi robust validation ke liye
- Rate limiting add karo (429 Too Many Requests) spam requests rokne ke liye

---
**DecodeLabs** — decodelabs.tech
