let notes = [];
function showNote() {
  let topic = document.getElementById("topic").value;
  let subtopic = document.getElementById("subtopic").value;
  let content = document.getElementById("noteArea").value;
  let code = document.getElementById("codeArea").value;

  let note = {
  id: Date.now(), 
  topic: topic,
  subtopic: subtopic,
  content: content,
  code: code
};

  notes.push(note);

  localStorage.setItem("notes", JSON.stringify(notes));

  displayNotes();

  document.getElementById("topic").value = "";
  document.getElementById("subtopic").value = "";
  document.getElementById("noteArea").value = "";
  document.getElementById("codeArea").value = "";
}



function displayNotes() {
  let output = document.getElementById("output");

  output.innerHTML = "";

  notes.forEach((note, index) => {
    output.innerHTML += `
      <div>
        <h2>${note.topic}</h2>
        <h4>${note.subtopic}</h4>

        <p>${note.content}</p>

        <pre><code>${note.code}</code></pre>

        <button onclick="deleteNote(${index})">❌ Delete</button>
      </div>
    `;
  });
}
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);

  localStorage.setItem("notes", JSON.stringify(notes));

  displayNotes();
}


function searchNotes() {
  let search = document.getElementById("search").value.toLowerCase();

  let filtered = notes.filter(note =>
    note.topic.toLowerCase().includes(search) ||
    note.subtopic.toLowerCase().includes(search) ||
    note.content.toLowerCase().includes(search)
  );

  displayFilteredNotes(filtered);
}
function displayFilteredNotes(filteredNotes) {
  let output = document.getElementById("output");

  output.innerHTML = "";

  filteredNotes.forEach((note, index) => {
    output.innerHTML += `
      <div>
        <h2>${note.topic}</h2>
        <h4>${note.subtopic}</h4>

        <p>${note.content}</p>
        <pre><code>${note.code}</code></pre>

        <button onclick="deleteNote(${index})">❌ Delete</button>
      </div>
    `;
  });
}

window.onload = function () {
  let saved = localStorage.getItem("notes");

  if (saved) {
    notes = JSON.parse(saved);
    displayNotes();
  }
};
