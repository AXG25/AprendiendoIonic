import Customer from "./Customer";

export async function searchCustomers() {
  let url = "http://localhost:8080/api/customers";
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "aplication/json",
    },
  });

  return await response.json();
}

export async function removeCustomer(id: string) {
  let url = "http://localhost:8080/api/customers/" + id;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "aplication/json",
    },
  });
}

export async function saveCustomer(customer: Customer) {
  let url = "http://localhost:8080/api/customers";
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(customer),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function searchCustomerById(id: string) {
  let url = "http://localhost:8080/api/customers/" + id;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "aplication/json",
    },
  });

  return await response.json();
}
