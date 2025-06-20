const config = {
    server: 'ON44C03431532\\MSSQLSERVER02',    // Your SQL Server instance
    database: 'pubs',    // Your database name
    driver: 'msnodesqlv8', // Tell mssql to use the msnodesqlv8 driver
    options: {
      trustedConnection: true,        // Use Windows Authentication
      trustServerCertificate: true,   // Bypass certificate validation if needed
      encrypt: false                  // Set to false for local servers unless encryption is required
    }
  };
  
  module.exports = config;
  const connectionString = "Driver={SQL Server Native Client 11.0};Server=ON44C03431532\\MSSQLSERVER02;Database=pubs;Trusted_Connection=Yes;Encrypt=no;TrustServerCertificate=yes;";
  module.exports = connectionString;
    
  