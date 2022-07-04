const loggedInUserKey = "loggedInUser";

function setUserToLocalStorage(email: string, uid: string, date: Date) {
  const user = { email, uid, date };
  localStorage.setItem(loggedInUserKey, JSON.stringify(user));
}

function removeUserToLocalStorage() {
  localStorage.removeItem(loggedInUserKey);
}

function getUserFromLocalStorage(): Record<string, string> | null {
  const user = localStorage.getItem(loggedInUserKey);

  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}

export {
  setUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserToLocalStorage,
};
