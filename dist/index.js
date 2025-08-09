var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ============ Load Todos ===========//
const loadTodos = () => {
    return fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => {
        if (!res.ok) {
            throw new Error("Network Error Found");
        }
        return res.json();
    })
        .catch((err) => {
        console.error('Fetch error:', err);
        throw err;
    });
};
// ============== Get TodosByID ========//
const getTodosById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!res.ok) {
            throw new Error('API Issue Found!');
        }
        return yield res.json();
    }
    catch (err) {
        console.error(`Error fetching todo ${id}:`, err);
        throw err;
    }
});
// ================ Get Todos ===========//
const getTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if elements exist
        const mainContainer = document.getElementById("main-container");
        const todoDetails = document.getElementById('todo-detail');
        if (!mainContainer || !todoDetails) {
            throw new Error("Required DOM elements not found");
        }
        const todos = yield loadTodos();
        console.log('Todos loaded:', todos.length);
        // Style containers
        mainContainer.style.display = "grid";
        mainContainer.style.gridTemplateColumns = "repeat(4,1fr)";
        mainContainer.style.gap = "20px";
        mainContainer.style.padding = "15px 10px";
        // Initial details message
        todoDetails.innerHTML = "<p>Click a todo to see details</p>";
        todoDetails.style.marginTop = "20px";
        todoDetails.style.padding = "10px";
        todoDetails.style.border = "1px solid #333";
        // Create todo cards
        todos.forEach((todo) => {
            const newDiv = document.createElement("div");
            newDiv.style.textAlign = "center";
            newDiv.style.border = "1px solid gray";
            newDiv.style.padding = "10px";
            newDiv.style.borderRadius = "6px";
            newDiv.style.height = "150px";
            newDiv.innerHTML = `
        <h4>ID: ${todo.id}</h4>
        <p>Title: ${todo.title}</p>
        <button class="status-btn" data-id="${todo.id}">Status</button>
      `;
            // Add click handler
            const button = newDiv.querySelector('.status-btn');
            button.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
                e.preventDefault();
                try {
                    todoDetails.innerHTML = '<p>Loading...</p>';
                    const data = yield getTodosById(todo.id);
                    todoDetails.innerHTML = `
            <h3>Todo Details</h3>
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>User ID:</strong> ${data.userId}</p>
            <p><strong>Title:</strong> ${data.title}</p>
            <p><strong>Status:</strong> 
              <span style="color:${data.completed ? 'green' : 'red'}">
                ${data.completed ? "Completed" : "Pending"}
              </span>
            </p>
          `;
                }
                catch (err) {
                    console.error('Error in click handler:', err);
                    todoDetails.innerHTML = `
            <p style="color:red">Error loading details</p>
          `;
                }
            }));
            mainContainer.appendChild(newDiv);
        });
    }
    catch (err) {
        console.error('Error in getTodos:', err);
        const errorContainer = document.getElementById("main-container") || document.body;
        errorContainer.innerHTML = `
      <div style="color:red; padding:20px;">
        <h2>Error Loading Todos</h2>
        <p>${err instanceof Error ? err.message : 'Unknown error'}</p>
      </div>
    `;
    }
});
// ======== Call the Function ===========//
document.addEventListener('DOMContentLoaded', () => {
    getTodos();
});
export {};
//# sourceMappingURL=index.js.map