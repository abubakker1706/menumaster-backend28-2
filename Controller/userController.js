import { db } from "../db.js";

const create = (data, callback) => {
  db.query(
    `insert into users(firstName,lastName, gender, email, phone) values (?,?,?,?,?)`,
    [data.firstName, data.lastName, data.gender, data.email, data.phone],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const getUsers = (callback) => {
  db.query(`select * from users`, [], (error, results, fields) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const getUsersById = (data, callback) => {
  db.query(
    `select * from users where userid =?`,
    [data.id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const updateUser = (data, callback) => {
  db.query(
    `update users set firstName=?, lastName=?, gender=?, email=?, passkey=?, phone=? where id=?`,
    [
      data.firstName,
      data.lastName,
      data.gender,
      data.email,
      data.passkey,
      data.phone,
      data.id,
    ],
    (error, results, fields) => {
      if (error) {
        callback(error);
      }
      return callback(null, results);
    }
  );
};

const deleteUser = (data, callback) => {
  db.query(
    `delete from users where id=?`,
    [data.id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

export const allUserFunction = (data, callback) => {
  console.log("Action given is", data);

  switch (data.action) {
    case "create":
      console.log("Create hit");
      create(data, callback);
      break;
    case "read":
      console.log("Read hit");
      getUsers(callback);
      break;
    case "readid":
      console.log("Readid hit");
      getUsersById(data, callback);
      break;
    case "update":
      console.log("Update hit");
      updateUser(data, callback);
      break;
    case "delete":
      console.log("Delete hit");
      deleteUser(data, callback);
      break;
    default:
      let results = "Provide valid action";
      return callback(null, results);
  }
};
