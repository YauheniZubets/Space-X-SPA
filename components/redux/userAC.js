const NAME_PLACE_CREATE='NAME_PLACE_CREATE';
const NAME_PLACE_ADD='NAME_PLACE_ADD';

const namePlace_create=function() {
  return {
    type: NAME_PLACE_CREATE,
  };
}

const namePlace_add=function(addedName, addedSurname, age) {
  return {
    type: NAME_PLACE_ADD,
    addedName:addedName,
    addedSurname:addedSurname,
    age: age
  };
}

export {
  namePlace_create,NAME_PLACE_CREATE,
  namePlace_add,NAME_PLACE_ADD,
}
