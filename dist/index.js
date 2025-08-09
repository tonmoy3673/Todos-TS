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
            throw new Error("Network Error Found ");
        }
        else {
            return res.json();
        }
    })
        .then((data) => {
        return data;
    })
        .catch((err) => {
        if (err instanceof Error) {
            console.error(`Todos data not Fetch ${err.message}`);
            throw new Error(`Todos not Fetch ${err.message}`);
        }
        else {
            console.error("Data Not Found");
        }
    });
};
//  ================ Get Todos ===========//
const getTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield loadTodos();
        if (!todos) {
            throw new Error("Data Not Found");
        }
        const mainContainer = document.getElementById("main-container");
        const todoDetails = document.getElementById('todo-detail');
        if (mainContainer) {
            mainContainer.style.display = "grid";
            mainContainer.style.gridTemplateColumns = "repeat(4,1fr)";
            mainContainer.style.gap = "20px";
            mainContainer.style.justifyContent = "center";
            mainContainer.style.alignItems = "center";
            mainContainer.style.padding = "15px 10px";
        }
        // =========== get section =======//
        todos.forEach((todo) => {
            const newDev = document.createElement("div");
            if (newDev) {
                newDev.style.textAlign = "center";
                newDev.style.border = "1px solid gray";
                newDev.style.padding = "10px";
                newDev.style.borderRadius = "6px";
                newDev.style.height = "150px";
            }
            newDev.innerHTML = `
            <h4>ID : ${todo.id}</h4>
            <p>Title : ${todo.title}</p>
            <button id="status-btn-${todo.id}">Status</button>
        
        `;
            mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.appendChild(newDev);
            console.log(todo);
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Data not Fetch ${err.message}`);
            throw new Error(`Data Not Fetch ${err.message}`);
        }
        else {
            console.log("Unknown Error Occurred!!");
        }
    }
    finally {
    }
});
// ============== Get TodosByID ========//
const getTodosById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!res.ok) {
            throw new Error('API Issue Found!');
        }
        else {
            const data = yield res.json();
            console.log(data);
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Data Not Fetch ${err.message}`);
            throw new Error(`Data Not Fetch ${err.message}`);
        }
        else {
            throw new Error('Unknown Error Occurred!!');
        }
    }
    finally {
    }
});
// ======== Call the Function ===========//
getTodos();
export {};
//# sourceMappingURL=index.js.map