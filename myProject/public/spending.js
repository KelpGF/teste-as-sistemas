const baseUrlSpending = "api/spending";

function getSpending(url, filter = false) 
{
    if (filter) {
        $(".spending_card").hide();
    } else {
        $(".spending_card").show();
    }

    $.get(url, function(spending) {
        $(`.spending_category`).html("");
        
        spending.map((spent) => {
            $(`#spending_card_${spent.category_fk}`).show();

            $(`#spending_category_${spent.category_fk}`).append(`
                <li class="list-group-item" id="spent_${spent.id}_li">
                    <div class="row">
                        <div class="col-8">
                            <strong>
                                `
                                +(Number(spent.total_spent)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })+
                                `
                            </strong>
                            <span> 
                                ${(spent.description === null) ? "" : " - "+spent.description} 
                            </span>
                        </div>
                        <div class="col-4 text-right">
                            <i class="fas fa-calendar"></i> ${spent.closing_date}
                            <button class="btn btn-danger btn-sm" onClick="removeSpent(${spent.id})"
                                title="Deletar Gasto">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </li>
            `);
        });

        $("#div-preload").fadeOut("fast");
    })
    .fail(function() {
        $("#div-preload").fadeOut("fast");
    });
}

function spendingByFilters()
{
    const category_select = $('#category_select').val();
    const period_select = $('#period_select').val();

    let url = baseUrlSpending;
    let filter = true;
    
    if (category_select != '0' && period_select != '') {
        url += `/allFilters/${category_select}/${period_select}`;
    } else if (category_select != '0') {
        url += `/byCategory/${category_select}`;
    } else if (period_select != '') {
        url += `/byPeriod/${period_select}`;
    } else {
        filter = false;
    }

    $("#div-preload").fadeIn("fast");
    getSpending(url, filter);
};

function spentAdd(category_id, category_title)
{
    $("#category_title_add").text(category_title);
    $("#btn-spendingAdd").val(category_id)
}

$("#category_select,#period_select").change(function() {
    spendingByFilters();
});

$("#btn-spendingAdd").click(function() {
    const data = {
        category_fk: $("#btn-spendingAdd").val(),
        description: $("#spendDescription").val(),
        total_spent: $("#spendTotal").val(),
        closing_date: $("#spendDate").val(),
    }

    $.ajax({
        url: baseUrlSpending,
        method: 'POST',
        data
    }) 
    .done(function() {
        $('#spentAdd').modal("hide");
        spendingByFilters();
    })
    .fail(function(response) {
        const errors = response.responseJSON.errors;
        
        $.each(errors, function(idx, message) {
            alert(message)
        });
    });
});


function removeSpent(spent_id)
{
    $.ajax({
        url: baseUrlSpending+'/'+spent_id,
        method: 'DELETE',
    }) 
    .done(function() {
        $(`#spent_${spent_id}_li`).fadeOut("slow");

        setTimeout(() => {
            $(`#spent_${spent_id}_li`).remove();
        }, 1000);
    });
}