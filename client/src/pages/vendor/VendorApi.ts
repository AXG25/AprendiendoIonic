import Vendor from "./Vendor";

export async function searchVendors() {
  let url = "http://localhost:8080/api/suppliers";
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "aplication/json",
    },
  });

  return await response.json();
}

export async function removeVendor(id: string) {
  let url = "http://localhost:8080/api/suppliers/" + id;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "aplication/json",
    },
  });
}

export async function saveVendor(vendor: Vendor) {
  let url = "http://localhost:8080/api/suppliers";
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(vendor),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function searchVendorById(id: string) {
  let url = "http://localhost:8080/api/suppliers/" + id;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "aplication/json",
    },
  });

  return await response.json();
}
