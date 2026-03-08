import * as anchor from "@coral-xyz/anchor";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.FoodInventory;

(async () => {
  const owner = provider.wallet;

  /*
  =========================
  PDA DEL INVENTARIO
  =========================
  */

  const [inventoryPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("food"), owner.publicKey.toBuffer()],
    program.programId
  );

  console.log("Inventory PDA:", inventoryPda.toBase58());

  /*
  =========================
  CREATE INVENTORY
  =========================
  */

  console.log("Creating inventory...");

  try {
    await program.methods
      .createSystemFood("My Food Inventory")
      .accounts({
        owner: owner.publicKey,
        inventoryFood: inventoryPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Inventory created");
  } catch (err) {
    console.log("Inventory already exists");
  }

  /*
  =========================
  ADD FOOD
  =========================
  */

  console.log("Adding food...");

  try {
    await program.methods
      .addFood("apple", new anchor.BN(5))
      .accounts({
        owner: owner.publicKey,
        inventoryFood: inventoryPda,
      })
      .rpc();

    console.log("Apple added");
  } catch (err) {
    console.log("Apple already exists");
  }

  try {
    await program.methods
      .addFood("banana", new anchor.BN(10))
      .accounts({
        owner: owner.publicKey,
        inventoryFood: inventoryPda,
      })
      .rpc();

    console.log("Banana added");
  } catch (err) {
    console.log("Banana already exists");
  }

  /*
  =========================
  SHOW FOODS
  =========================
  */

  console.log("Showing foods...");

  try {
    await program.methods
      .showFoods()
      .accounts({
        owner: owner.publicKey,
        inventoryFood: inventoryPda,
      })
      .rpc();
  } catch (err) {
    console.log("Error showing foods");
  }

  /*
  =========================
  SHOW FOOD BY NAME
  =========================
  */

  console.log("Searching apple...");

  try {
    await program.methods
      .showFoodsById("apple")
      .accounts({
        owner: owner.publicKey,
        inventoryFood: inventoryPda,
      })
      .rpc();
  } catch (err) {
    console.log("Apple not found");
  }

  /*
  =========================
  UPDATE FOOD
  =========================
  */

  console.log("Updating apple...");

  try {
    await program.methods
      .updateFood("apple", new anchor.BN(20), "Green Apple")
      .accounts({
        owner: owner.publicKey,
        inventoryFood: inventoryPda,
      })
      .rpc();

    console.log("Apple updated");
  } catch (err) {
    console.log("Error updating apple");
  }

  /*
  =========================
  DELETE QUANTITY
  =========================
  */

  console.log("Removing banana quantity...");

  try {
    await program.methods
      .deleteQuantityFood("banana", new anchor.BN(5))
      .accounts({
        owner: owner.publicKey,
        inventoryFood: inventoryPda,
      })
      .rpc();

    console.log("Banana quantity removed");
  } catch (err) {
    console.log("Error removing quantity");
  }

  /*
  =========================
  DELETE FOOD
  =========================
  */

  console.log("Deleting banana...");

  try {
    await program.methods
      .deleteFood("banana")
      .accounts({
        owner: owner.publicKey,
        inventoryFood: inventoryPda,
      })
      .rpc();

    console.log("Banana deleted");
  } catch (err) {
    console.log("Banana may not exist");
  }

  /*
  =========================
  SHOW FINAL STATE
  =========================
  */

  console.log("Final inventory:");

  const account = await program.account.inventoryFood.fetch(inventoryPda);

  console.log("Inventory name:", account.name);
  console.log("Owner:", account.owner.toBase58());

  console.log("Foods:");

  account.foods.forEach((food, index) => {
    console.log(`Food ${index + 1}`);
    console.log("Name:", food.name);
    console.log("Quantity:", food.quantity.toNumber());
    console.log("------------------");
  });
})();
