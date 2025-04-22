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

function getBooks(){
  return new Promise((resolve,reject)=>{
    const query="Select * FROM titles ";
    sql.query(connectionString,query,(err,rows)=>{
      if(err){
        console.error("Database error:",err);
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
function getBook(title_id){
  return new Promise((resolve,reject)=>{
    const query= "SELECT * FROM titles WHERE title_id = ?";
    sql.query(connectionString,query,[title_id],(err,rows)=>{
      if(err){
        console.error("Database error: ",err);
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
function updateTitle(title_id, updatedData) {
  return new Promise(async (resolve, reject) => {
    try {
      // First fetch the existing title
      const getQuery = `SELECT * FROM [pubs].[dbo].[titles] WHERE title_id = ?`;
      
      sql.query(connectionString, getQuery, [title_id], (err, existingTitle) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        
        if (!existingTitle || existingTitle.length === 0) {
          return reject(new Error("Title not found"));
        }
        
        // Merge existing data with updated data
        const currentTitle = existingTitle[0];
        const mergedData = {
          title: updatedData.title !== undefined ? updatedData.title : currentTitle.title,
          type: updatedData.type !== undefined ? updatedData.type : currentTitle.type,
          price: updatedData.price !== undefined ? updatedData.price : currentTitle.price,
          advance: updatedData.advance !== undefined ? updatedData.advance : currentTitle.advance,
          royalty: updatedData.royalty !== undefined ? updatedData.royalty : currentTitle.royalty,
          ytd_sales: updatedData.ytd_sales !== undefined ? updatedData.ytd_sales : currentTitle.ytd_sales,
          notes: updatedData.notes !== undefined ? updatedData.notes : currentTitle.notes,
          pubdate: updatedData.pubdate !== undefined ? updatedData.pubdate : currentTitle.pubdate
        };
        
        // Now update with merged data
        const updateQuery = `
          UPDATE [pubs].[dbo].[titles]
          SET title = ?, type = ?, price = ?, advance = ?, royalty = ?, ytd_sales = ?, notes = ?, pubdate = ?
          WHERE title_id = ?
        `;
        
        const params = [
          mergedData.title,
          mergedData.type,
          mergedData.price,
          mergedData.advance,
          mergedData.royalty,
          mergedData.ytd_sales,
          mergedData.notes,
          mergedData.pubdate,
          title_id
        ];
        
        console.log("SQL Query:", updateQuery);
        console.log("Params:", params);
        
        sql.query(connectionString, updateQuery, params, (err, result) => {
          if (err) {
            console.error("Database error:", err);
            return reject(err);
          }
          resolve(result);
        });
      });
    } catch (error) {
      reject(error);
    }
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

function createAuthor(titleData){
  return new Promise((resolve,reject)=>{
    const query='  INSERT INTO [pubs].[dbo].[titles] (title_id,title,type, price, advance , royalty,ytd_sales, notes, pubdate)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const params=[
      String(titleData.title_id || ''),
      String(|| ''),
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
function deleteTitle(title_id){
  return new Promise((resolve,reject)=>{

    const query= 'DELETE FROM [pubs].[dbo].[titles] WHERE title_id = ?'
     
    console.log("SQL Query:", query);
    console.log("Params:",params);
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
  deleteAuthor,
  getBooks,
  getBook,
  updateTitle
};
