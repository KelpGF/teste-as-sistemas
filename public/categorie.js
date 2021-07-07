const baseUrlCategories = 'api/categories';

function getCategories()
{
    $.get(baseUrlCategories, function(categories) {
        $("#spending_card").html(`
            <div class="col-lg-12 my-4">
                <h3>Gastos Cadastrados</h3>
            </div>
        `);
    
        $("#category_select").html(`
            <option value="0">Tudo</option>
        `);

        categories.map((category) => {
            $("#category_select").append(`
                <option value="${category.id}">
                    ${category.title}
                </option>
            `);
    
            $("#spending_card").append(`
                <div class="col-lg-6 mt-2 spending_card" id="spending_card_${category.id}">
                    <div class="card">
                        <div class="card-header">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <h5 class="mb-0">
                                        ${category.title}
                                    </h5>
                                </div>
                                <div class="col-6 text-right">
                                    <button class="btn btn-primary btn-sm" onClick="spentAdd('${category.id}', '${category.title}')"
                                        data-toggle="modal" data-target="#spentAdd">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                    <button class="btn btn-danger btn-sm" onClick="$('#btn-categoryRemove').val(${category.id});"
                                        data-toggle="modal" data-target="#spentRemove">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul class="list-group list-group-flush spending_category" id="spending_category_${category.id}">
                        </ul>
                    </div>
                </div>
            `);
        });
    
        getSpending(baseUrlSpending);
    })
    .fail(function() {
        $("#div-preload").fadeOut("fast");
    });    
}

getCategories();

$("#btn-categoryAdd").click(function() {
    const title = $("#categoryTitle").val();
    const period = $("#categoryPeriod").val();

    $.ajax({
        url: baseUrlCategories,
        method: 'POST',
        data: {title, period}
    }) 
    .done(function() { 
        $("#period_select").val("");

        $("#div-preload").fadeIn("fast");
        getCategories();
    })
    .fail(function(response) {
        const errors = response.responseJSON.errors;

        $.each(errors, function(idx, message) {
            alert(message)
        });
    });
});

$("#btn-categoryRemove").click(function() {
    const category_id = $("#btn-categoryRemove").val();
    
    $.ajax({
        url: baseUrlCategories+"/"+category_id,
        method: 'DELETE',
    }) 
    .done(function() {
        $('#spentRemove').modal("hide");
        $("#spending_card_"+category_id).fadeOut('slow');

        setTimeout(() => {
            $("#spending_card_"+category_id).remove();
        }, 1000);
    });
});