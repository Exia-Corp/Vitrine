const panier = [];
const listePanier = document.getElementById("liste-panier");
const totalSpan = document.getElementById("total");

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.parentElement;
    const nom = card.dataset.nom;
    const prix = parseFloat(card.dataset.prix);

    if(prix === 0){
      alert("Pour ce bot, veuillez nous contacter !");
      return;
    }

    panier.push({nom, prix});
    afficherPanier();
  });
});

function afficherPanier(){
  listePanier.innerHTML = "";
  let total = 0;
  panier.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nom} - ${item.prix} €`;
    listePanier.appendChild(li);
    total += item.prix;
  });
  totalSpan.textContent = total.toFixed(2) + " €";
}

document.getElementById("form-commande").addEventListener("submit", async function(e){
  e.preventDefault();

  const nom = document.getElementById("nom").value;
  const id = document.getElementById("id").value;

  if(panier.length === 0){
    alert("Votre panier est vide !");
    return;
  }

  try {
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1409894641825742969/mHwDY6gICuiR4MlOuv7RR9wTmWxVjiKtmqG2eLPzLweJQciO5on4pjpTQm5oizyjx2Z-";

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `Nouvelle commande de **${nom} (${id})**\n` +
          panier.map(item => `- ${item.nom} (€${item.prix})`).join("\n")
      })
    });

    alert(`Afin de procéder au payement de votre commande, vous allez être redirigé vers notre service de payement sécurisé (Stripe)`);
    panier.length = 0;
    afficherPanier();
    this.reset();

  } catch(err) {
    console.error(err);
    alert("Erreur de connexion au webhook Discord.");
  }
});
