const sql = require('msnodesqlv8');
const connectionString = require('./dbConfig');

function getAuthors(){
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM authors";
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        console.error("Database error:", err);
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function getAuthor(au_id) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM authors WHERE au_id = ?";
    sql.query(connectionString, query, [au_id], (err, rows) => {
      if (err) {
        console.error("Database error:", err);
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function updateAuthor(au_id, updatedData) {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE [pubs].[dbo].[authors]
      SET au_lname = ?, au_fname = ?, phone = ?, address = ?, city = ?, state = ?, zip = ?, contract = ?
      WHERE au_id = ?
    `;
    
 
    
    const params = [
      
      String(updatedData.au_lname || ''),
      String(updatedData.au_fname || ''),
      String(updatedData.phone || ''),
      String(updatedData.address || ''),
      String(updatedData.city || ''),
      String(updatedData.state || ''),
      updatedData.zip ? String(updatedData.zip) : null, // Ensure valid zip
      String(updatedData.contract || ''),
      String(au_id),
     
    ];
    
    console.log("SQL Query:", query);
    console.log("Params:", params);  // Debug output

    sql.query(connectionString, query, params, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
}


function createAuthor(authorData ){
  return new Promise((resolve,reject)=>{
    const query='  INSERT INTO [pubs].[dbo].[authors] (au_id, au_lname, au_fname, phone, address, city, state, zip, contract)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const params=[
      String(authorData.au_id || ''),
      String(authorData.au_lname || ''),
      String(authorData.au_fname || ''),
      String(authorData.phone || ''),
      String(authorData.address || ''),
      String(authorData.city || ''),
      String(authorData.state || ''),
      authorData.zip ? String(authorData.zip) : null,
      String(authorData.contract || '')
    ];
    console.log("SQL Query:", query);
    console.log("Params:", params);
    sql.query(connectionString, query, params, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return reject(err);
      }
      resolve(result);
    });

    }
);
}
function deleteAuthor(au_id) {
  return new Promise((resolve, reject) => {
    // Construct the SQL DELETE query
    const query = `
      DELETE FROM [pubs].[dbo].[authors]
      WHERE au_id = ?
    `;
    
    // The parameter is the author id, passed as a string
    const params = [String(au_id)];

    console.log("SQL Query:", query);
    console.log("Params:", params);  // Debug output

    sql.query(connectionString, query, params, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  getAuthor,
  getAuthors,
  updateAuthor,
  createAuthor,
  deleteAuthor
};
