import mongoose from "mongoose";  /* veritabanı ile konuşmak için */

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!); // Seçenekler olmadan bağlantı

    const connection = mongoose.connection;

    /* mongoose dinliyor veritabanını burada */
    connection.on("connected", () => {
      console.log("MONGODB'ye bağlandım aferin bana");
    });

    connection.on("error", (err) => {
      console.log("MONGODB'ye bağlanılamadı. Lütfen mongodb'yi çalıştırın: " + err);
      process.exit();
    });
  } catch (error) {
    console.log("Bir şeyler ters gitti");
    console.error(error);
  }
}

