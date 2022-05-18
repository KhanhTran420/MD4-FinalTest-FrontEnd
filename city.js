function showList(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/cities",
        success: function (city){

            let content = '';
            for (let i = 0; i < city.length; i++) {
                content += `<tr>
        <th scope="row">${i+1}</th>
        <td>${city[i].name}</td>
        <td>${city[i].area}</td>
        <td>${city[i].population}</td>
        <td>${city[i].gdp}</td>
        <td>${city[i].description}</td>
        <td>${city[i].country.name}</td>
        <td><button onclick="deleteCity(${city[i].id})">Delete</button></td>
        <td><button type="button" onclick="showEditForm(${city[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>
        <td><button type="button" onclick="showViewForm(${city[i].id})" data-bs-toggle="modal" data-bs-target="#myModal2">View</button></td>
    </tr>`
            }
            $("#list-city").html(content);
        }
    })
}
showList();

//CREATE City..................................................

function showCountry(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/cities/countries",
        success: function (country){
            let content = "";
            for (let i = 0; i < country.length; i++) {
                content +=`<option value="${country[i].id}">${country[i].name}</option>`
            }
            $("#country").html(content);
            $("#u-country").html(content);
            $("#a-country").html(content);
        }
    })
}

function createCity() {
    // lay du lieu
    let name = $('#name').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let country = $('#country').val();

    let cityForm = {
        name : name,
        area : area,
        population : population,
        gdp : gdp,
        description : description,
        country :{
            id:parseInt(country)
        },

    };


    // goi ajax
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",

        url: "http://localhost:8080/cities",
        data: JSON.stringify(cityForm),
        success: function (){
            showList()
        }
    });
    event.preventDefault();
}

//DELETE TRANSCRIPT.................................................

function deleteCity(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/cities/delete/${id}`,
        success: function () {
            showList()
        }
    })
}


//UPDATE_Transcript..............................................
function updateCity(id) {
    // lay du lieu
    let name = $('#u-name').val();
    let area = $('#u-area').val();
    let population = $('#u-population').val();
    let gdp = $('#u-gdp').val();
    let description = $('#u-description').val();
    let country = $('#u-country').val();

    let newcityForm = {
        name : name,
        area : area,
        population : population,
        gdp : gdp,
        description : description,
        country :{
            id:parseInt(country)
        },
    };


    // goi ajax
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newcityForm),
        url: `http://localhost:8080/cities/edit/${id}`,

        success: function (){
            showList()
        }
    })
    event.preventDefault();
}


function showEditForm(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="u-name" class="form-label">City</label>
                            <input type="text" class="form-control" id="u-name" >
                        </div>
                        
                        <div class="mb-3">
                            <label for="u-area" class="form-label">Area</label>
                            <input type="text" class="form-control" id="u-area" >
                        </div>
                        
                        <div class="mb-3">
                            <label for="u-population" class="form-label">Population</label>
                            <input type="text" class="form-control" id="u-population" >
                        </div>
                        
                        <div class="mb-3">
                            <label for="u-gdp" class="form-label">GDP</label>
                            <input type="text" class="form-control" id="u-gdp" >
                        </div>
                        
                        <div class="mb-3">
                            <label for="u-description" class="form-label">Description</label>
                            <input type="text" class="form-control" id="u-description" >
                        </div>
      
                        
                        <tr>
                            <div>
                                <label>Country:</label>
                                
                                <select name="u-country" id="u-country"> </select>
                            </div>
                        </tr>
                        
                
                        
                        
                      
                       
                        <div class="modal-footer">
                             <button type="submit" class="btn btn-primary" onclick="updateCity(${id})">Update</button>
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>`
    $("#showModalEdit").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/cities/${id}`,
        success:function (nano){
            $('#u-name').val(nano.name);
            $('#u-area').val(nano.area);
            $('#u-population').val(nano.population);
            $('#u-gdp').val(nano.gdp);
            $('#u-description').val(nano.description);
            $('#u-country').val(nano.country.name);

        }
    })
    showCountry();


}

function showViewForm(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="a-name" class="form-label">City</label>
                            <input type="text" class="form-control" id="a-name" >
                        </div>
                        
                        <div class="mb-3">
                            <label for="a-area" class="form-label">Area</label>
                            <input type="text" class="form-control" id="a-area" >
                        </div>
                        
                        <div class="mb-3">
                            <label for="a-population" class="form-label">Population</label>
                            <input type="text" class="form-control" id="a-population" >
                        </div>
                        
                        <div class="mb-3">
                            <label for="a-gdp" class="form-label">GDP</label>
                            <input type="text" class="form-control" id="a-gdp" >
                        </div>
                        
                        <div class="mb-3">
                            <label for="a-description" class="form-label">Description</label>
                            <input type="text" class="form-control" id="a-description" >
                        </div>
      
                        <div class="mb-3">
                            <label for="a-country" class="form-label">Country</label>
                            <input type="text" class="form-control" id="a-country" >
                        </div>
                        
                        
                
                        
                        
                      
                       
                        <div class="modal-footer">
                             
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>`
    $("#showModalEdit2").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/cities/${id}`,
        success:function (nano){
            $('#a-name').val(nano.name);
            $('#a-area').val(nano.area);
            $('#a-population').val(nano.population);
            $('#a-gdp').val(nano.gdp);
            $('#a-description').val(nano.description);
            $('#a-country').val(nano.country.name);

        }
    })
    showCountry();


}



showCountry();