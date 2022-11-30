const fetchWithRetries = (url, retries) =>
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      if (retries > 0) {
        return fetchWithRetries(url, retries - 1);
      }
      throw new Error(res.status);
    })
    .catch((error) => console.log(error));

export function fetchShiftList() {
  return fetchWithRetries("http://localhost:9001/shifts", 4);
}

export function fetchNurseList() {
  return fetchWithRetries("http://localhost:9001/nurses", 4);
}

export function assignNurseToShift(shiftId, nurseId) {
  return fetch(`http://localhost:9001/shifts/${shiftId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nurseID: nurseId,
    }),
  });
}
