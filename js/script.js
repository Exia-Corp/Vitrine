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

  const user = {
    "name": document.getElementById("nom").value,
    "id": document.getElementById("id").value,
    "bearerToken": "GENERATED_BEARER_TOKEN_HERE",
    "checkoutStatus": "stripe.pending",
    "lastError": null,
  };

  if(panier.length === 0){
    alert("Votre panier est vide !");
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));

  alert(`Afin de procéder au payement de votre commande, vous allez être redirigé vers notre service de payement sécurisé (Stripe)`);
  fetch(`http://localhost:3000/checkout/success/${user.id}`, {
		method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.bearerToken}`
    },
    body: JSON.stringify({
        name: user.name,
        panier: panier
    })
	})
	.then(res => {
    if (!res.ok) throw new Error(`Erreur API: ${res.status}`)
    return res.json()
  })
  .then(data => {
      document.location.href = data.url
  })
  .catch(err => {
      alert("Erreur lors de la redirection : " + err.message)
  });

  panier.length = 0;
  afficherPanier();
  this.reset();

});
