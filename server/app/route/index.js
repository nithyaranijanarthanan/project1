import {
  getAllUsers,
  addUser ,
  updateUser,
  deleteUser,
} from '../controller/users.controller.js';

export default function(app) {
  app.get('/api/getAllUsers', getAllUsers);

   app.post('/api/addUser', addUser);  

  app.put('/api/updateUser/:id', updateUser);

  app.delete('/api/deleteUser/:id', deleteUser);
}
