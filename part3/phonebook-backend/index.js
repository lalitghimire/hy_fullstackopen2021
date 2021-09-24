const express = require("express");
const app = express();

app.use(express.json());
// persons object
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// routes
//route to home
app.get("/", (req, res) => {
  res.send("Hello from homepage");
});

// route to info
app.get("/info", (req, res) => {
  let dateNow = Date(Date.now());
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> 
      <p> ${dateNow}</p>`
  );
});

// route which return the list of persons
app.get("/api/persons", (req, res) => {
  res.send(persons);
});

// route to get a single person from list
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.send(person);
  } else {
    res.status(404).send("Person not found");
  }
});

// route delete entry using delte
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end;
});

// route add new entry using post
app.post("/api/persons", (req, res) => {
  const body = req.body;

  const person = {
    id: Math.floor(Math.random() * 9996) + 5,
    name: body.name,
    number: body.number,
  };

  // check for missing info and if so send error response
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number missing" });
  }

  // check if duplicate name and if so send error response
  if (persons.filter((person) => person.name === body.name).length > 0) {
    return res.status(400).json({ error: "provide unique name" });
  }

  persons = persons.concat(person);
  res.send(person);
});

// create server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
