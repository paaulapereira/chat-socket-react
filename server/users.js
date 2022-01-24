const users = [];

//funcion para anadir nuevos usuarios
const addUser = ({ id, name, room }) => {
  //cambiamos el nombre del usuario y del room a lowercase
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //no permite crear un usuario con el mismo nombre que otro
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUser) {
    return { error: "Username is already taken!" };
  }

  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  //si hay un user con el mismo id que se desea eliminar, lo borra del array
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
