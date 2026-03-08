# 🍎 Food Inventory – Solana Smart Contract (Anchor)

## Overview

**Food Inventory** es un programa de **Solana** desarrollado con **Anchor Framework** que permite gestionar un inventario de alimentos en la blockchain.

Cada usuario puede crear su propio inventario y realizar operaciones como:

* Agregar alimentos
* Consultar alimentos
* Actualizar alimentos
* Eliminar alimentos
* Reducir cantidades

Toda la información se almacena **on-chain** dentro de una cuenta PDA (Program Derived Address).

---

# 🧱 Arquitectura del Proyecto

Este proyecto está organizado para **Solana Playground + Anchor**.

```
project/
│
├─ src/
│  └─ lib.rs              # Smart Contract en Rust
│
├─ client/
│  └─ client.ts           # Cliente para interactuar con el programa
│
├─ tests/
│  └─ anchor.test.ts      # Testing del programa
│
└─ README.md
```

---


# 🧠 Cómo Funciona la Aplicación

Cada usuario crea un **inventario de alimentos** almacenado en una cuenta PDA.

PDA utilizada:

```
seeds = ["food", owner_public_key]
```

Esto garantiza que:

* cada usuario tiene **un inventario único**
* el programa puede **derivar la cuenta de forma determinística**

La cuenta `InventoryFood` contiene:

```
owner: Pubkey
name: String
foods: Vec<Food>
```

Cada `Food` contiene:

```
name: String
quantity: u64
```

Restricciones:

* máximo **10 alimentos**
* nombre máximo **90 caracteres**
* cantidad mínima **1**

---

# 📦 Estructuras de Datos

## InventoryFood

Cuenta principal del inventario.

```
pub struct InventoryFood {
    owner: Pubkey,
    name: String,
    foods: Vec<Food>
}
```

Capacidad:

* máximo **10 alimentos**

---

## Food

Representa un alimento dentro del inventario.

```
pub struct Food {
    name: String,
    quantity: u64
}
```

---

# 🚀 Instrucciones del Programa

El programa expone varias funciones.

---

# 1️⃣ create_system_food

Crea el inventario de alimentos del usuario.

### Parámetros

```
name: String
```

### Ejemplo

```
createSystemFood("My Food Inventory")
```

### Reglas

* nombre ≤ 50 caracteres

---

# 2️⃣ add_food

Agrega un alimento al inventario.

Si el alimento **ya existe**, aumenta su cantidad.

### Parámetros

```
name: String
quantity: u64
```

### Ejemplo

```
addFood("apple", 5)
```

### Comportamiento

Caso 1 — alimento nuevo

```
apple → quantity 5
```

Caso 2 — alimento existente

```
apple 5 + 5 = 10
```

### Restricciones

* máximo **10 alimentos**
* quantity > 0

---

# 3️⃣ show_foods

Muestra todos los alimentos del inventario.

### Ejemplo

```
showFoods()
```

### Output

```
Food: apple | Quantity: 10
Food: banana | Quantity: 3
```

---

# 4️⃣ show_foods_by_id

Busca un alimento específico.

### Parámetros

```
name: String
```

### Ejemplo

```
showFoodsById("apple")
```

### Output

```
Food found
Name: apple
Quantity: 10
```

---

# 5️⃣ update_food

Actualiza un alimento existente.

Puede modificar:

* nombre
* cantidad

### Parámetros

```
name: String
new_quantity: u64
new_name: Option<String>
```

### Ejemplo

```
updateFood("apple", 20, "green apple")
```

Resultado:

```
green apple → quantity 20
```

### Validaciones

* quantity > 0
* nombre ≤ 90 caracteres
* no duplicar alimentos

---

# 6️⃣ delete_quantity_food

Reduce la cantidad de un alimento.

### Parámetros

```
name: String
quantity: u64
```

### Ejemplo

```
deleteQuantityFood("banana", 5)
```

Caso 1

```
banana 10 - 5 = 5
```

Caso 2

```
banana 5 - 5 = 0
```

El alimento se elimina automáticamente si llega a **0**.

---

# 7️⃣ delete_food

Elimina completamente un alimento del inventario.

### Parámetros

```
name: String
```

### Ejemplo

```
deleteFood("banana")
```

---

# ⚠️ Manejo de Errores

Errores personalizados:

```
CreateTitleSystemToLoong
SpacesForFood
TitleTooLoongForFood
InvalidQuantity
FoodAlreadyExists
```

Ejemplo:

```
Food already exists in inventory
```

---

# 🧪 Testing

Ubicación:

```
tests/anchor.test.ts
```

Ejecutar:

```
anchor test
```

---

# 🖥️ Cliente (Client Script)

Ubicación:

```
client/client.ts
```

Este archivo permite interactuar con el programa:

Operaciones disponibles:

* crear inventario
* agregar alimentos
* consultar alimentos
* actualizar alimentos
* eliminar alimentos

Ejecutar cliente:

```
ts-node client/client.ts
```

---

# 🧰 Cómo Ejecutar en Solana Playground

1️⃣ Abrir Solana Playground

https://beta.solpg.io

2️⃣ Crear proyecto Anchor

3️⃣ Copiar archivos:

```
src/lib.rs
client/client.ts
tests/anchor.test.ts
```

4️⃣ Compilar

```
Build
```

5️⃣ Deploy

```
Deploy
```

6️⃣ Ejecutar cliente

```
Run client
```

---

# 📌 Ejemplo de Uso

### Crear inventario

```
createSystemFood("My Food Inventory")
```

### Agregar alimentos

```
addFood("apple", 5)
addFood("banana", 10)
```

### Mostrar inventario

```
showFoods()
```

### Buscar alimento

```
showFoodsById("apple")
```

### Actualizar alimento

```
updateFood("apple", 20, "green apple")
```

### Reducir cantidad

```
deleteQuantityFood("banana", 5)
```

### Eliminar alimento

```
deleteFood("banana")
```

---

# 🔐 Seguridad

El programa utiliza:

* **Signer validation**
* **PDA ownership**
* **Anchor constraints**
* **Custom error handling**

---

# 📚 Conceptos de Solana Utilizados

Este proyecto utiliza varios conceptos importantes del ecosistema Solana:

* **Program Derived Addresses (PDA)**
* **Accounts**
* **Anchor Macros**
* **On-chain storage**
* **Instruction handlers**
* **Custom Errors**

---

# 👨‍💻 Autor

Proyecto educativo para aprendizaje de: Jose Medina (DeiNas77)

* Solana Development
* Anchor Framework
* Rust Smart Contracts
* Web3 TypeScript Clients

---

# 📜 Licencia

MIT

