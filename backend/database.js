const dbConnection = require("./sqlite");

dbConnection
  .getDbConnection()
  .then((db) => {
    init(db);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

let _db;

function init(db) {
    _db = db;
}

const knex_db = require("./db-config");

const dbinitialize = async () => {
    testBase.resetDatabase(knex_db);
}

const readTeachers = async () => {
    const sql = `SELECT * FROM teacher`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readTeacherInfo = async (id) => {
    const sql = `SELECT * FROM dummyData`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const addTeacher = async (id, name, age) => {
    const sql = `INSERT INTO teacher(id,name,age) VALUES (?, ?, ?)`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[id,name,age])
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const updateTeacher = async (name, age, id) => {
    const updateSql = `UPDATE teacher SET name = ?, age = ? WHERE id = ?`;
    const selectSql = `SELECT * FROM teacher WHERE id = ?`;

    return new Promise((resolve, reject) => {
        knex_db
            .raw(updateSql, [name, age, id]) // Execute the update query
            .then(() => {
                // Fetch the updated record
                return knex_db.raw(selectSql, [id]);
            })
            .then((result) => {
                resolve(result[0][0]); // Return the updated record
            })
            .catch((error) => {
                reject(error); // Handle errors
            });
    });
};

const deleteTeacher = async (id) => {
    const sql = `DELETE FROM teacher WHERE id = ?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[id])
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readStudents = async () => {
    const sql = `SELECT * FROM student`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readStudentInfo = async (id) => {
    const sql = `SELECT * FROM student WHERE id = ?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[id])
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const addStudent = async (id, name, age, hometown) => {
    
    const sql = `INSERT INTO student(id,name,age,hometown) VALUES (?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[id,name,age,hometown])
            .then((data) => {
                resolve({status:"successfully created student"});
            })
            .catch((error) => {
                reject(error);
            });
    });
};


const updateStudent = async (name, age, hometown, id) => {
    const sql = `UPDATE student SET name = ?, age = ?, hometown = ? WHERE id = ?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[name,age,hometown,id])
            .then((data) => {
                resolve({status:"Sucessfully updated the teacher"});
            })
            .catch((error) => {
                reject(error);
            });
    });
} 

const deleteStudent = async (id) => {
    const sql = `DELETE FROM teacher WHERE id = ?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[id])
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = {
    readTeachers,
    readStudents,
    addStudent,
    addTeacher,
    deleteTeacher,
    deleteStudent,
    readStudentInfo,
    readTeacherInfo,
    updateStudent,
    updateTeacher
};
