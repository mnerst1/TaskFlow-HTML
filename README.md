\# ✅ TaskFlow



A lightweight productivity task manager built with \*\*HTML, CSS and Vanilla JavaScript\*\*.



TaskFlow helps users organize everyday tasks with priorities, deadlines, filters, search, themes, statistics and local backup.



This project was created as \*\*Day 005\*\* of my \*\*365 Days of Code\*\* challenge.



\---



\## 📸 Preview



Add your project screenshot here:




<p align="center">
  <img
    src="https://github.com/user-attachments/assets/c79a600e-2635-4b0e-a66d-db6014347e88"
    width="550"
    alt="TaskFlow Preview"
  />
</p>




\---



\# 🇬🇧 English



\## 📌 About



\*\*TaskFlow\*\* is a browser-based productivity application for managing personal tasks.



The application is built entirely with Vanilla JavaScript without frameworks or external libraries.



All task data is stored locally in the browser using `localStorage`, so the application works without a backend or database server.



\---



\## ✨ Features



\### 📝 Task Management



\- Create new tasks

\- Edit existing tasks

\- Delete tasks

\- Mark tasks as completed

\- Add notes to tasks

\- Add deadlines

\- Set task priorities



\### 🚦 Priority Levels



Tasks can have three priority levels:



\- 🟢 Low

\- 🟡 Medium

\- 🔴 High



Tasks can also be sorted by priority.



\---



\## 📅 Deadlines



Each task can have a due date.



TaskFlow automatically identifies overdue tasks and highlights them in the interface.



Available views include:



\- Inbox

\- Today

\- Active

\- Completed



\---



\## 🔍 Search



Tasks can be searched by:



\- Task title

\- Notes



Search results update instantly while typing.



\---



\## 🔃 Sorting



Tasks can be sorted by:



\- Newest

\- Oldest

\- Priority

\- Deadline



\---



\## 📊 Statistics



TaskFlow displays real-time statistics:



\- Total tasks

\- Active tasks

\- Completed tasks

\- Overdue tasks

\- Tasks due today



\---



\## 🌓 Light \& Dark Theme



The application includes:



\- Light theme

\- Dark theme



The selected theme is automatically saved in `localStorage`.



\---



\## 💾 Local Storage



TaskFlow saves all tasks directly in the browser.



This means tasks remain available after:



\- Refreshing the page

\- Closing the browser

\- Restarting the browser



No account or internet connection is required.



\---



\## 📤 Export Data



Users can export all tasks to a JSON backup file:



```text

taskflow-backup.json

```



The backup contains:



\- Task title

\- Notes

\- Priority

\- Deadline

\- Completion state

\- Creation time



\---



\## 📥 Import Data



A previously exported TaskFlow JSON backup can be imported back into the application.



This allows users to:



\- Restore tasks

\- Move tasks between browsers

\- Create manual backups



\---



\# 🛠️ Technologies



| Technology | Purpose |

|---|---|

| HTML5 | Page structure |

| CSS3 | Interface and responsive design |

| JavaScript | Application logic |

| DOM API | Dynamic UI |

| LocalStorage | Persistent local storage |

| JSON | Data serialization and backup |

| FileReader API | JSON import |

| Blob API | JSON export |

| Git | Version control |

| GitHub | Repository hosting |



\---



\# 🧠 JavaScript Concepts



This project practices:



\- Arrays

\- Objects

\- Functions

\- Event listeners

\- DOM manipulation

\- `localStorage`

\- `JSON.stringify()`

\- `JSON.parse()`

\- `Array.filter()`

\- `Array.find()`

\- `Array.some()`

\- `Array.sort()`

\- `forEach()`

\- FileReader API

\- Blob API

\- Date handling

\- UI state management

\- CRUD operations



\---



\# 🔄 CRUD



TaskFlow implements basic CRUD functionality:



```text

CREATE

↓

Create a new task



READ

↓

Display saved tasks



UPDATE

↓

Edit task or change completion state



DELETE

↓

Remove task

```



\---



\# 📁 Project Structure



```text

Day-005-TaskFlow/

│

├── index.html

├── style.css

├── script.js

├── README.md

└── .gitignore

```



\---



\# 🚀 Run Locally



No installation is required.



Clone the repository:



```bash

git clone https://github.com/YOUR\_USERNAME/TaskFlow-JavaScript.git

```



Open the folder:



```bash

cd TaskFlow-JavaScript

```



Then open:



```text

index.html

```



in your browser.



\---



\## Optional Local Server



If Python is installed:



```bash

python -m http.server 8000

```



Then open:



```text

http://localhost:8000

```



\---



\# 💾 Data Format



A TaskFlow task is stored approximately like this:



```json

{

&#x20; "id": "task-id",

&#x20; "title": "Finish JavaScript project",

&#x20; "notes": "Update README and push to GitHub",

&#x20; "priority": "high",

&#x20; "deadline": "2026-09-25",

&#x20; "completed": false,

&#x20; "createdAt": 1790281200000

}

```



All tasks are stored as an array:



```json

\[

&#x20; {

&#x20;   "id": "1",

&#x20;   "title": "Learn JavaScript",

&#x20;   "priority": "medium",

&#x20;   "completed": false

&#x20; },

&#x20; {

&#x20;   "id": "2",

&#x20;   "title": "Push project to GitHub",

&#x20;   "priority": "high",

&#x20;   "completed": true

&#x20; }

]

```



\---



\# 🔐 Privacy



TaskFlow does not send task information to any server.



Task data stays inside the user's browser unless the user manually exports it.



No analytics, accounts or external databases are required.



\---



\# 🗺️ Roadmap



Possible future improvements:



\- Drag \& drop task ordering

\- Categories

\- Tags

\- Recurring tasks

\- Browser notifications

\- Calendar view

\- Keyboard shortcuts

\- Subtasks

\- Task history

\- Undo delete

\- PWA support

\- Offline installation

\- Cloud synchronization

\- User authentication

\- Backend REST API

\- PostgreSQL / MySQL database

\- Mobile version



\---



\# 🎯 365 Days of Code



TaskFlow was created as part of my \*\*365 Days of Code\*\* challenge.



| Day | Project | Technology |

|---|---|---|

| Day 001 | Password Generator | Python |

| Day 002 | Multilingual Calculator | C# / WPF |

| Day 003 | StudyFlow | Kotlin / Android |

| Day 004 | Text Analyzer | Python |

| \*\*Day 005\*\* | \*\*TaskFlow\*\* | \*\*HTML / CSS / JavaScript\*\* |



The goal is to improve my development skills by regularly building applications with different languages, frameworks, databases, APIs and platforms.



\---



\# 👨‍💻 Author



Developed by \*\*Miras\*\*.



\---



\# ⭐ Support



If you like this project, consider giving the repository a ⭐.



Feedback and suggestions are welcome.



\---



\# 📄 License



This project is intended for educational and personal use.

#   T a s k F l o w - H T M L 
 
 
