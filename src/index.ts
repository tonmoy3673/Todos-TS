
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
        throw new Error("Network Error Found ");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        console.error(`Todos data not Fetch ${err.message}`);
        throw new Error(`Todos not Fetch ${err.message}`);
      } else {
        console.error("Data Not Found");
      }
    });
};

//  ================ Get Todos ===========//
const getTodos = async (): Promise<void> => {
  try {
    const todos: Todos[] = await loadTodos();
    if (!todos) {
      throw new Error("Data Not Found");
    }

    const mainContainer = document.getElementById(
      "main-container"
    ) as HTMLElement;
    const todoDetails = document.getElementById('todo-detail') as HTMLElement;
    if (mainContainer) {
      mainContainer.style.display = "grid";
      mainContainer.style.gridTemplateColumns = "repeat(4,1fr)";
      mainContainer.style.gap = "20px";
      mainContainer.style.justifyContent = "center";
      mainContainer.style.alignItems = "center";
      mainContainer.style.padding = "15px 10px";
    }

    // =========== get section =======//
    todos.forEach((todo: Todos) => {
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
      mainContainer?.appendChild(newDev);
      console.log(todo);
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Data not Fetch ${err.message}`);
      throw new Error(`Data Not Fetch ${err.message}`);
    } else {
      console.log("Unknown Error Occurred!!");
    }
  } finally {
  }
};

// ============== Get TodosByID ========//
const getTodosById =async(id:number):Promise<void>=>{
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!res.ok) {
            throw new Error('API Issue Found!')
        }
        else{
          const data:Todos =  await res.json();
          console.log(data);
        }  
    }
    catch(err : unknown){
        if(err instanceof Error){
            console.error(`Data Not Fetch ${err.message}`)
            throw new Error(`Data Not Fetch ${err.message}`)
        }
        else{
            throw new Error('Unknown Error Occurred!!')
        }
    }
    finally{

    }

}



// ======== Call the Function ===========//
getTodos();
