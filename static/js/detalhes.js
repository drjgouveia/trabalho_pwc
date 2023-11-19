$(document).ready(function () {
    var animal_id = new URLSearchParams(window.location.search).get("id");
    fetchAnimalPorID(animal_id).then((animal) => {
        if(animal.gender === "Female") {
            $("#sexo").addClass("fa-venus");
        } else {
            $("#sexo").addClass("fa-mars");
        }

        $("#nome").text(animal.name);
        $("#idade").text(animal.age);
        $("#raca").text(animal.breeds.primary);
        $("#cor").text(animal.colors.primary);
        $("#pelo").text(animal.coat);
        $("#descricao").text(animal.description);
        
        if(animal.attributes.spayed_neutered){
            $("#castrado").text("Sim");
        }else{
            $("#castrado").text("Não");
        }
        if(animal.attributes.house_trained){
            $("#domesticado").text("Sim");
        } else {
            $("#domesticado").text("Não");
        }
        
        if (animal.attributes.special_needs) {
            $("#necessidades-especiais").text("Sim");
        } else {
            $("#necessidades-especiais").text("Não");
        }

        if(animal.attributes.declawed){
            $("#sem-unhas").text("Sim");
        }else{
            $("#sem-unhas").text("Não");
        }

        if (animal.attributes.shots_current) {
            $("#vacinas").text("Sim");
        } else {
            $("#vacinas").text("Não");
        }

        $("#foto-animal").attr("src", animal.photos.full);
    });
})