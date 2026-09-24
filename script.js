const STORAGE_KEY =
    "taskflow-data";

const THEME_KEY =
    "taskflow-theme";


const taskList =
    document.getElementById(
        "taskList"
    );

const emptyState =
    document.getElementById(
        "emptyState"
    );

const taskModal =
    document.getElementById(
        "taskModal"
    );

const taskForm =
    document.getElementById(
        "taskForm"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const editingTaskId =
    document.getElementById(
        "editingTaskId"
    );

const taskTitle =
    document.getElementById(
        "taskTitle"
    );

const taskNotes =
    document.getElementById(
        "taskNotes"
    );

const taskPriority =
    document.getElementById(
        "taskPriority"
    );

const taskDeadline =
    document.getElementById(
        "taskDeadline"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const sortSelect =
    document.getElementById(
        "sortSelect"
    );


let tasks =
    loadTasks();

let currentFilter =
    "all";

let searchQuery =
    "";



/*
    Читаем задачи из localStorage.
*/
function loadTasks() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );


        return saved
            ? JSON.parse(saved)
            : [];

    } catch (error) {

        console.error(
            "Cannot load tasks:",
            error
        );

        return [];
    }
}



/*
    Сохраняем задачи.
*/
function saveTasks() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(
            tasks
        )
    );
}



/*
    YYYY-MM-DD для сегодняшней даты.
*/
function getTodayString() {

    const today =
        new Date();


    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;
}



/*
    Проверяет просрочена ли задача.
*/
function isOverdue(task) {

    if (
        !task.deadline ||
        task.completed
    ) {

        return false;
    }


    return (
        task.deadline <
        getTodayString()
    );
}



/*
    Открытие окна создания.
*/
function openCreateModal() {

    editingTaskId.value =
        "";

    modalTitle.textContent =
        "Add task";

    taskForm.reset();

    taskPriority.value =
        "medium";


    taskModal.classList.remove(
        "hidden"
    );


    setTimeout(
        () =>
            taskTitle.focus(),
        50
    );
}



/*
    Открытие окна редактирования.
*/
function openEditModal(id) {

    const task =
        tasks.find(
            task =>
                task.id === id
        );


    if (!task) {
        return;
    }


    editingTaskId.value =
        task.id;

    modalTitle.textContent =
        "Edit task";

    taskTitle.value =
        task.title;

    taskNotes.value =
        task.notes || "";

    taskPriority.value =
        task.priority;

    taskDeadline.value =
        task.deadline || "";


    taskModal.classList.remove(
        "hidden"
    );
}



/*
    Закрытие окна.
*/
function closeModal() {

    taskModal.classList.add(
        "hidden"
    );

    taskForm.reset();

    editingTaskId.value =
        "";
}



/*
    Создание новой задачи.
*/
function createTask(
    title,
    notes,
    priority,
    deadline
) {

    const task = {

        id:
            crypto.randomUUID
                ? crypto.randomUUID()
                : Date.now().toString(),

        title,

        notes,

        priority,

        deadline,

        completed:
            false,

        createdAt:
            Date.now()
    };


    tasks.unshift(
        task
    );


    saveTasks();

    render();
}



/*
    Обновление существующей задачи.
*/
function updateTask(
    id,
    data
) {

    const task =
        tasks.find(
            task =>
                task.id === id
        );


    if (!task) {
        return;
    }


    Object.assign(
        task,
        data
    );


    saveTasks();

    render();
}



/*
    Выполнить / вернуть задачу.
*/
function toggleTask(id) {

    const task =
        tasks.find(
            task =>
                task.id === id
        );


    if (!task) {
        return;
    }


    task.completed =
        !task.completed;


    saveTasks();

    render();
}



/*
    Удаление.
*/
function deleteTask(id) {

    const confirmed =
        confirm(
            "Delete this task?"
        );


    if (!confirmed) {
        return;
    }


    tasks =
        tasks.filter(
            task =>
                task.id !== id
        );


    saveTasks();

    render();
}



/*
    Выбор задач по вкладке.
*/
function filterTasks(
    source
) {

    const today =
        getTodayString();


    return source.filter(
        task => {

            if (
                currentFilter ===
                "active"
            ) {

                return !task.completed;
            }


            if (
                currentFilter ===
                "completed"
            ) {

                return task.completed;
            }


            if (
                currentFilter ===
                "today"
            ) {

                return (
                    task.deadline ===
                    today
                );
            }


            return true;
        }
    );
}



/*
    Поиск.
*/
function searchTasks(
    source
) {

    if (!searchQuery) {

        return source;
    }


    const query =
        searchQuery.toLowerCase();


    return source.filter(
        task => {

            const title =
                task.title
                    .toLowerCase();

            const notes =
                (
                    task.notes || ""
                )
                    .toLowerCase();


            return (
                title.includes(query)
                ||
                notes.includes(query)
            );
        }
    );
}



/*
    Сортировка.
*/
function sortTasks(
    source
) {

    const result =
        [...source];


    if (
        sortSelect.value ===
        "oldest"
    ) {

        return result.sort(
            (a, b) =>
                a.createdAt -
                b.createdAt
        );
    }


    if (
        sortSelect.value ===
        "priority"
    ) {

        const weights = {
            high: 3,
            medium: 2,
            low: 1
        };


        return result.sort(
            (a, b) =>

                weights[
                    b.priority
                ]

                -

                weights[
                    a.priority
                ]
        );
    }


    if (
        sortSelect.value ===
        "deadline"
    ) {

        return result.sort(
            (a, b) => {

                if (
                    !a.deadline &&
                    !b.deadline
                ) {

                    return 0;
                }


                if (!a.deadline) {

                    return 1;
                }


                if (!b.deadline) {

                    return -1;
                }


                return (
                    a.deadline
                        .localeCompare(
                            b.deadline
                        )
                );
            }
        );
    }


    return result.sort(
        (a, b) =>
            b.createdAt -
            a.createdAt
    );
}



/*
    Создание карточки задачи.
*/
function createTaskElement(
    task
) {

    const container =
        document.createElement(
            "article"
        );


    container.className =
        "task";


    if (
        task.completed
    ) {

        container.classList.add(
            "completed"
        );
    }


    const checkbox =
        document.createElement(
            "input"
        );


    checkbox.type =
        "checkbox";

    checkbox.className =
        "task-checkbox";

    checkbox.checked =
        task.completed;


    checkbox.addEventListener(
        "change",
        () =>
            toggleTask(
                task.id
            )
    );


    const main =
        document.createElement(
            "div"
        );


    main.className =
        "task-main";


    const title =
        document.createElement(
            "div"
        );


    title.className =
        "task-title";

    title.textContent =
        task.title;


    main.appendChild(
        title
    );


    if (
        task.notes
    ) {

        const notes =
            document.createElement(
                "div"
            );


        notes.className =
            "task-notes";

        notes.textContent =
            task.notes;


        main.appendChild(
            notes
        );
    }


    const meta =
        document.createElement(
            "div"
        );


    meta.className =
        "task-meta";


    const priority =
        document.createElement(
            "span"
        );


    priority.className =
        `badge priority-${task.priority}`;


    priority.textContent =
        task.priority
            .charAt(0)
            .toUpperCase()

        +

        task.priority.slice(1);


    meta.appendChild(
        priority
    );


    if (
        task.deadline
    ) {

        const deadline =
            document.createElement(
                "span"
            );


        deadline.className =
            "badge";


        if (
            isOverdue(task)
        ) {

            deadline.classList.add(
                "overdue"
            );


            deadline.textContent =
                `Overdue · ${task.deadline}`;

        } else {

            deadline.textContent =
                task.deadline;
        }


        meta.appendChild(
            deadline
        );
    }


    main.appendChild(
        meta
    );


    const actions =
        document.createElement(
            "div"
        );


    actions.className =
        "task-actions";


    const editButton =
        document.createElement(
            "button"
        );


    editButton.className =
        "icon-button";

    editButton.textContent =
        "Edit";


    editButton.addEventListener(
        "click",
        () =>
            openEditModal(
                task.id
            )
    );


    const deleteButton =
        document.createElement(
            "button"
        );


    deleteButton.className =
        "icon-button";

    deleteButton.textContent =
        "×";


    deleteButton.addEventListener(
        "click",
        () =>
            deleteTask(
                task.id
            )
    );


    actions.append(
        editButton,
        deleteButton
    );


    container.append(
        checkbox,
        main,
        actions
    );


    return container;
}



/*
    Обновление статистики.
*/
function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task =>
                task.completed
        ).length;


    const active =
        total -
        completed;


    const overdue =
        tasks.filter(
            task =>
                isOverdue(task)
        ).length;


    const today =
        tasks.filter(
            task =>
                task.deadline ===
                getTodayString()
        ).length;


    document.getElementById(
        "totalCount"
    ).textContent =
        total;


    document.getElementById(
        "activeCount"
    ).textContent =
        active;


    document.getElementById(
        "completedCount"
    ).textContent =
        completed;


    document.getElementById(
        "overdueCount"
    ).textContent =
        overdue;


    document.getElementById(
        "sidebarAll"
    ).textContent =
        total;


    document.getElementById(
        "sidebarToday"
    ).textContent =
        today;


    document.getElementById(
        "sidebarActive"
    ).textContent =
        active;


    document.getElementById(
        "sidebarCompleted"
    ).textContent =
        completed;


    document.getElementById(
        "footerInfo"
    ).textContent =
        `${total} task${
            total === 1
                ? ""
                : "s"
        }`;
}



/*
    Основная отрисовка.
*/
function render() {

    taskList.innerHTML =
        "";


    let visibleTasks =
        filterTasks(
            tasks
        );


    visibleTasks =
        searchTasks(
            visibleTasks
        );


    visibleTasks =
        sortTasks(
            visibleTasks
        );


    visibleTasks.forEach(
        task => {

            taskList.appendChild(
                createTaskElement(
                    task
                )
            );
        }
    );


    emptyState.classList.toggle(
        "hidden",
        visibleTasks.length > 0
    );


    updateStatistics();
}



/*
    СОБЫТИЯ
*/


document
    .getElementById(
        "openTaskModal"
    )
    .addEventListener(
        "click",
        openCreateModal
    );


document
    .getElementById(
        "closeModal"
    )
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById(
        "cancelModal"
    )
    .addEventListener(
        "click",
        closeModal
    );


taskModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            taskModal
        ) {

            closeModal();
        }
    }
);



taskForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const title =
            taskTitle
                .value
                .trim();


        if (!title) {

            return;
        }


        const data = {

            title,

            notes:
                taskNotes
                    .value
                    .trim(),

            priority:
                taskPriority.value,

            deadline:
                taskDeadline.value
        };


        const id =
            editingTaskId.value;


        if (id) {

            updateTask(
                id,
                data
            );

        } else {

            createTask(
                data.title,
                data.notes,
                data.priority,
                data.deadline
            );
        }


        closeModal();
    }
);



document
    .querySelectorAll(
        ".nav-item"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".nav-item"
                        )
                        .forEach(
                            item =>
                                item
                                    .classList
                                    .remove(
                                        "active"
                                    )
                        );


                    button
                        .classList
                        .add(
                            "active"
                        );


                    currentFilter =
                        button.dataset.filter;


                    const titles = {

                        all:
                            "Inbox",

                        today:
                            "Today",

                        active:
                            "Active",

                        completed:
                            "Completed"
                    };


                    document
                        .getElementById(
                            "pageTitle"
                        )
                        .textContent =
                        titles[
                            currentFilter
                        ];


                    render();
                }
            );
        }
    );



searchInput.addEventListener(
    "input",
    () => {

        searchQuery =
            searchInput
                .value
                .trim();


        render();
    }
);



sortSelect.addEventListener(
    "change",
    render
);



document
    .getElementById(
        "clearCompleted"
    )
    .addEventListener(
        "click",
        () => {

            const hasCompleted =
                tasks.some(
                    task =>
                        task.completed
                );


            if (!hasCompleted) {

                return;
            }


            const confirmed =
                confirm(
                    "Clear all completed tasks?"
                );


            if (!confirmed) {

                return;
            }


            tasks =
                tasks.filter(
                    task =>
                        !task.completed
                );


            saveTasks();

            render();
        }
    );



/*
    THEME
*/

const themeButton =
    document.getElementById(
        "themeButton"
    );


function applyTheme(
    theme
) {

    document
        .body
        .classList
        .toggle(
            "dark",
            theme === "dark"
        );


    themeButton.textContent =

        theme === "dark"
            ? "Light mode"
            : "Dark mode";
}



const savedTheme =
    localStorage.getItem(
        THEME_KEY
    ) || "light";


applyTheme(
    savedTheme
);


themeButton.addEventListener(
    "click",
    () => {

        const nextTheme =

            document
                .body
                .classList
                .contains(
                    "dark"
                )

            ? "light"
            : "dark";


        localStorage.setItem(
            THEME_KEY,
            nextTheme
        );


        applyTheme(
            nextTheme
        );
    }
);



/*
    EXPORT JSON
*/

document
    .getElementById(
        "exportButton"
    )
    .addEventListener(
        "click",
        () => {

            const data =
                JSON.stringify(
                    tasks,
                    null,
                    2
                );


            const blob =
                new Blob(
                    [data],
                    {
                        type:
                            "application/json"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;

            link.download =
                "taskflow-backup.json";


            link.click();


            URL.revokeObjectURL(
                url
            );
        }
    );



/*
    IMPORT JSON
*/

document
    .getElementById(
        "importInput"
    )
    .addEventListener(
        "change",
        event => {

            const file =
                event
                    .target
                    .files[0];


            if (!file) {

                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                () => {

                    try {

                        const imported =
                            JSON.parse(
                                reader.result
                            );


                        if (
                            !Array.isArray(
                                imported
                            )
                        ) {

                            throw new Error();
                        }


                        const confirmed =
                            confirm(
                                "Replace current tasks with imported data?"
                            );


                        if (
                            !confirmed
                        ) {

                            return;
                        }


                        tasks =
                            imported;


                        saveTasks();

                        render();


                        alert(
                            "Data imported successfully."
                        );

                    } catch {

                        alert(
                            "Invalid TaskFlow backup file."
                        );
                    }
                };


            reader.readAsText(
                file
            );


            event.target.value =
                "";
        }
    );



/*
    ESC закрывает окно.
*/

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeModal();
        }
    }
);


render();