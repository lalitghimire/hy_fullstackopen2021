const express = require("express");
const app = express();

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

// delete entry
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end;
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
