const url_origine = 'https://miniprojrt-pharmacie.onrender.com/api/medicaments';

export async function getMedicaments() {
  const response = await fetch(url_origine);
  if (!response.ok) {
    console.error('Fetch failed:', response.status, response.statusText);
    return [];
  }
  const data = await response.json();
  console.log('Données reçues:', data);
  return data._embedded?.medicaments;
}

export async function addMedicament(medicament) {
  const response = await fetch(url_origine, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicament),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erreur ${response.status}: ${text}`);
  }

  return await response.json();
}

export async function deleteMedicament(idmedicament) {
  await fetch(`${url_origine}/${idmedicament}`, { method: 'DELETE' });
}

export async function updateMedicament(id, medicament) {
  const response = await fetch(`${url_origine}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicament),
  });

  return await response.json();
}
