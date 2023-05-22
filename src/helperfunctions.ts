// A function that detects the code word in the recognized text
export const detectCodeWord = (transcript: string, codeWord: string) => {
  if (codeWord.trim().length < 0) {
    return;
  }
  // Convert both transcript and code word to lower case
  transcript = transcript.toLowerCase();
  codeWord = codeWord.toLowerCase();

  // Check if transcript contains code word
  return transcript.includes(codeWord);
};

export function addItemToLocalStorage(item: string, name: string): void {
  if (name==='contacts') {
    const existingItems: string[] = JSON.parse(
      localStorage.getItem(name) || "[]"
    );
    existingItems.push(item);
    localStorage.setItem(name, JSON.stringify(existingItems));
  } else localStorage.setItem(name, item);
}

export function removeItemFromLocalStorage(item: string, name: string): void {
  const existingItems: string[] = JSON.parse(
    localStorage.getItem(name) || "[]"
  );
  const index: number = existingItems.indexOf(item);

  if (index !== -1) {
    existingItems.splice(index, 1);
  }

  localStorage.setItem(name, JSON.stringify(existingItems));
}

export function getItemsFromLocalStorage(name: string) {
  let item;
  if (name === "contacts")
    item = JSON.parse(localStorage.getItem(name) || "[]");
  else item = localStorage.getItem(name);
  return item;
}
