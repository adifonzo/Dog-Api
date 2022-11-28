const app = {}

app.apiKey = '972bacc4-c565-4a11-8658-0a3b2ab71df3'

const $dropdown = $('#dropdown');
const $container = $('.dog-container')
app.populateDropdown = () => {
    // when the page loads an api call is made to this address
    $.ajax({
        url: 'https://api.thedogapi.com/v1/breeds',
        method: 'GET',
        dataType: 'json'
    }).then( (response) => {
        response.forEach( (dogObject) => {
            const breedName = dogObject.name;
            const lifespan = dogObject.lifespan;
            const temperament = dogObject.temperament;
            const breedId = dogObject.image.id;

            const htmlToAppend = `<option value="${breedId}">${breedName}</option>`

            $dropdown.append(htmlToAppend);
        })
    }); 
    // Array is returned
}

app.getSelectValue = () => {
    $dropdown.on('change', () => {
        const selection = $('option:selected').val();
        $container.empty();

        app.getDog(selection);
    })
}

app.getDog = (breedId) => {
    $.ajax({
        url: `https://api.thedogapi.com/v1/images/${breedId}`,
        method: 'GET',
        dataType: 'json'
    }).then( (response) => {
        app.displayDog(response)
    })
}

app.displayDog = (dogInfo) => {
    const htmlToAppend =`
        <div class="output">
            <h2 class="nameOfBreed">${dogInfo.breeds[0].name}</h2>
            <h2>Average lifespan:</h2>
            <h2 class="lifespanOfBreed">${dogInfo.breeds[0].life_span}</h2>
                <div class="imageOutput">
                    <img class="dogImage" src="${dogInfo.url}" alt="Photo of ____"/>
                </div>
            <h2>Temperament:</h2>
            <h2 class="temperamentOfBreed">${dogInfo.breeds[0].temperament}</h2>
        </div>
    `;
    $container.append(htmlToAppend);
}

app.init = () => {
    app.populateDropdown();
    app.getSelectValue();
    app.getDog('BJa4kxc4X');
}



$(function() {
    app.init();
});