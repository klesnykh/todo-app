export async function get (){
  let response = await fetch('https://api-js401.herokuapp.com/api/v1/todo', {
    method: 'GET'
  });
  return response;
}

export async function add (item){
  let response = await fetch('https://api-js401.herokuapp.com/api/v1/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return response;
}

export async function updatePatch (id, toUpdate) {
  let response = await fetch(`https://api-js401.herokuapp.com/api/v1/todo/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toUpdate),
  })
  return response;
}

export async function deleteById (id) {
  let response = await fetch(`https://api-js401.herokuapp.com/api/v1/todo/${id}`, {
    method: 'DELETE'
  })
  return response;
}

