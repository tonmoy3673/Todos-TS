// ============= Todos Interface ==========//
interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// ============ Load Todos ===========//
const loadTodos = (): Promise<Todos[]> => {
 
  return fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network Error Found");
      }
      return res.json();
    })
    .catch((err: unknown) => {
      console.error('Fetch error:', err); 
      throw err;
    });
};

// ============== Get TodosByID ========//
const getTodosById = async (id: number): Promise<Todos> => {
  
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (!res.ok) {
      throw new Error('API Issue Found!');
    }
    return await res.json();
  } catch (err) {
    console.error(`Error fetching todo ${id}:`, err); 
    throw err;
  }
};

// ================ Get Todos ===========//
const getTodos = async (): Promise<void> => {
  
  try {
    // Check if elements exist
    const mainContainer = document.getElementById("main-container");
    const todoDetails = document.getElementById('todo-detail');
    
    if (!mainContainer || !todoDetails) {
      throw new Error("Required DOM elements not found");
    }

    
    const todos: Todos[] = await loadTodos();
    console.log('Todos loaded:', todos.length); 

    // Style containers
    (mainContainer as HTMLElement).style.display = "grid";
    (mainContainer as HTMLElement).style.gridTemplateColumns = "repeat(4,1fr)";
    (mainContainer as HTMLElement).style.gap = "20px";
    (mainContainer as HTMLElement).style.padding = "15px 10px";

    // Initial details message
    todoDetails.innerHTML = "<p>Click a todo to see details</p>";
    (todoDetails as HTMLElement).style.marginTop = "20px";
    (todoDetails as HTMLElement).style.padding = "10px";
    (todoDetails as HTMLElement).style.border = "1px solid #333";

    // Create todo cards
    todos.forEach((todo: Todos) => {
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
      const button = newDiv.querySelector('.status-btn') as HTMLButtonElement;
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        
        
        try {
          (todoDetails as HTMLElement).innerHTML = '<p>Loading...</p>';
          const data = await getTodosById(todo.id);
          
          (todoDetails as HTMLElement).innerHTML = `
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
        } catch (err) {
          console.error('Error in click handler:', err); 
          (todoDetails as HTMLElement).innerHTML = `
            <p style="color:red">Error loading details</p>
          `;
        }
      });

      mainContainer.appendChild(newDiv);
    });

  } catch (err) {
    console.error('Error in getTodos:', err); 
    
    const errorContainer = document.getElementById("main-container") || document.body;
    errorContainer.innerHTML = `
      <div style="color:red; padding:20px;">
        <h2>Error Loading Todos</h2>
        <p>${err instanceof Error ? err.message : 'Unknown error'}</p>
      </div>
    `;
  }
};

// ======== Call the Function ===========//
document.addEventListener('DOMContentLoaded', () => {
  getTodos();
});