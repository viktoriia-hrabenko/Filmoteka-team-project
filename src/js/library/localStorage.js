// zapisać w pamięci lokalnej przeglądarki użytkownika
export const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

// ładowanie
export const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

//usuwanie
export const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};




// export const addToLibrary = (movieId, type, listType = 'watchedList') => {
//   const libraryList = load(listType);
//   if (libraryList == undefined) {
//     let tempWatchedList = [];
//     tempWatchedList.push({
//       movieId,
//       type,
//     });
//     return save(listType, tempWatchedList);
//   }

//   let alreadyInList = false;
//   libraryList.forEach(movie => {
//     if (movie.id == movieId && movie.type === type) {
//       alreadyInList = true;
//     }
//   });

//   if (alreadyInList) return alert('Movie already on the list.');

//   libraryList.push({
//     movieId,
//     type,
//   });
//   return save(listType, libraryList);
// };


// export const removeFromLibrary = (movieId, type, listType = 'watchedList') => {
//   let libraryList = load(listType);

//   libraryList = libraryList.filter(movie => {
//     if (movie.id != movieId) {
//       return movie;
//     }
//   });

//   return save(listType, libraryList);
// };
